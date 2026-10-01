import { createFileRoute } from "@tanstack/react-router";
import stock from "../../server/stock.json";
import quoteList from "../../server/quote-list.json";
import { BAYS, classify, tasksFor } from "../../lib/yard-types";
import { isLoaded, markLoaded } from "../../server/card-load";

type StockRow = {
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
  priceExcl: number;
  sentence: string;
  availability: string;
};

const STAFF: Record<string, { code: string; role: string }> = {
  "Sebastian van Biljon": { code: "BVB", role: "director" },
  "Siegfried van Biljon": { code: "SVB", role: "director" },
  Cindy: { code: "", role: "accounts" },
  Chantelle: { code: "", role: "stock" },
  "Fanie van Biljon": { code: "FVB", role: "sales" },
  "Stanley Johnson": { code: "SJ", role: "sales" },
  "Drickus van Biljon": { code: "DVB", role: "sales" },
  "Jean-Pierre De Fillet": { code: "", role: "workshop" },
  "Louis Koekemoer": { code: "", role: "workshop" },
  "Tiaan Van Wyk": { code: "", role: "workshop" },
  Damian: { code: "", role: "marketing" },
  Andre: { code: "", role: "admin" },
};

const PRICE = new Set(["director", "accounts", "stock", "sales"]);
const COST = new Set(["director", "accounts"]);
const CLIENTS = ["Reef Bulk", "Highveld Fuels", "East Rand Haulage", "Vaal Tippers", "Natal Tankers", "Bartlett Logistics", "Goldfield Transport"];
const SALES = [
  { name: "Fanie van Biljon", code: "FVB" },
  { name: "Stanley Johnson", code: "SJ" },
  { name: "Drickus van Biljon", code: "DVB" },
  { name: "Sebastian van Biljon", code: "BVB" },
];

function hash(value: string) {
  let h = 2166136261;
  for (const ch of value) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function askFor(tag: string, h: number) {
  const bands: Record<string, [number, number]> = {
    TANKER: [780000, 2450000],
    "TRUCK TRACTOR": [890000, 1850000],
    TRAILER: [265000, 640000],
    "SIDE TIPPER": [390000, 760000],
    RIGID: [420000, 980000],
    "TIPPER TRUCK": [510000, 1100000],
  };
  const [lo, hi] = bands[tag] || [300000, 900000];
  const step = 5000;
  const slots = Math.max(1, Math.floor((hi - lo) / step));
  return lo + (h % slots) * step;
}

const PRESET = new Set(["WS5647", "WS5538SL", "WS5656", "WS5617SL"]);

const quoteByWs = new Map((quoteList as { ws: string; sentence: string; priceExcl: number; salesman: string; engine: string }[]).map((row) => [row.ws, row]));

function salesFromList(raw: string) {
  const name = raw.toUpperCase();
  if (name.includes("FANIE")) return { name: "Fanie van Biljon", code: "FVB" };
  if (name.includes("STANLEY")) return { name: "Stanley Johnson", code: "SJ" };
  if (name.includes("DRICKUS")) return { name: "Drickus van Biljon", code: "DVB" };
  if (name.includes("SEBASTIAN")) return { name: "Sebastian van Biljon", code: "BVB" };
  if (name.includes("SIEGFRIED")) return { name: "Siegfried van Biljon", code: "SVB" };
  return null;
}

function day(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function forRole(row: StockRow, role: string, index: number) {
  const showPrice = PRICE.has(role);
  const showCost = COST.has(role);
  const showIdentity = role !== "marketing";
  const h = hash(row.ws);
  const kind = classify(row.tag, row.description, row.model, row.extras);
  const listed = quoteByWs.get(row.ws);
  const listedSales = listed ? salesFromList(listed.salesman) : null;
  const ask = listed?.priceExcl || askFor(row.tag, h);
  const sentence = listed?.sentence || "";
  const cardLoaded = !!sentence && (PRESET.has(row.ws) || isLoaded(row.ws));
  const seeSentence = cardLoaded || role === "stock" || role === "director";
  const buy = Math.round((ask * (72 + (h % 12))) / 100 / 1000) * 1000;
  const lane = h % 10;
  const client = lane >= 4 ? CLIENTS[h % CLIENTS.length] : "";
  const sales = listedSales || SALES[h % SALES.length];
  const quoted = cardLoaded && !!sentence && (PRESET.has(row.ws) || lane >= 6);
  const invoiced = lane >= 7;
  const inBay = lane === 6 || lane === 8;
  const fee = 2500;
  const excl = ask + fee;
  const location = inBay ? BAYS[1 + (h % (BAYS.length - 1))] : "Yard";
  const step = invoiced ? "Invoice requested" : quoted ? "Quoted" : inBay ? "In workshop" : "On hand";
  const names = tasksFor(kind.main);
  const tasks = names.map((name, i) => {
    const started = inBay && i < 2;
    const done = lane === 9 && i < 3;
    return {
      name,
      job: "A",
      status: done ? "Completed" : started ? "In Progress" : "Not Started",
      location: name.includes("Pressure") ? "3rd Party: FK" : name.includes("Barrel") ? "3rd Party: STT" : name.includes("Calibration") ? "3rd Party: Liquid Flow" : name === "Roadworthy" ? "3rd Party: East Rand Testing Station" : location,
      provider: name.includes("Pressure") ? "FK" : name.includes("Barrel") ? "STT" : name.includes("Calibration") ? "Liquid Flow" : name === "Roadworthy" ? "East Rand Testing Station" : "",
    };
  });
  const labour = 4500 + (h % 8) * 750;
  const costs = showCost
    ? [
        { name: "Labour", supplier: "Yard", qty: lane >= 6 ? 1 : 0, unitPrice: labour, inv: lane >= 6 ? "LAB-" + (100 + index) : "" },
        { name: "RWC", supplier: "East Rand Testing Station", qty: lane >= 8 ? 1 : 0, unitPrice: 1850, inv: lane >= 8 ? "RWC-" + (200 + index) : "" },
        { name: "Valet", supplier: "Yard", qty: lane === 9 ? 1 : 0, unitPrice: 1200, inv: "" },
      ]
    : [];
  const orders =
    lane >= 6
      ? [
          {
            orderNo: row.ws + "-001",
            responsible: h % 2 ? "Jean-Pierre De Fillet" : "Louis Koekemoer",
            supplier: h % 2 ? "Quality Parts" : "Global Air Brakes",
            qty: 1 + (h % 3),
            item: kind.main.includes("Tank") ? "Suzi set" : "Mudguards",
            invoicedExcl: showCost || role === "stock" ? 1800 + (h % 5) * 250 : null,
          },
        ]
      : [];
  return {
    ws: row.ws,
    year: row.year,
    make: row.make,
    model: row.model,
    description: row.description,
    extras: row.extras,
    km: row.km,
    vin: showIdentity ? row.vin : "",
    engine: row.engine,
    reg: showIdentity ? row.reg : "",
    tag: kind.tag,
    mainType: kind.main,
    subType: kind.sub,
    priceExcl: showPrice ? ask : null,
    buyExcl: showCost ? buy : null,
    sentence: showPrice && seeSentence ? sentence : "",
    loaded: cardLoaded,
    salesCode: sales.code,
    availability: row.availability,
    client,
    salesman: sales.name,
    invoiceNo: invoiced ? "INV-" + (8600 + index) : "",
    invoiceStatus: invoiced ? "Requested" : "None",
    location,
    step,
    priority: h % 17 === 0 ? "Urgent" : h % 5 === 0 ? "High" : "Normal",
    tasks,
    costs,
    orders,
    quote: quoted
      ? {
          number: "C" + (21040 + index),
          customer: client,
          code: sales.code,
          item: row.ws + " " + row.year + " " + row.description,
          sentence: showPrice && seeSentence ? sentence : row.year + " " + row.description,
          fee,
          tradeIn: 0,
          excl: showPrice ? excl : 0,
          vat: showPrice ? Math.round(excl * 0.15) : 0,
          total: showPrice ? Math.round(excl * 1.15) : 0,
          followDay: 1,
          dueOn: day(1),
          make: row.make,
          year: row.year,
          vin: showIdentity ? row.vin : "",
          engine: row.engine,
          reg: showIdentity ? row.reg : "",
          ws: row.ws,
        }
      : null,
    invoice: invoiced
      ? {
          number: "INV-" + (8600 + index),
          customer: client,
          salesman: sales.name,
          excl: showPrice ? excl : 0,
          vat: showPrice ? Math.round(excl * 0.15) : 0,
          total: showPrice ? Math.round(excl * 1.15) : 0,
          status: "Requested",
        }
      : null,
  };
}

export const Route = createFileRoute("/api/yard")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as { name?: string; password?: string; action?: string; ws?: string };
        const staff = body.name ? STAFF[body.name] : undefined;
        if (!staff || body.password !== "Test1234") {
          return Response.json({ error: "Wrong name or password" }, { status: 401 });
        }
        if (body.action === "load") {
          if (staff.role !== "stock" && staff.role !== "director") {
            return Response.json({ error: "Only Chantelle loads a card" }, { status: 403 });
          }
          if (!body.ws) return Response.json({ error: "No WS" }, { status: 400 });
          markLoaded(body.ws);
          return Response.json({ ok: true, ws: body.ws });
        }
        return Response.json({
          role: staff.role,
          units: (stock as StockRow[]).map((row, index) => forRole(row, staff.role, index)),
        });
      },
    },
  },
});
