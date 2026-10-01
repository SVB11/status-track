import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export type BookEntry = { id: string; ws: string; person: string; line: string; kind: string; at: string };

const file = join(process.cwd(), "data", "job-logs.json");
let entries: BookEntry[] = [];
let loaded = false;
let seq = 1;

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = JSON.parse(readFileSync(file, "utf8")) as BookEntry[];
    if (Array.isArray(raw)) entries = raw;
    for (const entry of entries) {
      const n = Number(String(entry.id).replace(/\D/g, ""));
      if (n >= seq) seq = n + 1;
    }
  } catch {
    entries = [];
  }
}

function save() {
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(file, JSON.stringify(entries));
  } catch {
    /* the process copy still holds the book */
  }
}

export function listLogs() {
  load();
  return entries;
}

export function addLog(input: { ws: string; person: string; line: string; kind: string }) {
  load();
  const entry: BookEntry = {
    id: "log-" + seq++,
    ws: input.ws,
    person: input.person,
    line: input.line.trim(),
    kind: input.kind || "note",
    at: new Date().toISOString(),
  };
  entries = [entry, ...entries];
  save();
  return entry;
}
