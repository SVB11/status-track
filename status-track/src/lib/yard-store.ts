import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedLogs, seedPdi, seedTasks, seedUnits } from "./seed";
import { tasksFor } from "./yard-types";

export type Role = "director" | "accounts" | "stock" | "sales" | "workshop" | "marketing" | "admin";

export type Staff = { name: string; code: string; role: Role };

export const STAFF: Staff[] = [
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
];

export const COST_LINES = [
  "Acid Wash",
  "Air Suzi",
  "Courier",
  "Dealer stock",
  "Electrical Suzi",
  "Jack / W / Spanner / Triangle",
  "Labour",
  "Natis",
  "Permit",
  "RWC",
  "Sundries",
  "Valet",
  "Weighbridge",
];

export type Unit = {
  id: number;
  ws: string;
  jobNumber: string;
  year: string;
  make: string;
  model: string;
  description: string;
  tag: string;
  vin: string;
  reg: string;
  client: string;
  salesman: string;
  seller: string;
  quoteNo: string;
  priceExcl: number | null;
  buyExcl: number;
  invoiceNo: string;
  invoiceStatus: string;
  sentence: string;
  location: string;
  status: string;
  instructions: string;
  priority: string;
  due: string;
  photo: string;
  photos: string[];
  cleared: boolean;
  step: string;
  copy?: boolean;
  onHand?: boolean;
  extras?: string;
  km?: string;
  engine?: string;
  availability?: string;
  mainType?: string;
  subType?: string;
  loaded?: boolean;
  salesCode?: string;
};

export type HandUnit = {
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
  priceExcl: number | null;
  sentence: string;
  availability: string;
  mainType?: string;
  subType?: string;
  loaded?: boolean;
  salesCode?: string;
  buyExcl?: number | null;
  client?: string;
  salesman?: string;
  invoiceNo?: string;
  invoiceStatus?: string;
  location?: string;
  step?: string;
  priority?: string;
  tasks?: { name: string; status: string; location: string; provider: string; job: string }[];
  costs?: { name: string; supplier: string; qty: number; unitPrice: number; inv: string }[];
  orders?: { orderNo: string; responsible: string; supplier: string; qty: number; item: string; invoicedExcl: number | null }[];
  quote?: {
    number: string;
    customer: string;
    code: string;
    item: string;
    sentence: string;
    fee: number;
    tradeIn: number;
    excl: number;
    vat: number;
    total: number;
    followDay: number;
    dueOn: string;
  make?: string;
  year?: string;
  vin?: string;
  engine?: string;
  reg?: string;
  ws?: string;
  address?: string;
  email?: string;
  vatNo?: string;
  lines?: { description: string; qty: number; rate: number }[];
  } | null;
  invoice?: { number: string; customer: string; salesman: string; excl: number; vat: number; total: number; status: string } | null;
};

export type Task = {
  id: number;
  unitId: number;
  job: string;
  name: string;
  status: string;
  notes: string;
  location: string;
  provider: string;
  booked: string;
};

export type Log = { id: number | string; unitId: number; person: string; line: string; at: string };
export type Pdi = { id: number; unitId: number; section: string; item: string; status: string };
export type Order = {
  id: number;
  unitId: number;
  orderNo: string;
  responsible: string;
  supplier: string;
  qty: number;
  item: string;
  invoicedExcl: number;
};
export type Quote = {
  id: number;
  unitId: number;
  number: string;
  customer: string;
  phone: string;
  code: string;
  item: string;
  sentence: string;
  fee: number;
  tradeIn: number;
  excl: number;
  vat: number;
  total: number;
  followDay: number;
  dueOn: string;
  result: string;
  at: string;
  address?: string;
  email?: string;
  vatNo?: string;
  make?: string;
  year?: string;
  vin?: string;
  engine?: string;
  reg?: string;
  ws?: string;
  lines?: { description: string; qty: number; rate: number }[];
};
export type Invoice = {
  id: number;
  unitId: number;
  number: string;
  customer: string;
  salesman: string;
  excl: number;
  vat: number;
  total: number;
  status: string;
  at: string;
};
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
  status: string;
};
export type Cost = { id: number; unitId: number; name: string; supplier: string; qty: number; unitPrice: number; inv: string };

type State = {
  me: Staff | null;
  units: Unit[];
  tasks: Task[];
  logs: Log[];
  pdi: Pdi[];
  orders: Order[];
  quotes: Quote[];
  invoices: Invoice[];
  notices: InvoiceNotice[];
  costs: Cost[];
  signIn: (name: string, password: string) => string | null;
  signOut: () => void;
  loadHand: (rows: HandUnit[]) => void;
  openWs: (input: Partial<Unit>) => string;
  patchUnit: (id: number, patch: Partial<Unit>) => void;
  clearUnit: (id: number) => void;
  setTask: (id: number, status: string, note?: string) => string | null;
  addTask: (unitId: number, name: string) => string;
  openJobCard: (input: { unitId: number; quoteNo: string; client: string; vin: string; reg: string; priority: string; due: string; instruction: string }) => string;
  rememberLog: (entry: Log) => void;
  takeServerLogs: (entries: { id: string; ws: string; person: string; line: string; at: string }[]) => void;
  setPdi: (id: number, status: string) => void;
  submitQuote: (input: { unitId: number; customer: string; phone: string; address?: string; email?: string; vatNo?: string; askExcl: number; tradeIn: number; lines?: { description: string; qty: number; rate: number }[] }) => Quote;
  logQuote: (id: number, result: string) => void;
  requestInvoice: (unitId: number, customer: string) => Invoice;
  setNotices: (rows: InvoiceNotice[]) => void;
  issueOrder: (input: { unitId: number; responsible: string; supplier: string; qty: number; item: string; invoicedExcl: number }) => Order;
  setCost: (id: number, patch: Partial<Cost>) => void;
  addPhoto: (unitId: number, dataUrl: string) => void;
};

const PRICE = new Set<Role>(["director", "accounts", "stock", "sales"]);
export const seesPrice = (role?: Role) => !!role && PRICE.has(role);
export const seesCost = (role?: Role) => role === "director" || role === "accounts";

function now() {
  return new Date().toISOString();
}
function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function photoFor(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("trailer")) return "/brand/trailer.jpg";
  if (t.includes("truck") || t.includes("horse")) return "/brand/truck.jpg";
  return "/brand/tanker.jpg";
}
function blankCosts(unitId: number, start: number): Cost[] {
  return COST_LINES.map((name, i) => ({ id: start + i, unitId, name, supplier: "", qty: 0, unitPrice: 0, inv: "" }));
}

const initialCosts = seedUnits.flatMap((u, i) => blankCosts(u.id, i * 20 + 1));

export const useYard = create<State>()(
  persist(
    (set, get) => ({
      me: null,
      units: seedUnits.map((u) => ({ ...u, photos: [...u.photos] })),
      tasks: seedTasks.map((t) => ({ ...t })),
      logs: seedLogs.map((l) => ({ ...l })),
      pdi: seedPdi.map((p) => ({ ...p })),
      orders: [],
      quotes: [],
      invoices: [],
      notices: [],
      costs: initialCosts,
      signIn: (name, password) => {
        const staff = STAFF.find((s) => s.name === name);
        if (!staff || password !== "Test1234") return "Wrong name or password";
        set({ me: staff });
        return null;
      },
      signOut: () =>
        set({
          me: null,
          units: get().units.map((u) =>
            u.onHand ? { ...u, priceExcl: null, buyExcl: 0, vin: "", reg: "", sentence: "" } : { ...u, priceExcl: null, buyExcl: 0 },
          ),
        }),
      loadHand: (rows) => {
        const existing = get().units;
        const byWs = new Map(existing.map((u) => [u.ws, u]));
        let nextId = existing.reduce((m, u) => Math.max(m, u.id), 0) + 1;
        let taskId = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
        let costId = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
        const next: Unit[] = [];
        const seen = new Set<string>();
        const extraTasks: Task[] = [];
        const extraCosts: Cost[] = [];
        const extraQuotes: Quote[] = [];
        const extraInvoices: Invoice[] = [];
        const extraOrders: Order[] = [];
        let quoteId = get().quotes.reduce((m, q) => Math.max(m, q.id), 0) + 1;
        let invoiceId = get().invoices.reduce((m, i) => Math.max(m, i.id), 0) + 1;
        let orderId = get().orders.reduce((m, o) => Math.max(m, o.id), 0) + 1;
        for (const row of rows) {
          seen.add(row.ws);
          const prev = byWs.get(row.ws);
          if (prev) {
            next.push({
              ...prev,
              year: row.year || prev.year,
              make: row.make || prev.make,
              model: row.model || prev.model,
              description: row.description || prev.description,
              tag: row.tag || prev.tag,
              vin: row.vin,
              reg: row.reg,
              extras: row.extras,
              km: row.km,
              engine: row.engine,
              availability: row.availability,
              priceExcl: row.priceExcl,
              buyExcl: row.buyExcl == null ? prev.buyExcl : row.buyExcl,
              sentence: row.sentence || prev.sentence,
              client: row.client || prev.client,
              salesman: row.salesman || prev.salesman,
              invoiceNo: row.invoiceNo || prev.invoiceNo,
              invoiceStatus: row.invoiceStatus || prev.invoiceStatus,
              mainType: row.mainType || prev.mainType,
              subType: row.subType || prev.subType,
              loaded: row.loaded ?? prev.loaded,
              salesCode: row.salesCode || prev.salesCode,
              location: row.location || prev.location,
              priority: row.priority || prev.priority,
              onHand: true,
              step: row.step || prev.step || "On hand",
            });
          } else {
            const id = nextId++;
            const photo = photoFor(row.tag);
            next.push({
              id,
              ws: row.ws,
              jobNumber: "",
              year: row.year,
              make: row.make,
              model: row.model,
              description: row.description,
              tag: row.tag,
              vin: row.vin,
              reg: row.reg,
              client: row.client || "",
              salesman: row.salesman || "",
              seller: "",
              quoteNo: row.quote?.number || "",
              priceExcl: row.priceExcl,
              buyExcl: row.buyExcl || 0,
              invoiceNo: row.invoiceNo || "",
              invoiceStatus: row.invoiceStatus || "None",
              sentence: row.sentence,
              location: row.location || "Yard",
              status: row.step || "On hand",
              instructions: "",
              priority: row.priority || "Normal",
              due: "",
              photo,
              photos: [photo],
              cleared: true,
              step: row.step || "On hand",
              onHand: true,
              extras: row.extras,
              km: row.km,
              engine: row.engine,
              availability: row.availability,
              mainType: row.mainType,
              subType: row.subType,
              loaded: !!row.loaded,
              salesCode: row.salesCode || "",
            });
            extraCosts.push(...blankCosts(id, costId));
            costId += COST_LINES.length;
          }
          const unitId = prev?.id || next[next.length - 1].id;
          if (row.tasks?.length && !get().tasks.some((t) => t.unitId === unitId) && !extraTasks.some((t) => t.unitId === unitId)) {
            row.tasks.forEach((task) => {
              extraTasks.push({
                id: taskId++,
                unitId,
                job: task.job || "A",
                name: task.name,
                status: task.status || "Not Started",
                notes: "",
                location: task.location || "Yard",
                provider: task.provider || "",
                booked: "",
              });
            });
          }
          if (row.costs) {
            for (const line of row.costs) {
              const held = extraCosts.find((c) => c.unitId === unitId && c.name === line.name) || get().costs.find((c) => c.unitId === unitId && c.name === line.name);
              if (held) {
                if (held.qty === 0) Object.assign(held, line);
              } else {
                extraCosts.push({ id: costId++, unitId, ...line });
              }
            }
          }
          if (row.quote && !get().quotes.some((q) => q.unitId === unitId)) {
            extraQuotes.push({
              id: quoteId++,
              unitId,
              customer: row.quote.customer,
              phone: "",
              address: "",
              email: "",
              vatNo: "",
              code: row.quote.code,
              item: row.quote.item,
              sentence: row.quote.sentence,
              fee: row.quote.fee,
              tradeIn: row.quote.tradeIn,
              excl: row.quote.excl,
              vat: row.quote.vat,
              total: row.quote.total,
              followDay: row.quote.followDay,
              dueOn: row.quote.dueOn,
              result: "",
              at: now(),
              number: row.quote.number,
              make: row.quote.make,
              year: row.quote.year,
              vin: row.quote.vin,
              engine: row.quote.engine,
              reg: row.quote.reg,
              ws: row.quote.ws,
              lines: [{ description: row.quote.sentence, qty: 1, rate: Math.max(0, row.quote.excl - row.quote.fee) }],
            });
          }
          if (row.invoice && !get().invoices.some((i) => i.unitId === unitId)) {
            extraInvoices.push({ id: invoiceId++, unitId, ...row.invoice, at: now() });
          }
          if (row.orders) {
            for (const order of row.orders) {
              if (get().orders.some((o) => o.orderNo === order.orderNo)) continue;
              extraOrders.push({ id: orderId++, unitId, orderNo: order.orderNo, responsible: order.responsible, supplier: order.supplier, qty: order.qty, item: order.item, invoicedExcl: order.invoicedExcl || 0 });
            }
          }
        }
        for (const unit of existing) {
          if (!seen.has(unit.ws)) next.push(unit);
        }
        next.sort((a, b) => Number(!!b.onHand) - Number(!!a.onHand));
        set({
          units: next,
          tasks: extraTasks.length ? [...extraTasks, ...get().tasks] : get().tasks,
          costs: extraCosts.length ? [...extraCosts, ...get().costs] : get().costs,
          quotes: extraQuotes.length ? [...extraQuotes, ...get().quotes] : get().quotes,
          invoices: extraInvoices.length ? [...extraInvoices, ...get().invoices] : get().invoices,
          orders: extraOrders.length ? [...extraOrders, ...get().orders] : get().orders,
        });
      },
      openWs: (input) => {
        const { units, me } = get();
        let max = 9004;
        units.forEach((u) => {
          const n = Number(String(u.ws).replace(/\D/g, ""));
          if (n >= 9000 && n < 10000 && n > max) max = n;
        });
        const ws = "WS" + (max + 1);
        const id = units.reduce((m, u) => Math.max(m, u.id), 0) + 1;
        const photo = photoFor(input.tag || "TANKER");
        const unit: Unit = {
          id,
          ws,
          jobNumber: "",
          year: input.year || "",
          make: input.make || "",
          model: input.model || "",
          description: input.description || "",
          tag: input.tag || "TANKER",
          mainType: input.mainType,
          subType: input.subType,
          vin: input.vin || "",
          reg: "",
          client: "",
          salesman: "",
          seller: input.seller || "",
          quoteNo: "",
          priceExcl: Number(input.priceExcl || 0),
          buyExcl: Number(input.buyExcl || 0),
          invoiceNo: "",
          invoiceStatus: "None",
          sentence: input.sentence || `1 x Used ${input.year || ""} ${input.make || ""} ${input.description || ""}`.replace(/\s+/g, " ").trim(),
          location: "Yard",
          status: "WS opened",
          instructions: "",
          priority: "Normal",
          due: "",
          photo,
          photos: [photo],
          cleared: false,
          step: "WS opened",
        };
        const taskStart = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
        const jobA = tasksFor(input.mainType || "Fuel Tanker").map((name, i) => ({
          id: taskStart + i,
          unitId: id,
          job: "A",
          name,
          status: "Not Started",
          notes: "",
          location: "Yard",
          provider: "",
          booked: "",
        }));
        const costStart = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
        set({
          units: [unit, ...get().units],
          tasks: [...jobA, ...get().tasks],
          costs: [...blankCosts(id, costStart), ...get().costs],
          logs: [{ id: Date.now(), unitId: id, person: me?.name || "Chantelle", line: "Opened " + ws, at: now() }, ...get().logs],
        });
        return ws;
      },
      patchUnit: (id, patch) => set({ units: get().units.map((u) => (u.id === id ? { ...u, ...patch } : u)) }),
      clearUnit: (id) => {
        const me = get().me;
        set({
          units: get().units.map((u) => (u.id === id ? { ...u, cleared: true, step: "Cleared" } : u)),
          logs: [{ id: Date.now(), unitId: id, person: me?.name || "Director", line: "Cleared for quote", at: now() }, ...get().logs],
        });
      },
      setTask: (id, status, note) => {
        const me = get().me;
        const task = get().tasks.find((t) => t.id === id);
        if (!task) return null;
        const stamp = now().slice(0, 16).replace("T", " ") + " " + (me?.name || "Workshop");
        const line = task.name + " → " + status + (note ? " · " + note : "");
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, status, notes: note ? (t.notes ? t.notes + " | " : "") + stamp + ": " + note : t.notes } : t,
          ),
        });
        return line;
      },
      addTask: (unitId, name) => {
        const id = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
        set({ tasks: [{ id, unitId, job: "B", name, status: "Not Started", notes: "", location: "Yard", provider: "", booked: "" }, ...get().tasks] });
        return "Added " + name;
      },
      openJobCard: (input) => {
        const me = get().me;
        const unit = get().units.find((u) => u.id === input.unitId);
        if (!unit) return "";
        const hasTasks = get().tasks.some((t) => t.unitId === unit.id);
        let taskId = get().tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;
        const extra = hasTasks
          ? []
          : tasksFor(unit.mainType || "Fuel Tanker").map((name) => ({
              id: taskId++,
              unitId: unit.id,
              job: "B",
              name,
              status: "Not Started",
              notes: "",
              location: "Yard",
              provider: "",
              booked: "",
            }));
        const jobNumber = unit.jobNumber || "JC-" + unit.ws;
        set({
          units: get().units.map((u) =>
            u.id === unit.id
              ? {
                  ...u,
                  jobNumber,
                  quoteNo: input.quoteNo || u.quoteNo,
                  client: input.client || u.client,
                  salesman: me?.name || u.salesman,
                  vin: input.vin || u.vin,
                  reg: input.reg,
                  priority: input.priority || "Normal",
                  due: input.due,
                  instructions: input.instruction || u.instructions,
                  status: "Submitted to Workshop",
                  step: "Submitted to Workshop",
                }
              : u,
          ),
          tasks: extra.length ? [...extra, ...get().tasks] : get().tasks,
        });
        return "Job card opened · " + (input.quoteNo || "no quote") + (input.client ? " · " + input.client : "") + (input.instruction ? " · " + input.instruction : "");
      },
      rememberLog: (entry) => {
        if (get().logs.some((l) => String(l.id) === String(entry.id))) return;
        set({ logs: [entry, ...get().logs] });
      },
      takeServerLogs: (entries) => {
        const byWs = new Map(get().units.map((u) => [u.ws, u.id]));
        const known = new Set(get().logs.map((l) => String(l.id)));
        const added: Log[] = [];
        for (const entry of entries) {
          if (known.has(entry.id)) continue;
          const unitId = byWs.get(entry.ws);
          if (!unitId) continue;
          added.push({ id: entry.id, unitId, person: entry.person, line: entry.line, at: entry.at });
        }
        if (added.length) set({ logs: [...added, ...get().logs] });
      },
      setPdi: (id, status) => set({ pdi: get().pdi.map((p) => (p.id === id ? { ...p, status } : p)) }),
      submitQuote: (input) => {
        const me = get().me;
        const unit = get().units.find((u) => u.id === input.unitId);
        if (!unit) throw new Error("No unit");
        const lines = input.lines?.length ? input.lines : [{ description: unit.sentence, qty: 1, rate: Number(input.askExcl || 0) }];
        const goods = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
        const fee = 2500;
        const excl = goods + fee - Number(input.tradeIn || 0);
        const quote: Quote = {
          id: get().quotes.reduce((m, q) => Math.max(m, q.id), 0) + 1,
          unitId: unit.id,
          number: "C" + (20920 + get().quotes.length),
          customer: input.customer,
          phone: input.phone,
          address: input.address || "",
          email: input.email || "",
          vatNo: input.vatNo || "",
          code: me?.code || unit.salesCode || "",
          item: unit.ws + " " + unit.year + " " + unit.description,
          sentence: unit.sentence,
          fee,
          tradeIn: Number(input.tradeIn || 0),
          excl,
          vat: excl * 0.15,
          total: excl * 1.15,
          followDay: 1,
          dueOn: addDays(1),
          result: "",
          at: now(),
          make: unit.make,
          year: unit.year,
          vin: unit.vin,
          engine: unit.engine,
          reg: unit.reg,
          ws: unit.ws,
          lines,
        };
        set({
          quotes: [quote, ...get().quotes],
          units: get().units.map((u) =>
            u.id === unit.id
              ? { ...u, client: input.customer, salesman: me?.name || "", quoteNo: quote.number, priceExcl: Number(input.askExcl || 0), step: "Quoted" }
              : u,
          ),
        });
        return quote;
      },
      logQuote: (id, result) => {
        set({
          quotes: get().quotes.map((q) => {
            if (q.id !== id) return q;
            const next = q.followDay === 1 ? 3 : q.followDay === 3 ? 7 : 14;
            return { ...q, result, followDay: next, dueOn: addDays(next) };
          }),
        });
      },
      requestInvoice: (unitId, customer) => {
        const me = get().me;
        const unit = get().units.find((u) => u.id === unitId);
        const q = get().quotes.find((x) => x.unitId === unitId);
        const excl = q ? q.excl : Number(unit?.priceExcl || 0);
        const inv: Invoice = {
          id: get().invoices.reduce((m, i) => Math.max(m, i.id), 0) + 1,
          unitId,
          number: "INV-" + (8600 + get().invoices.length),
          customer: customer || unit?.client || "",
          salesman: me?.name || "",
          excl,
          vat: excl * 0.15,
          total: excl * 1.15,
          status: "Requested",
          at: now(),
        };
        set({
          invoices: [inv, ...get().invoices],
          units: get().units.map((u) =>
            u.id === unitId ? { ...u, invoiceNo: inv.number, invoiceStatus: "Requested", client: inv.customer, step: "Invoice requested" } : u,
          ),
          logs: [{ id: Date.now(), unitId, person: me?.name || "", line: "Invoice requested " + inv.number, at: now() }, ...get().logs],
        });
        return inv;
      },
      setNotices: (rows) => set({ notices: rows }),
      issueOrder: (input) => {
        const me = get().me;
        const unit = get().units.find((u) => u.id === input.unitId);
        if (!unit) throw new Error("No unit");
        const n = get().orders.filter((o) => o.unitId === unit.id).length + 1;
        const order: Order = {
          id: get().orders.reduce((m, o) => Math.max(m, o.id), 0) + 1,
          unitId: unit.id,
          orderNo: unit.ws + "-" + String(n).padStart(3, "0"),
          responsible: input.responsible,
          supplier: input.supplier,
          qty: input.qty,
          item: input.item,
          invoicedExcl: input.invoicedExcl,
        };
        const costId = get().costs.reduce((m, c) => Math.max(m, c.id), 0) + 1;
        set({
          orders: [order, ...get().orders],
          costs: [
            { id: costId, unitId: unit.id, name: input.item, supplier: input.supplier, qty: input.qty, unitPrice: input.qty ? input.invoicedExcl / input.qty : 0, inv: "" },
            ...get().costs,
          ],
          logs: [{ id: Date.now(), unitId: unit.id, person: me?.name || "Chantelle", line: order.orderNo + " marked " + input.responsible, at: now() }, ...get().logs],
        });
        return order;
      },
      setCost: (id, patch) => set({ costs: get().costs.map((c) => (c.id === id ? { ...c, ...patch } : c)) }),
      addPhoto: (unitId, dataUrl) => {
        const me = get().me;
        set({
          units: get().units.map((u) => (u.id === unitId ? { ...u, photo: dataUrl, photos: [dataUrl, ...u.photos] } : u)),
          logs: [{ id: Date.now(), unitId, person: me?.name || "Damian", line: "Picture loaded", at: now() }, ...get().logs],
        });
      },
    }),
    { name: "status-yard-v3" },
  ),
);
