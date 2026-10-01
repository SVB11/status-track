const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const PORT = process.env.PORT || 8080;
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, "data", "status-track.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.exec(`
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, code TEXT, role TEXT, password_hash TEXT);
CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER, created_at TEXT);
CREATE TABLE IF NOT EXISTS units (
  id INTEGER PRIMARY KEY, ws TEXT UNIQUE, kind TEXT, year INTEGER, make TEXT, model TEXT, description TEXT,
  vin TEXT, reg TEXT, price_excl REAL, tag TEXT, sentence TEXT, seller TEXT, cleared INTEGER DEFAULT 0,
  step TEXT, photo TEXT, opened_by TEXT, opened_at TEXT
);
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY, number TEXT, unit_id INTEGER, salesman_id INTEGER, customer TEXT,
  trade_in REAL, excl REAL, vat REAL, total REAL, follow_day INTEGER, due_on TEXT, result TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY, unit_id INTEGER, person TEXT, item TEXT, qty REAL, created_at TEXT, numbered INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY, unit_id INTEGER, booking_id INTEGER, order_no TEXT, responsible TEXT,
  supplier TEXT, qty REAL, item TEXT, invoiced_excl REAL, created_at TEXT
);
`);

const COST = new Set(["director", "accounts"]);
const PRICE = new Set(["director", "accounts", "stock", "sales"]);

function seed() {
  if (db.prepare("SELECT COUNT(*) n FROM users").get().n) return;
  const hash = bcrypt.hashSync("Test1234", 8);
  const add = db.prepare("INSERT INTO users (name, code, role, password_hash) VALUES (?, ?, ?, ?)");
  [["Sebastian van Biljon", "BVB", "director"], ["Siegfried van Biljon", "SVB", "director"], ["Cindy", "", "accounts"], ["Chantelle", "", "stock"], ["Fanie van Biljon", "FVB", "sales"], ["Stanley Johnson", "SJ", "sales"], ["Jean", "", "workshop"], ["Louis", "", "workshop"], ["Damian", "", "marketing"]].forEach((r) => add.run(...r, hash));
  db.prepare(`INSERT INTO units (ws, kind, year, make, model, description, vin, reg, price_excl, tag, sentence, seller, cleared, step, photo, opened_by, opened_at)
    VALUES ('WS9001', 'WS', 2023, 'GRW', 'TRI-AXLE', '50000Lt aluminium fuel tanker', 'TESTVIN9001', 'TEST9001', 1250000, 'TANKER', '1 x Used GRW 50000Lt aluminium tri-axle fuel tanker', 'Test seller', 1, 'Cleared', '/brand/tanker.jpg', 'Chantelle', '2026-10-01')`).run();
}
seed();

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  const user = db.prepare("SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?").get(token);
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
function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function nextWs() {
  const rows = db.prepare("SELECT ws FROM units").all();
  let max = 9004;
  rows.forEach((r) => { const n = Number(String(r.ws).replace(/\D/g, "")); if (n > max && n < 10000) max = n; });
  return max + 1;
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/login", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE name = ?").get(req.body.name);
  if (!user || !bcrypt.compareSync(req.body.password || "", user.password_hash)) return res.status(401).json({ error: "Wrong name or password" });
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  db.prepare("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)").run(token, user.id, new Date().toISOString());
  res.json({ token, user: { name: user.name, code: user.code, role: user.role } });
});
app.get("/api/me", auth, (req, res) => res.json({ name: req.user.name, code: req.user.code, role: req.user.role, cost: COST.has(req.user.role), price: PRICE.has(req.user.role) }));
app.get("/api/users", auth, (req, res) => res.json(db.prepare("SELECT id, name, code, role FROM users ORDER BY name").all()));
app.get("/api/units", auth, (req, res) => res.json(db.prepare("SELECT * FROM units ORDER BY id DESC").all().map((u) => hide(req.user, u))));
app.post("/api/units", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Chantelle opens the file" });
  const n = nextWs();
  const ws = (req.body.kind || "WS") + n;
  const photo = req.body.tag === "TRUCK TRACTOR" ? "/brand/truck.jpg" : req.body.tag === "TRAILER" ? "/brand/trailer.jpg" : "/brand/tanker.jpg";
  const info = db.prepare(`INSERT INTO units (ws, kind, year, make, model, description, vin, reg, price_excl, tag, sentence, seller, cleared, step, photo, opened_by, opened_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'WS opened', ?, ?, ?)`).run(ws, req.body.kind || "WS", req.body.year, req.body.make, req.body.model, req.body.description, req.body.vin, req.body.reg || "", req.body.price_excl, req.body.tag, req.body.sentence, req.body.seller, photo, req.user.name, new Date().toISOString());
  res.json({ id: info.lastInsertRowid, ws });
});
app.post("/api/units/:id/clear", auth, (req, res) => {
  if (req.user.role !== "director") return res.status(403).json({ error: "Director only" });
  db.prepare("UPDATE units SET cleared = 1, step = 'Cleared' WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});
app.get("/api/units/:id", auth, (req, res) => {
  const unit = db.prepare("SELECT * FROM units WHERE id = ?").get(req.params.id);
  if (!unit) return res.status(404).json({ error: "No unit" });
  const payload = {
    unit: hide(req.user, unit),
    quotes: db.prepare("SELECT q.*, u.name, u.code FROM quotes q JOIN users u ON u.id = q.salesman_id WHERE q.unit_id = ?").all(unit.id),
    bookings: db.prepare("SELECT * FROM bookings WHERE unit_id = ?").all(unit.id),
    orders: db.prepare("SELECT * FROM orders WHERE unit_id = ?").all(unit.id)
  };
  if (!COST.has(req.user.role) && req.user.role !== "stock") payload.orders = payload.orders.map((o) => ({ ...o, invoiced_excl: null }));
  res.json(payload);
});
app.post("/api/quotes", auth, (req, res) => {
  if (req.user.role !== "sales" && req.user.role !== "director") return res.status(403).json({ error: "Sales quote" });
  const unit = db.prepare("SELECT * FROM units WHERE id = ?").get(req.body.unit_id);
  if (!unit || !unit.cleared) return res.status(400).json({ error: "Unit must be cleared" });
  if (!req.body.customer) return res.status(400).json({ error: "Customer required" });
  const trade = Number(req.body.trade_in || 0);
  const excl = unit.price_excl + 2500 - trade;
  const vat = excl * 0.15;
  const number = "C" + (9001 + db.prepare("SELECT COUNT(*) n FROM quotes").get().n);
  db.prepare(`INSERT INTO quotes (number, unit_id, salesman_id, customer, trade_in, excl, vat, total, follow_day, due_on, result, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, '', ?)`).run(number, unit.id, req.user.id, req.body.customer, trade, excl, vat, excl + vat, addDays(1), new Date().toISOString());
  db.prepare("UPDATE units SET step = 'Quote' WHERE id = ?").run(unit.id);
  res.json({ number, due_on: addDays(1) });
});
app.post("/api/quotes/:id/log", auth, (req, res) => {
  const q = db.prepare("SELECT * FROM quotes WHERE id = ?").get(req.params.id);
  if (!q) return res.status(404).json({ error: "No quote" });
  if (req.user.role !== "director" && q.salesman_id !== req.user.id) return res.status(403).json({ error: "Your quote" });
  const next = q.follow_day === 1 ? 3 : q.follow_day === 3 ? 7 : 14;
  db.prepare("UPDATE quotes SET result = ?, follow_day = ?, due_on = ? WHERE id = ?").run(req.body.result || "Logged", next, addDays(next), q.id);
  res.json({ due_on: addDays(next), follow_day: next });
});
app.post("/api/bookings", auth, (req, res) => {
  if (req.user.role !== "workshop" && req.user.role !== "director") return res.status(403).json({ error: "Workshop books" });
  const info = db.prepare("INSERT INTO bookings (unit_id, person, item, qty, created_at, numbered) VALUES (?, ?, ?, ?, ?, 0)").run(req.body.unit_id, req.user.name, req.body.item, req.body.qty, new Date().toISOString());
  res.json({ id: info.lastInsertRowid });
});
app.get("/api/queue", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Stock queue" });
  res.json(db.prepare("SELECT b.*, u.ws FROM bookings b JOIN units u ON u.id = b.unit_id WHERE b.numbered = 0").all());
});
app.post("/api/orders", auth, (req, res) => {
  if (req.user.role !== "stock" && req.user.role !== "director") return res.status(403).json({ error: "Chantelle numbers" });
  const unit = db.prepare("SELECT * FROM units WHERE id = ?").get(req.body.unit_id);
  const n = db.prepare("SELECT COUNT(*) n FROM orders WHERE unit_id = ?").get(unit.id).n + 1;
  const orderNo = unit.ws + "-" + String(n).padStart(3, "0");
  db.prepare(`INSERT INTO orders (unit_id, booking_id, order_no, responsible, supplier, qty, item, invoiced_excl, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(unit.id, req.body.booking_id, orderNo, req.body.responsible, req.body.supplier, req.body.qty, req.body.item, req.body.invoiced_excl || 0, new Date().toISOString());
  if (req.body.booking_id) db.prepare("UPDATE bookings SET numbered = 1 WHERE id = ?").run(req.body.booking_id);
  res.json({ order_no: orderNo });
});
app.get("/api/board", auth, (req, res) => {
  if (!["director", "sales", "accounts"].includes(req.user.role)) return res.status(403).json({ error: "Board" });
  const today = new Date().toISOString().slice(0, 10);
  res.json(db.prepare(`SELECT q.*, u.name, u.code, un.ws FROM quotes q JOIN users u ON u.id = q.salesman_id JOIN units un ON un.id = q.unit_id`).all().map((r) => ({
    ...r,
    late: r.due_on < today && !r.result,
    reason: r.due_on < today && !r.result ? "No log by the end of the due day. Reassign if it stays red." : ""
  })));
});
app.post("/api/draft/sentence", auth, (req, res) => {
  if (!["stock", "director"].includes(req.user.role)) return res.status(403).json({ error: "Stock draft" });
  const year = req.body.year || "";
  const make = req.body.make || "";
  const desc = req.body.description || "";
  res.json({ draft: `1 x Used ${year} ${make} ${desc}`.replace(/\s+/g, " ").trim(), note: "Draft only. A director must clear it." });
});
app.post("/api/draft/booking", auth, (req, res) => {
  if (!["workshop", "director"].includes(req.user.role)) return res.status(403).json({ error: "Workshop draft" });
  const words = String(req.body.words || "");
  const qty = Number(words.match(/\d+/)?.[0] || 1);
  const item = words.replace(/\d+/g, "").replace(/\b(please|need|book|x)\b/ig, "").replace(/\s+/g, " ").trim() || "Work";
  res.json({ qty, item, note: "Draft only. Stamp it to keep your name and the time." });
});
app.post("/api/draft/log", auth, (req, res) => {
  if (!["sales", "director"].includes(req.user.role)) return res.status(403).json({ error: "Sales draft" });
  res.json({ who: req.user.code || req.user.name, result: String(req.body.words || "").trim(), note: "The system sets the next day. This draft does not." });
});
app.post("/api/draft/share", auth, (req, res) => {
  if (!["marketing", "sales", "director"].includes(req.user.role)) return res.status(403).json({ error: "Share draft" });
  const unit = db.prepare("SELECT * FROM units WHERE id = ?").get(req.body.unit_id);
  if (!unit || !unit.cleared) return res.status(400).json({ error: "Clear the unit before a share draft" });
  res.json({ draft: `${unit.year} ${unit.make} ${unit.description}. ${unit.sentence} Price off.`, note: "Draft only. Price is not on this text." });
});
app.listen(PORT, () => console.log("Status Track on " + PORT));
