let token = "", me = null;
const names = ["Chantelle", "Sebastian van Biljon", "Fanie van Biljon", "Jean", "Cindy", "Damian", "Stanley Johnson", "Louis", "Siegfried van Biljon"];
const nav = {
  stock: ["Today", "Open WS file", "Stock file", "Order queue"],
  director: ["Today", "Clear stock", "Board", "Stock file"],
  sales: ["Today", "New quote", "Board", "Stock"],
  workshop: ["Today", "Book work"],
  accounts: ["Today", "Costs", "Board"],
  marketing: ["Today", "Photo list"]
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
    $("nav").innerHTML = nav[me.role].map((n) => `<button>${n}</button>`).join("");
    [...$("nav").children].forEach((b) => b.onclick = () => go(b.textContent));
    go("Today");
  } catch (err) { $("err").textContent = err.message; }
};
$("out").onclick = () => { token = ""; $("shell").classList.add("hidden"); $("gate").classList.remove("hidden"); };
function go(name) {
  [...$("nav").children].forEach((b) => b.classList.toggle("on", b.textContent === name));
  $("title").textContent = name;
  if (name === "Today") today();
  else if (name === "Open WS file") openFile();
  else if (name === "New quote") quote();
  else if (name === "Book work") book();
  else if (name === "Order queue") queue();
  else if (name === "Clear stock") clearStock();
  else if (name === "Board") board();
  else if (name === "Costs") costs();
  else if (name === "Photo list") photos();
  else stock();
}
async function today() {
  $("main").innerHTML = `<div class="panel"><h2>Test path</h2><ol><li>Chantelle opens the purchased file</li><li>Sebastian clears it</li><li>Fanie quotes it. The system sets day 1</li><li>Jean books the work</li><li>Chantelle issues the order number</li><li>Cindy reads the cost</li></ol><p class="muted">Password Test1234. This store is the Railway volume, not the live job cards.</p></div>`;
}
async function openFile() {
  $("main").innerHTML = `<div class="panel"><h2>Open a purchased unit</h2><div class="grid">
    <label>Kind <select id="kind"><option>WS</option><option>CWS</option></select></label>
    <label>Seller <input id="seller" value="Test seller"></label>
    <label>Year <input id="year" value="2024"></label>
    <label>Make <input id="make" value="GRW"></label>
    <label>Model <input id="model" value="TRI-AXLE"></label>
    <label>Description <input id="desc" value="50000Lt aluminium fuel tanker"></label>
    <label>VIN <input id="vin" value="PILOT9005"></label>
    <label>Price excl <input id="price" type="number" value="1190000"></label>
    <label>Tag <select id="tag"><option>TANKER</option><option>TRUCK TRACTOR</option><option>TRAILER</option></select></label>
  </div><label>Sentence <input id="sentence" value=""></label>
  <button class="btn" id="draft" type="button">Draft sentence</button>
  <button class="btn" id="create">Open file</button></div>`;
  $("draft").onclick = async () => {
    const out = await api("/api/draft/sentence", { method: "POST", body: JSON.stringify({ year: $("year").value, make: $("make").value, description: $("desc").value }) });
    $("sentence").value = out.draft;
  };
  $("create").onclick = async () => {
    const out = await api("/api/units", { method: "POST", body: JSON.stringify({ kind: $("kind").value, seller: $("seller").value, year: $("year").value, make: $("make").value, model: $("model").value, description: $("desc").value, vin: $("vin").value, price_excl: Number($("price").value), tag: $("tag").value, sentence: $("sentence").value }) });
    alert(out.ws + " opened. Sebastian must clear it.");
  };
}
async function stock() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><table><tr><th></th><th>Number</th><th>Unit</th><th>Step</th><th>Price</th></tr>
    ${rows.map((u) => `<tr class="click" data-id="${u.id}"><td><img class="thumb" src="${u.photo}"></td><td>${u.ws}</td><td>${u.year} ${u.make} ${u.description}</td><td><span class="chip">${u.step}</span></td><td>${money(u.price_excl)}</td></tr>`).join("")}</table></div><div id="file"></div>`;
  $("main").querySelectorAll("tr.click").forEach((tr) => tr.onclick = () => unit(tr.dataset.id));
}
async function unit(id) {
  const pack = await api("/api/units/" + id);
  const u = pack.unit;
  $("file").innerHTML = `<div class="panel"><img class="thumb" src="${u.photo}"> <b>${u.ws}</b> ${u.year} ${u.make} ${u.description}<p>${u.sentence || "Sentence hidden"}</p>
    <p>Orders: ${pack.orders.map((o) => o.order_no + " · " + o.responsible).join(", ") || "none"}</p></div>`;
}
async function clearStock() {
  const rows = (await api("/api/units")).filter((u) => !u.cleared);
  $("main").innerHTML = `<div class="panel">${rows.map((u) => `<p>${u.ws} <button class="btn" data-id="${u.id}">Clear</button></p>`).join("") || "Nothing waiting."}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => { await api("/api/units/" + b.dataset.id + "/clear", { method: "POST", body: "{}" }); clearStock(); });
}
async function quote() {
  const rows = (await api("/api/units")).filter((u) => u.cleared);
  $("main").innerHTML = `<div class="panel"><h2>Quote</h2><p class="muted">No follow-up date. The system sets day 1, then 3, then 7, then 14.</p>
    <label>Customer <input id="customer"></label>
    <label>Unit <select id="unit">${rows.map((u) => `<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label>
    <label>Trade-in excl <input id="trade" type="number" value="0"></label>
    <button class="btn" id="make">Generate pro-forma</button></div>`;
  $("make").onclick = async () => { const out = await api("/api/quotes", { method: "POST", body: JSON.stringify({ unit_id: $("unit").value, customer: $("customer").value, trade_in: Number($("trade").value) }) }); alert(out.number + " due " + out.due_on); };
}
async function book() {
  const rows = await api("/api/units");
  $("main").innerHTML = `<div class="panel"><h2>Book work</h2><label>Unit <select id="bws">${rows.map((u) => `<option value="${u.id}">${u.ws}</option>`).join("")}</select></label>
    <label>Item <input id="item" value=""></label><label>Qty <input id="qty" type="number" value="1"></label>
    <label>In your words <input id="words" placeholder="need 2 stopper blocks"></label>
    <button class="btn" id="draft" type="button">Draft booking</button>
    <button class="btn" id="stamp">Stamp booking</button></div>`;
  $("draft").onclick = async () => {
    const out = await api("/api/draft/booking", { method: "POST", body: JSON.stringify({ words: $("words").value }) });
    $("item").value = out.item;
    $("qty").value = out.qty;
  };
  $("stamp").onclick = async () => { await api("/api/bookings", { method: "POST", body: JSON.stringify({ unit_id: $("bws").value, item: $("item").value, qty: Number($("qty").value) }) }); alert("Stamped"); };
}
async function queue() {
  const rows = await api("/api/queue");
  $("main").innerHTML = `<div class="panel">${rows.map((r) => `<p>${r.ws} · ${r.person} · ${r.qty} x ${r.item} <button class="btn" data-id="${r.id}" data-unit="${r.unit_id}" data-item="${r.item}" data-qty="${r.qty}" data-person="${r.person}">Number</button></p>`).join("") || "Queue clear."}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const out = await api("/api/orders", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.unit, booking_id: b.dataset.id, responsible: b.dataset.person, supplier: "Quality Parts", qty: Number(b.dataset.qty), item: b.dataset.item, invoiced_excl: 270 }) });
    alert(out.order_no); queue();
  });
}
async function board() {
  const rows = await api("/api/board");
  $("main").innerHTML = `<div class="panel"><table><tr><th>Who</th><th>Unit</th><th>Due</th><th>Result</th><th>Draft</th></tr>${rows.map((r) => `<tr><td>${r.code}</td><td>${r.ws}</td><td><span class="chip ${r.late ? "late" : ""}">Day ${r.follow_day} · ${r.due_on}</span></td><td>${r.result || "Waiting"}</td><td>${r.reason || ""}</td></tr>`).join("")}</table></div>`;
}
async function costs() {
  const rows = await api("/api/units");
  let html = "";
  for (const u of rows) {
    const pack = await api("/api/units/" + u.id);
    pack.orders.forEach((o) => { if (o.invoiced_excl) html += `<p>${o.order_no} · ${o.item} · ${money(o.invoiced_excl)}</p>`; });
  }
  $("main").innerHTML = `<div class="panel"><h2>Costs</h2>${html || "No numbered cost yet."}</div>`;
}
async function photos() {
  const rows = (await api("/api/units")).filter((u) => u.cleared);
  $("main").innerHTML = `<div class="panel">${rows.map((u) => `<p><img class="thumb" src="${u.photo}"> ${u.ws} · ${u.description} · price off <button class="btn" data-id="${u.id}">Draft share</button></p>`).join("")}<div id="share"></div></div>`;
  $("main").querySelectorAll("button[data-id]").forEach((b) => b.onclick = async () => {
    const out = await api("/api/draft/share", { method: "POST", body: JSON.stringify({ unit_id: b.dataset.id }) });
    $("share").textContent = out.draft;
  });
}
