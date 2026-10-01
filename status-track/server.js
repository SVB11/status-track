const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "status-track.json");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const publicDir = path.join(__dirname, "public");

function load() {
  if (!fs.existsSync(DB_PATH)) return { users: [], sessions: [], units: [], quotes: [], bookings: [], orders: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function save(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db)); }
function nextId(rows) { return rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1; }
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
let db = load();
if (!db.users.length) {
  [["Sebastian van Biljon", "BVB", "director"], ["Siegfried van Biljon", "SVB", "director"], ["Cindy", "", "accounts"], ["Chantelle", "", "stock"], ["Fanie van Biljon", "FVB", "sales"], ["Stanley Johnson", "SJ", "sales"], ["Jean", "", "workshop"], ["Louis", "", "workshop"], ["Damian", "", "marketing"]].forEach(([name, code, role]) => db.users.push({ id: nextId(db.users), name, code, role }));
  db.units.push({ id: 1, ws: "WS9001", kind: "WS", year: 2023, make: "GRW", model: "TRI-AXLE", description: "50000Lt aluminium fuel tanker", vin: "TESTVIN9001", reg: "TEST9001", price_excl: 1250000, tag: "TANKER", sentence: "1 x Used GRW 50000Lt aluminium tri-axle fuel tanker", seller: "Test seller", cleared: 1, step: "Cleared", photo: "/brand/tanker.jpg", opened_by: "Chantelle", opened_at: "2026-10-01" });
  save(db);
}
const COST = new Set(["director", "accounts"]);
const PRICE = new Set(["director", "accounts", "stock", "sales"]);
function auth(req) {
  db = load();
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const session = db.sessions.find((s) => s.token === token);
  return session && db.users.find((u) => u.id === session.user_id);
}
function hide(user, unit) {
  const copy = { ...unit };
  if (!PRICE.has(user.role)) { delete copy.price_excl; delete copy.sentence; }
  if (user.role === "marketing") { delete copy.price_excl; delete copy.vin; delete copy.reg; }
  return copy;
}
function send(res, code, body) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}
function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => { raw += c; });
    req.on("end", () => resolve(raw ? JSON.parse(raw) : {}));
  });
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    const body = req.method === "POST" ? await readBody(req) : {};
    if (req.method === "POST" && url.pathname === "/api/login") {
      db = load();
      const user = db.users.find((u) => u.name === body.name);
      if (!user || body.password !== "Test1234") return send(res, 401, { error: "Wrong name or password" });
      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      db.sessions.push({ token, user_id: user.id });
      save(db);
      return send(res, 200, { token, user: { name: user.name, code: user.code, role: user.role } });
    }
    const user = auth(req);
    if (!user) return send(res, 401, { error: "Sign in" });
    if (url.pathname === "/api/me") return send(res, 200, { name: user.name, code: user.code, role: user.role, cost: COST.has(user.role), price: PRICE.has(user.role) });
    if (url.pathname === "/api/units" && req.method === "GET") return send(res, 200, [...db.units].reverse().map((u) => hide(user, u)));
    if (url.pathname === "/api/units" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle opens the file" });
      let max = 9004;
      db.units.forEach((r) => { const n = Number(String(r.ws).replace(/\D/g, "")); if (n > max && n < 10000) max = n; });
      const ws = (body.kind || "WS") + (max + 1);
      const photo = body.tag === "TRUCK TRACTOR" ? "/brand/truck.jpg" : body.tag === "TRAILER" ? "/brand/trailer.jpg" : "/brand/tanker.jpg";
      const unit = { id: nextId(db.units), ws, kind: body.kind || "WS", year: body.year, make: body.make, model: body.model, description: body.description, vin: body.vin, reg: body.reg || "", price_excl: body.price_excl, tag: body.tag, sentence: body.sentence, seller: body.seller, cleared: 0, step: "WS opened", photo, opened_by: user.name, opened_at: new Date().toISOString() };
      db.units.push(unit); save(db);
      return send(res, 200, { id: unit.id, ws });
    }
    const clear = url.pathname.match(/^\/api\/units\/(\d+)\/clear$/);
    if (clear && req.method === "POST") {
      if (user.role !== "director") return send(res, 403, { error: "Director only" });
      const unit = db.units.find((u) => u.id === Number(clear[1]));
      if (!unit) return send(res, 404, { error: "No unit" });
      unit.cleared = 1; unit.step = "Cleared"; save(db);
      return send(res, 200, { ok: true });
    }
    const one = url.pathname.match(/^\/api\/units\/(\d+)$/);
    if (one && req.method === "GET") {
      const unit = db.units.find((u) => u.id === Number(one[1]));
      if (!unit) return send(res, 404, { error: "No unit" });
      let orders = db.orders.filter((o) => o.unit_id === unit.id);
      if (!COST.has(user.role) && user.role !== "stock") orders = orders.map((o) => ({ ...o, invoiced_excl: null }));
      return send(res, 200, { unit: hide(user, unit), quotes: db.quotes.filter((q) => q.unit_id === unit.id), bookings: db.bookings.filter((b) => b.unit_id === unit.id), orders });
    }
    if (url.pathname === "/api/quotes" && req.method === "POST") {
      if (!["sales", "director"].includes(user.role)) return send(res, 403, { error: "Sales quote" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      if (!unit || !unit.cleared) return send(res, 400, { error: "Unit must be cleared" });
      if (!body.customer) return send(res, 400, { error: "Customer required" });
      const trade = Number(body.trade_in || 0);
      const excl = Number(unit.price_excl) + 2500 - trade;
      const quote = { id: nextId(db.quotes), number: "C" + (9001 + db.quotes.length), unit_id: unit.id, salesman_id: user.id, customer: body.customer, trade_in: trade, excl, vat: excl * 0.15, total: excl * 1.15, follow_day: 1, due_on: addDays(1), result: "", code: user.code, name: user.name, ws: unit.ws };
      db.quotes.push(quote); unit.step = "Quote"; save(db);
      return send(res, 200, { number: quote.number, due_on: quote.due_on });
    }
    if (url.pathname === "/api/bookings" && req.method === "POST") {
      if (!["workshop", "director"].includes(user.role)) return send(res, 403, { error: "Workshop books" });
      const booking = { id: nextId(db.bookings), unit_id: Number(body.unit_id), person: user.name, item: body.item, qty: body.qty, created_at: new Date().toISOString(), numbered: 0 };
      db.bookings.push(booking); save(db);
      return send(res, 200, { id: booking.id });
    }
    if (url.pathname === "/api/queue") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Stock queue" });
      return send(res, 200, db.bookings.filter((b) => !b.numbered).map((b) => ({ ...b, ws: (db.units.find((u) => u.id === b.unit_id) || {}).ws })));
    }
    if (url.pathname === "/api/orders" && req.method === "POST") {
      if (!["stock", "director"].includes(user.role)) return send(res, 403, { error: "Chantelle numbers" });
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      const n = db.orders.filter((o) => o.unit_id === unit.id).length + 1;
      const order = { id: nextId(db.orders), unit_id: unit.id, booking_id: Number(body.booking_id), order_no: unit.ws + "-" + String(n).padStart(3, "0"), responsible: body.responsible, supplier: body.supplier, qty: body.qty, item: body.item, invoiced_excl: body.invoiced_excl || 0 };
      db.orders.push(order);
      const booking = db.bookings.find((b) => b.id === order.booking_id);
      if (booking) booking.numbered = 1;
      save(db);
      return send(res, 200, { order_no: order.order_no });
    }
    if (url.pathname === "/api/board") {
      if (!["director", "sales", "accounts"].includes(user.role)) return send(res, 403, { error: "Board" });
      const today = new Date().toISOString().slice(0, 10);
      return send(res, 200, db.quotes.map((r) => ({ ...r, late: r.due_on < today && !r.result, reason: r.due_on < today && !r.result ? "No log by the end of the due day. Reassign if it stays red." : "" })));
    }
    if (url.pathname === "/api/draft/sentence") return send(res, 200, { draft: `1 x Used ${body.year || ""} ${body.make || ""} ${body.description || ""}`.replace(/\s+/g, " ").trim() });
    if (url.pathname === "/api/draft/booking") {
      const words = String(body.words || "");
      return send(res, 200, { qty: Number(words.match(/\d+/)?.[0] || 1), item: words.replace(/\d+/g, "").replace(/\b(please|need|book|x)\b/ig, "").replace(/\s+/g, " ").trim() || "Work" });
    }
    if (url.pathname === "/api/draft/share") {
      const unit = db.units.find((u) => u.id === Number(body.unit_id));
      if (!unit || !unit.cleared) return send(res, 400, { error: "Clear the unit before a share draft" });
      return send(res, 200, { draft: `${unit.year} ${unit.make} ${unit.description}. ${unit.sentence} Price off.` });
    }
    return send(res, 404, { error: "No route" });
  }
  let file = path.join(publicDir, url.pathname === "/" ? "index.html" : url.pathname);
  if (!file.startsWith(publicDir) || !fs.existsSync(file)) file = path.join(publicDir, "index.html");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg" };
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(PORT, () => console.log("Status Track on " + PORT));
