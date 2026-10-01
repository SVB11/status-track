import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const file = join(process.cwd(), "data", "loaded-cards.json");
let loaded = new Set<string>();
let ready = false;

function read() {
  if (ready) return;
  ready = true;
  try {
    const raw = JSON.parse(readFileSync(file, "utf8")) as string[];
    if (Array.isArray(raw)) loaded = new Set(raw);
  } catch {
    loaded = new Set();
  }
}

export function isLoaded(ws: string) {
  read();
  return loaded.has(ws);
}

export function markLoaded(ws: string) {
  read();
  loaded.add(ws);
  try {
    mkdirSync(join(process.cwd(), "data"), { recursive: true });
    writeFileSync(file, JSON.stringify([...loaded]));
  } catch {
    /* kept in this process */
  }
}
