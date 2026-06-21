// App-Logik

// Render topic grid
const grid = document.getElementById("topicGrid");
TOPICS.forEach(t=>{
  const el = document.createElement("div");
  el.className = "topic-card";
  el.innerHTML = `
    <div class="tc-num">MOD_${t.num}</div>
    <div class="tc-icon">${t.icon}</div>
    <div class="tc-title">${t.title}</div>
    <div class="tc-desc">${t.desc}</div>
    <div class="tc-tags">${t.tags.map(x=>`<span>#${x}</span>`).join("")}</div>`;
  el.onclick = ()=>openTopic(t.id);
  grid.appendChild(el);
});

// Render glossar
const gl = document.getElementById("glossList");
GLOSS.sort((a,b)=>a[0].localeCompare(b[0])).forEach(([k,v])=>{
  const d = document.createElement("div");
  d.className = "gloss-item";
  d.innerHTML = `<b>${k}</b><span>${v}</span>`;
  gl.appendChild(d);
});

// Open topic
function openTopic(id){
  const t = TOPICS.find(x=>x.id===id);
  if(!t) return;
  document.getElementById("detailTitle").textContent = `${t.icon}  ${t.title}`;
  document.getElementById("detailBody").innerHTML = t.body;
  document.getElementById("content").scrollIntoView({behavior:"smooth"});
}

// Search
const search = document.getElementById("search");
const srBox = document.getElementById("searchResults");
function doSearch(q){
  q = q.trim().toLowerCase();
  if(!q){ srBox.hidden=true; srBox.innerHTML=""; return; }
  const hits = [];
  TOPICS.forEach(t=>{
    const hay = (t.title+" "+t.desc+" "+t.tags.join(" ")+" "+t.body).toLowerCase();
    if(hay.includes(q)) hits.push({type:"Thema",label:t.title,id:t.id});
  });
  GLOSS.forEach(([k,v])=>{
    if((k+" "+v).toLowerCase().includes(q)){
      // find topic that mentions this term, else use first
      const t = TOPICS.find(x=>(x.body+" "+x.title).toLowerCase().includes(k.toLowerCase())) || TOPICS[0];
      hits.push({type:"Begriff",label:k+" — "+v.slice(0,60)+(v.length>60?"…":""),id:t.id});
    }
  });
  srBox.hidden = false;
  if(!hits.length){ srBox.innerHTML = `<div class="none">Keine Treffer für „${q}"</div>`; return; }
  srBox.innerHTML = hits.slice(0,12).map(h=>`<div class="sr" data-id="${h.id}"><small>[${h.type}]</small> ${h.label}</div>`).join("");
  [...srBox.querySelectorAll(".sr")].forEach(el=>el.onclick=()=>{
    openTopic(el.dataset.id); srBox.hidden=true; search.value=""; });
}
search.addEventListener("input",e=>doSearch(e.target.value));
document.addEventListener("keydown",e=>{
  if(e.key==="/" && document.activeElement!==search){ e.preventDefault(); search.focus(); }
  if(e.key==="Escape"){ srBox.hidden=true; search.blur(); }
});
document.addEventListener("click",e=>{
  if(!e.target.closest(".search-wrap") && !e.target.closest(".search-results")) srBox.hidden=true;
});

// Mobile menu
document.getElementById("menuBtn").onclick=()=>document.querySelector(".topnav").classList.toggle("open");

// ── TOOLS ──
// Number converter
const numIn = document.getElementById("numIn"), numOut = document.getElementById("numOut");
numIn.addEventListener("input",()=>{
  const v = numIn.value.trim();
  if(!v){ numOut.textContent="—"; return; }
  let n;
  try {
    if(/^0b[01]+$/i.test(v)) n=parseInt(v.slice(2),2);
    else if(/^0x[0-9a-f]+$/i.test(v)) n=parseInt(v.slice(2),16);
    else if(/^[01]{4,}$/.test(v) && !/[2-9]/.test(v)) n=parseInt(v,2);
    else n=parseInt(v,10);
    if(isNaN(n)) throw 0;
    numOut.textContent = `DEZ: ${n}\nBIN: 0b${n.toString(2)}\nHEX: 0x${n.toString(16).toUpperCase()}\nOCT: 0o${n.toString(8)}`;
  } catch { numOut.textContent="Ungültige Eingabe"; }
});

// Gate sim
function updGates(){
  const a=document.getElementById("gA").checked?1:0;
  const b=document.getElementById("gB").checked?1:0;
  const out = `AND=${a&b}  OR=${a|b}  XOR=${a^b}  NAND=${1-(a&b)}  NOR=${1-(a|b)}  XNOR=${1-(a^b)}`;
  document.getElementById("gateOut").textContent=out;
}
["gA","gB"].forEach(id=>document.getElementById(id).addEventListener("change",updGates));
updGates();

// IPv4 subnet
const ipIn=document.getElementById("ipIn"), ipOut=document.getElementById("ipOut");
ipIn.addEventListener("input",()=>{
  const m = ipIn.value.trim().match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/);
  if(!m){ ipOut.textContent="Format: 192.168.1.0/24"; return; }
  const oct=[+m[1],+m[2],+m[3],+m[4]], pre=+m[5];
  if(oct.some(o=>o<0||o>255)||pre<0||pre>32){ ipOut.textContent="Ungültige Werte"; return; }
  const ip = (oct[0]<<24)|(oct[1]<<16)|(oct[2]<<8)|oct[3];
  const mask = pre===0?0:(~0<<(32-pre))>>>0;
  const net = (ip&mask)>>>0, bcast = (net|(~mask>>>0))>>>0;
  const fmt = n=>[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join(".");
  const hosts = pre>=31?0:Math.pow(2,32-pre)-2;
  ipOut.textContent = `Netz:     ${fmt(net)}\nMaske:    ${fmt(mask)}\nBroadcast:${fmt(bcast)}\n1. Host:  ${fmt(net+1)}\nletzter:  ${fmt(bcast-1)}\nHosts:    ${hosts}`;
});

// SQL demo (very basic)
const sqlIn=document.getElementById("sqlIn"), sqlOut=document.getElementById("sqlOut");
const DEMO_DB = {
  Schueler:[{SID:1,Name:"Anna",Klasse:"J2"},{SID:2,Name:"Ben",Klasse:"J1"},{SID:3,Name:"Cara",Klasse:"J2"},{SID:4,Name:"Dan",Klasse:"J2"}],
  Labor:[{LID:1,Titel:"Arduino"},{LID:2,Titel:"SQL"}],
  Teilnahme:[{SID:1,LID:1,Note:2},{SID:1,LID:2,Note:1},{SID:2,LID:1,Note:3},{SID:3,LID:2,Note:2}]
};
sqlIn.addEventListener("input",()=>{
  const q=sqlIn.value.trim();
  if(!q){ sqlOut.textContent="Tabellen: Schueler, Labor, Teilnahme"; return; }
  const m=q.match(/select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?[;]?$/is);
  if(!m){ sqlOut.textContent="// Demo: nur SELECT ... FROM ... [WHERE ...]"; return; }
  const cols=m[1].trim(), tab=m[2], where=m[3];
  const data=DEMO_DB[tab];
  if(!data){ sqlOut.textContent="Unbekannte Tabelle: "+tab; return; }
  let rows=data;
  if(where){
    try {
      const cond = where.replace(/=/g,"==").replace(/'/g,'"');
      rows = data.filter(r=>{ with(r){ return eval(cond); } });
    } catch { sqlOut.textContent="Fehler in WHERE"; return; }
  }
  let result;
  if(cols==="*") result=rows;
  else {
    const cs=cols.split(",").map(s=>s.trim());
    result=rows.map(r=>Object.fromEntries(cs.map(c=>[c,r[c]])));
  }
  sqlOut.textContent = result.length? JSON.stringify(result,null,1) : "(0 Zeilen)";
});

// ── ZUSÄTZLICHE TOOLS ──

// 2er-Komplement (8 Bit)
const tcIn=document.getElementById("tcIn"), tcOut=document.getElementById("tcOut");
tcIn && tcIn.addEventListener("input",()=>{
  const v=tcIn.value.trim();
  if(!v){tcOut.textContent="—";return;}
  let n;
  if(/^-?\d+$/.test(v)){
    n=parseInt(v,10);
    if(n<-128||n>127){tcOut.textContent="Bereich: -128…127";return;}
    const u=n<0?(256+n):n;
    tcOut.textContent=`DEZ: ${n}\nBIN: ${u.toString(2).padStart(8,"0")}\nHEX: 0x${u.toString(16).toUpperCase().padStart(2,"0")}`;
  } else if(/^[01]{8}$/.test(v)){
    const u=parseInt(v,2);
    n=u>127?u-256:u;
    tcOut.textContent=`BIN: ${v}\nDEZ (vorzeichenlos): ${u}\nDEZ (2er-Komplement): ${n}\nHEX: 0x${u.toString(16).toUpperCase().padStart(2,"0")}`;
  } else tcOut.textContent="Eingabe: Dezimal (-128…127) oder 8-Bit-Binär";
});

// Cäsar
function caesar(s,k){
  return s.replace(/[a-zA-Z]/g,c=>{
    const base=c<="Z"?65:97;
    return String.fromCharCode((c.charCodeAt(0)-base+((k%26)+26))%26+base);
  });
}
const cTxt=document.getElementById("caesarTxt"), cKey=document.getElementById("caesarKey"), cOut=document.getElementById("caesarOut");
function updCaesar(){
  const k=parseInt(cKey.value,10)||0;
  const t=cTxt.value||"";
  cOut.textContent=t? `Verschlüsselt (k=${k}):\n${caesar(t,k)}\n\nEntschlüsselt:\n${caesar(t,-k)}` : "—";
}
cTxt && cTxt.addEventListener("input",updCaesar);
cKey && cKey.addEventListener("input",updCaesar);

// SHA-256
const hIn=document.getElementById("hashIn"), hOut=document.getElementById("hashOut");
hIn && hIn.addEventListener("input",async()=>{
  const t=hIn.value;
  if(!t){hOut.textContent="—";return;}
  try{
    const buf=new TextEncoder().encode(t);
    const h=await crypto.subtle.digest("SHA-256",buf);
    const hex=[...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,"0")).join("");
    hOut.textContent="SHA-256:\n"+hex.match(/.{1,32}/g).join("\n");
  }catch(e){hOut.textContent="Fehler: "+e.message;}
});

// Regex
const rxP=document.getElementById("rxPat"), rxS=document.getElementById("rxStr"), rxO=document.getElementById("rxOut");
function updRx(){
  const p=rxP.value, s=rxS.value;
  if(!p){rxO.textContent="—";return;}
  try{
    const re=new RegExp(p,"g");
    const m=[...s.matchAll(re)];
    rxO.textContent=m.length? `${m.length} Treffer:\n`+m.map(x=>`• "${x[0]}" @ ${x.index}`).join("\n") : "Keine Treffer";
  }catch(e){rxO.textContent="Ungültiger Regex: "+e.message;}
}
rxP && rxP.addEventListener("input",updRx);
rxS && rxS.addEventListener("input",updRx);

// Boolean evaluator
const bIn=document.getElementById("boolIn"), bOut=document.getElementById("boolOut");
bIn && bIn.addEventListener("input",()=>{
  const e=bIn.value.trim();
  if(!e){bOut.textContent="—";return;}
  const vars=[...new Set(e.match(/\b[A-Z]\b/g)||[])].sort();
  if(!vars.length){bOut.textContent="Verwende Variablen A, B, C …";return;}
  if(vars.length>4){bOut.textContent="Max 4 Variablen";return;}
  const js=e.replace(/\band\b/gi,"&&").replace(/\bor\b/gi,"||").replace(/\bnot\b/gi,"!").replace(/¬/g,"!").replace(/∧/g,"&&").replace(/∨/g,"||");
  let out="Wahrheitstabelle:\n"+vars.join(" ")+" | E\n"+"-".repeat(vars.length*2+4)+"\n";
  try{
    for(let i=0;i<(1<<vars.length);i++){
      const env={}; vars.forEach((v,idx)=>env[v]=(i>>(vars.length-1-idx))&1);
      const expr=js.replace(/\b[A-Z]\b/g,m=>env[m]);
      const r=eval(expr)?1:0;
      out+=vars.map(v=>env[v]).join(" ")+" | "+r+"\n";
    }
    bOut.textContent=out;
  }catch(err){bOut.textContent="Fehler im Ausdruck";}
});

// Sortier-Visualisierer
(function(){
  const canvas=document.getElementById("sortCanvas"); if(!canvas) return;
  const ctx=canvas.getContext("2d");
  let arr=[], running=false;
  function shuffle(){
    arr=Array.from({length:50},(_,i)=>i+1);
    for(let i=arr.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[arr[i],arr[j]]=[arr[j],arr[i]];}
    draw([],[]);
  }
  function draw(hi=[],sorted=[]){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const w=canvas.width/arr.length;
    arr.forEach((v,i)=>{
      const h=v/arr.length*(canvas.height-4);
      ctx.fillStyle=hi.includes(i)?"#ff4dff":sorted.includes(i)?"#9bff5b":"#00f0ff";
      ctx.fillRect(i*w,canvas.height-h,w-1,h);
    });
  }
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  async function bubble(){
    for(let i=0;i<arr.length;i++)for(let j=0;j<arr.length-i-1;j++){
      draw([j,j+1]); await sleep(8);
      if(arr[j]>arr[j+1]){[arr[j],arr[j+1]]=[arr[j+1],arr[j]];}
    } draw([],arr.map((_,i)=>i));
  }
  async function insertion(){
    for(let i=1;i<arr.length;i++){
      let j=i; while(j>0&&arr[j-1]>arr[j]){[arr[j-1],arr[j]]=[arr[j],arr[j-1]];j--;draw([j,j+1]);await sleep(8);}
    } draw([],arr.map((_,i)=>i));
  }
  async function selection(){
    for(let i=0;i<arr.length;i++){
      let m=i;
      for(let j=i+1;j<arr.length;j++){if(arr[j]<arr[m])m=j; draw([m,j]); await sleep(4);}
      [arr[i],arr[m]]=[arr[m],arr[i]];
    } draw([],arr.map((_,i)=>i));
  }
  async function quick(l=0,r=arr.length-1){
    if(l<r){
      const p=arr[r]; let i=l-1;
      for(let j=l;j<r;j++){draw([j,r]);await sleep(10);if(arr[j]<p){i++;[arr[i],arr[j]]=[arr[j],arr[i]];}}
      [arr[i+1],arr[r]]=[arr[r],arr[i+1]];
      await quick(l,i); await quick(i+2,r);
    }
    if(l===0&&r===arr.length-1) draw([],arr.map((_,i)=>i));
  }
  document.getElementById("sortShuffle").onclick=()=>{if(!running)shuffle();};
  document.getElementById("sortRun").onclick=async()=>{
    if(running) return; running=true;
    const algo=document.getElementById("sortAlgo").value;
    if(algo==="bubble")await bubble();
    else if(algo==="insertion")await insertion();
    else if(algo==="selection")await selection();
    else if(algo==="quick"){await quick();}
    running=false;
  };
  shuffle();
})();
