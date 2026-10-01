let token = "", me = null, openId = null;
const names = ["Chantelle", "Sebastian van Biljon", "Siegfried van Biljon", "Fanie van Biljon", "Stanley Johnson", "Jean", "Louis", "Cindy", "Damian", "Andre"];
const nav = {
  stock: ["Today", "Open WS file", "Stock file", "Order queue"],
  director: ["Today", "Clear stock", "Board", "Stock file"],
  sales: ["Today", "New quote", "Board", "Stock"],
  workshop: ["Today", "Book work", "My units"],
  accounts: ["Today", "Costs", "Board"],
  marketing: ["Today", "Photo list"],
  admin: ["Today", "Natis list", "Stock file"]
};
const $ = (id) => document.getElementById(id);
const money = (n) => n == null ? "Hidden" : "R " + Number(n).toLocaleString("en-ZA");
async function api(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed");
  return data;
}
$("name").innerHTML = names.map((n) => `<option>${n}</option>`).join("");
$("login").onsubmit = async (e) => {
  e.preventDefault();
  try {
    const out = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: $("name").value, password: $("password").value }) }).then((r) => r.json());
    if (!out.token) throw new Error(out.error || "Sign in failed");
    token = out.token;
    me = await api("/api/me");
    $("gate").classList.add("hidden");
    $("shell").classList.remove("hidden");
    $("who").textContent = me.name + (me.code ? " · " + me.code : "");
    $("role").textContent = me.role;
    $("nav").innerHTML = (nav[me.role] || ["Today"]).map((n) => `<button>${n}</button>`).join("");
    [...$("nav").children].forEach((b) => b.onclick = () => go(b.textContent));
    go("Today");
  } catch (err) { $("err").textContent = err.message; }
};
$("out").onclick = () => { token = ""; openId = null; $("shell").classList.add("hidden"); $("gate").classList.remove("hidden"); };
function go(name) {
  [...$("nav").children].forEach((b) => b.classList.toggle("on", b.textContent === name));
  $("title").textContent = name;
  if (name === "Today") today();
  else if (name === "Open WS file") openFile();
  else if (name === "New quote") quote();
  else if (name === "Book work" || name === "My units") book();
  else if (name === "Order queue") queue();
  else if (name === "Clear stock") clearStock();
  else if (name === "Board") board();
  else if (name === "Costs") costs();
  else if (name === "Photo list") photos();
  else if (name === "Natis list") natis();
  else stock();
}
async function today() {
  $("main").innerHTML = `<div class="panel"><h2>Yard path</h2>
    <ol>
      <li>Chantelle opens the purchased file</li>
      <li>Sebastian or Siegfried clears the sentence and the price</li>
      <li>Fanie quotes. The system sets day 1, then 3, then 7, then 14</li>
      <li>Jean or Louis books work and stamps Job A</li>
      <li>Chantelle numbers the order and marks who booked it</li>
      <li>Cindy reads cost. Workshop never sees asking price</li>
    </ol>
    <p class="muted">Password Test1234. This store is the Railway volume. Live job cards stay off this project.</p></div>`;
}
async function openFile() {
  $("main").innerHTML = `<div class="panel"><h2>Open a purchased unit</h2>
    <div class="grid">
      <label>Kind <select id="kind"><option>WS</option><option>CWS</option></select></label>
      <label>Seller <input id="seller" value="Test seller"></label>
      <label>Year <input id="year" value="2024"></label>
      <label>Make <input id="make" value="GRW"></label>
      <label>Model <input id="model" value="TRI-AXLE"></label>
      <label>Description <input id="desc" value="50000Lt aluminium fuel tanker"></label>
      <label>VIN <input id="vin" value="PILOT9005"></label>
      <label>Engine or N/A <input id="engine" value="N/A"></label>
      <label>Price excl <input id="price" type="number" value="1190000"></label>
      <label>Tag <select id="tag"><option>TANKER</option><option>TRUCK TRACTOR</option><option>TRAILER</option><option>RIGID</option><option>TIPPER TRUCK</option></select></label>
    </div>
    <label>Quote sentence <input id="sentence"></label>
    <button class="btn" id="draft" type="button">Draft sentence</button>
    <button class="btn" id="create">Open file</button></div>`;
  $("draft").onclick = async () => {
    const out = await api("/api/draft/sentence", { method: "POST", body: JSON.stringify({ year: $("year").value, make: $("make").value, description: $("desc").value }) });
    $("sentence").value = out.draft;
  };
  $("create").onclick = async () => {
    const out = await api("/api/units", { method: "POST", body: JSON.stringify({ kind: $("kind").value, seller: $("seller").value, year: $("year").value, make: $("make").value, model: $("model").value, description: $("desc").value, vin: $("vin").value, engine: $("engine").value, price_excl: Number($("price").value), tag: $("tag").value, sentence: $("sentence").value }) });
    alert(out.ws + " opened. A director must clear it.");
    go("Stock file");
  };
}
async function stock() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><table><tr><th></th><th>Number</th><th>Unit</th><th>Step</th><th>Price</th></tr>
    ${rows.map((u) => `<tr class="click" data-id="${u.id}"><td><img class="thumb" src="${u.photo}"></td><td>${u.ws}</td><td>${u.year} ${u.make} ${u.description}</td><td><span class="chip">${u.step}</span></td><td>${money(u.price_excl)}</td></tr>`).join("")}</table></div><div id="file"></div>`;
  $("main").querySelectorAll("tr.click").forEach((tr) => tr.onclick = () => unit(tr.dataset.id));
}
async function unit(id) {
  openId = id;
  const pack = await api("/api/units/" + id);
  const u = pack.unit;
  const costTotal = (pack.costs || []).filter((c) => c.qty > 0).reduce((s, c) => s + c.qty * c.unit_price, 0);
  $("file").innerHTML = `<div class="panel">
    <img class="thumb" src="${u.photo}"> <b>${u.ws}</b> ${u.year} ${u.make} ${u.description}
    <p>${u.sentence || "Sentence hidden"} · ${u.seller || ""}</p>
    <p class="muted">${u.vin || "VIN hidden"} · ${u.reg || "No reg"}</p>
    <h3>Job A</h3>${pack.tasks.map((t) => `<p>${t.name} <span class="chip ${t.done ? "ok" : ""}">${t.done ? "Done" : "Open"}</span> ${me.role === "workshop" || me.role === "director" ? `<button class="ghost" data-task="${t.id}">Toggle</button>` : ""}</p>`).join("")}
    <h3>Work booked</h3>${pack.bookings.map((b) => `<p>${b.person} · ${b.qty} × ${b.item} · ${b.created_at.slice(0, 16).replace("T", " ")}</p>`).join("") || "<p class='muted'>No booking.</p>"}
    <h3>Orders</h3>${pack.orders.map((o) => `<p>${o.order_no} · ${o.responsible} · ${o.supplier} · ${o.qty} × ${o.item} · ${o.invoiced_excl == null ? "Hidden" : money(o.invoiced_excl)}</p>`).join("") || "<p class='muted'>No order.</p>"}
    ${me.cost ? `<h3>Costs, qty 0 skipped</h3><p>Total ${money(costTotal)}</p>` : ""}
    <h3>Log</h3>${pack.logs.map((l) => `<p>${l.person} · ${l.line} · ${l.created_at.slice(0, 16).replace("T", " ")}</p>`).join("") || "<p class='muted'>Empty.</p>"}
  </div>`;
  $("file").querySelectorAll("button[data-task]").forEach((b) => b.onclick = async () => { await api("/api/tasks/" + b.dataset.task, { method: "POST", body: "{}" }); unit(id); });
}
async function clearStock() {
  const rows = (await api("/api/units")).filter((u) => !u.cleared);
  $("main").innerHTML = `<div class="panel"><h2>Clear before a quote or a share</h2>${rows.map((u) => `<p>${u.ws} · ${money(u.price_excl)} <button class="btn" data-id="${u.id}">Clear</button></p>`).join("") || "<p>Nothing waiting.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => { await api("/api/units/" + b.dataset.id + "/clear", { method: "POST", body: "{}" }); clearStock(); });
}
async function quote() {
  const rows = (await api("/api/units")).filter((u) => u.cleared);
  $("main").innerHTML = `<div class="split"><div class="panel"><h2>Quote</h2>
    <p class="muted">No follow-up date. The system sets day 1, then 3, then 7, then 14.</p>
    <label>Customer <input id="customer"></label>
    <label>Cleared unit <select id="unit">${rows.map((u) => `<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("") || "<option>None cleared</option>"}</select></label>
    <label>Trade-in excl <input id="trade" type="number" value="0"></label>
    <button class="btn" id="make">Generate pro-forma</button></div>
    <div class="panel" id="paper"><p class="muted">Paper appears here.</p></div></div>`;
  $("make").onclick = async () => {
    const out = await api("/api/quotes", { method: "POST", body: JSON.stringify({ unit_id: $("unit").value, customer: $("customer").value, trade_in: Number($("trade").value) }) });
    $("paper").innerHTML = `<b>${out.number}</b><p>Admin fee R 2 500 · VAT 15%<br>System due ${out.due_on} · day 1</p>`;
  };
}
async function book() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><h2>Book work</h2>
    <p class="muted">Price is not on this screen. Your name and the time stay on the line.</p>
    <label>Unit <select id="bws">${rows.map((u) => `<option value="${u.id}">${u.ws}</option>`).join("")}</select></label>
    <label>In your words <input id="words" placeholder="need 2 stopper blocks"></label>
    <label>Item <input id="item"></label>
    <label>Qty <input id="qty" type="number" value="1"></label>
    <button class="btn" id="draft" type="button">Draft booking</button>
    <button class="btn" id="stamp">Stamp booking</button>
    <div id="file"></div></div>`;
  $("draft").onclick = async () => {
    const out = await api("/api/draft/booking", { method: "POST", body: JSON.stringify({ words: $("words").value }) });
    $("item").value = out.item; $("qty").value = out.qty;
  };
  $("stamp").onclick = async () => {
    await api("/api/bookings", { method: "POST", body: JSON.stringify({ unit_id: $("bws").value, item: $("item").value, qty: Number($("qty").value) }) });
    unit($("bws").value);
  };
  if (rows[0]) unit(rows[0].id);
}
async function queue() {
  const rows = await api("/api/queue");
  $("main").innerHTML = `<div class="panel"><h2>Number the booking</h2>
    ${rows.map((r) => `<p>${r.ws} · ${r.person} · ${r.qty} × ${r.item} <button class="btn" data-id="${r.id}" data-unit="${r.unit_id}" data-item="${r.item}" data-qty="${r.qty}" data-person="${r.person}">Issue ${r.ws}-next</button></p>`).join("") || "<p>Queue clear.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const out = await api("/api/orders", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.unit, booking_id: b.dataset.id, responsible: b.dataset.person, supplier: "Quality Parts", qty: Number(b.dataset.qty), item: b.dataset.item, invoiced_excl: 270 }) });
    alert(out.order_no); queue();
  });
}
async function board() {
  const rows = await api("/api/board");
  $("main").innerHTML = `<div class="panel"><h2>Sales board</h2>
    <table><tr><th>Who</th><th>Unit</th><th>Customer</th><th>Due</th><th>Result</th></tr>
    ${rows.map((r) => `<tr><td>${r.code}</td><td>${r.ws}</td><td>${r.customer}</td><td><span class="chip ${r.late ? "late" : "ok"}">Day ${r.follow_day} · ${r.due_on}</span></td><td>${r.result || r.reason || "Waiting"} ${me.role === "sales" || me.role === "director" ? `<button class="ghost" data-id="${r.id}">Log</button>` : ""}</td></tr>`).join("") || "<tr><td colspan='5'>No quote yet.</td></tr>"}</table></div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const result = prompt("One line result");
    if (!result) return;
    await api("/api/quotes/" + b.dataset.id + "/log", { method: "POST", body: JSON.stringify({ result }) });
    board();
  });
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
  $("main").innerHTML = `<div class="panel">${rows.map((u) => `<p><img class="thumb" src="${u.photo}"> ${u.ws} · ${u.description} · price off <button class="btn" data-id="${u.id}">Draft share</button></p>`).join("") || "<p>Nothing cleared.</p>"}<div id="share"></div></div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const out = await api("/api/draft/share", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.id }) });
    $("share").textContent = out.draft;
  });
}
async function natis() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><h2>Natis</h2>${rows.map((u) => `<p>${u.ws} · ${u.vin || "hidden"} · ${u.reg || "reg open"}</p>`).join("")}</div>`;
}
