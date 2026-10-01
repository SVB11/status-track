const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 8080;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "status-track.json");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

function load() {
  if (!fs.existsSync(DB_PATH)) return { seq: 1, users: [], sessions: [], units: [], quotes: [], bookings: [], orders: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function save(db) { fs.writeFileSync(DB_PATH, JSON.stringify(db)); }
function nextId(rows) { return rows.reduce((m, r) => Math.max(m, r.id || 0), 0) + 1; }
let db = load();

const COST = new Set(["director", "accounts"]);
const PRICE = new Set(["director", "accounts", "stock", "sales"]);

if (!db.users.length) {
  const hash = bcrypt.hashSync("Test1234", 8);
  [["Sebastian van Biljon", "BVB", "director"], ["Siegfried van Biljon", "SVB", "director"], ["Cindy", "", "accounts"], ["Chantelle", "", "stock"], ["Fanie van Biljon", "FVB", "sales"], ["Stanley Johnson", "SJ", "sales"], ["Jean", "", "workshop"], ["Louis", "", "workshop"], ["Damian", "", "marketing"]].forEach(([name, code, role]) => db.users.push({ id: nextId(db.users), name, code, role, password_hash: hash }));
  db.units.push({ id: 1, ws: "WS9001", kind: "WS", year: 2023, make: "GRW", model: "TRI-AXLE", description: "50000Lt aluminium fuel tanker", vin: "TESTVIN9001", reg: "TEST9001", price_excl: 1250000, tag: "TANKER", sentence: "1 x Used GRW 50000Lt aluminium tri-axle fuel tanker", seller: "Test seller", cleared: 1, step: "Cleared", photo: "/brand/tanker.jpg", opened_by: "Chantelle", opened_at: "2026-10-01" });
  save(db);
}

function auth(req, res, next) {
  db = load();
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const session = db.sessions.find((s) => s.token === token);
  const user = session && db.users.find((u) => u.id === session.user_id);
  if (!user) return res.status(401).json({ error: "Sign in" });
  req.user = user;
  next();
}
function hide(user, unit) {
  const copy = { ...unit };
  if (!PRICE.has(user.role)) { delete copy.price_excl; delete copy.sentence; }
  if (user.role === "marketing") { delete copy.price_excl; delete copy.vin; delete copy.reg; }
  return copy;
}
function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function nextWs() {
  let max = 9004;
  db.units.forEach((r) => { const n = Number(String(r.ws).replace(/\D/g, "")); if (n > max && n < 10000) max = n; });
  return max + 1;
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/login", (req, res) => {
  db = load();
  const user = db.users.find((u) => u.name === req.body.name);
  if (!user || !bcrypt.compareSync(req.body.password || "", user.password_hash)) return res.status(401).json({ error: "Wrong name or password" });
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  db.sessions.push({ token, user_id: user.id, created_at: new Date().toISOString() });
  save(db);
  res.json({ token, user: { name: user.name, code: user.code, role: user.role } });
});
app.get("/api/me", auth, (req, res) => res.json({ name: req.user.name, code: req.user.code, role: req.user.role, cost: COST.has(req.user.role), price: PRICE.has(req.user.role) }));
app.get("/api/units", auth, (req, res) => res.json([...db.units].reverse().map((u) => hide(req.user, u))));
app.post("/api/units", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Chantelle opens the file" });
  const ws = (req.body.kind || "WS") + nextWs();
  const photo = req.body.tag === "TRUCK TRACTOR" ? "/brand/truck.jpg" : req.body.tag === "TRAILER" ? "/brand/trailer.jpg" : "/brand/tanker.jpg";
  const unit = { id: nextId(db.units), ws, kind: req.body.kind || "WS", year: req.body.year, make: req.body.make, model: req.body.model, description: req.body.description, vin: req.body.vin, reg: req.body.reg || "", price_excl: req.body.price_excl, tag: req.body.tag, sentence: req.body.sentence, seller: req.body.seller, cleared: 0, step: "WS opened", photo, opened_by: req.user.name, opened_at: new Date().toISOString() };
  db.units.push(unit); save(db);
  res.json({ id: unit.id, ws });
});
app.post("/api/units/:id/clear", auth, (req, res) => {
  if (req.user.role !== "director") return res.status(403).json({ error: "Director only" });
  const unit = db.units.find((u) => u.id === Number(req.params.id));
  if (!unit) return res.status(404).json({ error: "No unit" });
  unit.cleared = 1; unit.step = "Cleared"; save(db);
  res.json({ ok: true });
});
app.get("/api/units/:id", auth, (req, res) => {
  const unit = db.units.find((u) => u.id === Number(req.params.id));
  if (!unit) return res.status(404).json({ error: "No unit" });
  let orders = db.orders.filter((o) => o.unit_id === unit.id);
  if (!COST.has(req.user.role) && req.user.role !== "stock") orders = orders.map((o) => ({ ...o, invoiced_excl: null }));
  res.json({
    unit: hide(req.user, unit),
    quotes: db.quotes.filter((q) => q.unit_id === unit.id),
    bookings: db.bookings.filter((b) => b.unit_id === unit.id),
    orders
  });
});
app.post("/api/quotes", auth, (req, res) => {
  if (req.user.role !== "sales" && req.user.role !== "director") return res.status(403).json({ error: "Sales quote" });
  const unit = db.units.find((u) => u.id === Number(req.body.unit_id));
  if (!unit || !unit.cleared) return res.status(400).json({ error: "Unit must be cleared" });
  if (!req.body.customer) return res.status(400).json({ error: "Customer required" });
  const trade = Number(req.body.trade_in || 0);
  const excl = unit.price_excl + 2500 - trade;
  const quote = { id: nextId(db.quotes), number: "C" + (9001 + db.quotes.length), unit_id: unit.id, salesman_id: req.user.id, customer: req.body.customer, trade_in: trade, excl, vat: excl * 0.15, total: excl * 1.15, follow_day: 1, due_on: addDays(1), result: "", created_at: new Date().toISOString(), code: req.user.code, name: req.user.name, ws: unit.ws };
  db.quotes.push(quote); unit.step = "Quote"; save(db);
  res.json({ number: quote.number, due_on: quote.due_on });
});
app.post("/api/bookings", auth, (req, res) => {
  if (req.user.role !== "workshop" && req.user.role !== "director") return res.status(403).json({ error: "Workshop books" });
  const booking = { id: nextId(db.bookings), unit_id: Number(req.body.unit_id), person: req.user.name, item: req.body.item, qty: req.body.qty, created_at: new Date().toISOString(), numbered: 0 };
  db.bookings.push(booking); save(db);
  res.json({ id: booking.id });
});
app.get("/api/queue", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Stock queue" });
  res.json(db.bookings.filter((b) => !b.numbered).map((b) => ({ ...b, ws: (db.units.find((u) => u.id === b.unit_id) || {}).ws })));
});
app.post("/api/orders", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Chantelle numbers" });
  const unit = db.units.find((u) => u.id === Number(req.body.unit_id));
  const n = db.orders.filter((o) => o.unit_id === unit.id).length + 1;
  const order = { id: nextId(db.orders), unit_id: unit.id, booking_id: Number(req.body.booking_id), order_no: unit.ws + "-" + String(n).padStart(3, "0"), responsible: req.body.responsible, supplier: req.body.supplier, qty: req.body.qty, item: req.body.item, invoiced_excl: req.body.invoiced_excl || 0, created_at: new Date().toISOString() };
  db.orders.push(order);
  const booking = db.bookings.find((b) => b.id === order.booking_id);
  if (booking) booking.numbered = 1;
  save(db);
  res.json({ order_no: order.order_no });
});
app.get("/api/board", auth, (req, res) => {
  if (!["director", "sales", "accounts"].includes(req.user.role)) return res.status(403).json({ error: "Board" });
  const today = new Date().toISOString().slice(0, 10);
  res.json(db.quotes.map((r) => ({ ...r, late: r.due_on < today && !r.result, reason: r.due_on < today && !r.result ? "No log by the end of the due day. Reassign if it stays red." : "" })));
});
app.post("/api/draft/sentence", auth, (req, res) => {
  if (!["stock", "director"].includes(req.user.role)) return res.status(403).json({ error: "Stock draft" });
  res.json({ draft: `1 x Used ${req.body.year || ""} ${req.body.make || ""} ${req.body.description || ""}`.replace(/\s+/g, " ").trim() });
});
app.post("/api/draft/booking", auth, (req, res) => {
  if (!["workshop", "director"].includes(req.user.role)) return res.status(403).json({ error: "Workshop draft" });
  const words = String(req.body.words || "");
  res.json({ qty: Number(words.match(/\d+/)?.[0] || 1), item: words.replace(/\d+/g, "").replace(/\b(please|need|book|x)\b/ig, "").replace(/\s+/g, " ").trim() || "Work" });
});
app.post("/api/draft/share", auth, (req, res) => {
  if (!["marketing", "sales", "director"].includes(req.user.role)) return res.status(403).json({ error: "Share draft" });
  const unit = db.units.find((u) => u.id === Number(req.body.unit_id));
  if (!unit || !unit.cleared) return res.status(400).json({ error: "Clear the unit before a share draft" });
  res.json({ draft: `${unit.year} ${unit.make} ${unit.description}. ${unit.sentence} Price off.` });
});
app.listen(PORT, () => console.log("Status Track on " + PORT));
