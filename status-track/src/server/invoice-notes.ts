import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type InvoiceNotice = {
  id: string;
  ws: string;
  number: string;
  customer: string;
  salesman: string;
  excl: number;
  vat: number;
  total: number;
  at: string;
  status: "Requested" | "Generated";
};

const file = join(process.cwd(), "data", "invoice-notes.json");
let notes: InvoiceNotice[] = [];
let ready = false;
let seq = 1;

function load() {
  if (ready) return;
  ready = true;
  try {
    const raw = JSON.parse(readFileSync(file, "utf8")) as InvoiceNotice[];
    if (Array.isArray(raw)) notes = raw;
    for (const note of notes) {
      const n = Number(String(note.id).replace(/\D/g, ""));
      if (n >= seq) seq = n + 1;
    }
  } catch {
    notes = [];
  }
}

function save() {
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(file, JSON.stringify(notes));
  } catch {
    /* kept in this process */
  }
}

export function openNotices() {
  load();
  return notes.filter((note) => note.status === "Requested");
}

export function askInvoice(input: Omit<InvoiceNotice, "id" | "at" | "status">) {
  load();
  const note: InvoiceNotice = { ...input, id: "inv-" + seq++, at: new Date().toISOString(), status: "Requested" };
  notes = [note, ...notes];
  save();
  return note;
}

export function markGenerated(id: string) {
  load();
  notes = notes.map((note) => (note.id === id ? { ...note, status: "Generated" } : note));
  save();
  return openNotices();
}
