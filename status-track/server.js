const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "status-track.json");
const PUBLIC = path.join(__dirname, "public");
const SEED = path.join(__dirname, "seed", "restore.json");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const COST = new Set(["director", "accounts"]);
const PRICE = new Set(["director", "accounts", "stock", "sales"]);
const COST_LINES = ["Acid Wash","Air Suzi","Courier","Dealer stock","Electrical Suzi","Jack / W / Spanner / Triangle","Labour","Natis","Permit","RWC","Sundries","Valet","Weighbridge"];
function empty() { return { users:[], sessions:[], units:[], tasks:[], logs:[], pdi:[], orders:[], costs:[], quotes:[], invoices:[], thirds:[] }; }
function load() { return fs.existsSync(DB_PATH) ? Object.assign(empty(), JSON.parse(fs.readFileSync(DB_PATH, "utf8"))) : empty(); }
function save(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db)); }
function nid(rows) { return rows.reduce((m, r) => Math.max(m, Number(r.id) || 0), 0) + 1; }
function now() { return new Date().toISOString(); }
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function photoFor(type) { const t = String(type || "").toLowerCase(); if (t.includes("trailer") || t.includes("taut")) return "/brand/trailer.jpg"; if (t.includes("truck") || t.includes("horse")) return "/brand/truck.jpg"; return "/brand/tanker.jpg"; }
function cleanWs(raw) { return String(raw || "").replace(/\s+/g, "").toUpperCase() || "WS"; }
let db = load();
if (!db.users.length) {
  [["Sebastian van Biljon","BVB","director"],["Siegfried van Biljon","SVB","director"],["Drickus van Biljon","DVB","sales"],["Cindy","","accounts"],["Chantelle","","stock"],["Fanie van Biljon","FVB","sales"],["Stanley Johnson","SJ","sales"],["Jean-Pierre De Fillet","","workshop"],["Louis Koekemoer","","workshop"],["Tiaan Van Wyk","","workshop"],["Damian","","marketing"],["Andre","","admin"]].forEach(([name, code, role]) => db.users.push({ id: nid(db.users), name, code, role }));
  if (fs.existsSync(SEED)) {
    const seed = JSON.parse(fs.readFileSync(SEED, "utf8"));
    (seed.third_party_companies || []).forEach((t) => db.thirds.push({ id: nid(db.thirds), category: t.category, name: t.name }));
    (seed.jobs || []).forEach((job) => {
      const unit = { id: nid(db.units), ws: cleanWs(job.stock_number), job_number: job.job_number, year: job.year, make: job.vehicle_description, model: job.sub_type, description: [job.vehicle_description, job.sub_type].filter(Boolean).join(" "), tag: job.main_type, vin: job.vin_number, reg: job.registration_number, client: job.client_name, salesman: job.salesman_name, quote_no: job.quotation_invoice_number, priority: job.priority, due: job.target_delivery_date, location: job.current_location, status: job.status, instructions: job.other_instructions, seller: "", price_excl: 0, buy_excl: 0, invoice_no: "", invoice_status: "None", sentence: "1 x Used " + job.year + " " + job.vehicle_description + " " + (job.sub_type || ""), photo: photoFor(job.main_type), cleared: 1, step: job.status, copy: true };
      db.units.push(unit);
      (job.tasks || []).forEach((t) => db.tasks.push({ id: nid(db.tasks), unit_id: unit.id, job: "B", name: t.task_name, status: t.status, notes: t.notes, location: t.task_location, provider: t.third_party_provider, booked_date: t.booked_date, custom: !!t.is_custom }));
      (job.pdi || []).forEach((p) => db.pdi.push({ id: nid(db.pdi), unit_id: unit.id, section: p.section, item: p.check_item, status: p.status }));
      (job.updates || []).forEach((u) => db.logs.push({ id: nid(db.logs), unit_id: unit.id, person: u.created_by_name, line: u.description, created_at: u.created_at }));
      COST_LINES.forEach((name) => db.costs.push({ id: nid(db.costs), unit_id: unit.id, name, supplier: "", qty: 0, unit_price: 0, inv: "" }));
    });
  }
  save(db);
}
function hide(user, unit) { const copy = Object.assign({}, unit); if (!PRICE.has(user.role)) delete copy.price_excl; if (!COST.has(user.role)) delete copy.buy_excl; if (user.role === "workshop") { delete copy.price_excl; delete copy.buy_excl; delete copy.sentence; } return copy; }
function actor(req) { db = load(); const token = String(req.headers.authorization || "").replace("Bearer ", ""); const session = db.sessions.find((s) => s.token === token); return session && db.users.find((u) => u.id === session.user_id); }
function send(res, code, body) { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(body)); }
function bodyOf(req) { return new Promise((resolve) => { let raw = ""; req.on("data", (c) => raw += c); req.on("end", () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); } }); }); }
function nextWs() { let max = 9004; db.units.forEach((u) => { const n = Number(String(u.ws).replace(/\D/g, "")); if (n > max && n < 10000) max = n; }); return "WS" + (max + 1); }
function pack(user, unit) {
  let costs = db.costs.filter((c) => c.unit_id === unit.id);
  let orders = db.orders.filter((o) => o.unit_id === unit.id);
  if (!COST.has(user.role) && user.role !== "stock") { costs = []; orders = orders.map((o) => Object.assign({}, o, { invoiced_excl: null })); }
  return { unit: hide(user, unit), tasks: db.tasks.filter((t) => t.unit_id === unit.id), logs: db.logs.filter((l) => l.unit_id === unit.id), pdi: db.pdi.filter((p) => p.unit_id === unit.id), orders, costs, quotes: db.quotes.filter((q) => q.unit_id === unit.id), invoices: COST.has(user.role) || PRICE.has(user.role) ? db.invoices.filter((i) => i.unit_id === unit.id) : [] };
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    const body = req.method === "POST" ? await bodyOf(req) : {};
    if (req.method === "POST" && url.pathname === "/api/login") {
      db = load(); const user = db.users.find((u) => u.name === body.name);
      if (!user || body.password !== "Test1234") return send(res, 401, { error: "Wrong name or password" });
      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      db.sessions.push({ token, user_id: user.id, created_at: now() }); save(db); return send(res, 200, { token });
    }
    const user = actor(req); if (!user) return send(res, 401, { error: "Sign in" });
    if (url.pathname === "/api/me") return send(res, 200, { name: user.name, code: user.code, role: user.role, cost: COST.has(user.role), price: PRICE.has(user.role) });
    if (url.pathname === "/api/units" && req.method === "GET") return send(res, 200, db.units.map((u) => hide(user, u)));
    if (url.pathname === "/api/units" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle opens the file" });
      const unit = { id: nid(db.units), ws: nextWs(), kind: body.kind || "WS", year: body.year, make: body.make, model: body.model, description: body.description, tag: body.tag, vin: body.vin, reg: "", client: "", salesman: "", seller: body.seller, quote_no: "", price_excl: Number(body.price_excl || 0), buy_excl: Number(body.buy_excl || 0), invoice_no: "", invoice_status: "None", sentence: body.sentence, location: "Yard", status: "WS opened", photo: photoFor(body.tag), cleared: 0, step: "WS opened" };
      db.units.push(unit);
      ["Valet", "Lights", "Roadworthy", "Spray", "PDI"].forEach((name) => db.tasks.push({ id: nid(db.tasks), unit_id: unit.id, job: "A", name, status: "Not Started", notes: "", location: "Yard" }));
      COST_LINES.forEach((name) => db.costs.push({ id: nid(db.costs), unit_id: unit.id, name, supplier: "", qty: 0, unit_price: 0, inv: "" }));
      save(db); return send(res, 200, { id: unit.id, ws: unit.ws });
    }
    const one = url.pathname.match(/^\/api\/units\/(\d+)$/);
    if (one && req.method === "GET") { const unit = db.units.find((u) => u.id === Number(one[1])); if (!unit) return send(res, 404, { error: "No unit" }); return send(res, 200, pack(user, unit)); }
    if (one && req.method === "POST") {
      if (!["stock", "director", "accounts"].includes(user.role)) return send(res, 403, { error: "Worksheet" });
      const unit = db.units.find((u) => u.id === Number(one[1])); if (!unit) return send(res, 404, { error: "No unit" });
      ["year", "make", "model", "description", "vin", "sentence", "seller", "tag", "client"].forEach((k) => { if (body[k] != null) unit[k] = body[k]; });
      if (PRICE.has(user.role) && body.price_excl != null) unit.price_excl = Number(body.price_excl);
      if (COST.has(user.role) && body.buy_excl != null) unit.buy_excl = Number(body.buy_excl);
      save(db); return send(res, 200, hide(user, unit));
    }
    const clear = url.pathname.match(/^\/api\/units\/(\d+)\/clear$/);
    if (clear && req.method === "POST") { if (user.role !== "director") return send(res, 403, { error: "Director only" }); const unit = db.units.find((u) => u.id === Number(clear[1])); unit.cleared = 1; unit.step = "Cleared"; save(db); return send(res, 200, { ok: true }); }
    if (url.pathname === "/api/tasks" && req.method === "POST") {
      if (!["workshop", "director", "stock"].includes(user.role)) return send(res, 403, { error: "Workshop" });
      const task = db.tasks.find((t) => t.id === Number(body.id)); if (!task) return send(res, 404, { error: "No task" });
      if (body.status) task.status = body.status;
      if (body.notes) task.notes = (task.notes ? task.notes + " | " : "") + now().slice(0, 16).replace("T", " ") + " " + user.name + ": " + body.notes;
      db.logs.push({ id: nid(db.logs), unit_id: task.unit_id, person: user.name, line: task.name + " " + (body.status || "note"), created_at: now() });
      save(db); return send(res, 200, task);
    }
    if (url.pathname === "/api/tasks/add" && req.method === "POST") {
      const task = { id: nid(db.tasks), unit_id: Number(body.unit_id), job: "B", name: body.name, status: "Not Started", notes: "", location: body.location || "Yard", custom: true };
      db.tasks.push(task); db.logs.push({ id: nid(db.logs), unit_id: task.unit_id, person: user.name, line: "Added " + task.name, created_at: now() }); save(db); return send(res, 200, task);
    }
    if (url.pathname === "/api/quotes" && req.method === "POST") {
      if (!["sales", "director", "stock"].includes(user.role)) return send(res, 403, { error: "Quote" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id)); if (!unit) return send(res, 404, { error: "No unit" });
      const trade = Number(body.trade_in || 0), fee = 2500, ask = Number(body.ask_excl || unit.price_excl || 0), excl = ask + fee - trade;
      const quote = { id: nid(db.quotes), number: "C" + (20920 + db.quotes.length), unit_id: unit.id, customer: body.customer, phone: body.phone || "", code: user.code || user.name, item: unit.ws + " " + unit.year + " " + unit.description, sentence: body.sentence || unit.sentence, fee, trade_in: trade, excl, vat: excl * 0.15, total: excl * 1.15, follow_day: 1, due_on: addDays(1), result: "", created_at: now() };
      db.quotes.push(quote); unit.client = body.customer; unit.salesman = user.name; unit.quote_no = quote.number; unit.price_excl = ask; unit.step = "Quoted"; save(db); return send(res, 200, quote);
    }
    const qlog = url.pathname.match(/^\/api\/quotes\/(\d+)\/log$/);
    if (qlog && req.method === "POST") { const q = db.quotes.find((x) => x.id === Number(qlog[1])); const next = q.follow_day === 1 ? 3 : q.follow_day === 3 ? 7 : 14; q.result = body.result; q.follow_day = next; q.due_on = addDays(next); save(db); return send(res, 200, q); }
    if (url.pathname === "/api/invoices" && req.method === "POST") {
      if (!["sales", "director", "accounts"].includes(user.role)) return send(res, 403, { error: "Invoice" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      const q = db.quotes.filter((x) => x.unit_id === unit.id).slice(-1)[0];
      const excl = q ? q.excl : Number(unit.price_excl || 0);
      const inv = { id: nid(db.invoices), unit_id: unit.id, number: "INV-" + (8600 + db.invoices.length), customer: body.customer || unit.client, salesman: user.name, excl, vat: excl * 0.15, total: excl * 1.15, status: "Requested", created_at: now() };
      db.invoices.push(inv); unit.invoice_no = inv.number; unit.invoice_status = "Requested"; unit.client = inv.customer; save(db); return send(res, 200, inv);
    }
    if (url.pathname === "/api/orders" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle numbers" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      const n = db.orders.filter((o) => o.unit_id === unit.id).length + 1;
      const order = { id: nid(db.orders), unit_id: unit.id, order_no: unit.ws + "-" + String(n).padStart(3, "0"), responsible: body.responsible, supplier: body.supplier, qty: Number(body.qty || 1), item: body.item, invoiced_excl: Number(body.invoiced_excl || 0), created_at: now() };
      db.orders.push(order); db.costs.push({ id: nid(db.costs), unit_id: unit.id, name: order.item, supplier: order.supplier, qty: order.qty, unit_price: order.qty ? order.invoiced_excl / order.qty : 0, inv: "" });
      db.logs.push({ id: nid(db.logs), unit_id: unit.id, person: user.name, line: order.order_no + " marked " + order.responsible, created_at: now() });
      save(db); return send(res, 200, order);
    }
    if (url.pathname === "/api/photos" && req.method === "POST") {
      if (!["marketing", "director", "stock"].includes(user.role)) return send(res, 403, { error: "Damian loads pictures" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id)); if (!unit) return send(res, 404, { error: "No unit" });
      const raw = String(body.image || "");
      const m = raw.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!m) return send(res, 400, { error: "Picture required" });
      const ext = m[1].includes("png") ? "png" : "jpg";
      const dir = path.join(path.dirname(DB_PATH), "photos");
      fs.mkdirSync(dir, { recursive: true });
      const name = unit.ws + "-" + Date.now() + "." + ext;
      fs.writeFileSync(path.join(dir, name), Buffer.from(m[2], "base64"));
      unit.photos = unit.photos || [];
      unit.photos.push("/photos/" + name);
      unit.photo = "/photos/" + name;
      db.logs.push({ id: nid(db.logs), unit_id: unit.id, person: user.name, line: "Picture loaded", created_at: now() });
      save(db); return send(res, 200, { photo: unit.photo, photos: unit.photos });
    }
    if (url.pathname === "/api/board") {
      const today = new Date().toISOString().slice(0, 10);
      return send(res, 200, db.quotes.map((q) => Object.assign({}, q, { late: q.due_on < today && !q.result, ws: (db.units.find((u) => u.id === q.unit_id) || {}).ws })));
    }
    return send(res, 404, { error: "No route" });
  }
  if (url.pathname.startsWith("/photos/")) {
    const photo = path.join(path.dirname(DB_PATH), "photos", path.basename(url.pathname));
    if (!fs.existsSync(photo)) { res.writeHead(404); return res.end("No picture"); }
    res.writeHead(200, { "Content-Type": photo.endsWith(".png") ? "image/png" : "image/jpeg" });
    return fs.createReadStream(photo).pipe(res);
  }
  let file = path.join(PUBLIC, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname));
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(PUBLIC, "index.html");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg" };
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(PORT, () => console.log("Status Track on " + PORT));
