// Rodízio da Coca - lógica do app (JS puro, sem dependências)
var KEY="rodizio-coca-v1",DAYS=["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
var ALL=["Mister Doc","Galão","Thicas","Richardo","Costela","Pomba"];
var PHOTOS={"Mister Doc":"assets/fotos/mister-doc.jpg","Galão":"assets/fotos/galao.jpg","Thicas":"assets/fotos/thicas.jpg","Richardo":"assets/fotos/richardo.jpg","Costela":"assets/fotos/costela.jpg","Pomba":"assets/fotos/pomba.jpg"};
var COLORS={"Mister Doc":"#7c4dff","Galão":"#f59e0b","Thicas":"#0ea5e9","Richardo":"#16a34a","Costela":"#db2777","Pomba":"#64748b"};
function fresh(){return {queue:ALL.slice(),slot:"2026-10-06",hist:[]}}
var S=fresh();
try{var raw=localStorage.getItem(KEY);if(raw){var p=JSON.parse(raw);if(p&&p.queue&&p.queue.length===6)S=p}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function toD(s){var a=s.split("-");return new Date(+a[0],+a[1]-1,+a[2])}
function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function nextDay(s){var d=toD(s);do{d.setDate(d.getDate()+1)}while(d.getDay()!==2&&d.getDay()!==4);return iso(d)}
function fmt(s){var d=toD(s);return DAYS[d.getDay()]+", "+String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")}
function short(s){var d=toD(s);return DAYS[d.getDay()].slice(0,3)+" "+String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")}
function pay(){S.hist.push({n:S.queue[0],d:S.slot});S.queue.push(S.queue.shift());S.slot=nextDay(S.slot);save();render()}
function undo(){if(!S.hist.length)return;var h=S.hist.pop();S.queue.unshift(S.queue.pop());S.slot=h.d;save();render()}
function reset(){if(confirm("Voltar tudo ao início?")){S=fresh();save();render()}}
function mv(i,dir){var j=i+dir;if(j<0||j>=6)return;var t=S.queue[i];S.queue[i]=S.queue[j];S.queue[j]=t;save();render()}
function render(){
  var q=S.queue,n=q[0];
  var av=document.getElementById("av"),ph=PHOTOS[n];av.style.backgroundImage=ph?"url("+ph+")":"";av.textContent=ph?"":n[0];
  document.getElementById("nm").textContent=n;
  document.getElementById("dt").textContent=fmt(S.slot);
  var h="",d=S.slot;
  for(var i=0;i<12;i++){
    var who=q[i%6];
    h+='<div class="row'+(i===0?' first':'')+'">'+dotHtml(who)+'<b>'+who+'</b><span>'+short(d)+'</span></div>';
    d=nextDay(d);
  }
  document.getElementById("up").innerHTML=h;
  var hs=S.hist.slice(-6).reverse().map(function(x){return '<div class="chip">'+x.n+'<i>'+short(x.d)+'</i></div>'}).join("");
  document.getElementById("hs").innerHTML=hs||'<div class="empty">Ninguém marcado ainda por aqui.</div>';
  document.getElementById("ord").innerHTML=q.map(function(x,i){
    return '<div class="ord"><span>'+(i+1)+'º</span>'+dotHtml(x)+'<b>'+x+'</b><button onclick="mv('+i+',-1)">↑</button><button onclick="mv('+i+',1)">↓</button></div>'}).join("");
}
var BOTTLE="assets/garrafa.png";
Array.prototype.forEach.call(document.querySelectorAll(".bt,.bg-bt"),function(e){e.src=BOTTLE});
function dotHtml(n){var p=PHOTOS[n];return p?'<div class="dot" style="background-image:url('+p+')"></div>':'<div class="dot" style="background:'+COLORS[n]+'">'+n[0]+'</div>'}
for(var k=0;k<22;k++){var b=document.createElement("span"),z=4+Math.random()*12;b.className="bub";b.style.cssText="left:"+Math.random()*100+"%;width:"+z+"px;height:"+z+"px;animation-duration:"+(7+Math.random()*9)+"s;animation-delay:-"+Math.random()*12+"s;--dx:"+(Math.random()*60-30)+"px";document.body.appendChild(b)}
render();
