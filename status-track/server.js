import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import {
  addLog,
  addTask,
  approveJobA,
  clearDiscount,
  clearOffer,
  issueOrder,
  issueQuote,
  loadCard,
  logQuote,
  markInvoice,
  openJob,
  openJobA,
  requestInvoice,
  saveOffer,
  setCost,
  setStatus,
  setTask,
  staffByName,
  submitQuote,
  view,
} from "./src/server/yard-book.ts";
import {
  TYPES,
  acceptCard,
  addExtra,
  addPart,
  approveExtra,
  approveShowroom,
  bookWash,
  confirmMorning,
  createCard,
  deliver,
  listCards,
  lockPart,
  markReady,
  signPdi,
  stampTask,
} from "./src/server/job-cards.ts";

const root = process.cwd();
const publicDir = join(root, ".output", "public");
const home = readFileSync(join(root, "server", "home.html"));
const types = {
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".html": "text/html; charset=utf-8",
};
const people = new Set(["Sebastian van Biljon", "Siegfried van Biljon", "Cindy", "Chantelle", "Fanie van Biljon", "Stanley Johnson", "Drickus van Biljon", "Calvin Kempenaar", "Rob Ling", "Jean-Pierre De Fillet", "Louis Koekemoer", "Tiaan Van Wyk", "Damian", "Andre", "Tanita van Biljon", "William"]);

function send(res, code, body, type = "application/json") {
  res.writeHead(code, { "content-type": type, "cache-control": "no-store" });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString() || "{}")); }
      catch { resolve({}); }
    });
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  try {
    if (req.method === "POST" && url.pathname === "/api/yard") {
      const body = await readBody(req);
      const name = String(body.name || "");
      const person = staffByName(name);
      if (!person || body.password !== "Test1234") return send(res, 401, JSON.stringify({ error: "Wrong name or password" }));
      const action = String(body.action || "list");
      if (action === "load") loadCard(name, String(body.ws || ""));
      else if (action === "quote") submitQuote(name, { ws: String(body.ws || ""), customer: String(body.customer || ""), phone: String(body.phone || ""), address: String(body.address || ""), email: String(body.email || ""), vatNo: String(body.vatNo || ""), tradeIn: Number(body.tradeIn || 0), extra: String(body.extra || ""), extraRate: Number(body.extraRate || 0), discount: Number(body.discount || 0), crossBorder: body.crossBorder === "1" || body.crossBorder === 1 });
      else if (action === "issue") issueQuote(name, String(body.ws || ""));
      else if (action === "clear-discount") clearDiscount(name, String(body.ws || ""));
      else if (action === "offer") saveOffer(name, { ws: String(body.ws || ""), selling: Number(body.selling || 0), profit: Number(body.profit || 0), estimated: Number(body.estimated || 0) });
      else if (action === "clear-offer") clearOffer(name, String(body.ws || ""));
      else if (action === "job-a") openJobA(name, String(body.ws || ""));
      else if (action === "approve-a") approveJobA(name, String(body.ws || ""));
      else if (action === "board") logQuote(name, Number(body.id), String(body.result || ""));
      else if (action === "invoice") requestInvoice(name, String(body.ws || ""), String(body.customer || ""));
      else if (action === "invoice-done") markInvoice(name, String(body.id || ""));
      else if (action === "job") openJob(name, { ws: String(body.ws || ""), quoteNo: String(body.quoteNo || ""), client: String(body.client || ""), vin: String(body.vin || ""), reg: String(body.reg || ""), priority: String(body.priority || "Normal"), due: String(body.due || ""), instruction: String(body.instruction || "") });
      else if (action === "status") setStatus(name, String(body.ws || ""), String(body.status || ""));
      else if (action === "task") setTask(name, Number(body.id), String(body.status || ""), String(body.note || ""));
      else if (action === "add-task") addTask(name, String(body.ws || ""), String(body.task || ""));
      else if (action === "log") addLog(name, String(body.ws || ""), String(body.line || ""));
      else if (action === "order") issueOrder(name, { ws: String(body.ws || ""), responsible: String(body.responsible || ""), supplier: String(body.supplier || ""), qty: Number(body.qty || 1), item: String(body.item || ""), quotedExcl: Number(body.quotedExcl || 0), notes: String(body.notes || "") });
      else if (action === "cost") setCost(name, Number(body.id), { supplier: String(body.supplier || ""), description: String(body.description || ""), unitPrice: Number(body.unitPrice || 0), qty: Number(body.qty || 0), inv: String(body.inv || "") });
      return send(res, 200, JSON.stringify(view(person.role, name)));
    }
    if (req.method === "POST" && url.pathname === "/api/job-card") {
      const body = await readBody(req);
      const name = String(body.name || "");
      if (!people.has(name) || body.password !== "Test1234") return send(res, 401, JSON.stringify({ error: "Not signed in" }));
      const action = String(body.action || "list");
      if (action === "create") createCard(name, { kind: body.kind === "showroom" ? "showroom" : "sold", ws: String(body.ws || ""), make: String(body.make || ""), year: String(body.year || ""), type: String(body.type || ""), subType: String(body.subType || ""), vin: String(body.vin || ""), reg: String(body.reg || ""), quoteNo: String(body.quoteNo || ""), client: String(body.client || ""), priority: String(body.priority || "Normal"), due: String(body.due || ""), tasks: Array.isArray(body.tasks) ? body.tasks.map(String) : [] });
      else if (action === "approve") approveShowroom(name, String(body.id || ""));
      else if (action === "accept") acceptCard(name, String(body.id || ""));
      else if (action === "task") stampTask(name, String(body.id || ""), Number(body.taskId), { status: String(body.status || ""), note: String(body.note || ""), location: String(body.location || ""), provider: String(body.provider || ""), date: String(body.date || "") });
      else if (action === "extra") addExtra(name, String(body.id || ""), String(body.task || ""));
      else if (action === "approve-extra") approveExtra(name, String(body.id || ""), Number(body.taskId));
      else if (action === "part") addPart(name, String(body.id || ""), String(body.item || ""), Number(body.qty || 1));
      else if (action === "lock") lockPart(name, String(body.id || ""), Number(body.partId), String(body.status || "Ordered"), String(body.inv || ""), Number(body.price || 0));
      else if (action === "pdi") signPdi(name, String(body.id || ""), body.side === "workshop" ? "workshop" : "sales", body.pass !== "0");
      else if (action === "ready") markReady(name, String(body.id || ""), body.side === "workshop" ? "workshop" : "sales");
      else if (action === "deliver") deliver(name, String(body.id || ""));
      else if (action === "wash") bookWash(name, String(body.ws || ""), String(body.note || ""));
      else if (action === "morning") confirmMorning(name, String(body.id || ""));
      return send(res, 200, JSON.stringify({ ...listCards(), types: TYPES }));
    }
    if (url.pathname === "/" || url.pathname === "/index.html") return send(res, 200, home, "text/html; charset=utf-8");
    const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    const file = join(publicDir, rel);
    if (file.startsWith(publicDir) && existsSync(file) && !file.endsWith("/")) return send(res, 200, readFileSync(file), types[extname(file)] || "application/octet-stream");
    send(res, 404, "Not found", "text/plain");
  } catch (error) {
    send(res, 400, JSON.stringify({ error: error instanceof Error ? error.message : "Not saved" }));
  }
});

const port = Number(process.env.PORT || 8080);
server.listen(port, "0.0.0.0", () => console.log("Status Track listening on " + port));
