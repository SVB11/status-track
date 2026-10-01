let token="", me=null;
const names=["Jean-Pierre De Fillet","Louis Koekemoer","Tiaan Van Wyk","Chantelle","Cindy","Sebastian van Biljon","Fanie van Biljon","Stanley Johnson","Drickus van Biljon","Damian","Andre"];
const nav={ workshop:["Job cards"], stock:["Stock file","Order number"], accounts:["WS picture"], sales:["Stock file","Submit quote","Ask invoice"], director:["Stock file","Job cards"], marketing:["Stock file"], admin:["Stock file"] };
const $=id=>document.getElementById(id);
const money=n=>n==null||n===""?"—":"R "+Number(n).toLocaleString("en-ZA");
async function api(url, opts={}) {
  const res=await fetch(url, Object.assign({}, opts, { headers:{ "Content-Type":"application/json", Authorization:"Bearer "+token } }));
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error||"Failed");
  return data;
}
$("name").innerHTML=names.map(n=>`<option>${n}</option>`).join("");
$("login").onsubmit=async e=>{
  e.preventDefault();
  const out=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("name").value,password:$("password").value})}).then(r=>r.json());
  if(!out.token){ $("err").textContent=out.error||"Failed"; return; }
  token=out.token; me=await api("/api/me");
  $("gate").classList.add("hidden"); $("shell").classList.remove("hidden");
  $("who").textContent=me.name; $("role").textContent=me.role;
  $("nav").innerHTML=(nav[me.role]||["Stock file"]).map(n=>`<button>${n}</button>`).join("");
  [...$("nav").children].forEach(b=>b.onclick=()=>go(b.textContent));
  go((nav[me.role]||["Stock file"])[0]);
};
$("out").onclick=()=>{ token=""; $("shell").classList.add("hidden"); $("gate").classList.remove("hidden"); };
function go(name){
  [...$("nav").children].forEach(b=>b.classList.toggle("on", b.textContent===name));
  $("title").textContent=name;
  if(name==="Job cards"||name==="Stock file") return list();
  if(name==="WS picture") return list(true);
  if(name==="Submit quote") return quote();
  if(name==="Ask invoice") return invoice();
  if(name==="Order number") return order();
}
async function list(picture){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><p class="muted">${rows.length} cards copied from the 1 Oct restore. Live app is not touched.</p>
    <table><tr><th></th><th>WS</th><th>Unit</th><th>Client</th><th>Where</th><th>Status</th>${picture?"<th>Invoice</th>":""}</tr>
    ${rows.map(u=>`<tr class="click" data-id="${u.id}"><td><img class="thumb" src="${u.photo}"></td><td>${u.ws}<br><span class="muted">${u.job_number||""}</span></td><td>${u.year} ${u.description}<br>${u.reg||""}</td><td>${u.client||"-"}<br>${u.salesman||""}</td><td>${u.location||"-"}</td><td><span class="chip ${/completed/i.test(u.status)?"ok":"hold"}">${u.status}</span></td>${picture?`<td>${u.invoice_no||"-"}</td>`:""}</tr>`).join("")}
    </table></div><div id="file"></div>`;
  $("main").querySelectorAll("tr.click").forEach(tr=>tr.onclick=()=>file(tr.dataset.id, picture?"Picture":"Tasks"));
}
async function file(id, tab){
  const pack=await api("/api/units/"+id); const u=pack.unit;
  const tabs=["Tasks","PDI","Log","Orders"].concat(me.price?["Quote"]:[]).concat(me.cost?["Picture"]:[]);
  const tasks=pack.tasks.map(t=>`<tr><td>${t.name}<br><span class="muted">${t.provider||""} ${t.booked_date||""}</span></td><td>${t.location||"-"}</td><td><span class="chip ${t.status==="Completed"?"ok":"hold"}">${t.status}</span></td><td>${t.notes||""}</td><td>${me.role==="workshop"||me.role==="director"?`<button class="ghost" data-task="${t.id}" data-status="In Progress">Start</button> <button class="ghost" data-task="${t.id}" data-status="Completed">Done</button>`:""}</td></tr>`).join("");
  const pdi=pack.pdi.slice(0,40).map(p=>`<tr><td>${p.section}</td><td>${p.item}</td><td>${p.status}</td></tr>`).join("");
  const body={
    Tasks:`<p>${u.instructions||""}</p><table><tr><th>Task</th><th>Where</th><th>Status</th><th>Note</th><th></th></tr>${tasks||"<tr><td colspan='5'>No tasks</td></tr>"}</table>${me.role!=="accounts"?`<p><input id="newtask" placeholder="Add a task"><button class="btn" id="add">Add</button></p>`:""}`,
    PDI: pack.pdi.length?`<table><tr><th>Section</th><th>Check</th><th>Result</th></tr>${pdi}</table><p class="muted">${pack.pdi.length} checks on this card.</p>`:"<p>No PDI on this card yet.</p>",
    Log: pack.logs.map(l=>`<p>${l.person} · ${l.line} · ${String(l.created_at).slice(0,16).replace("T"," ")}</p>`).join("")||"<p>No log.</p>",
    Orders: pack.orders.map(o=>`<p>${o.order_no} · ${o.responsible} · ${o.qty} × ${o.item}</p>`).join("")||"<p>No order number yet.</p>",
    Quote: pack.quotes.map(q=>`<p>${q.number} · ${q.customer} · ${money(q.total)} · due ${q.due_on}</p>`).join("")||"<p>No quote on this number.</p>",
    Picture:`<p>Buy ${money(u.buy_excl)} · Ask ${money(u.price_excl)}</p><p>Client ${u.client||"-"} · Sold by ${u.salesman||"-"}</p><p>Quote / invoice on card ${u.quote_no||"-"} · ${u.invoice_status||""}</p><p>Work: ${pack.tasks.filter(t=>t.status==="Completed").map(t=>t.name).join(", ")||"None completed"}</p>`+(pack.invoices||[]).map(i=>`<p>${i.number} · ${i.customer} · ${money(i.total)} · ${i.status}</p>`).join("")
  }[tab];
  $("file").innerHTML=`<div class="panel"><h2>${u.ws} · ${u.year} ${u.description}</h2><p class="muted">${u.vin||""} · ${u.reg||""} · ${u.location||""}</p><div class="tabs">${tabs.map(t=>`<button class="ghost ${t===tab?"on":""}" data-tab="${t}">${t}</button>`).join("")}</div>${body}</div>`;
  $("file").querySelectorAll("button[data-tab]").forEach(b=>b.onclick=()=>file(id,b.dataset.tab));
  $("file").querySelectorAll("button[data-task]").forEach(b=>b.onclick=async()=>{ await api("/api/tasks",{method:"POST",body:JSON.stringify({id:b.dataset.task,status:b.dataset.status})}); file(id,"Tasks"); });
  const add=$("file").querySelector("#add");
  if(add) add.onclick=async()=>{ const name=$("file").querySelector("#newtask").value; if(!name) return; await api("/api/tasks/add",{method:"POST",body:JSON.stringify({unit_id:id,name})}); file(id,"Tasks"); };
}
async function quote(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Submit quote</h2><div class="grid"><label>Customer <input id="customer"></label><label>Unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws} · ${u.description}</option>`).join("")}</select></label><label>Ask excl <input id="ask" type="number" value="0"></label><label>Trade-in excl <input id="trade" type="number" value="0"></label></div><button class="btn" id="make">Submit pro-forma</button><div id="paper"></div></div>`;
  $("make").onclick=async()=>{ const q=await api("/api/quotes",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,customer:$("customer").value,ask_excl:Number($("ask").value),trade_in:Number($("trade").value)})}); $("paper").innerHTML=`<p><b>${q.number}</b><br>${q.customer}<br>${q.item}<br>${q.sentence}<br>Admin ${money(q.fee)} · excl ${money(q.excl)} · VAT ${money(q.vat)} · <b>${money(q.total)}</b><br>System due ${q.due_on}</p>`; };
}
async function invoice(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Ask Cindy for the invoice</h2><label>Customer <input id="customer"></label><label>Unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws}</option>`).join("")}</select></label><button class="btn" id="ask">Request</button></div>`;
  $("ask").onclick=async()=>{ const inv=await api("/api/invoices",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,customer:$("customer").value})}); alert(inv.number+" requested"); };
}
async function order(){
  const rows=await api("/api/units");
  $("main").innerHTML=`<div class="panel"><h2>Issue order number</h2><label>Unit <select id="unit">${rows.map(u=>`<option value="${u.id}">${u.ws}</option>`).join("")}</select></label><label>Who booked it <input id="who2" value="Jean-Pierre De Fillet"></label><label>Supplier <input id="sup" value="Quality Parts"></label><label>Item <input id="item"></label><label>Qty <input id="qty" type="number" value="1"></label><button class="btn" id="issue">Issue</button></div>`;
  $("issue").onclick=async()=>{ const out=await api("/api/orders",{method:"POST",body:JSON.stringify({unit_id:$("unit").value,responsible:$("who2").value,supplier:$("sup").value,item:$("item").value,qty:Number($("qty").value),invoiced_excl:0})}); alert(out.order_no); };
}
