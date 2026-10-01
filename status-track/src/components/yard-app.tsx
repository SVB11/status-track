import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Camera, ClipboardList, FileText, LogOut, Receipt, Share2, Wrench } from "lucide-react";
import {
  STAFF,
  seesCost,
  seesPrice,
  useYard,
  type Cost,
  type Invoice,
  type Quote,
  type Role,
  type Unit,
} from "@/lib/yard-store";
import { MAIN_TYPES, SUB_TYPES, TAGS } from "@/lib/yard-types";

const DESKS: Record<Role, string[]> = {
  director: ["Yard", "Job card", "Clear", "Board"],
  stock: ["Yard", "Load card", "Open WS", "Order", "Invoices"],
  sales: ["Yard", "Job card", "Quote", "Invoice", "Share", "Board"],
  workshop: ["Job cards"],
  accounts: ["Ledger", "Invoices"],
  marketing: ["Pictures"],
  admin: ["Natis", "Yard"],
};

function money(n: number | null | undefined) {
  if (n == null) return "Hidden";
  return "R " + Number(n).toLocaleString("en-ZA", { maximumFractionDigits: 0 });
}

async function saveLog(name: string, ws: string, line: string, kind: string) {
  const res = await fetch("/api/job-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password: "Test1234", action: "add", ws, line, kind }),
  });
  if (!res.ok) throw new Error("The log was not saved");
  return (await res.json()) as { entry: { id: string; person: string; line: string; at: string } };
}

function Gate() {
  const signIn = useYard((s) => s.signIn);
  const loadHand = useYard((s) => s.loadHand);
  const takeServerLogs = useYard((s) => s.takeServerLogs);
  const setNotices = useYard((s) => s.setNotices);
  const signOut = useYard((s) => s.signOut);
  const [name, setName] = useState(STAFF[4].name);
  const [password, setPassword] = useState("Test1234");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="grid min-h-screen md:grid-cols-[420px_1fr]">
      <aside className="flex flex-col justify-between bg-side px-8 py-10 text-sidefg">
        <div>
          <img src="/brand/status-logo.png" alt="Status Truck Sales" className="w-64" />
          <img src="/brand/slogan.png" alt="Quality, Reliability." className="mt-4 w-48" />
          <p className="mt-8 max-w-xs text-base leading-relaxed">
            Partner demo. Current stock stays behind this sign-in. Do not forward the link outside the yard.
          </p>
        </div>
        <p className="text-sm">148 Nolte Street, Bartlett · VAT 4840181335</p>
      </aside>
      <form
        className="flex items-center justify-center p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const local = signIn(name, password);
          if (local) {
            setErr(local);
            return;
          }
          setBusy(true);
          try {
            const res = await fetch("/api/yard", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, password }),
            });
            if (!res.ok) {
              signOut();
              setErr("Stock file refused");
              return;
            }
            const data = (await res.json()) as { units: Parameters<typeof loadHand>[0] };
            loadHand(data.units);
            const book = await fetch("/api/job-log", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, password, action: "list" }),
            });
            if (book.ok) {
              const saved = (await book.json()) as { logs: { id: string; ws: string; person: string; line: string; at: string }[] };
              takeServerLogs(saved.logs);
            }
            const notes = await fetch("/api/invoice-note", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, password, action: "list" }),
            });
            if (notes.ok) {
              const saved = (await notes.json()) as { notices: Parameters<typeof setNotices>[0] };
              setNotices(saved.notices || []);
            }
          } catch {
            signOut();
            setErr("Could not open the stock file");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="w-full max-w-md rounded-xl border border-line bg-card p-6">
          <h1 className="font-display text-3xl text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-muted">Password Test1234. Stock prices are not on the public page.</p>
          <label className="mt-5 block text-sm text-muted">
            Person
            <select className="mt-1 w-full rounded-lg border border-line bg-card px-3 py-3 text-ink" value={name} onChange={(e) => setName(e.target.value)}>
              {STAFF.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm text-muted">
            Password
            <input className="mt-1 w-full rounded-lg border border-line px-3 py-3 text-ink" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className="mt-5 min-h-11 w-full rounded-lg bg-blue px-4 text-card" type="submit" disabled={busy}>
            {busy ? "Opening stock…" : "Enter yard"}
          </button>
          {err ? <p className="mt-3 text-sm text-late">{err}</p> : null}
        </div>
      </form>
    </div>
  );
}

function Chip({ children, tone = "chip" }: { children: ReactNode; tone?: "chip" | "ok" | "warn" | "late" }) {
  const cls =
    tone === "ok" ? "bg-okbg text-ok" : tone === "warn" ? "bg-warnbg text-warn" : tone === "late" ? "bg-latebg text-late" : "bg-chip text-blue";
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs ${cls}`}>{children}</span>;
}

export function YardApp() {
  const me = useYard((s) => s.me);
  if (!me) return <Gate />;
  return <Shell />;
}

function Shell() {
  const me = useYard((s) => s.me)!;
  const signOut = useYard((s) => s.signOut);
  const desks = DESKS[me.role];
  const [desk, setDesk] = useState(desks[0]);
  const [unitId, setUnitId] = useState<number | null>(null);
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="bg-side px-3 py-4 text-sidefg">
        <img src="/brand/status-logo.png" alt="" className="mb-3 w-40" />
        <p className="px-2 text-xs uppercase tracking-wide text-muted">{me.role}</p>
        <p className="px-2 pb-3 text-sm">{me.name}{me.code ? " · " + me.code : ""}</p>
        <div className="flex gap-2 overflow-x-auto md:block">
          {desks.map((d) => (
            <button
              key={d}
              className={`mb-1 min-h-11 whitespace-nowrap rounded-lg px-3 text-left text-sm ${desk === d ? "bg-ink text-card" : "text-sidefg"}`}
              onClick={() => {
                setDesk(d);
                setUnitId(null);
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <button className="mt-4 flex min-h-11 items-center gap-2 px-3 text-sm" onClick={signOut}>
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b border-line bg-card px-4 py-3">
          <h1 className="font-display text-2xl">{desk}</h1>
          <span className="text-sm text-muted">{me.name}</span>
        </header>
        <main className="p-4">
          {me.role === "accounts" || me.role === "stock" ? <InvoiceAlert onOpen={() => setDesk("Invoices")} /> : null}
          {desk === "Yard" || desk === "Job cards" || desk === "Ledger" ? (
            <YardList mode={desk} onOpen={setUnitId} openId={unitId} />
          ) : null}
          {desk === "Load card" ? <LoadCard /> : null}
          {desk === "Open WS" ? <OpenWs /> : null}
          {desk === "Job card" ? <JobCard /> : null}
          {desk === "Clear" ? <ClearDesk /> : null}
          {desk === "Quote" ? <QuoteDesk /> : null}
          {desk === "Invoice" ? <InvoiceDesk /> : null}
          {desk === "Invoices" ? <InvoiceQueue /> : null}
          {desk === "Share" ? <ShareDesk /> : null}
          {desk === "Board" ? <Board /> : null}
          {desk === "Order" ? <OrderDesk /> : null}
          {desk === "Pictures" ? <PhotoDesk /> : null}
          {desk === "Natis" ? <Natis /> : null}
        </main>
      </div>
    </div>
  );
}

function YardList({ mode, onOpen, openId }: { mode: string; onOpen: (id: number) => void; openId: number | null }) {
  const units = useYard((s) => s.units);
  const tasks = useYard((s) => s.tasks);
  const me = useYard((s) => s.me)!;
  const withWork = useMemo(() => new Set(tasks.map((t) => t.unitId)), [tasks]);
  const [filter, setFilter] = useState(mode === "Job cards" ? "work" : "hand");
  const [tag, setTag] = useState("All");
  const rows = units.filter((u) => {
    if (tag !== "All" && u.tag !== tag) return false;
    if (filter === "hand") return !!u.onHand;
    if (filter === "work") return withWork.has(u.id);
    return true;
  });
  const handCount = units.filter((u) => u.onHand).length;
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        {mode === "Job cards"
          ? "No asking price. Tap a card, then a task. On hand is the current stock file."
          : mode === "Ledger"
            ? "Buy, client, work, salesman and the invoice requested. Asking price is the stock file. Buy is still entered here."
            : `${handCount} on hand. The tab is the yard group. The line under the unit is the label.`}
      </p>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["hand", "On hand"],
            ["work", "Job cards"],
            ["all", "All"],
          ] as const
        ).map(([key, label]) => (
          <button key={key} className={`min-h-11 rounded-lg border px-3 text-sm ${filter === key ? "border-blue bg-chip text-blue" : "border-line bg-card"}`} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {["All", ...TAGS].map((name) => {
          const count = units.filter((u) => u.onHand && (name === "All" || u.tag === name)).length;
          return (
            <button key={name} className={`min-h-11 shrink-0 rounded-full border px-3 text-sm ${tag === name ? "border-blue bg-chip text-blue" : "border-line bg-card"}`} onClick={() => setTag(name)}>
              {name === "All" ? `All ${count}` : `${name} ${count}`}
            </button>
          );
        })}
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr>
              <th className="p-2"></th>
              <th className="p-2">WS</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Client</th>
              <th className="p-2">Where</th>
              {seesPrice(me.role) ? <th className="p-2">Ask</th> : null}
              {seesCost(me.role) ? <th className="p-2">Buy</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="cursor-pointer border-t border-line" onClick={() => onOpen(u.id)}>
                <td className="p-2"><img src={u.photo} alt="" className="h-12 w-16 rounded-md object-cover" /></td>
                <td className="p-2 font-semibold">{u.ws}</td>
                <td className="p-2">{u.year} {u.make} {u.description}<br /><span className="text-muted">{u.tag}{u.subType ? " · " + u.subType : ""}</span></td>
                <td className="p-2">{u.client || "—"}<br /><span className="text-muted">{u.salesman}</span></td>
                <td className="p-2">{u.location}<br /><Chip tone={/completed/i.test(u.status) ? "ok" : "warn"}>{u.step || u.status}</Chip></td>
                {seesPrice(me.role) ? <td className="p-2">{money(u.priceExcl)}</td> : null}
                {seesCost(me.role) ? <td className="p-2">{money(u.buyExcl)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openId ? <UnitFile id={openId} start={mode === "Job cards" ? "Tasks" : mode === "Ledger" ? "Picture" : "File"} /> : null}
    </div>
  );
}

function UnitFile({ id, start }: { id: number; start: string }) {
  const me = useYard((s) => s.me)!;
  const unit = useYard((s) => s.units.find((u) => u.id === id));
  const allTasks = useYard((s) => s.tasks);
  const allLogs = useYard((s) => s.logs);
  const allPdi = useYard((s) => s.pdi);
  const allOrders = useYard((s) => s.orders);
  const allQuotes = useYard((s) => s.quotes);
  const allInvoices = useYard((s) => s.invoices);
  const allCosts = useYard((s) => s.costs);
  const tasks = useMemo(() => allTasks.filter((t) => t.unitId === id), [allTasks, id]);
  const logs = useMemo(() => allLogs.filter((l) => l.unitId === id), [allLogs, id]);
  const pdi = useMemo(() => allPdi.filter((p) => p.unitId === id), [allPdi, id]);
  const orders = useMemo(() => allOrders.filter((o) => o.unitId === id), [allOrders, id]);
  const quotes = useMemo(() => allQuotes.filter((q) => q.unitId === id), [allQuotes, id]);
  const invoices = useMemo(() => allInvoices.filter((i) => i.unitId === id), [allInvoices, id]);
  const costs = useMemo(() => allCosts.filter((c) => c.unitId === id), [allCosts, id]);
  const setTask = useYard((s) => s.setTask);
  const addTask = useYard((s) => s.addTask);
  const setPdi = useYard((s) => s.setPdi);
  const patchUnit = useYard((s) => s.patchUnit);
  const setCost = useYard((s) => s.setCost);
  const rememberLog = useYard((s) => s.rememberLog);
  const tabs = ["File", "Tasks", "PDI", "Orders", "Log"];
  if (seesPrice(me.role)) tabs.push("Quote");
  if (seesCost(me.role)) tabs.push("Picture", "Costs");
  const [tab, setTab] = useState(tabs.includes(start) ? start : "File");
  const [openTask, setOpenTask] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [logLine, setLogLine] = useState("");
  const [logErr, setLogErr] = useState("");
  const [newTask, setNewTask] = useState("");
  if (!unit) return null;
  const done = tasks.filter((t) => t.status === "Completed").map((t) => t.name).join(", ") || "None completed";
  const workshop = me.role === "workshop" || me.role === "director" || me.role === "stock";
  const canLog = workshop || me.role === "sales" || me.role === "admin";
  async function keep(line: string, kind: string) {
    try {
      const saved = await saveLog(me.name, unit!.ws, line, kind);
      rememberLog({ id: saved.entry.id, unitId: unit!.id, person: saved.entry.person, line: saved.entry.line, at: saved.entry.at });
      setLogErr("");
    } catch {
      setLogErr("Not on the book. Try the line again.");
    }
  }
  return (
    <section className="rounded-xl border border-line bg-card p-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} className={`min-h-11 rounded-lg border px-3 text-sm ${tab === t ? "border-blue bg-chip text-blue" : "border-line"}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {tab === "File" ? (
        <div className="grid gap-4 md:grid-cols-[280px_1fr]">
          <img src={unit.photo} alt="" className="h-44 w-full rounded-lg object-cover" />
          <div>
            <h2 className="font-display text-2xl">{unit.ws}</h2>
            <p>{unit.year} {unit.make} {unit.description}</p>
            <p className="text-sm text-muted">{unit.tag}{unit.subType ? " · " + unit.subType : ""}</p>
            {seesPrice(me.role) ? <p className="mt-2 text-sm">{unit.sentence}</p> : null}
            <p className="mt-2 text-sm text-muted">{me.role === "marketing" ? "VIN hidden" : unit.vin} · {unit.reg || "reg open"} · {unit.km || ""} · {unit.location}</p>
            <p className="mt-1 text-sm">{unit.availability || unit.step}{unit.extras ? " · " + unit.extras : ""}{unit.engine && unit.engine !== "N/A" ? " · " + unit.engine : ""}</p>
            <p className="mt-2 text-sm">Client {unit.client || "—"} · Sales {unit.salesman || "—"} · Invoice {unit.invoiceNo || "none"} ({unit.invoiceStatus})</p>
            <p className="mt-2">{seesPrice(me.role) ? "Ask " + money(unit.priceExcl) : "Price hidden"}{seesCost(me.role) ? " · Buy " + money(unit.buyExcl) : ""}</p>
            {unit.instructions ? <p className="mt-2 text-sm">{unit.instructions}</p> : null}
          </div>
        </div>
      ) : null}
      {tab === "Tasks" ? (
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm text-muted"><Wrench className="size-4" /> Folded work. Tap a line. A stamp cannot be deleted.</p>
          {tasks.map((t) => (
            <div key={t.id} className="border-b border-line py-2">
              <button className="flex w-full min-h-11 items-center justify-between text-left" onClick={() => setOpenTask(openTask === t.id ? null : t.id)}>
                <span>Job {t.job} · {t.name}</span>
                <Chip tone={t.status === "Completed" ? "ok" : t.status === "In Progress" ? "warn" : "chip"}>{t.status}</Chip>
              </button>
              {openTask === t.id ? (
                <div className="pb-2 pl-1 text-sm">
                  <p className="text-muted">{t.location || "Yard"} {t.provider} {t.booked}</p>
                  <p className="mt-1">{t.notes || "No note yet."}</p>
                  {workshop ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => { const line = setTask(t.id, "In Progress"); if (line) void keep(line, "progress"); }}>Start</button>
                      <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => { const line = setTask(t.id, "Completed", note); if (line) void keep(line, "progress"); }}>Done</button>
                      <input className="min-h-11 flex-1 rounded-lg border border-line px-3" placeholder="Short note" value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
          {workshop ? (
            <div className="mt-3 flex gap-2">
              <input className="min-h-11 flex-1 rounded-lg border border-line px-3" placeholder="Add a task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
              <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => { if (newTask.trim()) { const line = addTask(id, newTask.trim()); void keep(line, "task"); setNewTask(""); } }}>Add</button>
            </div>
          ) : null}
        </div>
      ) : null}
      {tab === "PDI" ? (
        pdi.length ? (
          <div className="text-sm">
            {pdi.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-2 border-b border-line py-2">
                <span><span className="text-muted">{p.section}</span><br />{p.item}</span>
                {workshop ? (
                  <select className="rounded-lg border border-line px-2 py-2" value={p.status} onChange={(e) => setPdi(p.id, e.target.value)}>
                    {["Pass", "Fail", "N/A", "Not Started", ""].map((s) => <option key={s}>{s}</option>)}
                  </select>
                ) : (
                  <Chip>{p.status || "Open"}</Chip>
                )}
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-muted">No PDI on this card yet.</p>
      ) : null}
      {tab === "Orders" ? (
        <div className="text-sm">
          {orders.length ? orders.map((o) => (
            <p key={o.id} className="border-b border-line py-2">{o.orderNo} · {o.responsible} · {o.supplier} · {o.qty} × {o.item}{seesCost(me.role) || me.role === "stock" ? " · " + money(o.invoicedExcl) : ""}</p>
          )) : <p className="text-muted">No order number yet.</p>}
        </div>
      ) : null}
      {tab === "Log" ? (
        <div className="text-sm">
          {canLog ? (
            <form className="mb-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!logLine.trim()) return; void keep(logLine.trim(), "note"); setLogLine(""); }}>
              <input className="min-h-11 flex-1 rounded-lg border border-line px-3" placeholder="One line. It cannot be deleted." value={logLine} onChange={(e) => setLogLine(e.target.value)} />
              <button className="min-h-11 rounded-lg bg-blue px-3 text-card" type="submit">Log</button>
            </form>
          ) : null}
          {logErr ? <p className="mb-2 text-late">{logErr}</p> : null}
          {logs.map((l) => <p key={l.id} className="border-b border-line py-2">{l.person} · {l.line} · {String(l.at).slice(0, 16).replace("T", " ")}</p>)}
        </div>
      ) : null}
      {tab === "Quote" ? (
        <div>{quotes.length ? quotes.map((q) => <QuotePaper key={q.id} q={q} />) : <p className="text-sm text-muted">No quote on this number.</p>}</div>
      ) : null}
      {tab === "Picture" && unit ? (
        <Picture unit={unit} done={done} invoices={invoices} onBuy={(buyExcl) => patchUnit(unit.id, { buyExcl })} />
      ) : null}
      {tab === "Costs" ? <CostTable rows={costs} onChange={setCost} /> : null}
    </section>
  );
}

function Picture({ unit, done, invoices, onBuy }: { unit: Unit; done: string; invoices: { number: string; customer: string; total: number; status: string }[]; onBuy: (n: number) => void }) {
  const [buy, setBuy] = useState(String(unit.buyExcl || ""));
  return (
    <div className="space-y-2 text-sm">
      <p>Buy {money(unit.buyExcl)} · Ask {money(unit.priceExcl)}</p>
      <p>Client {unit.client || "—"} · Sold by {unit.salesman || "—"}</p>
      <p>Work {done}</p>
      <p>Invoice {unit.invoiceNo || "none"} · {unit.invoiceStatus}</p>
      {invoices.map((i) => <p key={i.number}>{i.number} · {i.customer} · {money(i.total)} · {i.status}</p>)}
      <div className="flex gap-2 pt-2">
        <input className="min-h-11 rounded-lg border border-line px-3" value={buy} onChange={(e) => setBuy(e.target.value)} placeholder="Buy excl" />
        <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => onBuy(Number(buy || 0))}>Save buy</button>
      </div>
    </div>
  );
}

function CostTable({ rows, onChange }: { rows: Cost[]; onChange: (id: number, patch: Partial<Cost>) => void }) {
  const live = rows.filter((c) => c.qty > 0);
  const total = live.reduce((s, c) => s + c.qty * c.unitPrice, 0);
  return (
    <div className="text-sm">
      <p className="mb-2 text-muted">Qty 0 is skipped on the total.</p>
      {rows.map((c) => (
        <div key={c.id} className="mb-2 grid gap-2 border-b border-line pb-2 md:grid-cols-5">
          <span className="py-2">{c.name}</span>
          <input className="min-h-11 rounded-lg border border-line px-2" placeholder="Supplier" defaultValue={c.supplier} onBlur={(e) => onChange(c.id, { supplier: e.target.value })} />
          <input className="min-h-11 rounded-lg border border-line px-2" type="number" placeholder="Qty" defaultValue={c.qty} onBlur={(e) => onChange(c.id, { qty: Number(e.target.value || 0) })} />
          <input className="min-h-11 rounded-lg border border-line px-2" type="number" placeholder="Unit" defaultValue={c.unitPrice} onBlur={(e) => onChange(c.id, { unitPrice: Number(e.target.value || 0) })} />
          <span className="py-2">{c.qty > 0 ? money(c.qty * c.unitPrice) : "Skip"}</span>
        </div>
      ))}
      <p className="font-semibold">Cost total {money(total)}</p>
    </div>
  );
}

function QuotePaper({ q }: { q: Quote }) {
  const lines = q.lines?.length ? q.lines : [{ description: q.sentence, qty: 1, rate: Math.max(0, q.excl - q.fee + q.tradeIn) }];
  const goods = lines.reduce((sum, line) => sum + line.qty * line.rate, 0);
  const text = `PRO-FORMA TAX INVOICE ${q.number}\n${q.customer}\n${q.sentence}\nTOTAL ${money(q.total)}\nSUBJECT TO PRIOR SALE`;
  return (
    <article className="mb-4 rounded-lg border border-line bg-card p-4 text-sm">
      <img src="/brand/status-logo.png" alt="" className="w-44" />
      <p className="mt-2 text-xs text-muted">Trailerlink (Pty) Ltd<br />148 Nolte Street, Bartlett, Boksburg / PO Box 10407, Fonteinriet, 1464<br />Tel (011) 823 4516 / Fax (011) 823 3602 · VAT 4840181335</p>
      <h3 className="mt-3 font-display text-2xl">PRO-FORMA TAX INVOICE</h3>
      <p>Invoice no {q.number}<br />Date {q.at.slice(0, 10)}<br />WS code {q.ws || q.item}<br />Sales code {q.code}</p>
      <p className="mt-3"><b>Charged to</b><br />{q.customer}<br />{q.address}<br />Cell {q.phone || "—"} · {q.email}<br />VAT {q.vatNo || "—"}</p>
      <p className="mt-3 text-xs uppercase text-muted">Description</p>
      <table className="mt-1 w-full text-left">
        <thead><tr className="text-xs text-muted"><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="border-t border-line align-top">
              <td className="py-2 pr-2">{line.description}</td>
              <td className="py-2">{line.qty}</td>
              <td className="py-2">{money(line.rate)}</td>
              <td className="py-2">{money(line.qty * line.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted">Make {q.make || "—"} · Year {q.year || "—"}<br />Chassis no {q.vin || "—"}<br />Engine no {q.engine || "N/A"}<br />Reg no {q.reg || "—"}</p>
      <p className="mt-3">Goods {money(goods)}<br />Admin fee {money(q.fee)}<br />Sub total {money(goods + q.fee)}<br />Less trade-in / deposit {money(q.tradeIn)}<br />Plus 15% VAT {money(q.vat)}<br /><b>Total {money(q.total)}</b></p>
      <p className="mt-2 text-xs">SUBJECT TO PRIOR SALE<br />FNB East Rand Mall · Branch 253442 · Acc 620 162 916 77<br />Follow-up day {q.followDay} · {q.dueOn}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => { window.location.href = "mailto:?subject=" + encodeURIComponent("Pro-forma " + q.number) + "&body=" + encodeURIComponent(text); }}>Send</button>
        <button className="flex min-h-11 items-center gap-2 rounded-lg border border-line px-3" onClick={async () => {
          if (navigator.share) await navigator.share({ title: q.number, text });
          else { await navigator.clipboard.writeText(text); alert("Copied for WhatsApp"); }
        }}><Share2 className="size-4" /> Share</button>
      </div>
    </article>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm text-muted">{label}<div className="mt-1">{children}</div></label>;
}
const inputCls = "min-h-11 w-full rounded-lg border border-line bg-card px-3 text-ink";

function LoadCard() {
  const me = useYard((s) => s.me)!;
  const units = useYard((s) => s.units);
  const patchUnit = useYard((s) => s.patchUnit);
  const [err, setErr] = useState("");
  const rows = units.filter((u) => u.onHand);
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl">Load the quote onto the card</h2>
      <p className="text-sm text-muted">The description is already typed on the quote list. Chantelle loads it onto the WS. Sales can only make the pro-forma after that.</p>
      {err ? <p className="text-sm text-late">{err}</p> : null}
      {rows.map((u) => (
        <article key={u.id} className="rounded-xl border border-line bg-card p-4 text-sm">
          <p className="font-semibold">{u.ws} · {u.salesCode || "code open"} · {u.salesman || "no salesman"}</p>
          <p className="mt-1">{u.year} {u.make} {u.description}</p>
          <p className="mt-2">{u.sentence || "No pro-forma description on the quote list."}</p>
          <p className="mt-2">{seesPrice(me.role) ? money(u.priceExcl) + " excl" : "Price hidden"} · {u.vin}</p>
          <div className="mt-3">
            {u.loaded ? <Chip tone="ok">Loaded</Chip> : (
              <button
                className="min-h-11 rounded-lg bg-blue px-3 text-card"
                disabled={!u.sentence}
                onClick={async () => {
                  const res = await fetch("/api/yard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: me.name, password: "Test1234", action: "load", ws: u.ws }),
                  });
                  if (!res.ok) { setErr("The card was not loaded."); return; }
                  patchUnit(u.id, { loaded: true });
                  setErr("");
                }}
              >
                Load onto card
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
function OpenWs() {
  const openWs = useYard((s) => s.openWs);
  const [form, setForm] = useState({ seller: "", year: "2024", make: "", description: "", vin: "", priceExcl: "", buyExcl: "", tag: "TANKER", mainType: "Fuel Tanker", subType: "Tri-axle", sentence: "" });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <form className="max-w-3xl rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); const ws = openWs({ ...form, priceExcl: Number(form.priceExcl || 0), buyExcl: Number(form.buyExcl || 0) }); alert(ws + " opened. A director must clear it before a quote."); }}>
      <h2 className="mb-3 flex items-center gap-2 font-display text-2xl"><FileText className="size-5" /> Open a purchased unit</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Seller"><input className={inputCls} value={form.seller} onChange={(e) => set("seller", e.target.value)} /></Field>
        <Field label="Year"><input className={inputCls} value={form.year} onChange={(e) => set("year", e.target.value)} /></Field>
        <Field label="Make"><input className={inputCls} value={form.make} onChange={(e) => set("make", e.target.value)} /></Field>
        <Field label="Description"><input className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>
        <Field label="VIN"><input className={inputCls} value={form.vin} onChange={(e) => set("vin", e.target.value)} /></Field>
        <Field label="Tag"><select className={inputCls} value={form.tag} onChange={(e) => set("tag", e.target.value)}>{TAGS.map((tag) => <option key={tag}>{tag}</option>)}</select></Field>
        <Field label="Type"><select className={inputCls} value={form.mainType} onChange={(e) => set("mainType", e.target.value)}>{MAIN_TYPES.map((tag) => <option key={tag}>{tag}</option>)}</select></Field>
        <Field label="Sub type"><select className={inputCls} value={form.subType} onChange={(e) => set("subType", e.target.value)}>{SUB_TYPES.map((tag) => <option key={tag}>{tag}</option>)}</select></Field>
        <Field label="Ask excl"><input className={inputCls} type="number" value={form.priceExcl} onChange={(e) => set("priceExcl", e.target.value)} /></Field>
        <Field label="Buy excl"><input className={inputCls} type="number" value={form.buyExcl} onChange={(e) => set("buyExcl", e.target.value)} /></Field>
      </div>
      <Field label="Quote sentence"><input className={inputCls} value={form.sentence} onChange={(e) => set("sentence", e.target.value)} /></Field>
      <button className="mt-4 min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Open file</button>
    </form>
  );
}

function ClearDesk() {
  const units = useYard((s) => s.units.filter((u) => !u.cleared));
  const clearUnit = useYard((s) => s.clearUnit);
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <h2 className="font-display text-2xl">Clear before quote or share</h2>
      {units.length ? units.map((u) => (
        <p key={u.id} className="mt-3 flex items-center justify-between gap-3 text-sm">{u.ws} · {u.description} <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => clearUnit(u.id)}>Clear</button></p>
      )) : <p className="mt-2 text-sm text-muted">Nothing waiting. Restored cards are already cleared so sales can quote them.</p>}
    </div>
  );
}

function QuoteDesk() {
  const units = useYard((s) => s.units);
  const ready = units.filter((u) => u.loaded && u.sentence);
  const submit = useYard((s) => s.submitQuote);
  const [unitId, setUnitId] = useState(String(ready[0]?.id || ""));
  const unit = ready.find((u) => u.id === Number(unitId));
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [vatNo, setVatNo] = useState("");
  const [trade, setTrade] = useState("0");
  const [extra, setExtra] = useState("");
  const [extraRate, setExtraRate] = useState("");
  const [made, setMade] = useState<Quote | null>(null);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form className="rounded-xl border border-line bg-card p-4" onSubmit={(e) => {
        e.preventDefault();
        if (!unit || !customer.trim()) return;
        const lines = [{ description: unit.sentence, qty: 1, rate: Number(unit.priceExcl || 0) }];
        if (extra.trim()) lines.push({ description: extra.trim(), qty: 1, rate: Number(extraRate || 0) });
        setMade(submit({ unitId: unit.id, customer, phone, address, email, vatNo, askExcl: Number(unit.priceExcl || 0), tradeIn: Number(trade || 0), lines }));
      }}>
        <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><Receipt className="size-5" /> Pro-forma</h2>
        <p className="mb-3 text-sm text-muted">The description is the one Chantelle loaded. It is not retyped. Admin fee R 2 500. Subject to prior sale.</p>
        {ready.length ? (
          <Field label="Loaded card"><select className={inputCls} value={unitId} onChange={(e) => setUnitId(e.target.value)}>{ready.map((u) => <option key={u.id} value={u.id}>{u.ws} · {u.salesCode} · {u.description}</option>)}</select></Field>
        ) : <p className="text-sm text-late">No card loaded yet. Chantelle loads it from the quote list first.</p>}
        {unit ? <p className="mt-3 rounded-lg bg-paper p-3 text-sm">{unit.sentence}</p> : null}
        <Field label="Charged to"><input className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} required /></Field>
        <Field label="Address"><input className={inputCls} value={address} onChange={(e) => setAddress(e.target.value)} /></Field>
        <Field label="Cell"><input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
        <Field label="Email"><input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Customer VAT"><input className={inputCls} value={vatNo} onChange={(e) => setVatNo(e.target.value)} /></Field>
        <Field label="Trade-in excl"><input className={inputCls} type="number" value={trade} onChange={(e) => setTrade(e.target.value)} /></Field>
        <Field label="Extra line, if the quote has more than one item"><input className={inputCls} value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Optional extras" /></Field>
        <Field label="Extra rate excl"><input className={inputCls} type="number" value={extraRate} onChange={(e) => setExtraRate(e.target.value)} /></Field>
        <button className="mt-4 min-h-11 rounded-lg bg-blue px-4 text-card" type="submit" disabled={!unit}>Make pro-forma</button>
      </form>
      <div>{made ? <QuotePaper q={made} /> : <p className="text-sm text-muted">The pro-forma prints here. Four cards are already loaded so you can show a paper before Chantelle loads the rest.</p>}</div>
    </div>
  );
}

function TaxInvoice({ number, customer, unit, excl, vat, total, bank }: { number: string; customer: string; unit?: Unit; excl: number; vat: number; total: number; bank?: boolean }) {
  return (
    <article className="mt-4 rounded-lg border border-line p-4 text-sm">
      <img src="/brand/status-logo.png" alt="" className="w-44" />
      <h3 className="mt-2 font-display text-2xl">TAX INVOICE</h3>
      <p>Invoice no {number} · VAT NO 4840181335<br />WS code {unit?.ws} · Sales code {unit?.salesCode}</p>
      <p className="mt-2"><b>Charged to</b><br />{customer}</p>
      {bank ? <p className="mt-2">To be delivered on your behalf to: the financing bank</p> : null}
      <p className="mt-2">{unit?.sentence || unit?.description}</p>
      <p className="mt-2 text-xs text-muted">Make {unit?.make} · Year {unit?.year}<br />Chassis no {unit?.vin || "—"}<br />Engine no {unit?.engine || "N/A"}<br />Reg no {unit?.reg || "—"}</p>
      <p className="mt-2">Sub total {money(excl)}<br />Plus 15% VAT {money(vat)}<br /><b>Total {money(total)}</b></p>
      <p className="mt-2 text-xs">Bank First National Bank · Branch East Rand Mall · Branch no 253442 · Acc no 620 162 916 77<br />Contact Siegfried van Biljon</p>
    </article>
  );
}

function InvoiceDesk() {
  const me = useYard((s) => s.me)!;
  const units = useYard((s) => s.units);
  const request = useYard((s) => s.requestInvoice);
  const [unitId, setUnitId] = useState(String(units.find((u) => u.loaded)?.id || units[0]?.id || ""));
  const [customer, setCustomer] = useState("");
  const [made, setMade] = useState<Invoice | null>(null);
  const [note, setNote] = useState("");
  const unit = units.find((u) => u.id === Number(unitId));
  return (
    <div className="max-w-3xl">
      <form
        className="rounded-xl border border-line bg-card p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!unit) return;
          const inv = request(Number(unitId), customer);
          setMade(inv);
          const res = await fetch("/api/invoice-note", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: me.name,
              password: "Test1234",
              action: "add",
              ws: unit.ws,
              number: inv.number,
              customer: inv.customer,
              salesman: me.name,
              excl: inv.excl,
              vat: inv.vat,
              total: inv.total,
            }),
          });
          setNote(res.ok ? "Chantelle and Cindy have the notice to generate " + inv.number + "." : "The invoice is on this screen, but the notice did not go out.");
        }}
      >
        <h2 className="font-display text-2xl">Ask for the invoice</h2>
        <p className="mb-3 text-sm text-muted">Chantelle and Cindy are notified. They generate the client copy and the bank copy.</p>
        <Field label="Customer"><input className={inputCls} value={customer} onChange={(e) => setCustomer(e.target.value)} /></Field>
        <Field label="Unit"><select className={inputCls} value={unitId} onChange={(e) => setUnitId(e.target.value)}>{units.map((u) => <option key={u.id} value={u.id}>{u.ws} · {u.client || "no client"}</option>)}</select></Field>
        <button className="mt-4 min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Request invoice</button>
        {note ? <p className="mt-3 text-sm">{note}</p> : null}
      </form>
      {made && unit ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <TaxInvoice number={made.number} customer={made.customer} unit={unit} excl={made.excl} vat={made.vat} total={made.total} />
          <TaxInvoice number={made.number} customer={made.customer} unit={unit} excl={made.excl} vat={made.vat} total={made.total} bank />
        </div>
      ) : null}
    </div>
  );
}

function InvoiceAlert({ onOpen }: { onOpen: () => void }) {
  const notices = useYard((s) => s.notices);
  if (!notices.length) return null;
  return (
    <button className="mb-4 flex min-h-11 w-full items-center justify-between rounded-xl border border-late bg-latebg px-4 text-left text-sm text-late" onClick={onOpen}>
      <span>{notices.length} invoice{notices.length === 1 ? "" : "s"} to generate · {notices.map((n) => n.number + " " + n.ws).join(", ")}</span>
      <span>Open</span>
    </button>
  );
}

function InvoiceQueue() {
  const me = useYard((s) => s.me)!;
  const notices = useYard((s) => s.notices);
  const setNotices = useYard((s) => s.setNotices);
  const units = useYard((s) => s.units);
  const [openId, setOpenId] = useState<string | null>(notices[0]?.id || null);
  const open = notices.find((n) => n.id === openId) || notices[0];
  const unit = units.find((u) => u.ws === open?.ws);
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl">Generate the invoice</h2>
      <p className="mb-3 text-sm text-muted">Sales asked. Chantelle or Cindy prints the client copy and the bank copy, then marks it generated.</p>
      {notices.length ? notices.map((n) => (
        <button key={n.id} className={`mb-2 flex min-h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-sm ${open?.id === n.id ? "border-blue bg-chip" : "border-line bg-card"}`} onClick={() => setOpenId(n.id)}>
          <span>{n.number} · {n.ws} · {n.customer || "No customer"} · asked by {n.salesman}</span>
          <span>{money(n.total)}</span>
        </button>
      )) : <p className="text-sm text-muted">Nothing waiting.</p>}
      {open ? (
        <div className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <TaxInvoice number={open.number} customer={open.customer} unit={unit} excl={open.excl} vat={open.vat} total={open.total} />
            <TaxInvoice number={open.number} customer={open.customer} unit={unit} excl={open.excl} vat={open.vat} total={open.total} bank />
          </div>
          <button
            className="mt-3 min-h-11 rounded-lg bg-blue px-4 text-card"
            onClick={async () => {
              const res = await fetch("/api/invoice-note", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: me.name, password: "Test1234", action: "done", id: open.id }),
              });
              if (!res.ok) return;
              const data = (await res.json()) as { notices: typeof notices };
              setNotices(data.notices);
            }}
          >
            Mark generated
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ShareDesk() {
  const units = useYard((s) => s.units);
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><Share2 className="size-5" /> Share stock</h2>
      <p className="mb-3 text-sm text-muted">Price off. Damian’s pictures are on the unit.</p>
      {units.map((u) => {
        const text = `${u.year} ${u.description}. ${u.ws}. Price off.`;
        return (
          <p key={u.id} className="flex items-center gap-3 border-b border-line py-2 text-sm">
            <img src={u.photo} alt="" className="h-12 w-16 rounded-md object-cover" />
            <span className="flex-1">{u.ws} · {u.description}</span>
            <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={async () => {
              if (navigator.share) await navigator.share({ title: u.ws, text });
              else { await navigator.clipboard.writeText(text); alert("Copied. Paste into WhatsApp."); }
            }}>Share</button>
          </p>
        );
      })}
    </div>
  );
}

function Board() {
  const me = useYard((s) => s.me)!;
  const quotes = useYard((s) => s.quotes);
  const units = useYard((s) => s.units);
  const logQuote = useYard((s) => s.logQuote);
  const today = new Date().toISOString().slice(0, 10);
  const mine = quotes.filter((q) => q.code === me.code);
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><ClipboardList className="size-5" /> {me.code || "Sales"} board</h2>
      <p className="mb-3 text-sm text-muted">{me.name} only. Day 1, then 3, then 7, then 14. Log the result. Nobody else sees this board.</p>
      {mine.length ? mine.map((q) => {
        const late = q.dueOn < today && !q.result;
        const ws = units.find((u) => u.id === q.unitId)?.ws;
        return (
          <div key={q.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-sm">
            <span>{q.code} · {ws} · {q.customer}</span>
            <Chip tone={late ? "late" : "ok"}>Day {q.followDay} · {q.dueOn}</Chip>
            <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => { const result = window.prompt("One line result"); if (result) logQuote(q.id, result); }}>Log result</button>
          </div>
        );
      }) : <p className="text-sm text-muted">Nothing on this board.</p>}
    </div>
  );
}

function OrderDesk() {
  const units = useYard((s) => s.units);
  const issue = useYard((s) => s.issueOrder);
  const [unitId, setUnitId] = useState(String(units[0]?.id || ""));
  const [responsible, setResponsible] = useState("Jean-Pierre De Fillet");
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("1");
  const [amount, setAmount] = useState("0");
  const [msg, setMsg] = useState("");
  return (
    <form className="max-w-xl rounded-xl border border-line bg-card p-4" onSubmit={(e) => {
      e.preventDefault();
      const order = issue({ unitId: Number(unitId), responsible, supplier, item, qty: Number(qty || 1), invoicedExcl: Number(amount || 0) });
      setMsg(order.orderNo + " marked " + responsible);
    }}>
      <h2 className="font-display text-2xl">Order number</h2>
      <p className="mb-3 text-sm text-muted">WS####-001, then 002. Chantelle marks who booked it.</p>
      <Field label="Unit"><select className={inputCls} value={unitId} onChange={(e) => setUnitId(e.target.value)}>{units.map((u) => <option key={u.id} value={u.id}>{u.ws}</option>)}</select></Field>
      <Field label="Who booked it"><input className={inputCls} value={responsible} onChange={(e) => setResponsible(e.target.value)} /></Field>
      <Field label="Supplier"><input className={inputCls} value={supplier} onChange={(e) => setSupplier(e.target.value)} /></Field>
      <Field label="Item"><input className={inputCls} value={item} onChange={(e) => setItem(e.target.value)} required /></Field>
      <Field label="Qty"><input className={inputCls} type="number" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
      <Field label="Invoiced excl"><input className={inputCls} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></Field>
      <button className="mt-4 min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Issue number</button>
      {msg ? <p className="mt-3 text-sm">{msg}</p> : null}
    </form>
  );
}

function PhotoDesk() {
  const units = useYard((s) => s.units);
  const addPhoto = useYard((s) => s.addPhoto);
  const [unitId, setUnitId] = useState(String(units[0]?.id || ""));
  const unit = units.find((u) => u.id === Number(unitId));
  return (
    <div className="max-w-xl rounded-xl border border-line bg-card p-4">
      <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><Camera className="size-5" /> Load stock pictures</h2>
      <p className="mb-3 text-sm text-muted">Damian loads the picture. Sales shares it. Price stays off.</p>
      <Field label="Unit"><select className={inputCls} value={unitId} onChange={(e) => setUnitId(e.target.value)}>{units.map((u) => <option key={u.id} value={u.id}>{u.ws} · {u.description}</option>)}</select></Field>
      <Field label="Picture">
        <input className={inputCls} type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => addPhoto(Number(unitId), String(reader.result));
          reader.readAsDataURL(file);
        }} />
      </Field>
      {unit ? <img src={unit.photo} alt="" className="mt-4 h-48 w-full rounded-lg object-cover" /> : null}
    </div>
  );
}

function Natis() {
  const units = useYard((s) => s.units);
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <h2 className="mb-3 font-display text-2xl">Natis</h2>
      {units.map((u) => <p key={u.id} className="border-b border-line py-2 text-sm">{u.ws} · {u.vin || "VIN open"} · {u.reg || "reg open"} · {u.client || "no client"}</p>)}
    </div>
  );
}

const CARD_FLOW = ["Submitted to Workshop", "Accepted by Workshop", "In Progress", "Work Completed", "PDI Completed"];

function JobCard() {
  const me = useYard((s) => s.me)!;
  const units = useYard((s) => s.units);
  const tasks = useYard((s) => s.tasks);
  const logs = useYard((s) => s.logs);
  const openJobCard = useYard((s) => s.openJobCard);
  const patchUnit = useYard((s) => s.patchUnit);
  const setTask = useYard((s) => s.setTask);
  const addTask = useYard((s) => s.addTask);
  const rememberLog = useYard((s) => s.rememberLog);
  const [unitId, setUnitId] = useState(String(units.find((u) => u.onHand)?.id || units[0]?.id || ""));
  const unit = units.find((u) => u.id === Number(unitId));
  const [quoteNo, setQuoteNo] = useState("");
  const [client, setClient] = useState("");
  const [vin, setVin] = useState("");
  const [reg, setReg] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [due, setDue] = useState("");
  const [instruction, setInstruction] = useState("");
  const [line, setLine] = useState("");
  const [taskName, setTaskName] = useState("");
  const [err, setErr] = useState("");
  const [openTask, setOpenTask] = useState<number | null>(null);
  useEffect(() => {
    if (!unit) return;
    setQuoteNo(unit.quoteNo || "");
    setClient(unit.client || "");
    setVin(unit.vin || "");
    setReg(unit.reg || "");
    setPriority(unit.priority || "Normal");
    setDue(unit.due || "");
    setInstruction(unit.instructions || "");
  }, [unit]);
  if (!unit) return null;
  const cardTasks = tasks.filter((t) => t.unitId === unit.id);
  const cardLogs = logs.filter((l) => l.unitId === unit.id);
  const workshop = me.role === "workshop" || me.role === "director";
  async function keep(text: string, kind: string) {
    const saved = await saveLog(me.name, unit!.ws, text, kind);
    rememberLog({ id: saved.entry.id, unitId: unit!.id, person: saved.entry.person, line: saved.entry.line, at: saved.entry.at });
  }
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <form
        className="rounded-xl border border-line bg-card p-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!quoteNo.trim()) {
            setErr("A pro-forma or invoice number opens the card.");
            return;
          }
          const text = openJobCard({ unitId: unit.id, quoteNo: quoteNo.trim(), client: client.trim(), vin, reg, priority, due, instruction: instruction.trim() });
          try {
            await keep(text, "opened");
            setErr("");
          } catch {
            setErr("The card changed here, but the book did not take the log.");
          }
        }}
      >
        <h2 className="font-display text-2xl">Log a job card</h2>
        <p className="mb-3 text-sm text-muted">One card per WS. Pro-forma opens it. Invoice within 48 hours or workshop can cancel. Client name stays off certificates until paid.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Unit"><select className={inputCls} value={unitId} onChange={(e) => setUnitId(e.target.value)}>{units.map((u) => <option key={u.id} value={u.id}>{u.ws} · {u.mainType || u.tag} · {u.description}</option>)}</select></Field>
          <Field label="Quote or invoice"><input className={inputCls} value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} placeholder="C20920" /></Field>
          <Field label="Client"><input className={inputCls} value={client} onChange={(e) => setClient(e.target.value)} /></Field>
          <Field label="Priority"><select className={inputCls} value={priority} onChange={(e) => setPriority(e.target.value)}><option>Normal</option><option>High</option><option>Urgent</option></select></Field>
          <Field label="VIN"><input className={inputCls} value={vin} onChange={(e) => setVin(e.target.value)} /></Field>
          <Field label="Registration"><input className={inputCls} value={reg} onChange={(e) => setReg(e.target.value)} /></Field>
          <Field label="Target date"><input className={inputCls} type="date" value={due} onChange={(e) => setDue(e.target.value)} /></Field>
          <Field label="Instruction"><input className={inputCls} value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="One line for the workshop" /></Field>
        </div>
        <button className="mt-4 min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Log job card</button>
        {err ? <p className="mt-2 text-sm text-late">{err}</p> : null}
        {!unit.invoiceNo ? <p className="mt-2 text-sm text-warn">No invoice on this WS yet. 48 hours.</p> : null}
      </form>
      <section className="rounded-xl border border-line bg-card p-4">
        <p className="text-sm text-muted">{unit.ws} · {unit.mainType || unit.tag}{unit.subType ? " · " + unit.subType : ""} · {unit.jobNumber || "Not logged"}</p>
        <h3 className="font-display text-xl">{unit.year} {unit.description}</h3>
        <p className="mt-1 text-sm">{unit.status || "On hand"} · {unit.location} · {unit.salesman || me.name}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CARD_FLOW.map((status) => {
            const allowed = status === "Submitted to Workshop" ? me.role !== "workshop" : workshop;
            if (!allowed) return null;
            return (
              <button
                key={status}
                className={`min-h-11 rounded-lg border px-3 text-sm ${unit.status === status ? "border-blue bg-chip text-blue" : "border-line"}`}
                onClick={async () => {
                  patchUnit(unit.id, { status, step: status });
                  try { await keep("Status · " + status, "progress"); setErr(""); } catch { setErr("Status changed here, but the book did not take the log."); }
                }}
              >
                {status}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          {cardTasks.map((t) => (
            <div key={t.id} className="border-b border-line py-2 text-sm">
              <button className="flex min-h-11 w-full items-center justify-between text-left" onClick={() => setOpenTask(openTask === t.id ? null : t.id)}>
                <span>{t.name}</span>
                <Chip tone={t.status === "Completed" ? "ok" : t.status === "In Progress" ? "warn" : "chip"}>{t.status}</Chip>
              </button>
              {openTask === t.id && workshop ? (
                <div className="flex gap-2 pb-2">
                  <button className="min-h-11 rounded-lg border border-line px-3" onClick={async () => { const text = setTask(t.id, "In Progress"); if (text) await keep(text, "progress"); }}>Start</button>
                  <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={async () => { const text = setTask(t.id, "Completed"); if (text) await keep(text, "progress"); }}>Done</button>
                </div>
              ) : null}
            </div>
          ))}
          <div className="mt-3 flex gap-2">
            <input className="min-h-11 flex-1 rounded-lg border border-line px-3" placeholder="Add one task" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <button className="min-h-11 rounded-lg border border-line px-3" onClick={async () => { if (!taskName.trim()) return; const text = addTask(unit.id, taskName.trim()); setTaskName(""); try { await keep(text, "task"); } catch { setErr("Task added here, but the book did not take the log."); } }}>Add</button>
          </div>
        </div>
      </section>
      <section className="rounded-xl border border-line bg-card p-4">
        <h3 className="font-display text-xl">Book</h3>
        <p className="mb-2 text-sm text-muted">Saved on the yard book. A line cannot be removed.</p>
        <form className="mb-3 flex gap-2" onSubmit={async (e) => { e.preventDefault(); if (!line.trim()) return; try { await keep(line.trim(), "note"); setLine(""); setErr(""); } catch { setErr("The book did not take that line."); } }}>
          <input className="min-h-11 flex-1 rounded-lg border border-line px-3" placeholder="What happened" value={line} onChange={(e) => setLine(e.target.value)} />
          <button className="min-h-11 rounded-lg bg-blue px-3 text-card" type="submit">Log</button>
        </form>
        {cardLogs.length ? cardLogs.map((l) => (
          <p key={l.id} className="border-b border-line py-2 text-sm">{l.person} · {l.line} · {String(l.at).slice(0, 16).replace("T", " ")}</p>
        )) : <p className="text-sm text-muted">Nothing on the book for this WS yet.</p>}
      </section>
    </div>
  );
}

