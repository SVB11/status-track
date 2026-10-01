import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import stock from "./stock.json";
import quoteList from "./quote-list.json";
import { classify, tasksFor } from "../lib/yard-types";

export const STAFF = [
  { name: "Sebastian van Biljon", code: "BVB", role: "director" },
  { name: "Siegfried van Biljon", code: "SVB", role: "director" },
  { name: "Cindy", code: "", role: "accounts" },
  { name: "Chantelle", code: "", role: "stock" },
  { name: "Fanie van Biljon", code: "FVB", role: "sales" },
  { name: "Stanley Johnson", code: "SJ", role: "sales" },
  { name: "Drickus van Biljon", code: "DVB", role: "sales" },
  { name: "Jean-Pierre De Fillet", code: "", role: "workshop" },
  { name: "Louis Koekemoer", code: "", role: "workshop" },
  { name: "Tiaan Van Wyk", code: "", role: "workshop" },
  { name: "Damian", code: "", role: "marketing" },
  { name: "Andre", code: "", role: "admin" },
] as const;

export const COST_LINES = [
  "Acid Wash",
  "Air Suzi",
  "Courier",
  "Dealer stock",
  "Electrical Suzi",
  "Jack/W/Spanner/Triangle",
  "Labour",
  "Natis",
  "Permit",
  "RWC",
  "Sundries",
  "Valet",
  "Weighbridge",
];

const PRICE = new Set(["director", "accounts", "stock", "sales"]);
const COST = new Set(["director", "accounts"]);
const file = join(process.cwd(), "data", "yard-book.json");

type Line = { description: string; qty: number; rate: number };
type Unit = {
  id: number;
  ws: string;
  year: string;
  make: string;
  model: string;
  description: string;
  extras: string;
  km: string;
  vin: string;
  engine: string;
  reg: string;
  tag: string;
  mainType: string;
  subType: string;
  priceExcl: number;
  buyExcl: number;
  sentence: string;
  loaded: boolean;
  salesCode: string;
  salesman: string;
  client: string;
  quoteNo: string;
  invoiceNo: string;
  invoiceStatus: string;
  status: string;
  location: string;
  priority: string;
  due: string;
  instructions: string;
  jobNumber: string;
  photo: string;
  onHand: boolean;
};
type Task = { id: number; ws: string; job: string; name: string; status: string; notes: string; location: string; provider: string };
type Log = { id: string; ws: string; person: string; line: string; kind: string; at: string };
type Quote = {
  id: number;
  ws: string;
  number: string;
  customer: string;
  phone: string;
  address: string;
  email: string;
  vatNo: string;
  code: string;
  sentence: string;
  fee: number;
  tradeIn: number;
  discount: number;
  crossBorder: boolean;
  cleared: boolean;
  excl: number;
  vat: number;
  total: number;
  followDay: number;
  dueOn: string;
  result: string;
  at: string;
  make: string;
  year: string;
  vin: string;
  engine: string;
  reg: string;
  lines: Line[];
};
type Ask = { id: number; ws: string; salesman: string; code: string; customer: string; phone: string; address: string; email: string; vatNo: string; tradeIn: number; discount: number; crossBorder: boolean; extra: string; extraRate: number };
type Offer = { id: number; ws: string; selling: number; profit: number; estimated: number; tankerFixed: number; offer: number; month: number; cleared: { sebastian: boolean; fanie: boolean; siegfried: boolean } };
type Order = { id: number; ws: string; orderNo: string; responsible: string; supplier: string; qty: number; item: string; quotedExcl: number; invoicedExcl: number; notes: string };
type Cost = { id: number; ws: string; name: string; supplier: string; description: string; unitPrice: number; qty: number; inv: string };
type Notice = { id: string; ws: string; number: string; customer: string; salesman: string; excl: number; vat: number; total: number; at: string; status: string };
type Book = { version: number; units: Unit[]; tasks: Task[]; logs: Log[]; quotes: Quote[]; asks: Ask[]; offers: Offer[]; orders: Order[]; costs: Cost[]; notices: Notice[]; seq: number };

let book: Book | null = null;

function salesFrom(raw: string) {
  const name = (raw || "").toUpperCase();
  if (name.includes("FANIE")) return { name: "Fanie van Biljon", code: "FVB" };
  if (name.includes("STANLEY")) return { name: "Stanley Johnson", code: "SJ" };
  if (name.includes("DRICKUS")) return { name: "Drickus van Biljon", code: "DVB" };
  if (name.includes("SEBASTIAN")) return { name: "Sebastian van Biljon", code: "BVB" };
  if (name.includes("SIEGFRIED")) return { name: "Siegfried van Biljon", code: "SVB" };
  return { name: "", code: "" };
}

function photoFor(tag: string) {
  if (tag === "TRUCK TRACTOR" || tag === "RIGID" || tag === "TIPPER TRUCK") return "/brand/truck.jpg";
  if (tag === "SIDE TIPPER" || tag === "TRAILER") return "/brand/trailer.jpg";
  return "/brand/tanker.jpg";
}

function seed(): Book {
  const listed = new Map((quoteList as { ws: string; sentence: string; priceExcl: number; salesman: string }[]).map((row) => [row.ws, row]));
  const preset = new Set(["WS5647", "WS5538SL", "WS5656", "WS5617SL"]);
  const units: Unit[] = [];
  const tasks: Task[] = [];
  const costs: Cost[] = [];
  let id = 1;
  let tid = 1;
  let cid = 1;
  for (const row of stock as { ws: string; year: string; make: string; model: string; description: string; extras: string; km: string; vin: string; engine: string; reg: string; tag: string; priceExcl: number; availability: string }[]) {
    const quote = listed.get(row.ws);
    const place = classify(row.tag, row.description, row.model, row.extras);
    const who = salesFrom(quote?.salesman || "");
    const ask = quote?.priceExcl || row.priceExcl || 0;
    const sentence = quote?.sentence || "";
    units.push({
      id: id++,
      ws: row.ws,
      year: row.year,
      make: row.make,
      model: row.model,
      description: row.description,
      extras: row.extras || "",
      km: row.km,
      vin: row.vin,
      engine: row.engine,
      reg: row.reg,
      tag: place.tag,
      mainType: place.main,
      subType: place.sub,
      priceExcl: ask,
      buyExcl: Math.round((ask * 0.78) / 1000) * 1000,
      sentence,
      loaded: !!sentence && preset.has(row.ws),
      salesCode: who.code,
      salesman: who.name,
      client: "",
      quoteNo: "",
      invoiceNo: "",
      invoiceStatus: "None",
      status: "On hand",
      location: "Yard",
      priority: "Normal",
      due: "",
      instructions: "",
      jobNumber: "",
      photo: photoFor(place.tag),
      onHand: String(row.availability || "").toUpperCase() !== "SOLD",
    });
    for (const name of tasksFor(place.main)) {
      tasks.push({ id: tid++, ws: row.ws, job: "A", name, status: "Not Started", notes: "", location: "Yard", provider: "" });
    }
    for (const name of COST_LINES) {
      costs.push({ id: cid++, ws: row.ws, name, supplier: "", description: "", unitPrice: 0, qty: 0, inv: "" });
    }
  }
  return { version: 2, units, tasks, logs: [], quotes: [], asks: [], offers: [], orders: [], costs, notices: [], seq: 1 };
}

function load() {
  if (book) return book;
  try {
    book = JSON.parse(readFileSync(file, "utf8")) as Book;
    if (!book.units?.length || book.version !== 2) book = seed();
  } catch {
    book = seed();
    save();
  }
  return book;
}

function save() {
  if (!book) return;
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(file, JSON.stringify(book));
  } catch {
    /* process copy still holds the yard */
  }
}

function stamp(ws: string, person: string, line: string, kind: string) {
  const current = load();
  const entry = { id: "log-" + current.seq++, ws, person, line, kind, at: new Date().toISOString() };
  current.logs = [entry, ...current.logs];
  return entry;
}

function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function staffByName(name: string) {
  return STAFF.find((person) => person.name === name);
}

export function view(role: string, name: string) {
  const current = load();
  const showPrice = PRICE.has(role);
  const showCost = COST.has(role);
  const showIdentity = role !== "marketing";
  const units = current.units.map((unit) => ({
    ...unit,
    priceExcl: showPrice ? unit.priceExcl : null,
    buyExcl: showCost ? unit.buyExcl : null,
    sentence: showPrice || role === "stock" || role === "director" ? unit.sentence : unit.loaded && showPrice ? unit.sentence : role === "workshop" ? "" : unit.sentence && (role === "stock" || role === "director" || unit.loaded) ? unit.sentence : "",
    vin: showIdentity ? unit.vin : "",
    reg: showIdentity ? unit.reg : "",
  }));
  const today = new Date().toISOString().slice(0, 10);
  const code = staffByName(name)?.code || "";
  const quotes = current.quotes.filter((quote) => {
    if (!PRICE.has(role)) return false;
    if (role === "stock" || role === "accounts") return true;
    if (quote.code === code) return true;
    return role === "director" && quote.dueOn < today && !quote.result;
  });
  return {
    role,
    units,
    tasks: current.tasks,
    logs: current.logs,
    quotes,
    asks: role === "stock" || role === "director" || role === "sales" ? current.asks : [],
    offers: showPrice ? current.offers : [],
    orders: current.orders.map((order) => ({ ...order, quotedExcl: showCost || role === "stock" ? order.quotedExcl : null, invoicedExcl: showCost || role === "stock" ? order.invoicedExcl : null })),
    costs: showCost ? current.costs : [],
    notices: role === "stock" || role === "accounts" || role === "director" ? current.notices.filter((note) => note.status === "Requested") : [],
  };
}

export function loadCard(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "stock" && person.role !== "director")) throw new Error("Only Chantelle loads a card");
  const current = load();
  const unit = current.units.find((row) => row.ws === ws);
  if (!unit) throw new Error("No WS");
  if (!unit.sentence) throw new Error("No pro-forma description on the quote list");
  unit.loaded = true;
  stamp(ws, name, "Loaded quote list onto the card", "load");
  save();
  return unit.ws;
}

export function submitQuote(name: string, input: { ws: string; customer: string; phone: string; address: string; email: string; vatNo: string; tradeIn: number; extra: string; extraRate: number; discount?: number; crossBorder?: boolean }) {
  const person = staffByName(name);
  if (!person || (person.role !== "sales" && person.role !== "director")) throw new Error("Only sales can ask for a pro-forma");
  const current = load();
  const unit = current.units.find((row) => row.ws === input.ws);
  if (!unit) throw new Error("No WS");
  if (!unit.loaded || !unit.sentence) throw new Error("Chantelle has not loaded this card");
  current.asks = [{ id: current.seq++, ws: unit.ws, salesman: name, code: person.code || unit.salesCode, customer: input.customer, phone: input.phone, address: input.address, email: input.email, vatNo: input.vatNo, tradeIn: Number(input.tradeIn || 0), discount: Number(input.discount || 0), crossBorder: Boolean(input.crossBorder), extra: input.extra, extraRate: Number(input.extraRate || 0) }, ...current.asks.filter((ask) => ask.ws !== unit.ws)];
  stamp(unit.ws, name, "Asked Chantelle for a pro-forma · " + input.customer, "quote");
  save();
}

export function issueQuote(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "stock" && person.role !== "director")) throw new Error("Chantelle issues the C-number");
  const current = load();
  const ask = current.asks.find((row) => row.ws === ws);
  const unit = current.units.find((row) => row.ws === ws);
  if (!ask || !unit) throw new Error("No request on this WS");
  if (ask.discount > 0) throw new Error("Discount needs Sebastian or Siegfried before the C-number");
  const lines = [{ description: unit.sentence, qty: 1, rate: unit.priceExcl }];
  if (ask.extra.trim()) lines.push({ description: ask.extra.trim(), qty: 1, rate: ask.extraRate });
  const fee = ask.crossBorder ? 10000 : 2500;
  const goods = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
  const excl = goods + fee - ask.tradeIn;
  const vat = ask.crossBorder ? 0 : excl * 0.15;
  const quote: Quote = {
    id: current.seq++,
    ws,
    number: "C" + (20920 + current.quotes.length),
    customer: ask.customer,
    phone: ask.phone,
    address: ask.address,
    email: ask.email,
    vatNo: ask.vatNo,
    code: ask.code,
    sentence: unit.sentence,
    fee,
    tradeIn: ask.tradeIn,
    discount: 0,
    crossBorder: ask.crossBorder,
    cleared: true,
    excl,
    vat,
    total: excl + vat,
    followDay: 1,
    dueOn: addDays(1),
    result: "",
    at: new Date().toISOString(),
    make: unit.make,
    year: unit.year,
    vin: unit.vin,
    engine: unit.engine,
    reg: unit.reg,
    lines,
  };
  current.quotes = [quote, ...current.quotes];
  current.asks = current.asks.filter((row) => row.ws !== ws);
  unit.client = ask.customer;
  unit.quoteNo = quote.number;
  unit.salesman = ask.salesman;
  unit.salesCode = ask.code;
  unit.status = "Quoted";
  stamp(ws, name, "Issued " + quote.number + " for " + ask.code, "quote");
  save();
  return quote;
}

export function clearDiscount(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || person.role !== "director") throw new Error("Sebastian or Siegfried clears a discount");
  const current = load();
  const ask = current.asks.find((row) => row.ws === ws);
  if (!ask) throw new Error("No discount waiting");
  ask.discount = 0;
  stamp(ws, name, "Discount cleared", "quote");
  save();
}

export function logQuote(name: string, id: number, result: string) {
  const person = staffByName(name);
  const current = load();
  const quote = current.quotes.find((row) => row.id === id);
  if (!quote || !person) throw new Error("Not your board");
  if (quote.code !== person.code && person.role !== "director") throw new Error("Not your board");
  const next = quote.followDay === 1 ? 3 : quote.followDay === 3 ? 7 : 14;
  quote.result = result;
  quote.followDay = next;
  quote.dueOn = addDays(next);
  stamp(quote.ws, name, "Follow-up · " + result, "board");
  save();
}

export function requestInvoice(name: string, ws: string, customer: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "sales" && person.role !== "director")) throw new Error("Only sales can request an invoice");
  const current = load();
  const unit = current.units.find((row) => row.ws === ws);
  if (!unit) throw new Error("No WS");
  const quote = current.quotes.find((row) => row.ws === ws);
  const excl = quote ? quote.excl : unit.priceExcl;
  const number = "INV-" + (8600 + current.notices.length + 1);
  const note: Notice = {
    id: "inv-" + current.seq++,
    ws,
    number,
    customer: customer || unit.client,
    salesman: name,
    excl,
    vat: excl * 0.15,
    total: excl * 1.15,
    at: new Date().toISOString(),
    status: "Requested",
  };
  current.notices = [note, ...current.notices];
  unit.invoiceNo = number;
  unit.invoiceStatus = "Requested";
  unit.client = note.customer;
  unit.status = "Invoice requested";
  stamp(ws, name, "Invoice requested " + number, "invoice");
  save();
  return note;
}

export function markInvoice(name: string, id: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "stock" && person.role !== "accounts" && person.role !== "director")) throw new Error("Only Chantelle or Cindy can generate it");
  const current = load();
  const note = current.notices.find((row) => row.id === id);
  if (!note) throw new Error("No notice");
  note.status = "Generated";
  const unit = current.units.find((row) => row.ws === note.ws);
  if (unit) unit.invoiceStatus = "Generated";
  stamp(note.ws, name, "Invoice generated " + note.number, "invoice");
  save();
}

export function openJob(name: string, input: { ws: string; quoteNo: string; client: string; vin: string; reg: string; priority: string; due: string; instruction: string }) {
  const person = staffByName(name);
  if (!person || (person.role !== "sales" && person.role !== "director")) throw new Error("Only sales can log a job card");
  if (!input.quoteNo.trim()) throw new Error("A pro-forma or invoice number opens the card");
  const current = load();
  const unit = current.units.find((row) => row.ws === input.ws);
  if (!unit) throw new Error("No WS");
  unit.jobNumber = unit.jobNumber || "JC-" + unit.ws;
  unit.quoteNo = input.quoteNo;
  unit.client = input.client || unit.client;
  unit.vin = input.vin || unit.vin;
  unit.reg = input.reg;
  unit.priority = input.priority || "Normal";
  unit.due = input.due;
  unit.instructions = input.instruction;
  unit.status = "Submitted to Workshop";
  unit.salesman = name;
  stamp(unit.ws, name, "Job card opened · " + input.quoteNo + (input.client ? " · " + input.client : "") + (input.instruction ? " · " + input.instruction : ""), "opened");
  save();
}

export function setStatus(name: string, ws: string, status: string) {
  const person = staffByName(name);
  const current = load();
  const unit = current.units.find((row) => row.ws === ws);
  if (!unit || !person) throw new Error("No card");
  const workshop = person.role === "workshop" || person.role === "director";
  if (status !== "Submitted to Workshop" && !workshop) throw new Error("Workshop moves that status");
  unit.status = status;
  stamp(ws, name, "Status · " + status, "progress");
  save();
}

export function setTask(name: string, id: number, status: string, note: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "workshop" && person.role !== "director" && person.role !== "stock")) throw new Error("Workshop stamps the task");
  const current = load();
  const task = current.tasks.find((row) => row.id === id);
  if (!task) throw new Error("No task");
  task.status = status;
  const line = task.name + " → " + status + (note ? " · " + note : "");
  if (note) task.notes = (task.notes ? task.notes + " | " : "") + name + ": " + note;
  stamp(task.ws, name, line, "progress");
  save();
}

export function addTask(name: string, ws: string, taskName: string) {
  const current = load();
  current.tasks = [{ id: current.seq++, ws, job: "B", name: taskName, status: "Not Started", notes: "", location: "Yard", provider: "" }, ...current.tasks];
  stamp(ws, name, "Added " + taskName, "task");
  save();
}

export function addLog(name: string, ws: string, line: string) {
  stamp(ws, name, line, "note");
  save();
}

export function issueOrder(name: string, input: { ws: string; responsible: string; supplier: string; qty: number; item: string; quotedExcl: number; notes: string }) {
  const person = staffByName(name);
  if (!person || (person.role !== "stock" && person.role !== "director")) throw new Error("Only Chantelle issues an order number");
  const current = load();
  const existing = current.orders.filter((row) => row.ws === input.ws).length + 1;
  const order: Order = {
    id: current.seq++,
    ws: input.ws,
    orderNo: input.ws + "-" + String(existing).padStart(3, "0"),
    responsible: input.responsible,
    supplier: input.supplier,
    qty: Number(input.qty || 1),
    item: input.item,
    quotedExcl: Number(input.quotedExcl || 0),
    invoicedExcl: 0,
    notes: input.notes || "",
  };
  current.orders = [order, ...current.orders];
  stamp(input.ws, name, "Order " + order.orderNo + " · " + input.responsible + " · " + input.item, "order");
  save();
  return order;
}

export function setCost(name: string, id: number, patch: { supplier?: string; description?: string; unitPrice?: number; qty?: number; inv?: string }) {
  const person = staffByName(name);
  if (!person || (person.role !== "accounts" && person.role !== "director")) throw new Error("Only accounts edit cost");
  const current = load();
  const cost = current.costs.find((row) => row.id === id);
  if (!cost) throw new Error("No cost line");
  Object.assign(cost, patch);
  save();
}

export function saveOffer(name: string, input: { ws: string; selling: number; profit: number; estimated: number }) {
  const person = staffByName(name);
  if (!person || (person.role !== "director" && person.role !== "sales")) throw new Error("Sales or a director works the offer");
  const current = load();
  const unit = current.units.find((row) => row.ws === input.ws);
  if (!unit) throw new Error("No WS");
  const tanker = unit.tag === "TANKER";
  const tankerFixed = tanker ? 15000 + 25000 + 7500 + 45000 + 30000 : 0;
  const offer = Number(input.selling) - Number(input.profit) - Number(input.estimated) - tankerFixed;
  const month = (offer * 0.1475) / 12;
  current.offers = [{ id: current.seq++, ws: input.ws, selling: Number(input.selling), profit: Number(input.profit), estimated: Number(input.estimated), tankerFixed, offer, month, cleared: { sebastian: false, fanie: false, siegfried: false } }, ...current.offers.filter((row) => row.ws !== input.ws)];
  stamp(input.ws, name, "Offer worked · " + Math.round(offer), "offer");
  save();
}

export function clearOffer(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || (person.code !== "BVB" && person.code !== "SVB" && person.code !== "FVB")) throw new Error("Only Sebastian, Fanie or Siegfried can clear an offer");
  const current = load();
  const offer = current.offers.find((row) => row.ws === ws);
  if (!offer) throw new Error("No offer");
  if (person.code === "BVB") offer.cleared.sebastian = true;
  if (person.code === "SVB") offer.cleared.siegfried = true;
  if (person.code === "FVB") offer.cleared.fanie = true;
  stamp(ws, name, "Offer cleared by " + person.code, "offer");
  save();
}

export function openJobA(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || (person.role !== "workshop" && person.role !== "director")) throw new Error("Workshop opens Job A");
  const current = load();
  const unit = current.units.find((row) => row.ws === ws);
  if (!unit) throw new Error("No WS");
  unit.status = "Job A open";
  stamp(ws, name, "Job A opened", "job-a");
  save();
}

export function approveJobA(name: string, ws: string) {
  const person = staffByName(name);
  if (!person || person.role !== "director") throw new Error("Sebastian approves Job A. Siegfried if he is away.");
  const current = load();
  const unit = current.units.find((row) => row.ws === ws);
  if (!unit) throw new Error("No WS");
  unit.status = "Job A approved";
  stamp(ws, name, "Job A approved", "job-a");
  save();
}
