import { useEffect, useState, type ReactNode } from "react";
import { ClipboardList, FileText, LogOut, Receipt, Share2, Wrench } from "lucide-react";

type Role = "director" | "accounts" | "stock" | "sales" | "workshop" | "marketing" | "admin";
type Unit = {
  id: number; ws: string; year: string; make: string; model: string; description: string; extras: string; km: string;
  vin: string; engine: string; reg: string; tag: string; mainType: string; subType: string; priceExcl: number | null;
  buyExcl: number | null; sentence: string; loaded: boolean; salesCode: string; salesman: string; client: string;
  quoteNo: string; invoiceNo: string; invoiceStatus: string; status: string; location: string; priority: string;
  due: string; instructions: string; jobNumber: string; photo: string; onHand: boolean;
};
type Task = { id: number; ws: string; job: string; name: string; status: string; notes: string; location: string; provider: string };
type Log = { id: string; ws: string; person: string; line: string; kind: string; at: string };
type Quote = { id: number; ws: string; number: string; customer: string; phone: string; address: string; email: string; vatNo: string; code: string; sentence: string; fee: number; tradeIn: number; excl: number; vat: number; total: number; followDay: number; dueOn: string; result: string; at: string; make: string; year: string; vin: string; engine: string; reg: string; lines: { description: string; qty: number; rate: number }[] };
type Order = { id: number; ws: string; orderNo: string; responsible: string; supplier: string; qty: number; item: string; quotedExcl: number | null; invoicedExcl: number | null; notes: string };
type Cost = { id: number; ws: string; name: string; supplier: string; description: string; unitPrice: number; qty: number; inv: string };
type Notice = { id: string; ws: string; number: string; customer: string; salesman: string; excl: number; vat: number; total: number; at: string; status: string };
type Ask = { id: number; ws: string; salesman: string; code: string; customer: string; discount: number; crossBorder: boolean };
type Offer = { id: number; ws: string; selling: number; profit: number; estimated: number; tankerFixed: number; offer: number; month: number; cleared: { sebastian: boolean; fanie: boolean; siegfried: boolean } };
type Yard = { role: Role; units: Unit[]; tasks: Task[]; logs: Log[]; quotes: Quote[]; asks: Ask[]; offers: Offer[]; orders: Order[]; costs: Cost[]; notices: Notice[] };
type Me = { name: string; role: Role; code: string };

const NAMES = ["Sebastian van Biljon", "Siegfried van Biljon", "Cindy", "Chantelle", "Fanie van Biljon", "Stanley Johnson", "Drickus van Biljon", "Calvin Kempenaar", "Rob Ling", "Jean-Pierre De Fillet", "Louis Koekemoer", "Tiaan Van Wyk", "Damian", "Andre", "Tanita van Biljon", "William"];
const TAGS = ["TANKER", "TRUCK TRACTOR", "TRAILER", "RIGID", "SIDE TIPPER", "TIPPER TRUCK"];
const DESKS: Record<Role, string[]> = {
  director: ["Jobs", "Yard", "Offer", "Quote", "Invoice", "Board"],
  stock: ["Jobs", "Yard", "Load card", "Order", "Invoices"],
  sales: ["Jobs", "Yard", "Offer", "Quote", "Invoice", "Share", "Board"],
  workshop: ["Jobs", "Job A"],
  accounts: ["Jobs", "Ledger", "Invoices"],
  marketing: ["Jobs", "Pictures"],
  admin: ["Jobs", "Natis", "Yard"],
};
const FLOW = ["Submitted to Workshop", "Accepted by Workshop", "In Progress", "Work Completed", "PDI Completed"];

function money(n: number | null | undefined) {
  if (n == null) return "Hidden";
  return "R " + Number(n).toLocaleString("en-ZA", { maximumFractionDigits: 0 });
}
function when(value: string) {
  return String(value || "").slice(0, 16).replace("T", " ");
}

async function call(name: string, action: string, body: Record<string, string | number> = {}) {
  const res = await fetch("/api/yard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password: "Test1234", action, ...body }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Not saved");
  return data as Yard;
}

export function YardApp() {
  const [me, setMe] = useState<Me | null>(null);
  const [yard, setYard] = useState<Yard | null>(null);
  const [err, setErr] = useState("");
  const [name, setName] = useState("Fanie van Biljon");
  if (!me || !yard) {
    return (
      <form className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-3 p-6" onSubmit={async (e) => {
        e.preventDefault();
        try {
          const data = await call(name, "list");
          const code = data.quotes[0]?.code || (name.includes("Sebastian") ? "BVB" : name.includes("Fanie") ? "FVB" : name.includes("Stanley") ? "SJ" : name.includes("Drickus") ? "DVB" : name.includes("Siegfried") ? "SVB" : "");
          setMe({ name, role: data.role, code });
          setYard(data);
          setErr("");
        } catch (error) {
          setErr(error instanceof Error ? error.message : "Sign-in failed");
        }
      }}>
        <img src="/brand/status-logo.png" alt="Status Truck Sales" className="w-48" />
        <h1 className="font-display text-3xl">Status Track</h1>
        <p className="text-sm text-muted">One yard book. Password Test1234. Workshop does not see price.</p>
        <select className="min-h-11 rounded-lg border border-line px-3" value={name} onChange={(e) => setName(e.target.value)}>{NAMES.map((person) => <option key={person}>{person}</option>)}</select>
        <input className="min-h-11 rounded-lg border border-line px-3" type="password" defaultValue="Test1234" />
        <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Sign in</button>
        {err ? <p className="text-sm text-late">{err}</p> : null}
      </form>
    );
  }
  return <Shell me={me} yard={yard} setYard={setYard} onOut={() => { setMe(null); setYard(null); }} />;
}

function Shell({ me, yard, setYard, onOut }: { me: Me; yard: Yard; setYard: (yard: Yard) => void; onOut: () => void }) {
  const desks = DESKS[me.role];
  const [desk, setDesk] = useState(desks[0]);
  const [err, setErr] = useState("");
  async function run(action: string, body: Record<string, string | number> = {}) {
    try {
      setYard(await call(me.name, action, body));
      setErr("");
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Not saved");
    }
  }
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      <aside className="bg-side px-3 py-4 text-sidefg">
        <img src="/brand/status-logo.png" alt="" className="mb-3 w-40" />
        <p className="px-2 text-xs uppercase">{me.role}</p>
        <p className="px-2 pb-3 text-sm">{me.name}{me.code ? " · " + me.code : ""}</p>
        {desks.map((item) => <button key={item} className={`mb-1 min-h-11 w-full rounded-lg px-3 text-left text-sm ${desk === item ? "bg-ink text-card" : ""}`} onClick={() => setDesk(item)}>{item}</button>)}
        <button className="mt-4 flex min-h-11 items-center gap-2 px-3 text-sm" onClick={onOut}><LogOut className="size-4" /> Sign out</button>
      </aside>
      <main className="p-4">
        <h1 className="mb-3 font-display text-2xl">{desk}</h1>
        {err ? <p className="mb-3 text-sm text-late">{err}</p> : null}
        {(me.role === "stock" || me.role === "accounts") && yard.notices.length ? <button className="mb-3 min-h-11 w-full rounded-lg bg-latebg px-3 text-left text-sm text-late" onClick={() => setDesk("Invoices")}>{yard.notices.length} invoice(s) to generate</button> : null}
        {desk === "Yard" || desk === "Job cards" || desk === "Ledger" ? <YardList me={me} yard={yard} run={run} /> : null}
        {desk === "Load card" ? <LoadCard yard={yard} run={run} /> : null}
        {desk === "Jobs" ? <Jobs me={me} /> : null}
        {desk === "Quote" ? <QuoteDesk me={me} yard={yard} run={run} /> : null}
        {desk === "Offer" ? <OfferDesk me={me} yard={yard} run={run} /> : null}
        {desk === "Job A" ? <JobA yard={yard} run={run} /> : null}
        {desk === "Invoice" ? <InvoiceDesk yard={yard} run={run} /> : null}
        {desk === "Invoices" ? <InvoiceQueue yard={yard} run={run} /> : null}
        {desk === "Board" ? <Board me={me} yard={yard} run={run} /> : null}
        {desk === "Order" ? <OrderDesk yard={yard} run={run} /> : null}
        {desk === "Share" ? <ShareDesk yard={yard} /> : null}
        {desk === "Pictures" ? <PhotoDesk yard={yard} /> : null}
        {desk === "Natis" ? <Natis yard={yard} /> : null}
      </main>
    </div>
  );
}

function YardList({ me, yard, run }: { me: Me; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const rows = yard.units.filter((unit) => unit.onHand && (tag === "All" || unit.tag === tag));
  const unit = yard.units.find((row) => row.ws === open);
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto">
        {["All", ...TAGS].map((name) => {
          const count = yard.units.filter((unit) => unit.onHand && (name === "All" || unit.tag === name)).length;
          return <button key={name} className={`min-h-11 shrink-0 rounded-full border px-3 text-sm ${tag === name ? "border-blue bg-chip text-blue" : "border-line"}`} onClick={() => setTag(name)}>{name} {count}</button>;
        })}
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-card">
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.ws} className="cursor-pointer border-t border-line" onClick={() => setOpen(row.ws)}>
                <td className="p-2"><img src={row.photo} alt="" className="h-12 w-16 rounded-md object-cover" /></td>
                <td className="p-2 font-semibold">{row.ws}</td>
                <td className="p-2">{row.year} {row.make} {row.description}<br /><span className="text-muted">{row.tag} · {row.subType}</span></td>
                <td className="p-2">{row.client || "—"}<br /><span className="text-muted">{row.salesman}</span></td>
                <td className="p-2">{row.status}</td>
                {me.role !== "workshop" && me.role !== "marketing" ? <td className="p-2">{money(row.priceExcl)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {unit ? <UnitFile me={me} unit={unit} yard={yard} run={run} /> : null}
    </div>
  );
}

function UnitFile({ me, unit, yard, run }: { me: Me; unit: Unit; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const tasks = yard.tasks.filter((task) => task.ws === unit.ws);
  const logs = yard.logs.filter((log) => log.ws === unit.ws);
  const orders = yard.orders.filter((order) => order.ws === unit.ws);
  const costs = yard.costs.filter((cost) => cost.ws === unit.ws && cost.qty > 0);
  const [tab, setTab] = useState(me.role === "workshop" ? "Work" : "File");
  const [note, setNote] = useState("");
  const [line, setLine] = useState("");
  const workshop = me.role === "workshop" || me.role === "director";
  const costTotal = costs.reduce((sum, cost) => sum + cost.qty * cost.unitPrice, 0);
  return (
    <section className="rounded-xl border border-line bg-card p-4">
      <p className="text-sm text-muted">{unit.ws} · {unit.tag} · {unit.subType} · {unit.jobNumber || "No job card"}</p>
      <h2 className="font-display text-2xl">{unit.year} {unit.make} {unit.description}</h2>
      <div className="my-3 flex flex-wrap gap-2">{["File", "Work", "Orders", "Costs", "Log", "Print"].map((item) => <button key={item} className={`min-h-11 rounded-lg border px-3 text-sm ${tab === item ? "border-blue bg-chip text-blue" : "border-line"}`} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === "File" ? <p className="text-sm">VIN {unit.vin || "—"} · Reg {unit.reg || "—"} · {unit.km}<br />Client {unit.client || "—"} · Sales {unit.salesman || "—"} · {unit.quoteNo || "No quote"} · {unit.invoiceNo || "No invoice"}<br />{me.role === "workshop" ? "Price hidden" : "Ask " + money(unit.priceExcl)}{unit.buyExcl != null ? " · Buy " + money(unit.buyExcl) : ""}</p> : null}
      {tab === "Work" ? (
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm text-muted"><Wrench className="size-4" /> One line each. A stamp cannot be deleted.</p>
          {tasks.map((task) => (
            <div key={task.id} className="border-b border-line py-2 text-sm">
              <p>{task.job} · {task.name} · {task.status}</p>
              <p className="text-muted">{task.notes || "No stamp yet."}</p>
              {workshop ? <div className="mt-1 flex gap-2"><button className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("task", { id: task.id, status: "In Progress", note })}>Start</button><button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => run("task", { id: task.id, status: "Completed", note })}>Done</button></div> : null}
            </div>
          ))}
          {workshop ? <input className="mt-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Short note on the stamp" value={note} onChange={(e) => setNote(e.target.value)} /> : null}
        </div>
      ) : null}
      {tab === "Orders" ? <div className="text-sm">{orders.length ? orders.map((order) => <p key={order.id} className="border-b border-line py-2">{order.orderNo} · {order.responsible} · {order.supplier} · {order.qty} × {order.item}{order.invoicedExcl != null ? " · " + money(order.invoicedExcl) : ""}</p>) : <p className="text-muted">No order number yet. Chantelle issues WS####-001.</p>}</div> : null}
      {tab === "Costs" ? <div className="text-sm">{me.role === "director" || me.role === "accounts" ? <>{costs.map((cost) => <p key={cost.id} className="border-b border-line py-2">{cost.name} · {cost.supplier || "—"} · {cost.qty} × {money(cost.unitPrice)} = {money(cost.qty * cost.unitPrice)} · {cost.inv}</p>)}<p className="pt-2 font-semibold">Total {money(costTotal)}. Qty 0 is left off.</p><CostEdit costs={yard.costs.filter((cost) => cost.ws === unit.ws)} run={run} /></> : <p className="text-muted">Cost is Sebastian, Siegfried and Cindy only.</p>}</div> : null}
      {tab === "Log" ? (
        <div className="text-sm">
          <form className="mb-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (line.trim()) { void run("log", { ws: unit.ws, line }); setLine(""); } }}><input className="min-h-11 flex-1 rounded-lg border border-line px-3" value={line} onChange={(e) => setLine(e.target.value)} placeholder="One line. It cannot be deleted." /><button className="min-h-11 rounded-lg bg-blue px-3 text-card">Log</button></form>
          {logs.map((log) => <p key={log.id} className="border-b border-line py-2">{log.person} · {log.line} · {when(log.at)}</p>)}
        </div>
      ) : null}
      {tab === "Print" ? <Print unit={unit} tasks={tasks} orders={orders} costs={costs} showCost={me.role === "director" || me.role === "accounts"} /> : null}
    </section>
  );
}

function CostEdit({ costs, run }: { costs: Cost[]; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [id, setId] = useState(String(costs[0]?.id || ""));
  const [qty, setQty] = useState("1");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [inv, setInv] = useState("");
  return (
    <form className="mt-3 grid gap-2 md:grid-cols-5" onSubmit={(e) => { e.preventDefault(); void run("cost", { id: Number(id), qty: Number(qty), unitPrice: Number(price), supplier, inv, description: "" }); }}>
      <select className="min-h-11 rounded-lg border border-line px-2" value={id} onChange={(e) => setId(e.target.value)}>{costs.map((cost) => <option key={cost.id} value={cost.id}>{cost.name}</option>)}</select>
      <input className="min-h-11 rounded-lg border border-line px-2" placeholder="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
      <input className="min-h-11 rounded-lg border border-line px-2" type="number" placeholder="Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
      <input className="min-h-11 rounded-lg border border-line px-2" type="number" placeholder="Unit price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input className="min-h-11 rounded-lg border border-line px-2" placeholder="Inv #" value={inv} onChange={(e) => setInv(e.target.value)} />
      <button className="min-h-11 rounded-lg bg-blue px-3 text-card" type="submit">Save cost</button>
    </form>
  );
}

function Print({ unit, tasks, orders, costs, showCost }: { unit: Unit; tasks: Task[]; orders: Order[]; costs: Cost[]; showCost: boolean }) {
  const done = tasks.filter((task) => task.status === "Completed");
  const total = costs.reduce((sum, cost) => sum + cost.qty * cost.unitPrice, 0);
  return (
    <article className="text-sm">
      <img src="/brand/status-logo.png" alt="" className="w-40" />
      <h3 className="mt-2 font-display text-xl">Job file {unit.ws}</h3>
      <p>{unit.year} {unit.make} {unit.description}<br />VIN {unit.vin || "—"} · Reg {unit.reg || "—"} · Client {unit.client || "—"}</p>
      <h4 className="mt-3 font-semibold">Work done</h4>
      {done.length ? done.map((task) => <p key={task.id}>{task.name} · {task.notes || "Completed"}</p>) : <p>None completed.</p>}
      <h4 className="mt-3 font-semibold">Orders</h4>
      {orders.length ? orders.map((order) => <p key={order.id}>{order.orderNo} · {order.responsible} · {order.qty} × {order.item}</p>) : <p>None.</p>}
      {showCost ? <><h4 className="mt-3 font-semibold">Costs</h4>{costs.map((cost) => <p key={cost.id}>{cost.name} · {cost.qty} × {money(cost.unitPrice)} · {cost.inv}</p>)}<p>Total {money(total)}</p></> : null}
      <p className="mt-4">Workshop signature ____________________ &nbsp; Sales signature ____________________</p>
      <button className="mt-3 min-h-11 rounded-lg border border-line px-3" onClick={() => window.print()}>Print</button>
    </article>
  );
}

function LoadCard({ yard, run }: { yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">The description is already typed on the quote list. Load it onto the WS before sales can make the pro-forma.</p>
      {yard.units.filter((unit) => unit.onHand).map((unit) => (
        <article key={unit.ws} className="rounded-xl border border-line bg-card p-4 text-sm">
          <p className="font-semibold">{unit.ws} · {unit.salesCode || "code open"} · {unit.salesman || "no salesman"} · {unit.tag}</p>
          <p className="mt-1">{unit.sentence || "No pro-forma description on the quote list."}</p>
          <p className="mt-1">{money(unit.priceExcl)} excl</p>
          {unit.loaded ? <p className="mt-2 text-ok">Loaded</p> : <button className="mt-2 min-h-11 rounded-lg bg-blue px-3 text-card" disabled={!unit.sentence} onClick={() => run("load", { ws: unit.ws })}>Load onto card</button>}
          {yard.asks.filter((ask) => ask.ws === unit.ws).map((ask) => (
            <p key={ask.id} className="mt-2">Ask from {ask.salesman} · {ask.customer}{ask.discount ? " · discount " + money(ask.discount) + " needs a director" : ""}{ask.crossBorder ? " · cross border" : ""}
              {ask.discount ? null : <button className="ml-2 min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => run("issue", { ws: unit.ws })}>Issue C-number</button>}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}

function JobCard({ me, yard, run }: { me: Me; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [ws, setWs] = useState(yard.units.find((unit) => unit.onHand)?.ws || "");
  const unit = yard.units.find((row) => row.ws === ws);
  const [quoteNo, setQuoteNo] = useState(unit?.quoteNo || "");
  const [client, setClient] = useState(unit?.client || "");
  const [instruction, setInstruction] = useState("");
  const [task, setTask] = useState("");
  const [line, setLine] = useState("");
  const tasks = yard.tasks.filter((row) => row.ws === ws);
  const logs = yard.logs.filter((row) => row.ws === ws);
  const workshop = me.role === "workshop" || me.role === "director";
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <form className="rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("job", { ws, quoteNo, client, vin: unit?.vin || "", reg: unit?.reg || "", priority: "Normal", due: "", instruction }); }}>
        <h2 className="font-display text-2xl">Log a job card</h2>
        <p className="mb-3 text-sm text-muted">One card per WS. A pro-forma number opens it. Invoice within 48 hours.</p>
        <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{yard.units.map((row) => <option key={row.ws} value={row.ws}>{row.ws} · {row.tag} · {row.description}</option>)}</select>
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Quote or invoice number" value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Client" value={client} onChange={(e) => setClient(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="One instruction" value={instruction} onChange={(e) => setInstruction(e.target.value)} />
        <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Log job card</button>
        {!unit?.invoiceNo ? <p className="mt-2 text-sm text-warn">No invoice on this WS yet. 48 hours.</p> : null}
      </form>
      {unit ? (
        <section className="rounded-xl border border-line bg-card p-4 text-sm">
          <p>{unit.ws} · {unit.status} · {unit.jobNumber || "Not logged"}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FLOW.map((status) => (status === "Submitted to Workshop" || workshop ? <button key={status} className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("status", { ws, status })}>{status}</button> : null))}
          </div>
          {tasks.map((item) => <p key={item.id} className="border-b border-line py-2">{item.name} · {item.status}{workshop ? <button className="ml-2 underline" onClick={() => run("task", { id: item.id, status: "Completed", note: "" })}>Done</button> : null}</p>)}
          <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (task.trim()) { void run("add-task", { ws, task }); setTask(""); } }}><input className="min-h-11 flex-1 rounded-lg border border-line px-3" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add one task" /><button className="min-h-11 rounded-lg border border-line px-3">Add</button></form>
        </section>
      ) : null}
      <section className="rounded-xl border border-line bg-card p-4 text-sm">
        <h3 className="font-display text-xl">Book</h3>
        <form className="mb-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (line.trim()) { void run("log", { ws, line }); setLine(""); } }}><input className="min-h-11 flex-1 rounded-lg border border-line px-3" value={line} onChange={(e) => setLine(e.target.value)} placeholder="What happened" /><button className="min-h-11 rounded-lg bg-blue px-3 text-card">Log</button></form>
        {logs.map((log) => <p key={log.id} className="border-b border-line py-2">{log.person} · {log.line} · {when(log.at)}</p>)}
      </section>
    </div>
  );
}

function QuoteDesk({ me, yard, run }: { me: Me; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const ready = yard.units.filter((unit) => unit.loaded && unit.sentence);
  const [ws, setWs] = useState(ready[0]?.ws || "");
  const unit = ready.find((row) => row.ws === ws);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [vatNo, setVatNo] = useState("");
  const [tradeIn, setTradeIn] = useState("0");
  const [extra, setExtra] = useState("");
  const [extraRate, setExtraRate] = useState("");
  const [discount, setDiscount] = useState("0");
  const [cross, setCross] = useState(false);
  const made = yard.quotes.find((quote) => quote.ws === ws);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form className="rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("quote", { ws, customer, phone, address, email, vatNo, tradeIn: Number(tradeIn), extra, extraRate: Number(extraRate || 0), discount: Number(discount || 0), crossBorder: cross ? 1 : 0 }); }}>
        <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><Receipt className="size-5" /> Ask for the pro-forma</h2>
        <p className="mb-3 text-sm text-muted">Chantelle issues the C-number. Spec and list price stay locked. A discount needs Sebastian or Siegfried before she can issue it.</p>
        {ready.length ? <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{ready.map((row) => <option key={row.ws} value={row.ws}>{row.ws} · {row.salesCode} · {row.description}</option>)}</select> : <p className="text-sm text-late">Chantelle has not loaded a card yet.</p>}
        {unit ? <p className="mb-2 rounded-lg bg-paper p-3 text-sm">{unit.sentence}</p> : null}
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Charged to" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Cell" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Customer VAT" value={vatNo} onChange={(e) => setVatNo(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Trade-in excl" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Extra line, if needed" value={extra} onChange={(e) => setExtra(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Extra rate excl" value={extraRate} onChange={(e) => setExtraRate(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Discount excl, if any" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        <label className="mb-2 flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={cross} onChange={(e) => setCross(e.target.checked)} /> Outside SA · VAT 0 · R 10 000 export fee</label>
        <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit" disabled={!unit}>Ask Chantelle</button>
        {me.role === "director" ? yard.asks.filter((ask) => ask.discount > 0).map((ask) => <button key={ask.id} className="mt-2 min-h-11 rounded-lg border border-line px-3" onClick={() => run("clear-discount", { ws: ask.ws })}>Clear discount on {ask.ws}</button>) : null}
      </form>
      <div>{made ? <QuotePaper q={made} /> : <p className="text-sm text-muted">The pro-forma prints here.</p>}</div>
    </div>
  );
}

function QuotePaper({ q }: { q: Quote }) {
  const text = `PRO-FORMA TAX INVOICE ${q.number}\n${q.customer}\n${q.sentence}\nTOTAL ${money(q.total)}\nSUBJECT TO PRIOR SALE`;
  return (
    <article className="rounded-lg border border-line bg-card p-4 text-sm">
      <img src="/brand/status-logo.png" alt="" className="w-40" />
      <p className="mt-2 text-xs text-muted">Trailerlink (Pty) Ltd · 148 Nolte Street, Bartlett, Boksburg<br />Tel (011) 823 4516 / Fax (011) 823 3602 · VAT 4840181335</p>
      <h3 className="mt-2 font-display text-2xl">PRO-FORMA TAX INVOICE</h3>
      <p>Invoice no {q.number}<br />WS code {q.ws} · Sales code {q.code}<br />Charged to {q.customer}<br />{q.address}<br />Cell {q.phone || "—"} · VAT {q.vatNo || "—"}</p>
      {q.lines.map((line, index) => <p key={index} className="mt-2">{line.qty} × {line.description}<br />{money(line.rate)} · {money(line.qty * line.rate)}</p>)}
      <p className="mt-2 text-xs text-muted">Make {q.make} · Year {q.year}<br />Chassis {q.vin || "—"} · Engine {q.engine || "N/A"} · Reg {q.reg || "—"}</p>
      <p className="mt-2">Admin fee {money(q.fee)}<br />Less trade-in {money(q.tradeIn)}<br />VAT 15% {money(q.vat)}<br /><b>Total {money(q.total)}</b></p>
      <p className="mt-2 text-xs">SUBJECT TO PRIOR SALE<br />FNB East Rand Mall · 253442 · 620 162 916 77<br />Follow-up day {q.followDay} · {q.dueOn}</p>
      <div className="mt-3 flex gap-2">
        <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => { window.location.href = "mailto:?subject=" + encodeURIComponent("Pro-forma " + q.number) + "&body=" + encodeURIComponent(text); }}>Send</button>
        <button className="flex min-h-11 items-center gap-2 rounded-lg border border-line px-3" onClick={() => navigator.clipboard.writeText(text)}><Share2 className="size-4" /> Share</button>
      </div>
    </article>
  );
}

function InvoiceDesk({ yard, run }: { yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [ws, setWs] = useState(yard.units[0]?.ws || "");
  const [customer, setCustomer] = useState("");
  return (
    <form className="max-w-xl rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("invoice", { ws, customer }); }}>
      <h2 className="font-display text-2xl">Ask for the invoice</h2>
      <p className="mb-3 text-sm text-muted">Chantelle and Cindy get the notice to generate the client copy and the bank copy.</p>
      <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{yard.units.map((unit) => <option key={unit.ws} value={unit.ws}>{unit.ws} · {unit.client || "no client"}</option>)}</select>
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
      <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Request invoice</button>
    </form>
  );
}

function InvoiceQueue({ yard, run }: { yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [id, setId] = useState(yard.notices[0]?.id || "");
  const note = yard.notices.find((row) => row.id === id) || yard.notices[0];
  const unit = yard.units.find((row) => row.ws === note?.ws);
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl">Generate the invoice</h2>
      {yard.notices.length ? yard.notices.map((item) => <button key={item.id} className="mb-2 flex min-h-11 w-full items-center justify-between rounded-lg border border-line px-3 text-left text-sm" onClick={() => setId(item.id)}><span>{item.number} · {item.ws} · {item.customer} · {item.salesman}</span><span>{money(item.total)}</span></button>) : <p className="text-sm text-muted">Nothing waiting.</p>}
      {note && unit ? (
        <div className="mt-3 grid gap-3 lg:grid-cols-2 text-sm">
          <article className="rounded-lg border border-line p-3"><h3 className="font-display text-xl">TAX INVOICE</h3><p>{note.number} · VAT 4840181335<br />{note.customer}<br />{unit.sentence || unit.description}<br />Chassis {unit.vin}<br />Total {money(note.total)}<br />FNB East Rand Mall · 253442 · 620 162 916 77</p></article>
          <article className="rounded-lg border border-line p-3"><h3 className="font-display text-xl">TAX INVOICE · bank</h3><p>To be delivered on your behalf to the financing bank.<br />{note.number} · {unit.ws}<br />Total {money(note.total)}</p></article>
          <button className="min-h-11 rounded-lg bg-blue px-4 text-card" onClick={() => run("invoice-done", { id: note.id })}>Mark generated</button>
        </div>
      ) : null}
    </div>
  );
}

function Board({ me, yard, run }: { me: Me; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const today = new Date().toISOString().slice(0, 10);
  const mine = yard.quotes.filter((quote) => quote.code === me.code);
  const late = me.role === "director" ? yard.quotes.filter((quote) => quote.dueOn < today && !quote.result && quote.code !== me.code) : [];
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><ClipboardList className="size-5" /> {me.code || "Sales"} board</h2>
      <p className="mb-3 text-sm text-muted">{me.name} sees {me.code || "this desk"} only. A quote with no log by the due date goes red for Sebastian and Siegfried.</p>
      {mine.map((quote) => (
        <div key={quote.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-sm">
          <span>{quote.code} · {quote.ws} · {quote.customer}</span>
          <span className={quote.dueOn < today && !quote.result ? "text-late" : ""}>Day {quote.followDay} · {quote.dueOn}</span>
          <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => { const result = window.prompt("One line result"); if (result) void run("board", { id: quote.id, result }); }}>Log result</button>
        </div>
      ))}
      {late.map((quote) => (
        <div key={quote.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-sm text-late">
          <span>Late · {quote.code} · {quote.ws} · {quote.customer}</span>
          <button className="min-h-11 rounded-lg border border-late px-3" onClick={() => { const result = window.prompt("Reassign note"); if (result) void run("board", { id: quote.id, result }); }}>Log</button>
        </div>
      ))}
      {!mine.length && !late.length ? <p className="text-sm text-muted">Nothing on this board.</p> : null}
    </div>
  );
}

function OfferDesk({ me, yard, run }: { me: Me; yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [ws, setWs] = useState(yard.units[0]?.ws || "");
  const unit = yard.units.find((row) => row.ws === ws);
  const [selling, setSelling] = useState(String(unit?.priceExcl || ""));
  const [profit, setProfit] = useState("150000");
  const [estimated, setEstimated] = useState("40000");
  const offer = yard.offers.find((row) => row.ws === ws);
  const ready = offer && offer.cleared.sebastian && offer.cleared.fanie && offer.cleared.siegfried;
  return (
    <form className="max-w-xl rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("offer", { ws, selling: Number(selling), profit: Number(profit), estimated: Number(estimated) }); }}>
      <h2 className="font-display text-2xl">Offer</h2>
      <p className="mb-3 text-sm text-muted">Selling minus profit target minus estimated cost. A tanker also deducts barrel, SLP, calibration, paint and tyres. PDF only after Sebastian, Fanie and Siegfried have cleared it.</p>
      <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{yard.units.map((row) => <option key={row.ws} value={row.ws}>{row.ws} · {row.tag}</option>)}</select>
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Selling excl" value={selling} onChange={(e) => setSelling(e.target.value)} />
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Profit target" value={profit} onChange={(e) => setProfit(e.target.value)} />
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Estimated cost" value={estimated} onChange={(e) => setEstimated(e.target.value)} />
      <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Work the offer</button>
      {offer ? <p className="mt-3 text-sm">Offer {money(offer.offer)} · interest after 30 days {money(offer.month)} · after 60 {money(offer.month * 2)}<br />Cleared: Sebastian {offer.cleared.sebastian ? "yes" : "no"} · Fanie {offer.cleared.fanie ? "yes" : "no"} · Siegfried {offer.cleared.siegfried ? "yes" : "no"}</p> : null}
      {me.code === "BVB" || me.code === "SVB" || me.code === "FVB" ? <button className="mt-2 min-h-11 rounded-lg border border-line px-3" type="button" onClick={() => run("clear-offer", { ws })}>Clear as {me.code}</button> : null}
      <button className="mt-2 min-h-11 rounded-lg border border-line px-3" type="button" disabled={!ready} onClick={() => window.print()}>{ready ? "Print offer PDF" : "PDF locked until all three clear"}</button>
      <p className="mt-2 text-xs">OFFER VALID, SUBJECT TO FINAL INSPECTION. Seller invoices Trailerlink.</p>
    </form>
  );
}

function JobA({ yard, run }: { yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [ws, setWs] = useState(yard.units[0]?.ws || "");
  return (
    <div className="max-w-xl rounded-xl border border-line bg-card p-4">
      <h2 className="font-display text-2xl">Job A</h2>
      <p className="mb-3 text-sm text-muted">Workshop opens it. Sebastian approves. Siegfried if he is away. Sales see progress, not cost.</p>
      <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{yard.units.map((unit) => <option key={unit.ws} value={unit.ws}>{unit.ws} · {unit.status}</option>)}</select>
      <button className="min-h-11 rounded-lg bg-blue px-4 text-card" onClick={() => run("job-a", { ws })}>Open Job A</button>
      <button className="ml-2 min-h-11 rounded-lg border border-line px-4" onClick={() => run("approve-a", { ws })}>Approve</button>
    </div>
  );
}

function OrderDesk({ yard, run }: { yard: Yard; run: (action: string, body?: Record<string, string | number>) => Promise<void> }) {
  const [ws, setWs] = useState(yard.units[0]?.ws || "");
  const [responsible, setResponsible] = useState("Jean-Pierre De Fillet");
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("1");
  const [quotedExcl, setQuoted] = useState("");
  return (
    <form className="max-w-xl rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("order", { ws, responsible, supplier, item, qty: Number(qty), quotedExcl: Number(quotedExcl || 0), notes: "" }); }}>
      <h2 className="mb-2 flex items-center gap-2 font-display text-2xl"><FileText className="size-5" /> Order number</h2>
      <p className="mb-3 text-sm text-muted">Next number is WS####-001, then 002. A letter suffix stays on the base, like WS4518D-001.</p>
      <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={ws} onChange={(e) => setWs(e.target.value)}>{yard.units.map((unit) => <option key={unit.ws} value={unit.ws}>{unit.ws}</option>)}</select>
      <select className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" value={responsible} onChange={(e) => setResponsible(e.target.value)}><option>Jean-Pierre De Fillet</option><option>Louis Koekemoer</option><option>Tiaan Van Wyk</option></select>
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Supplier / workshop" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
      <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="number" placeholder="Quoted excl" value={quotedExcl} onChange={(e) => setQuoted(e.target.value)} />
      <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Issue number</button>
      <div className="mt-3 text-sm">{yard.orders.filter((order) => order.ws === ws).map((order) => <p key={order.id}>{order.orderNo} · {order.responsible} · {order.item}</p>)}</div>
    </form>
  );
}

function ShareDesk({ yard }: { yard: Yard }) {
  return (
    <div className="space-y-3">
      {yard.units.filter((unit) => unit.onHand).map((unit) => {
        const text = `${unit.year} ${unit.make} ${unit.description}. ${unit.ws}. Price off.`;
        return <p key={unit.ws} className="flex items-center justify-between gap-2 rounded-xl border border-line bg-card p-3 text-sm"><span>{unit.ws} · {unit.description}</span><button className="min-h-11 rounded-lg border border-line px-3" onClick={() => navigator.clipboard.writeText(text)}>Share</button></p>;
      })}
    </div>
  );
}

function PhotoDesk({ yard }: { yard: Yard }) {
  return <div className="text-sm text-muted">Damian’s picture desk. Sales share the stock photo already on the card. Upload stays on the unit picture in the next pass. {yard.units.length} units on the book.</div>;
}

function Natis({ yard }: { yard: Yard }) {
  return <div className="rounded-xl border border-line bg-card p-4 text-sm">{yard.units.map((unit) => <p key={unit.ws} className="border-b border-line py-2">{unit.ws} · {unit.vin || "VIN open"} · {unit.reg || "reg open"} · {unit.client || "no client"}</p>)}</div>;
}

type Card = { id: string; kind: "sold" | "showroom"; ws: string; make: string; year: string; type: string; subType: string; vin: string; reg: string; quoteNo: string; client: string; priority: string; due: string; salesman: string; status: string; acceptedBy: string; approved: boolean; closed: boolean; location: string; morning: string; pdiSales: string; pdiWorkshop: string; readySales: boolean; readyWorkshop: boolean; tasks: { id: number; name: string; selected: boolean; status: string; note: string; approved: boolean }[]; parts: { id: number; name: string; qty: number; orderNo: string; status: string; inv: string }[]; logs: { id: string; person: string; line: string; at: string }[] };

function Jobs({ me }: { me: Me }) {
  const [book, setBook] = useState<{ cards: Card[]; types: string[] }>({ cards: [], types: [] });
  const [err, setErr] = useState("");
  const [kind, setKind] = useState<"sold" | "showroom">("sold");
  const [ws, setWs] = useState("");
  const [make, setMake] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("Fuel Tanker");
  const [sub, setSub] = useState("Tri-axle");
  const [vin, setVin] = useState("");
  const [reg, setReg] = useState("");
  const [quoteNo, setQuote] = useState("");
  const [client, setClient] = useState("");
  const [due, setDue] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [list, setList] = useState<"sold" | "showroom" | "closed">("sold");
  useEffect(() => { void run("list"); }, []);
  async function run(action: string, body: Record<string, string | number | string[]> = {}) {
    const res = await fetch("/api/job-card", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: me.name, password: "Test1234", action, ...body }) });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Not saved"); return; }
    setBook(data);
    setErr("");
  }
  const card = book.cards.find((row) => row.id === open);
  const rows = book.cards.filter((row) => list === "closed" ? row.closed : !row.closed && row.kind === list);
  const workshop = me.role === "workshop" || me.role === "director" || me.role === "admin" || me.role === "accounts";
  const admin = me.role === "director" || me.role === "admin" || me.role === "accounts" || me.name === "Chantelle" || me.name === "Tanita van Biljon";
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["sold", "showroom", "closed"] as const).map((item) => <button key={item} className={`min-h-11 rounded-full border px-3 text-sm ${list === item ? "border-blue bg-chip text-blue" : "border-line"}`} onClick={() => { setList(item); void run("list"); }}>{item}</button>)}
      </div>
      {err ? <p className="text-sm text-late">{err}</p> : null}
      <form className="rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); void run("create", { kind, ws, make, year, type, subType: sub, vin, reg, quoteNo, client, due, tasks: picked }); }}>
        <h2 className="font-display text-2xl">{kind === "sold" ? "Sold job" : "Showroom job"}</h2>
        <p className="mb-2 text-sm text-muted">Sales name fills as {me.name}. Showroom waits for admin. Tasks start unticked.</p>
        <div className="mb-2 flex gap-2"><button type="button" className="min-h-11 rounded-lg border px-3" onClick={() => setKind("sold")}>Sold</button><button type="button" className="min-h-11 rounded-lg border px-3" onClick={() => setKind("showroom")}>Showroom</button></div>
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="WS number" value={ws} onChange={(e) => setWs(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Make and model" value={make} onChange={(e) => setMake(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Type, e.g. Fuel Tanker" value={type} onChange={(e) => setType(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Sub-type, e.g. tri-axle" value={sub} onChange={(e) => setSub(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Registration" value={reg} onChange={(e) => setReg(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Quote or invoice number" value={quoteNo} onChange={(e) => setQuote(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Client" value={client} onChange={(e) => setClient(e.target.value)} />
        <input className="mb-2 min-h-11 w-full rounded-lg border border-line px-3" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <div className="mb-2 flex flex-wrap gap-2 text-sm">{["Roadworthy", "Brake tests", "Wash / clean", "Touch-ups", "Pressure test (SLP)", "DEKRA spec"].map((task) => <label key={task} className="flex items-center gap-1"><input type="checkbox" checked={picked.includes(task)} onChange={(e) => setPicked(e.target.checked ? [...picked, task] : picked.filter((item) => item !== task))} />{task}</label>)}</div>
        <button className="min-h-11 rounded-lg bg-blue px-4 text-card" type="submit">Submit to workshop</button>
      </form>
      {me.role === "marketing" ? <form className="rounded-xl border border-line bg-card p-4" onSubmit={(e) => { e.preventDefault(); const box = new FormData(e.currentTarget); void run("wash", { ws: String(box.get("ws") || ""), note: String(box.get("note") || "") }); }}><h2 className="font-display text-xl">Wash</h2><input name="ws" className="mt-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="WS number" /><input name="note" className="mt-2 min-h-11 w-full rounded-lg border border-line px-3" placeholder="Make, type, note" /><button className="mt-2 min-h-11 rounded-lg bg-blue px-4 text-card">Book wash</button></form> : null}
      <div className="rounded-xl border border-line bg-card">
        {rows.map((row) => <button key={row.id} className="block w-full border-b border-line px-3 py-3 text-left text-sm" onClick={() => setOpen(row.id)}>{row.kind} · {row.ws} · {row.make} · {row.status} · {row.location}{row.closed ? "" : row.morning === new Date().toISOString().slice(0, 10) ? "" : " · location open"}</button>)}
        {!rows.length ? <p className="p-3 text-sm text-muted">No jobs on this list. Live jobs are not imported.</p> : null}
      </div>
      {card ? (
        <section className="rounded-xl border border-line bg-card p-4 text-sm">
          <p className="font-semibold">{card.ws} · {card.type} · {card.subType} · {card.status}</p>
          <p>Client {card.client} · {card.quoteNo} · VIN {card.vin} · {card.reg} · Due {card.due} · Accepted by {card.acceptedBy || "—"}</p>
          {!card.approved && admin ? <button className="mt-2 min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => run("approve", { id: card.id })}>Approve showroom</button> : null}
          {card.approved && card.status === "Submitted to Workshop" && workshop ? <button className="mt-2 min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => run("accept", { id: card.id })}>Accept</button> : null}
          {workshop && !card.morning ? <button className="mt-2 min-h-11 rounded-lg border border-line px-3" onClick={() => run("morning", { id: card.id })}>Confirm location {card.location}</button> : null}
          {card.tasks.filter((task) => task.selected).map((task) => (
            <div key={task.id} className={`border-b border-line py-2 ${task.status === "Fail" || task.name.includes("fail") ? "text-late" : ""}`}>
              <p>{task.name} · {task.status}{task.approved ? "" : " · waiting admin"}</p>
              <p className="text-muted">{task.note}</p>
              {workshop && task.approved ? <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => { const note = window.prompt("Short work line") || ""; void run("task", { id: card.id, taskId: task.id, status: "Completed", note, location: card.location, provider: task.name === "Roadworthy" ? "East Rand Testing Station" : "" }); }}>Stamp done</button> : null}
              {!task.approved && admin ? <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("approve-extra", { id: card.id, taskId: task.id })}>Approve extra</button> : null}
            </div>
          ))}
          {workshop ? <button className="mt-2 min-h-11 rounded-lg border border-line px-3" onClick={() => { const task = window.prompt("Extra task"); if (task) void run("extra", { id: card.id, task }); }}>Add extra</button> : null}
          <h3 className="mt-3 font-semibold">Parts</h3>
          {card.parts.map((part) => <p key={part.id}>{part.orderNo || "no order yet"} · {part.qty} × {part.name} · {part.status} {admin ? <button className="underline" onClick={() => run("lock", { id: card.id, partId: part.id, status: "Ordered", inv: "", price: 0 })}>Issue order number</button> : null}</p>)}
          {workshop ? <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => { const item = window.prompt("Part"); if (item) void run("part", { id: card.id, item, qty: 1 }); }}>Add part</button> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("pdi", { id: card.id, side: me.role === "workshop" ? "workshop" : "sales", pass: "1" })}>Sign PDI</button>
            <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("pdi", { id: card.id, side: me.role === "workshop" ? "workshop" : "sales", pass: "0" })}>PDI fail</button>
            <button className="min-h-11 rounded-lg border border-line px-3" onClick={() => run("ready", { id: card.id, side: me.role === "workshop" ? "workshop" : "sales" })}>Mark ready</button>
            {me.role !== "workshop" ? <button className="min-h-11 rounded-lg bg-blue px-3 text-card" onClick={() => run("deliver", { id: card.id })}>Delivered</button> : null}
          </div>
          <p className="mt-2 text-muted">PDI sales {card.pdiSales || "—"} · workshop {card.pdiWorkshop || "—"} · ready {card.readySales ? "sales" : ""} {card.readyWorkshop ? "workshop" : ""}</p>
          {card.logs.map((log) => <p key={log.id}>{log.person} · {log.line} · {when(log.at)}</p>)}
        </section>
      ) : null}
    </div>
  );
}
