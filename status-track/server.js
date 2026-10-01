const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "status-track.json");
const PUBLIC = path.join(__dirname, "public");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const COST_LINES = ["Acid Wash","Air Suzi","Courier","Dealer stock","Electrical Suzi","Jack / W / Spanner / Triangle","Labour","Natis","Permit","RWC","Sundries","Valet","Weighbridge"];
const JOB_A = ["Valet","Lights","Roadworthy","Spray","PDI"];
const PRICE = new Set(["director","accounts","stock","sales"]);
const COST = new Set(["director","accounts"]);
function empty() { return { users:[], sessions:[], units:[], quotes:[], bookings:[], orders:[], costs:[], tasks:[], logs:[], jobs:[], invoices:[] }; }
function load() {
  if (!fs.existsSync(DB_PATH)) return empty();
  const db = Object.assign(empty(), JSON.parse(fs.readFileSync(DB_PATH, "utf8")));
  Object.keys(empty()).forEach((k) => { db[k] = db[k] || []; });
  return db;
}
function save(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db)); }
function nid(rows) { return rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1; }
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function now() { return new Date().toISOString(); }
function photoFor(tag) { return tag === "TRUCK TRACTOR" ? "/brand/truck.jpg" : tag === "TRAILER" ? "/brand/trailer.jpg" : "/brand/tanker.jpg"; }
let db = load();
function seedUnit(f, cleared) {
  const unit = Object.assign({ extras:"", km:"N/A", engine:"N/A", reg:"", buy_excl:0, client:"", salesman:"", invoice_no:"", invoice_status:"None", photo: photoFor(f.tag), opened_by:"Chantelle", opened_at: now(), cleared: cleared ? 1 : 0, step: cleared ? "Cleared" : "WS opened", id: nid(db.units) }, f);
  db.units.push(unit);
  JOB_A.forEach((name) => db.tasks.push({ id: nid(db.tasks), unit_id: unit.id, job: "A", name, done: 0 }));
  COST_LINES.forEach((name) => db.costs.push({ id: nid(db.costs), unit_id: unit.id, name, supplier: "", qty: 0, unit_price: 0, inv: "" }));
  db.jobs.push({ id: nid(db.jobs), unit_id: unit.id, kind: "A", title: "Showroom prep", opened_by: "System", opened_at: now(), status: "Open" });
  return unit;
}
if (!db.users.length) {
  [["Sebastian van Biljon","BVB","director"],["Siegfried van Biljon","SVB","director"],["Cindy","","accounts"],["Chantelle","","stock"],["Fanie van Biljon","FVB","sales"],["Stanley Johnson","SJ","sales"],["Drickus van Biljon","DVB","sales"],["Jean","","workshop"],["Louis","","workshop"],["Damian","","marketing"],["Andre","","admin"]].forEach(([name, code, role]) => db.users.push({ id: nid(db.users), name, code, role }));
  const u = seedUnit({ ws:"WS9001", kind:"WS", year:2023, make:"GRW", model:"TRI-AXLE", description:"50000Lt aluminium fuel tanker", vin:"TESTVIN9001", price_excl:1250000, buy_excl:980000, tag:"TANKER", sentence:"1 x Used 2023 GRW 50000Lt aluminium tri-axle fuel tanker", seller:"Test seller" }, 1);
  u.client = "Acme Logistics"; u.salesman = "FVB"; u.invoice_no = "INV-9001"; u.invoice_status = "Requested";
  db.invoices.push({ id: 1, unit_id: u.id, number: "INV-9001", customer: "Acme Logistics", salesman: "FVB", excl: 1252500, vat: 187875, total: 1440375, status: "Requested", created_at: now() });
  seedUnit({ ws:"WS9002", kind:"WS", year:2022, make:"MERCEDES", model:"2652 ACTROS", description:"6x4 truck tractor", vin:"TESTVIN9002", price_excl:1480000, buy_excl:1210000, tag:"TRUCK TRACTOR", sentence:"1 x Used 2022 Mercedes 2652 Actros 6x4 truck tractor", seller:"Test seller" }, 1);
  save(db);
}
function hide(user, unit) {
  const copy = Object.assign({}, unit);
  if (!PRICE.has(user.role)) { delete copy.price_excl; delete copy.sentence; }
  if (!COST.has(user.role)) delete copy.buy_excl;
  if (user.role === "marketing") { delete copy.vin; delete copy.reg; delete copy.price_excl; delete copy.buy_excl; }
  return copy;
}
function actor(req) {
  db = load();
  const token = String(req.headers.authorization || "").replace("Bearer ", "");
  const session = db.sessions.find((s) => s.token === token);
  return session && db.users.find((u) => u.id === session.user_id);
}
function send(res, code, body) { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(body)); }
function bodyOf(req) { return new Promise((resolve) => { let raw = ""; req.on("data", (c) => raw += c); req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } }); }); }
function nextWs(kind) { let max = 9004; db.units.forEach((u) => { const n = Number(String(u.ws).replace(/\D/g, "")); if (n > max && n < 10000) max = n; }); return (kind || "WS") + (max + 1); }
function pack(user, unit) {
  let orders = db.orders.filter((o) => o.unit_id === unit.id);
  let costs = db.costs.filter((c) => c.unit_id === unit.id);
  if (!COST.has(user.role) && user.role !== "stock") orders = orders.map((o) => Object.assign({}, o, { invoiced_excl: null, quoted_excl: null }));
  if (!COST.has(user.role)) costs = [];
  const invoices = COST.has(user.role) || user.role === "sales" || user.role === "director" ? db.invoices.filter((i) => i.unit_id === unit.id) : [];
  return { unit: hide(user, unit), quotes: db.quotes.filter((q) => q.unit_id === unit.id), bookings: db.bookings.filter((b) => b.unit_id === unit.id), orders, costs, tasks: db.tasks.filter((t) => t.unit_id === unit.id), logs: db.logs.filter((l) => l.unit_id === unit.id), jobs: db.jobs.filter((j) => j.unit_id === unit.id), invoices };
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    const body = req.method === "POST" ? await bodyOf(req) : {};
    if (req.method === "POST" && url.pathname === "/api/login") {
      db = load();
      const user = db.users.find((u) => u.name === body.name);
      if (!user || body.password !== "Test1234") return send(res, 401, { error: "Wrong name or password" });
      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      db.sessions.push({ token, user_id: user.id, created_at: now() }); save(db);
      return send(res, 200, { token, user: { name: user.name, code: user.code, role: user.role } });
    }
    const user = actor(req); if (!user) return send(res, 401, { error: "Sign in" });
    if (url.pathname === "/api/me") return send(res, 200, { name: user.name, code: user.code, role: user.role, cost: COST.has(user.role), price: PRICE.has(user.role) });
    if (url.pathname === "/api/units" && req.method === "GET") return send(res, 200, db.units.slice().reverse().map((u) => hide(user, u)));
    if (url.pathname === "/api/units" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle opens the file" });
      const unit = seedUnit({ ws: nextWs(body.kind), kind: body.kind || "WS", year: body.year, make: body.make, model: body.model, description: body.description, vin: body.vin, engine: body.engine || "N/A", reg: body.reg || "", price_excl: Number(body.price_excl || 0), buy_excl: Number(body.buy_excl || 0), tag: body.tag || "TANKER", sentence: body.sentence, seller: body.seller || "" }, 0);
      unit.opened_by = user.name; save(db); return send(res, 200, { id: unit.id, ws: unit.ws });
    }
    const one = url.pathname.match(/^\/api\/units\/(\d+)$/);
    if (one && req.method === "POST") {
      if (!["stock", "director", "accounts"].includes(user.role)) return send(res, 403, { error: "Stock updates the worksheet" });
      const unit = db.units.find((u) => u.id === Number(one[1])); if (!unit) return send(res, 404, { error: "No unit" });
      ["year", "make", "model", "description", "vin", "engine", "reg", "sentence", "seller", "tag", "extras", "km"].forEach((k) => { if (body[k] != null) unit[k] = body[k]; });
      if (["stock", "director"].includes(user.role) && body.price_excl != null) unit.price_excl = Number(body.price_excl);
      if (COST.has(user.role) && body.buy_excl != null) unit.buy_excl = Number(body.buy_excl);
      save(db); return send(res, 200, hide(user, unit));
    }
    const clear = url.pathname.match(/^\/api\/units\/(\d+)\/clear$/);
    if (clear && req.method === "POST") {
      if (user.role !== "director") return send(res, 403, { error: "Director only" });
      const unit = db.units.find((u) => u.id === Number(clear[1])); if (!unit) return send(res, 404, { error: "No unit" });
      unit.cleared = 1; unit.step = "Cleared"; save(db); return send(res, 200, { ok: true });
    }
    if (one && req.method === "GET") {
      const unit = db.units.find((u) => u.id === Number(one[1])); if (!unit) return send(res, 404, { error: "No unit" });
      return send(res, 200, pack(user, unit));
    }
    if (url.pathname === "/api/quotes" && req.method === "POST") {
      if (!["sales", "director"].includes(user.role)) return send(res, 403, { error: "Sales quote" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      if (!unit || !unit.cleared) return send(res, 400, { error: "Unit must be cleared" });
      if (!body.customer) return send(res, 400, { error: "Customer required" });
      const trade = Number(body.trade_in || 0), fee = 2500, excl = Number(unit.price_excl) + fee - trade;
      const quote = { id: nid(db.quotes), number: "C" + (20920 + db.quotes.length), unit_id: unit.id, salesman_id: user.id, customer: body.customer, phone: body.phone || "", trade_in: trade, fee, excl, vat: excl * 0.15, total: excl * 1.15, follow_day: 1, due_on: addDays(1), result: "", code: user.code, name: user.name, ws: unit.ws, item: unit.ws + " " + unit.year + " " + unit.make + " " + unit.description, sentence: unit.sentence, created_at: now() };
      db.quotes.push(quote); unit.client = body.customer; unit.salesman = user.code; unit.step = "Quoted"; save(db); return send(res, 200, quote);
    }
    const qlog = url.pathname.match(/^\/api\/quotes\/(\d+)\/log$/);
    if (qlog && req.method === "POST") {
      const q = db.quotes.find((x) => x.id === Number(qlog[1])); if (!q) return send(res, 404, { error: "No quote" });
      if (user.role !== "director" && q.salesman_id !== user.id) return send(res, 403, { error: "Your quote" });
      const next = q.follow_day === 1 ? 3 : q.follow_day === 3 ? 7 : 14;
      q.result = body.result || "Logged"; q.follow_day = next; q.due_on = addDays(next); save(db);
      return send(res, 200, { due_on: q.due_on, follow_day: next });
    }
    if (url.pathname === "/api/invoices" && req.method === "POST") {
      if (!["sales", "director", "accounts"].includes(user.role)) return send(res, 403, { error: "Invoice" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id)); if (!unit) return send(res, 404, { error: "No unit" });
      const q = db.quotes.filter((x) => x.unit_id === unit.id).slice(-1)[0];
      const excl = q ? q.excl : Number(unit.price_excl) + 2500;
      const inv = { id: nid(db.invoices), unit_id: unit.id, number: "INV-" + (8500 + db.invoices.length), customer: body.customer || unit.client || "", salesman: user.code || unit.salesman, excl, vat: excl * 0.15, total: excl * 1.15, status: "Requested", created_at: now() };
      db.invoices.push(inv); unit.invoice_no = inv.number; unit.invoice_status = "Requested"; unit.client = inv.customer; unit.step = "Invoice requested"; save(db);
      return send(res, 200, inv);
    }
    if (url.pathname === "/api/jobs" && req.method === "POST") {
      if (!["sales", "director", "stock"].includes(user.role)) return send(res, 403, { error: "Sales opens Job B" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id)); if (!unit) return send(res, 404, { error: "No unit" });
      if (db.jobs.find((j) => j.unit_id === unit.id && j.kind === "B")) return send(res, 400, { error: "Job B already open" });
      const job = { id: nid(db.jobs), unit_id: unit.id, kind: "B", title: body.customer || unit.client || "Sold unit", opened_by: user.name, opened_at: now(), status: "Open" };
      db.jobs.push(job); ["Fitment", "Roadworthy", "Delivery"].forEach((name) => db.tasks.push({ id: nid(db.tasks), unit_id: unit.id, job: "B", name, done: 0 }));
      unit.step = "Job B"; save(db); return send(res, 200, job);
    }
    if (url.pathname === "/api/bookings" && req.method === "POST") {
      if (!["workshop", "director"].includes(user.role)) return send(res, 403, { error: "Workshop books" });
      const booking = { id: nid(db.bookings), unit_id: Number(body.unit_id), person: user.name, item: body.item, qty: Number(body.qty || 1), created_at: now(), numbered: 0 };
      db.bookings.push(booking);
      db.logs.push({ id: nid(db.logs), unit_id: booking.unit_id, person: user.name, line: booking.qty + " x " + booking.item, created_at: now() });
      save(db); return send(res, 200, booking);
    }
    if (url.pathname === "/api/queue") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Stock queue" });
      return send(res, 200, db.bookings.filter((b) => !b.numbered).map((b) => Object.assign({}, b, { ws: (db.units.find((u) => u.id === b.unit_id) || {}).ws })));
    }
    if (url.pathname === "/api/orders" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle numbers" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      const n = db.orders.filter((o) => o.unit_id === unit.id).length + 1;
      const order = { id: nid(db.orders), unit_id: unit.id, booking_id: Number(body.booking_id || 0), order_no: unit.ws + "-" + String(n).padStart(3, "0"), responsible: body.responsible, supplier: body.supplier, qty: Number(body.qty || 1), item: body.item, quoted_excl: Number(body.quoted_excl || 0), invoiced_excl: Number(body.invoiced_excl || 0), notes: body.notes || "", created_at: now() };
      db.orders.push(order);
      const booking = db.bookings.find((b) => b.id === order.booking_id); if (booking) booking.numbered = 1;
      db.costs.push({ id: nid(db.costs), unit_id: unit.id, name: order.item, supplier: order.supplier, qty: order.qty, unit_price: order.qty ? order.invoiced_excl / order.qty : 0, inv: "" });
      save(db); return send(res, 200, order);
    }
    if (url.pathname === "/api/costs" && req.method === "POST") {
      if (!COST.has(user.role) && user.role !== "stock") return send(res, 403, { error: "Cost" });
      const line = db.costs.find((c) => c.id === Number(body.id)); if (!line) return send(res, 404, { error: "No line" });
      line.supplier = body.supplier || line.supplier; line.qty = Number(body.qty || 0); line.unit_price = Number(body.unit_price || 0); line.inv = body.inv || "";
      save(db); return send(res, 200, line);
    }
    if (url.pathname === "/api/board") {
      if (!["director", "sales", "accounts"].includes(user.role)) return send(res, 403, { error: "Board" });
      const today = new Date().toISOString().slice(0, 10);
      return send(res, 200, db.quotes.map((r) => Object.assign({}, r, { late: r.due_on < today && !r.result, reason: r.due_on < today && !r.result ? "No log by the end of the due day." : "" })));
    }
    const task = url.pathname.match(/^\/api\/tasks\/(\d+)$/);
    if (task && req.method === "POST") {
      if (!["workshop", "director", "stock"].includes(user.role)) return send(res, 403, { error: "Workshop" });
      const t = db.tasks.find((x) => x.id === Number(task[1])); if (!t) return send(res, 404, { error: "No task" });
      t.done = t.done ? 0 : 1;
      db.logs.push({ id: nid(db.logs), unit_id: t.unit_id, person: user.name, line: (t.done ? "Closed " : "Reopened ") + t.name, created_at: now() });
      save(db); return send(res, 200, t);
    }
    if (url.pathname === "/api/draft/sentence") return send(res, 200, { draft: ("1 x Used " + (body.year || "") + " " + (body.make || "") + " " + (body.description || "")).replace(/\s+/g, " ").trim() });
    if (url.pathname === "/api/draft/booking") {
      const words = String(body.words || "");
      return send(res, 200, { qty: Number((words.match(/\d+/) || [1])[0]), item: words.replace(/\d+/g, "").replace(/\b(please|need|book|x)\b/ig, "").replace(/\s+/g, " ").trim() || "Work" });
    }
    if (url.pathname === "/api/draft/share") {
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      if (!unit || !unit.cleared) return send(res, 400, { error: "Clear first" });
      return send(res, 200, { draft: unit.year + " " + unit.make + " " + unit.description + ". " + unit.sentence + " Price off." });
    }
    return send(res, 404, { error: "No route" });
  }
  let file = path.join(PUBLIC, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname));
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(PUBLIC, "index.html");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg" };
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(PORT, () => console.log("Status Track on " + PORT));
