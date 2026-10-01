let token = "", me = null;
const names = ["Chantelle","Sebastian van Biljon","Siegfried van Biljon","Fanie van Biljon","Stanley Johnson","Drickus van Biljon","Jean","Louis","Cindy","Damian","Andre"];
const nav = {
  stock: ["Stock file","Open WS file","Order queue"],
  director: ["Stock file","Clear stock","Sales board"],
  sales: ["Stock file","New quote","Sales board"],
  workshop: ["Units","Book work"],
  accounts: ["Stock file","Costs","Sales board"],
  marketing: ["Photo desk"],
  admin: ["Natis","Stock file"]
};
const $ = (id) => document.getElementById(id);
const money = (n) => n == null ? "Hidden" : "R " + Number(n).toLocaleString("en-ZA");
async function api(url, opts = {}) {
  const res = await fetch(url, Object.assign({}, opts, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } }));
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed");
  return data;
}
$("name").innerHTML = names.map((n) => `<option>${n}</option>`).join("");
$("login").onsubmit = async (e) => {
  e.preventDefault();
  const out = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: $("name").value, password: $("password").value }) }).then((r) => r.json());
  if (!out.token) { $("err").textContent = out.error || "Sign in failed"; return; }
  token = out.token; me = await api("/api/me");
  $("gate").classList.add("hidden"); $("shell").classList.remove("hidden");
  $("who").textContent = me.name + (me.code ? " · " + me.code : "");
  $("role").textContent = me.role;
  $("nav").innerHTML = (nav[me.role] || ["Stock file"]).map((n) => `<button>${n}</button>`).join("");
  [...$("nav").children].forEach((b) => b.onclick = () => go(b.textContent));
  go((nav[me.role] || ["Stock file"])[0]);
};
$("out").onclick = () => { token = ""; $("shell").classList.add("hidden"); $("gate").classList.remove("hidden"); };
function go(name) {
  [...$("nav").children].forEach((b) => b.classList.toggle("on", b.textContent === name));
  $("title").textContent = name;
  if (name === "Open WS file") return openFile();
  if (name === "New quote") return quote();
  if (name === "Book work" || name === "Units") return book();
  if (name === "Order queue") return queue();
  if (name === "Clear stock") return clearStock();
  if (name === "Sales board") return board();
  if (name === "Costs") return costs();
  if (name === "Photo desk") return photos();
  if (name === "Natis") return natis();
  stock();
}
async function stock() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><table><tr><th></th><th>Number</th><th>Unit</th><th>Tag</th><th>Step</th><th>Price excl</th></tr>
    ${rows.map((u) => `<tr class="click" data-id="${u.id}"><td><img class="thumb" src="${u.photo}"></td><td>${u.ws}</td><td>${u.year} ${u.make} ${u.description}</td><td>${u.tag}</td><td><span class="chip ${u.cleared ? "ok" : "hold"}">${u.step}</span></td><td>${money(u.price_excl)}</td></tr>`).join("")}
  </table></div><div id="file"></div>`;
  $("main").querySelectorAll("tr.click").forEach((tr) => tr.onclick = () => file(tr.dataset.id, "File"));
}
async function file(id, tab) {
  const pack = await api("/api/units/" + id);
  const u = pack.unit;
  const tabs = ["File","Job A","Orders","Log"].concat(me.price ? ["Quote"] : []).concat(me.cost ? ["Costs"] : []);
  const body = {
    File: `<img class="cover" src="${u.photo}"><h2>${u.ws}</h2><p>${u.year} ${u.make} ${u.model} · ${u.description}</p><p>${u.sentence || "Sentence hidden"}</p><p class="muted">${u.vin || "VIN hidden"} · ${u.reg || "No reg"} · ${u.seller || ""}</p><p>${me.price ? money(u.price_excl) + " excl" : "Price hidden"}</p>`,
    "Job A": pack.tasks.map((t) => `<p>${t.name} <span class="chip ${t.done ? "ok" : ""}">${t.done ? "Done" : "Open"}</span> ${["workshop","director","stock"].includes(me.role) ? `<button class="ghost" data-task="${t.id}">Toggle</button>` : ""}</p>`).join("") + `<h3>Booked</h3>` + (pack.bookings.map((b) => `<p>${b.person} · ${b.qty} × ${b.item}</p>`).join("") || "<p class='muted'>No booking.</p>"),
    Quote: pack.quotes.map((q) => `<p><b>${q.number}</b> · ${q.customer} · ${q.code} · ${money(q.total)} · day ${q.follow_day} due ${q.due_on}</p>`).join("") || "<p class='muted'>No quote on this number.</p>",
    Orders: pack.orders.map((o) => `<p>${o.order_no} · ${o.responsible} · ${o.supplier} · ${o.qty} × ${o.item} · ${o.invoiced_excl == null ? "Hidden" : money(o.invoiced_excl)}</p>`).join("") || "<p class='muted'>No order number yet.</p>",
    Costs: `<p>Qty 0 is skipped.</p>` + (pack.costs || []).filter((c) => c.qty > 0).map((c) => `<p>${c.supplier} · ${c.qty} × ${c.name} · ${money(c.qty * c.unit_price)}</p>`).join("") ,
    Log: pack.logs.map((l) => `<p>${l.person} · ${l.line} · ${String(l.created_at).slice(0, 16).replace("T"," ")}</p>`).join("") || "<p class='muted'>No log.</p>"
  }[tab] || "";
  $("file").innerHTML = `<div class="panel"><div class="tabs">${tabs.map((t) => `<button class="ghost ${t === tab ? "on" : ""}" data-tab="${t}">${t}</button>`).join("")}</div>${body}</div>`;
  $("file").querySelectorAll("button[data-tab]").forEach((b) => b.onclick = () => file(id, b.dataset.tab));
  $("file").querySelectorAll("button[data-task]").forEach((b) => b.onclick = async () => { await api("/api/tasks/" + b.dataset.task, { method: "POST", body: "{}" }); file(id, "Job A"); });
}
function openFile() {
  $("main").innerHTML = `<div class="panel"><h2>Open a purchased unit</h2><div class="grid">
    <label>Kind <select id="kind"><option>WS</option><option>CWS</option></select></label>
    <label>Seller <input id="seller" value="Test seller"></label>
    <label>Year <input id="year" value="2024"></label>
    <label>Make <input id="make" value="GRW"></label>
    <label>Model <input id="model" value="TRI-AXLE"></label>
    <label>Description <input id="desc" value="50000Lt aluminium fuel tanker"></label>
    <label>VIN <input id="vin" value="PILOT9005"></label>
    <label>Price excl <input id="price" type="number" value="1190000"></label>
    <label>Tag <select id="tag"><option>TANKER</option><option>TRUCK TRACTOR</option><option>TRAILER</option><option>RIGID</option><option>TIPPER TRUCK</option></select></label>
  </div><label>Quote sentence <input id="sentence"></label>
  <button class="btn" id="draft" type="button">Draft sentence</button>
  <button class="btn" id="create">Open file</button></div><div id="file"></div>`;
  $("draft").onclick = async () => { const out = await api("/api/draft/sentence", { method: "POST", body: JSON.stringify({ year: $("year").value, make: $("make").value, description: $("desc").value }) }); $("sentence").value = out.draft; };
  $("create").onclick = async () => { const out = await api("/api/units", { method: "POST", body: JSON.stringify({ kind: $("kind").value, seller: $("seller").value, year: $("year").value, make: $("make").value, model: $("model").value, description: $("desc").value, vin: $("vin").value, price_excl: Number($("price").value), tag: $("tag").value, sentence: $("sentence").value }) }); alert(out.ws + " opened. A director must clear it."); go("Stock file"); };
}
async function clearStock() {
  const rows = (await api("/api/units")).filter((u) => !u.cleared);
  $("main").innerHTML = `<div class="panel"><h2>Clear before quote or share</h2>${rows.map((u) => `<p><img class="thumb" src="${u.photo}"> ${u.ws} · ${money(u.price_excl)} <button class="btn" data-id="${u.id}">Clear</button></p>`).join("") || "<p>Nothing waiting.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => { await api("/api/units/" + b.dataset.id + "/clear", { method: "POST", body: "{}" }); clearStock(); });
}
async function quote() {
  const rows = (await api("/api/units")).filter((u) => u.cleared);
  $("main").innerHTML = `<div class="split"><div class="panel"><h2>New quote</h2><p class="muted">The system sets day 1. You do not pick the date.</p>
    <label>Customer <input id="customer"></label>
    <label>Cleared unit <select id="unit">${rows.map((u) => `<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label>
    <label>Trade-in excl <input id="trade" type="number" value="0"></label>
    <button class="btn" id="make">Generate pro-forma</button></div><div class="panel" id="paper"><p class="muted">Pro-forma prints here.</p></div></div>`;
  $("make").onclick = async () => {
    const q = await api("/api/quotes", { method: "POST", body: JSON.stringify({ unit_id: $("unit").value, customer: $("customer").value, trade_in: Number($("trade").value) }) });
    $("paper").innerHTML = `<b>STATUS TRUCK SALES</b><p>Pro-forma ${q.number}<br>${q.customer}<br>${q.item}<br>Admin fee R 2 500 · trade-in ${money(q.trade_in)}<br>Excl ${money(q.excl)} · VAT ${money(q.vat)}<br><b>Total ${money(q.total)}</b><br>System due ${q.due_on}</p>`;
  };
}
async function book() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><h2>Book work</h2><p class="muted">No asking price on this desk.</p>
    <label>Unit <select id="bws">${rows.map((u) => `<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label>
    <label>In your words <input id="words" placeholder="need 2 stopper blocks"></label>
    <label>Item <input id="item"></label><label>Qty <input id="qty" type="number" value="1"></label>
    <button class="btn" id="draft" type="button">Draft booking</button>
    <button class="btn" id="stamp">Stamp</button></div><div id="file"></div>`;
  $("draft").onclick = async () => { const out = await api("/api/draft/booking", { method: "POST", body: JSON.stringify({ words: $("words").value }) }); $("item").value = out.item; $("qty").value = out.qty; };
  $("stamp").onclick = async () => { await api("/api/bookings", { method: "POST", body: JSON.stringify({ unit_id: $("bws").value, item: $("item").value, qty: Number($("qty").value) }) }); file($("bws").value, "Job A"); };
}
async function queue() {
  const rows = await api("/api/queue");
  $("main").innerHTML = `<div class="panel"><h2>Order queue</h2>${rows.map((r) => `<p>${r.ws} · ${r.person} · ${r.qty} × ${r.item} <button class="btn" data-id="${r.id}" data-unit="${r.unit_id}" data-item="${r.item}" data-qty="${r.qty}" data-person="${r.person}">Issue number</button></p>`).join("") || "<p>Queue clear.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const out = await api("/api/orders", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.unit, booking_id: b.dataset.id, responsible: b.dataset.person, supplier: "Quality Parts", qty: Number(b.dataset.qty), item: b.dataset.item, invoiced_excl: 270 }) });
    alert(out.order_no); queue();
  });
}
async function board() {
  const rows = await api("/api/board");
  $("main").innerHTML = `<div class="panel"><h2>Sales board</h2><table><tr><th>Who</th><th>Unit</th><th>Customer</th><th>Due</th><th></th></tr>
    ${rows.map((r) => `<tr><td>${r.code}</td><td>${r.ws}</td><td>${r.customer}</td><td><span class="chip ${r.late ? "late" : "ok"}">Day ${r.follow_day} · ${r.due_on}</span></td><td>${r.result || r.reason || "Waiting"} <button class="ghost" data-id="${r.id}">Log</button></td></tr>`).join("") || "<tr><td colspan='5'>No quote yet.</td></tr>"}</table></div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => { const result = prompt("One line result"); if (!result) return; await api("/api/quotes/" + b.dataset.id + "/log", { method: "POST", body: JSON.stringify({ result }) }); board(); });
}
async function costs() {
  const rows = await api("/api/units");
  let html = "";
  for (const u of rows) {
    const pack = await api("/api/units/" + u.id);
    const live = (pack.costs || []).filter((c) => c.qty > 0);
    if (live.length) html += `<h3>${u.ws}</h3>` + live.map((c) => `<p>${c.supplier} · ${c.qty} × ${c.name} · ${money(c.qty * c.unit_price)}</p>`).join("");
  }
  $("main").innerHTML = `<div class="panel"><h2>Costs</h2>${html || "<p>No numbered cost yet.</p>"}</div>`;
}
async function photos() {
  const rows = (await api("/api/units")).filter((u) => u.cleared);
  $("main").innerHTML = `<div class="panel">${rows.map((u) => `<p><img class="thumb" src="${u.photo}"> ${u.ws} · ${u.description} · price off <button class="btn" data-id="${u.id}">Draft share</button></p>`).join("")}<div id="share"></div></div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => { const out = await api("/api/draft/share", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.id }) }); $("share").textContent = out.draft; });
}
async function natis() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><h2>Natis</h2>${rows.map((u) => `<p>${u.ws} · ${u.vin || "hidden"} · ${u.reg || "reg open"}</p>`).join("")}</div>`;
}
