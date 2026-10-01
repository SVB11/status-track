import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const TYPES = ["Fuel Tanker", "HFO Tanker", "LPG Gas Tanker", "Drawbar (fuel)", "Fuel Rigid", "Water Truck", "Tanker (other)", "Truck Tractor", "Rigid (other)", "Tipper Truck", "Side Tipper", "Tautliner", "Flatdeck", "Trailer (other)"];
export const LOCS = ["Yard", "Bay 1 Reuben", "Bay 2 Ricardo", "Bay 3 Jonas", "Bay 4 Josiah", "Bay 5 Josiah 2", "Wash Bay", "Test Pit Bay 1", "Test Pit Bay 2", "Test Pit Bay 3", "3rd Party", "Out / Delivered"];
const ALL = ["Roadworthy", "Brake tests", "Wash / clean", "Touch-ups", "Polish", "Spray rims", "As Is with roadworthy only", "As Is without roadworthy"];
const TANKER = ["Pressure test (SLP)", "Barrel test 3 year", "Barrel test 6 year", "Barrel test 3 and 6 year", "Calibration if meters fitted", "DEKRA spec"];
const TRACTOR = ["Fuel spec", "DEKRA spec", "Full refurbishment", "Already refurbished", "Service before delivery"];
const TRAILER = ["Full refurbishment", "Already refurbished", "Tautliner / sail work", "Tipper bin / hydraulics", "Side tipper tarps", "Crack repairs"];

export function taskNames(type: string, year: string) {
  const names = [...ALL];
  if (type.includes("Tanker") || type.includes("Drawbar") || type.includes("Water")) names.push(...TANKER);
  if (type.includes("Tractor") || type.includes("Rigid")) names.push(...TRACTOR);
  if (type.includes("Tipper") || type.includes("Taut") || type.includes("Flat") || type.includes("Trailer")) names.push(...TRAILER);
  const age = new Date().getFullYear() - Number(year || 0);
  if (age >= 15 && names.some((name) => name.startsWith("Barrel"))) names.push("Barrel test 15 year");
  return names;
}

type Task = { id: number; name: string; selected: boolean; status: string; note: string; location: string; provider: string; date: string; approved: boolean; extra: boolean };
type Part = { id: number; name: string; qty: number; orderNo: string; status: string; inv: string; price: number };
type Line = { id: string; person: string; line: string; at: string };
export type Card = {
  id: string; kind: "sold" | "showroom"; ws: string; make: string; year: string; type: string; subType: string;
  vin: string; reg: string; quoteNo: string; client: string; priority: string; due: string; salesman: string;
  status: string; acceptedBy: string; approved: boolean; closed: boolean; location: string; morning: string;
  pdiSales: string; pdiWorkshop: string; readySales: boolean; readyWorkshop: boolean;
  tasks: Task[]; parts: Part[]; logs: Line[]; washes: { note: string; by: string }[];
};
type Store = { seq: number; cards: Card[]; suppliers: string[]; stock: { id: number; item: string; qty: number }[] };

const file = join(process.cwd(), "data", "job-cards.json");
let store: Store | null = null;

function load() {
  if (store) return store;
  try {
    store = JSON.parse(readFileSync(file, "utf8")) as Store;
  } catch {
    store = { seq: 1, cards: [], suppliers: ["PFT", "FK", "STT", "ITL", "Liquid Flow", "East Rand Testing Station", "MAN Auto (Scotty)"], stock: [] };
  }
  return store;
}
function save() {
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(file, JSON.stringify(store));
  } catch { /* kept in process */ }
}
function stamp(card: Card, person: string, line: string) {
  card.logs = [{ id: "j" + load().seq++, person, line, at: new Date().toISOString() }, ...card.logs];
}

export function listCards() {
  return load();
}

export function createCard(name: string, input: { kind: "sold" | "showroom"; ws: string; make: string; year: string; type: string; subType: string; vin: string; reg: string; quoteNo: string; client: string; priority: string; due: string; tasks: string[] }) {
  if (input.kind === "sold" && (!input.ws || !input.make || !input.year || !input.type || !input.vin || !input.reg || !input.quoteNo || !input.client || !input.due)) throw new Error("Sold job needs WS, make, year, type, VIN, reg, quote or invoice, client and date");
  const current = load();
  if (current.cards.some((card) => card.ws === input.ws && !card.closed)) throw new Error("One open card per WS");
  const card: Card = {
    id: "JC" + current.seq++, kind: input.kind, ws: input.ws, make: input.make, year: input.year, type: input.type, subType: input.subType,
    vin: input.vin, reg: input.reg, quoteNo: input.quoteNo, client: input.client, priority: input.priority || "Normal", due: input.due, salesman: name,
    status: input.kind === "showroom" ? "Waiting for admin" : "Submitted to Workshop", acceptedBy: "", approved: input.kind === "sold", closed: false,
    location: "Yard", morning: "", pdiSales: "", pdiWorkshop: "", readySales: false, readyWorkshop: false,
    tasks: taskNames(input.type, input.year).map((task) => ({ id: current.seq++, name: task, selected: input.tasks.includes(task), status: "Not started", note: "", location: "", provider: task === "Roadworthy" ? "East Rand Testing Station" : "", date: "", approved: input.tasks.includes(task), extra: false })),
    parts: [], logs: [], washes: [],
  };
  stamp(card, name, input.kind === "sold" ? "Sold job submitted" : "Showroom job waiting for admin");
  current.cards = [card, ...current.cards];
  save();
  return card;
}

export function approveShowroom(name: string, id: string) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  card.approved = true;
  card.status = "Submitted to Workshop";
  stamp(card, name, "Showroom approved");
  save();
}

export function acceptCard(name: string, id: string) {
  const card = load().cards.find((row) => row.id === id);
  if (!card || !card.approved) throw new Error("Not ready for workshop");
  card.status = "Accepted by Workshop";
  card.acceptedBy = name;
  stamp(card, name, "Accepted");
  save();
}

export function stampTask(name: string, id: string, taskId: number, patch: { status?: string; note?: string; location?: string; provider?: string; date?: string }) {
  const card = load().cards.find((row) => row.id === id);
  const task = card?.tasks.find((row) => row.id === taskId);
  if (!card || !task) throw new Error("No task");
  if (card.closed) throw new Error("Closed. Only admin can edit");
  if (!task.approved) throw new Error("Extra task needs admin approval");
  Object.assign(task, patch);
  if (patch.location) card.location = patch.location;
  if (task.name === "Roadworthy" && patch.status === "Fail") {
    task.note = (task.note ? task.note + " | " : "") + "Fail list";
    card.tasks.push({ id: load().seq++, name: "Roadworthy fail fix", selected: true, status: "Not started", note: "Opened from the failed roadworthy. Do not open a second roadworthy.", location: "", provider: "", date: "", approved: true, extra: true });
  }
  stamp(card, name, task.name + " → " + (patch.status || task.status) + (patch.note ? " · " + patch.note : ""));
  save();
}

export function addExtra(name: string, id: string, task: string) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  card.tasks.push({ id: load().seq++, name: task, selected: true, status: "Waiting approval", note: "", location: "", provider: "", date: "", approved: false, extra: true });
  stamp(card, name, "Extra waiting approval · " + task);
  save();
}

export function approveExtra(name: string, id: string, taskId: number) {
  const card = load().cards.find((row) => row.id === id);
  const task = card?.tasks.find((row) => row.id === taskId);
  if (!task) throw new Error("No extra");
  task.approved = true;
  task.status = "Not started";
  stamp(card!, name, "Extra approved · " + task.name);
  save();
}

export function addPart(name: string, id: string, item: string, qty: number) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  card.parts.push({ id: load().seq++, name: item, qty, orderNo: "", status: "To be ordered", inv: "", price: 0 });
  stamp(card, name, "Part added · " + item);
  save();
}

export function lockPart(name: string, id: string, partId: number, status: string, inv: string, price: number) {
  const card = load().cards.find((row) => row.id === id);
  const part = card?.parts.find((row) => row.id === partId);
  if (!part) throw new Error("No part");
  if (!part.orderNo) part.orderNo = card!.ws + "-" + String(card!.parts.filter((row) => row.orderNo).length + 1).padStart(3, "0");
  part.status = status;
  if (status === "Delivered" && !inv) throw new Error("Invoice number is required when delivered");
  part.inv = inv;
  part.price = price;
  stamp(card!, name, part.orderNo + " · " + status);
  save();
}

export function signPdi(name: string, id: string, side: "sales" | "workshop", pass: boolean) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  if (side === "sales") card.pdiSales = pass ? name : "";
  else card.pdiWorkshop = pass ? name : "";
  if (!pass) {
    card.tasks.push({ id: load().seq++, name: "PDI fail", selected: true, status: "Not started", note: "Opened from a failed PDI", location: "", provider: "", date: "", approved: true, extra: true });
    stamp(card, name, "PDI fail");
  } else stamp(card, name, "PDI signed");
  save();
}

export function markReady(name: string, id: string, side: "sales" | "workshop") {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  if (side === "sales") card.readySales = true;
  else card.readyWorkshop = true;
  if (card.readySales && card.readyWorkshop) card.status = "Ready";
  stamp(card, name, "Marked ready");
  save();
}

export function deliver(name: string, id: string) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  if (card.parts.some((part) => !part.orderNo)) throw new Error("A part has no order number");
  card.closed = true;
  card.status = "Delivered";
  card.location = "Out / Delivered";
  stamp(card, name, "Delivered / closed");
  save();
}

export function bookWash(name: string, ws: string, note: string) {
  const current = load();
  const card = current.cards.find((row) => row.ws === ws && !row.closed);
  if (card) {
    card.washes.push({ note, by: name });
    card.location = "Wash Bay";
    stamp(card, name, "Wash booked · " + note);
  }
  save();
  return !!card;
}

export function confirmMorning(name: string, id: string) {
  const card = load().cards.find((row) => row.id === id);
  if (!card) throw new Error("No job");
  card.morning = new Date().toISOString().slice(0, 10);
  stamp(card, name, "Morning location confirmed · " + card.location);
  save();
}
