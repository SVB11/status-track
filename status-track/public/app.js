let token="", me=null;
const names=["Chantelle","Sebastian van Biljon","Siegfried van Biljon","Fanie van Biljon","Stanley Johnson","Drickus van Biljon","Jean","Louis","Cindy","Damian","Andre"];
const nav={
  stock:["Stock file","Load worksheet","Order queue"],
  director:["Stock file","Clear stock","Sales board"],
  sales:["Stock file","Submit quote","Ask invoice","Open Job B","Sales board"],
  workshop:["Job cards","Book work"],
  accounts:["WS ledger","Costs"],
  marketing:["Photo desk"],
  admin:["Natis","Stock file"]
};
const $=id=>document.getElementById(id);
const money=n=>n==null?"Hidden":"R "+Number(n).toLocaleString("en-ZA");
async function api(url, opts={}) {
  const res=await fetch(url, Object.assign({},opts,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+token}}));
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error||"Failed");
  return data;
}
$("name").innerHTML=names.map(n=>`<option>${n}</option>`).join("");
$("login").onsubmit=async e=>{
  e.preventDefault();
  const out=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("name").value,password:$("password").value})}).then(r=>r.json());
  if(!out.token){$("err").textContent=out.error||"Sign in failed";return;}
  token=out.token; me=await api("/api/me");
  $("gate").classList.add("hidden"); $("shell").classList.remove("hidden");
  $("who").textContent=me.name+(me.code?" · "+me.code:""); $("role").textContent=me.role;
  $("nav").innerHTML=(nav[me.role]||["Stock file"]).map(n=>`<button>${n}</button>`).join("");
  [...$("nav").children].forEach(b=>b.onclick=()=>go(b.textContent));
  go((nav[me.role]||["Stock file"])[0]);
};
$("out").onclick=()=>{token="";$("shell").classList.add("hidden");$("gate").classList.remove("hidden");};
function go(name){
  [...$("nav").children].forEach(b=>b.classList.toggle("on",b.textContent===name));
  $("title").textContent=name;
  if(name==="Load worksheet") return worksheet();
  if(name==="Submit quote") return quote();
  if(name==="Ask invoice") return invoice();
  if(name==="Book work"||name==="Job cards") return book();
  if(name==="Order queue") return queue();
  if(name==="Clear stock") return clearStock();
  if(name==="Sales board") return board();
  if(name==="Costs"||name==="WS ledger") return ledger();
  if(name==="Photo desk") return photos();
  if(name==="Natis") return natis();
  if(name==="Open Job B") return jobB();
  stock();
}
async function stock(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><table><tr><th></th><th>Number</th><th>Unit</th><th>Client</th><th>Sold by</th><th>Step</th><th>Ask excl</th></tr>
    ${rows.map(u=>`<tr class="click" data-id="${u.id}"><td><img class="thumb" src="${u.photo}"></td><td>${u.ws}</td><td>${u.year} ${u.make} ${u.description}</td><td>${u.client||"-"}</td><td>${u.salesman||"-"}</td><td><span class="chip ${u.cleared?"ok":"hold"}">${u.step}</span></td><td>${money(u.price_excl)}</td></tr>`).join("")}</table></div><div id="file"></div>`;
  $("main").querySelectorAll("tr.click").forEach(tr=>tr.onclick=()=>file(tr.dataset.id,"File"));
}
async function file(id,tab){
  const pack=await api("/api/units/"+id); const u=pack.unit;
  const tabs=["File","Job card","Orders","Log"].concat(me.price?["Quote"]:[]).concat(me.cost?["Picture","Costs"]:[]);
  const work=pack.bookings.map(b=>`${b.person}: ${b.qty} × ${b.item}`).join("; ")||"None";
  const body={
    File:`<img class="cover" src="${u.photo}"><h2>${u.ws}</h2><p>${u.year} ${u.make} ${u.model} · ${u.description}</p><p>${u.sentence||"Sentence hidden"}</p><p class="muted">${u.vin||"VIN hidden"} · ${u.seller||""}</p><p>Client ${u.client||"-"} · Sales ${u.salesman||"-"} · Invoice ${u.invoice_no||"none"} (${u.invoice_status||"None"})</p><p>${me.price? "Ask "+money(u.price_excl):"Price hidden"} ${me.cost? " · Buy "+money(u.buy_excl):""}</p><button class="ghost no-print" onclick="window.print()">Print</button>`,
    "Job card": pack.jobs.map(j=>`<p>Job ${j.kind} · ${j.title} · ${j.status}</p>`).join("") + pack.tasks.map(t=>`<p>Job ${t.job} · ${t.name} <span class="chip ${t.done?"ok":""}">${t.done?"Done":"Open"}</span> ${["workshop","director","stock"].includes(me.role)?`<button class="ghost" data-task="${t.id}">Toggle</button>`:""}</p>`).join("") + "<h3>Work log</h3>" + (pack.logs.map(l=>`<p>${l.person} · ${l.line} · ${String(l.created_at).slice(0,16).replace("T"," ")}</p>`).join("")||"<p class='muted'>Empty. A stamped line cannot be deleted.</p>") + `<button class="ghost no-print" onclick="window.print()">Print job card</button>`,
    Quote: pack.quotes.map(q=>`<div class="paper"><b>STATUS TRUCK SALES</b><p>Pro-forma ${q.number}<br>${q.customer}<br>${q.item}<br>${q.sentence}<br>Admin fee ${money(q.fee)} · trade-in ${money(q.trade_in)}<br>Excl ${money(q.excl)} · VAT 15% ${money(q.vat)}<br><b>Total ${money(q.total)}</b><br>System due day ${q.follow_day} ${q.due_on}</p></div>`).join("")||"<p class='muted'>No quote.</p>",
    Orders: pack.orders.map(o=>`<p>${o.order_no} · ${o.responsible} · ${o.supplier} · ${o.qty} × ${o.item} · invoiced ${o.invoiced_excl==null?"Hidden":money(o.invoiced_excl)}</p>`).join("")||"<p class='muted'>No order number.</p>",
    Picture: `<p>Buy ${money(u.buy_excl)}</p><p>Ask ${money(u.price_excl)}</p><p>Client ${u.client||"-"}</p><p>Sold by ${u.salesman||"-"}</p><p>Work ${work}</p><p>Invoice ${u.invoice_no||"none"} · ${u.invoice_status||"None"}</p>` + (pack.invoices||[]).map(i=>`<div class="paper">${i.number} · ${i.customer} · ${i.salesman} · ${money(i.total)} · ${i.status}</div>`).join(""),
    Costs: (pack.costs||[]).filter(c=>c.qty>0).map(c=>`<p>${c.supplier} · ${c.qty} × ${c.name} · ${money(c.qty*c.unit_price)} · ${c.inv||""}</p>`).join("")||"<p class='muted'>Qty 0 skipped.</p>",
    Log: pack.logs.map(l=>`<p>${l.person} · ${l.line}</p>`).join("")||"<p class='muted'>No log.</p>"
  }[tab]||"";
  $("file").innerHTML=`<div class="panel"><div class="tabs no-print">${tabs.map(t=>`<button class="ghost ${t===tab?"on":""}" data-tab="${t}">${t}</button>`).join("")}</div>${body}</div>`;
  $("file").querySelectorAll("button[data-tab]").forEach(b=>b.onclick=()=>file(id,b.dataset.tab));
  $("file").querySelectorAll("button[data-task]").forEach(b=>b.onclick=async()=>{await api("/api/tasks/"+b.dataset.task,{method:"POST",body:"{}"});file(id,"Job card");});
}
async function worksheet(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Load / update worksheet</h2>
    <label>Unit <select id="ws">${rows.map(u=>`<option value="${u.id}">${u.ws}</option>`).join("")}<option value="new">New purchased unit</option></select></label>
    <div class="grid">
      <label>Kind <select id="kind"><option>WS</option><option>CWS</option></select></label>
      <label>Seller <input id="seller"></label>
      <label>Year <input id="year"></label>
      <label>Make <input id="make"></label>
      <label>Model <input id="model"></label>
      <label>Description <input id="desc"></label>
      <label>VIN <input id="vin"></label>
      <label>Ask excl <input id="price" type="number"></label>
      <label>Buy excl <input id="buy" type="number"></label>
      <label>Tag <select id="tag"><option>TANKER</option><option>TRUCK TRACTOR</option><option>TRAILER</option><option>RIGID</option><option>TIPPER TRUCK</option></select></label>
    </div>
    <label>Quote sentence <input id="sentence"></label>
    <button class="btn" id="draft" type="button">Draft sentence</button>
    <button class="btn" id="save">Save worksheet</button>
  </div><div id="file"></div>`;
  async function fill(){
    if($("ws").value==="new") return;
    const pack=await api("/api/units/"+$("ws").value); const u=pack.unit;
    $("kind").value=u.kind||"WS"; $("seller").value=u.seller||""; $("year").value=u.year||""; $("make").value=u.make||""; $("model").value=u.model||""; $("desc").value=u.description||""; $("vin").value=u.vin||""; $("price").value=u.price_excl||0; $("buy").value=u.buy_excl||0; $("tag").value=u.tag||"TANKER"; $("sentence").value=u.sentence||"";
    file(u.id,"File");
  }
  $("ws").onchange=fill; if(rows[0]) fill();
  $("draft").onclick=async()=>{ const out=await api("/api/draft/sentence",{method:"POST",body:JSON.stringify({year:$("year").value,make:$("make").value,description:$("desc").value})}); $("sentence").value=out.draft; };
  $("save").onclick=async()=>{
    const payload={kind:$("kind").value,seller:$("seller").value,year:$("year").value,make:$("make").value,model:$("model").value,description:$("desc").value,vin:$("vin").value,price_excl:Number($("price").value),buy_excl:Number($("buy").value),tag:$("tag").value,sentence:$("sentence").value};
    if($("ws").value==="new"){ const out=await api("/api/units",{method:"POST",body:JSON.stringify(payload)}); alert(out.ws+" opened"); go("Stock file"); }
    else { await api("/api/units/"+$("ws").value,{method:"POST",body:JSON.stringify(payload)}); alert("Worksheet updated"); file($("ws").value,"File"); }
  };
}
async function clearStock(){
  const rows=(await api("/api/units")).filter(u=>!u.cleared);
  $("main").innerHTML=`<div class="panel"><h2>Clear before quote or share</h2>${rows.map(u=>`<p>${u.ws} · ${money(u.price_excl)} <button class="btn" data-id="${u.id}">Clear</button></p>`).join("")||"<p>Nothing waiting.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach(b=>b.onclick=async()=>{await api("/api/units/"+b.dataset.id+"/clear",{method:"POST",body:"{}"});clearStock();});
}
async function quote(){
  const rows=(await api("/api/units")).filter(u=>u.cleared);
  $("main").innerHTML=`<div class="split"><div class="panel"><h2>Submit quote</h2><p class="muted">Admin fee R 2 500. VAT 15%. The system sets day 1.</p>
    <label>Customer <input id="customer"></label>
    <label>Phone <input id="phone"></label>
    <label>Cleared unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label>
    <label>Trade-in excl <input id="trade" type="number" value="0"></label>
    <button class="btn" id="make">Submit pro-forma</button></div>
    <div class="panel paper" id="paper"><p class="muted">Your Status quote prints here.</p></div></div>`;
  $("make").onclick=async()=>{
    const q=await api("/api/quotes",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,customer:$("customer").value,phone:$("phone").value,trade_in:Number($("trade").value)})});
    $("paper").innerHTML=`<img src="/brand/status-logo.png" width="180"><p>148 Nolte Street, Bartlett · VAT 4840181335</p><b>PRO-FORMA ${q.number}</b><p>${q.customer}<br>${q.item}<br>${q.sentence}</p><p>Admin fee ${money(q.fee)}<br>Trade-in ${money(q.trade_in)}<br>Excl ${money(q.excl)}<br>VAT 15% ${money(q.vat)}<br><b>Total ${money(q.total)}</b></p><p>Sales ${q.code} · System follow-up day 1 · ${q.due_on}</p><button class="ghost no-print" onclick="window.print()">Print</button>`;
  };
}
async function invoice(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Ask Cindy for an invoice</h2>
    <label>Customer <input id="customer"></label>
    <label>Unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws} · ${u.client||"no client"}</option>`).join("")}</select></label>
    <button class="btn" id="ask">Request invoice</button></div>`;
  $("ask").onclick=async()=>{ const inv=await api("/api/invoices",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,customer:$("customer").value})}); alert(inv.number+" requested"); };
}
async function jobB(){
  const rows=(await api("/api/units")).filter(u=>u.cleared);
  $("main").innerHTML=`<div class="panel"><h2>Open Job B</h2><label>Customer <input id="customer"></label><label>Unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws}</option>`).join("")}</select></label><button class="btn" id="open">Open Job B</button></div>`;
  $("open").onclick=async()=>{ const job=await api("/api/jobs",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,customer:$("customer").value})}); alert("Job "+job.kind+" open"); };
}
async function book(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Job card</h2><p class="muted">No asking price. Stamp the work. The line cannot be deleted.</p>
    <label>Unit <select id="bws">${rows.map(u=>`<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label>
    <label>In your words <input id="words" placeholder="need 2 stopper blocks"></label>
    <label>Item <input id="item"></label><label>Qty <input id="qty" type="number" value="1"></label>
    <button class="btn" id="draft" type="button">Draft booking</button>
    <button class="btn" id="stamp">Stamp on job card</button></div><div id="file"></div>`;
  $("draft").onclick=async()=>{ const out=await api("/api/draft/booking",{method:"POST",body:JSON.stringify({words:$("words").value})}); $("item").value=out.item; $("qty").value=out.qty; };
  $("stamp").onclick=async()=>{ await api("/api/bookings",{method:"POST",body:JSON.stringify({unit_id:$("bws").value,item:$("item").value,qty:Number($("qty").value)})}); file($("bws").value,"Job card"); };
  $("bws").onchange=()=>file($("bws").value,"Job card");
  if(rows[0]) file(rows[0].id,"Job card");
}
async function queue(){
  const rows=await api("/api/queue");
  $("main").innerHTML=`<div class="panel"><h2>Order numbers (workshop)</h2>
    ${rows.map(r=>`<p>${r.ws} · ${r.person} · ${r.qty} × ${r.item} <button class="btn" data-id="${r.id}" data-unit="${r.unit_id}" data-item="${r.item}" data-qty="${r.qty}" data-person="${r.person}">Issue number</button></p>`).join("")||"<p>Queue clear.</p>"}</div>`;
  $("main").querySelectorAll("button[data-id]").forEach(b=>b.onclick=async()=>{
    const out=await api("/api/orders",{method:"POST",body:JSON.stringify({unit_id:b.dataset.unit,booking_id:b.dataset.id,responsible:b.dataset.person,supplier:"Quality Parts",qty:Number(b.dataset.qty),item:b.dataset.item,quoted_excl:270,invoiced_excl:270})});
    alert(out.order_no); queue();
  });
}
async function board(){
  const rows=await api("/api/board");
  $("main").innerHTML=`<div class="panel"><h2>Sales board</h2><table><tr><th>Who</th><th>Unit</th><th>Customer</th><th>Due</th><th></th></tr>
    ${rows.map(r=>`<tr><td>${r.code}</td><td>${r.ws}</td><td>${r.customer}</td><td><span class="chip ${r.late?"late":"ok"}">Day ${r.follow_day} · ${r.due_on}</span></td><td>${r.result||r.reason||"Waiting"} <button class="ghost" data-id="${r.id}">Log</button></td></tr>`).join("")||"<tr><td colspan='5'>No quote yet.</td></tr>"}</table></div>`;
  $("main").querySelectorAll("button[data-id]").forEach(b=>b.onclick=async()=>{ const result=prompt("One line result"); if(!result) return; await api("/api/quotes/"+b.dataset.id+"/log",{method:"POST",body:JSON.stringify({result})}); board(); });
}
async function ledger(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Per WS picture</h2><p class="muted">Buy cost, client, work, salesman and the invoice requested.</p>
    ${rows.map(u=>`<p class="click" data-id="${u.id}"><img class="thumb" src="${u.photo}"> <b>${u.ws}</b> Buy ${money(u.buy_excl)} · Ask ${money(u.price_excl)} · ${u.client||"no client"} · ${u.salesman||"-"} · ${u.invoice_no||"no invoice"}</p>`).join("")}</div><div id="file"></div>`;
  $("main").querySelectorAll("p.click").forEach(p=>p.onclick=()=>file(p.dataset.id,"Picture"));
}
async function photos(){
  const rows=(await api("/api/units")).filter(u=>u.cleared);
  $("main").innerHTML=`<div class="panel">${rows.map(u=>`<p><img class="thumb" src="${u.photo}"> ${u.ws} · price off <button class="btn" data-id="${u.id}">Draft share</button></p>`).join("")}<div id="share"></div></div>`;
  $("main").querySelectorAll("button[data-id]").forEach(b=>b.onclick=async()=>{ const out=await api("/api/draft/share",{method:"POST",body:JSON.stringify({unit_id:b.dataset.id})}); $("share").textContent=out.draft; });
}
async function natis(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Natis</h2>${rows.map(u=>`<p>${u.ws} · ${u.vin||"hidden"} · ${u.reg||"reg open"}</p>`).join("")}</div>`;
}
