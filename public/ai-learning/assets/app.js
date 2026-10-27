/* LLM Engineer Path — core: data loading, progress store, router, helpers */
(function(){
"use strict";
const KEY="llm-path-v2", LEGACY="llm-path-v1";
const App=window.App={data:{meta:null,modules:[]},S:null,route:{view:"home",a:null,b:null},views:{}};

/* ---------- helpers ---------- */
const $=App.$=(s,r=document)=>r.querySelector(s);
const $$=App.$$=(s,r=document)=>[...r.querySelectorAll(s)];
App.esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
App.fmtH=min=>{const h=min/60;return (h>=10?Math.round(h):Math.round(h*10)/10)+" h"};
App.today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
App.toast=msg=>{let t=$("#toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.hidden=false;clearTimeout(t._t);t._t=setTimeout(()=>t.hidden=true,2200)};
App.copy=async(text)=>{try{await navigator.clipboard.writeText(text);App.toast("Copied");return true}catch(e){App.toast("Clipboard unavailable; text selected");return false}};
App.hostOf=u=>{try{return new URL(u).host.replace(/^www\./,"")}catch(e){return u}};

/* ---------- store ---------- */
function blank(){return{v:2,lessons:{},quiz:{},exam:null,notes:{},bookmarks:{},cards:{},projects:{},ex:{},log:{},name:"",issued:null,lastVisited:null}}
function normalize(s){const b=blank();for(const k in b)if(s[k]===undefined)s[k]=b[k];return s}
function migrate(old){const s=blank();s.lessons={};Object.keys(old.lessons||{}).forEach(k=>{const[m,i]=k.split(":");if(old.lessons[k])s.lessons[m+"-l"+String(+i+1).padStart(2,"0")]=true});s.quiz=old.quiz||{};s.exam=old.exam||null;s.name=old.name||"";s.issued=old.issued||null;return s}
function load(){try{const r=localStorage.getItem(KEY);if(r)return normalize(JSON.parse(r));const o=localStorage.getItem(LEGACY);if(o)return migrate(JSON.parse(o))}catch(e){}return blank()}
App.save=()=>{try{localStorage.setItem(KEY,JSON.stringify(App.S))}catch(e){}};
App.reset=()=>{App.S=blank();App.save()};
App.importState=json=>{App.S=normalize(JSON.parse(json));App.save()};

/* ---------- derived ---------- */
const D=App.d={};
D.mod=id=>App.data.modules.find(m=>m.id===id);
D.lesson=id=>{for(const m of App.data.modules){const l=m.lessons.find(x=>x.id===id);if(l)return{m,l,i:m.lessons.indexOf(l)}}return null};
D.allLessons=()=>App.data.modules.flatMap(m=>m.lessons.map(l=>({m,l})));
D.lessonDone=id=>!!App.S.lessons[id];
D.modLessonsDone=m=>m.lessons.filter(l=>D.lessonDone(l.id)).length;
D.modPct=m=>Math.round(100*D.modLessonsDone(m)/m.lessons.length);
D.quizBest=m=>App.S.quiz[m.id]?App.S.quiz[m.id].best:null;
D.quizPassed=m=>D.quizBest(m)!==null&&D.quizBest(m)>=App.data.meta.passMark;
D.modComplete=m=>D.modLessonsDone(m)===m.lessons.length&&D.quizPassed(m);
D.examPassed=()=>!!(App.S.exam&&App.S.exam.best>=App.data.meta.passMark);
D.allComplete=()=>App.data.modules.every(D.modComplete)&&D.examPassed();
D.totalLessons=()=>App.data.modules.reduce((n,m)=>n+m.lessons.length,0);
D.totalMinutes=()=>App.data.modules.reduce((n,m)=>n+m.lessons.reduce((k,l)=>k+l.minutes,0),0);
D.overallPct=()=>{const L=D.totalLessons(),done=D.allLessons().filter(x=>D.lessonDone(x.l.id)).length,q=App.data.modules.filter(D.quizPassed).length;const units=L+App.data.modules.length+1;return Math.round(100*(done+q+(D.examPassed()?1:0))/units)};
D.nextLesson=()=>{for(const m of App.data.modules){for(const l of m.lessons)if(!D.lessonDone(l.id))return{m,l}}return null};
D.firstIncompleteModule=()=>App.data.modules.find(m=>!D.modComplete(m))||App.data.modules[App.data.modules.length-1];
D.streak=()=>{let n=0;const d=new Date();for(;;){const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");if(App.S.log[k]){n++;d.setDate(d.getDate()-1)}else{if(n===0){d.setDate(d.getDate()-1);const k2=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");if(App.S.log[k2]){n++;d.setDate(d.getDate()-1);continue}}break}}return n};
D.minutesLogged=()=>Object.values(App.S.log).reduce((a,b)=>a+b,0);
D.stageOf=m=>App.data.meta.stages.find(s=>s.modules.includes(m.id));

/* ---------- actions ---------- */
const A=App.act={};
A.toggleLesson=(id,on)=>{const was=D.lessonDone(id);const v=on===undefined?!was:on;if(v)App.S.lessons[id]=true;else delete App.S.lessons[id];if(v&&!was){const r=D.lesson(id);const t=App.today();App.S.log[t]=(App.S.log[t]||0)+(r?r.l.minutes:0)}App.save();App.renderSide()};
A.note=(id,text)=>{if(text.trim())App.S.notes[id]={text,at:new Date().toISOString()};else delete App.S.notes[id];App.save()};
A.bookmark=id=>{if(App.S.bookmarks[id])delete App.S.bookmarks[id];else App.S.bookmarks[id]=true;App.save()};
A.exStep=(lid,i,on)=>{const k=lid;App.S.ex[k]=App.S.ex[k]||{};if(on)App.S.ex[k][i]=true;else delete App.S.ex[k][i];App.save()};
A.recordQuiz=(key,pct)=>{const r=(key==="exam"?App.S.exam:App.S.quiz[key])||{best:0,attempts:0,last:0};r.attempts++;r.last=pct;r.best=Math.max(r.best,pct);r.at=new Date().toISOString();if(key==="exam")App.S.exam=r;else App.S.quiz[key]=r;const t=App.today();App.S.log[t]=(App.S.log[t]||0)+10;App.save();App.renderSide();return r};
A.rateCard=(key,grade)=>{const c=App.S.cards[key]||{box:0,seen:0};c.seen++;if(grade==="again")c.box=0;else if(grade==="good")c.box=Math.min(5,c.box+1);else c.box=Math.min(5,c.box+2);const days=[0,1,3,7,14,30][c.box];c.due=Date.now()+days*864e5;c.last=grade;App.S.cards[key]=c;App.save()};
A.projectCrit=(mid,i,on)=>{App.S.projects[mid]=App.S.projects[mid]||{crit:{}};if(on)App.S.projects[mid].crit[i]=true;else delete App.S.projects[mid].crit[i];App.save()};
A.projectDone=(mid,on)=>{App.S.projects[mid]=App.S.projects[mid]||{crit:{}};App.S.projects[mid].done=on;if(on){const m=D.mod(mid);const t=App.today();App.S.log[t]=(App.S.log[t]||0)+(m.project.hours||4)*60}App.save()};

/* ---------- syntax highlighter (tiny) ---------- */
const KW={python:"def class return import from as if elif else for while in not and or is None True False try except finally with lambda yield raise pass break continue async await assert global del print",typescript:"const let var function return if else for while import from export class interface type new async await try catch finally throw switch case break default true false null undefined this extends implements enum of in",javascript:"const let var function return if else for while import from export class new async await try catch finally throw switch case break default true false null undefined this of in",yaml:"true false null",bash:"if then else fi for do done while export echo cd set function in case esac"};
App.highlight=(src,lang)=>{const kw=new Set((KW[lang]||KW.python).split(" "));const esc=App.esc;let out="";const re=lang==="yaml"||lang==="bash"?/(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w-]*)(?=\s*:)|([A-Za-z_]\w*)/g:/(#[^\n]*|\/\/[^\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?"""|'''[\s\S]*?''')|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\s*\()|([A-Za-z_]\w*)/g;let last=0;src.replace(re,(m,com,str,num,fn,id,off)=>{out+=esc(src.slice(last,off));last=off+m.length;if(com)out+=`<span class="tok-com">${esc(m)}</span>`;else if(str)out+=`<span class="tok-str">${esc(m)}</span>`;else if(num)out+=`<span class="tok-num">${esc(m)}</span>`;else if(fn)out+=kw.has(m)?`<span class="tok-kw">${esc(m)}</span>`:`<span class="tok-fn">${esc(m)}</span>`;else if(id)out+=kw.has(m)?`<span class="tok-kw">${esc(m)}</span>`:esc(m);else out+=esc(m);return m});out+=esc(src.slice(last));return out};
App.codeBlock=(c)=>c?`<div class="code-wrap"><div class="cap"><span>${App.esc(c.caption||"")}</span><span class="row"><span class="chip">${App.esc(c.lang||"python")}</span><button class="btn sm ghost" data-copy-code>Copy</button></span></div><pre class="code"><code>${App.highlight(c.src,c.lang||"python")}</code></pre></div>`:"";

/* ---------- shared widgets ---------- */
App.ring=(pct,size=72,stroke=7,color)=>{const r=(size-stroke)/2,c=2*Math.PI*r;return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color||"var(--accent)"}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct/100)}" transform="rotate(-90 ${size/2} ${size/2})"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="var(--mono)" font-size="${size*0.19}" fill="var(--fg)">${pct}%</text></svg>`};
App.resItem=(r,extra="")=>`<div class="res"><span class="type">${App.esc(r.type||"link")}</span><div><a href="${App.esc(r.url)}" target="_blank" rel="noopener">${App.esc(r.title)}</a> ${extra}<div class="u">${App.esc(App.hostOf(r.url))}</div>${r.note?`<div class="n">${App.esc(r.note)}</div>`:""}</div></div>`;
App.lessonRow=(m,l)=>{const done=D.lessonDone(l.id);return `<a class="lesson-row ${done?"done":""}" href="#lesson/${l.id}"><span class="chk">${done?"✓":""}</span><span class="t"><span class="eyebrow">Lesson ${m.num}.${m.lessons.indexOf(l)+1} · ${App.esc(l.sourceRef)}</span><h4>${App.esc(l.title)}</h4></span><span class="mins"><span class="num">${l.minutes} min</span>${l.colabUrl?`<span class="chip accent">Colab</span>`:l.videoUrl?`<span class="chip info">Video</span>`:""}</span></a>`};

/* ---------- quiz engine ---------- */
App.mountQuiz=(root,questions,opts)=>{
  const PASS=App.data.meta.passMark;let answers=new Array(questions.length).fill(null),submitted=false,last=null;
  const rec=()=>opts.storeKey==="exam"?App.S.exam:App.S.quiz[opts.storeKey];
  function draw(){const r=rec();
    root.innerHTML=`${r?`<div class="row"><span class="chip ${r.best>=PASS?"ok":"bad"}">Best ${r.best}% · ${r.attempts} attempt${r.attempts===1?"":"s"}</span>${r.best>=PASS?`<span class="chip ok">Passed</span>`:""}</div>`:""}
    ${questions.map((q,qi)=>`<div class="qcard"><span class="eyebrow">Question ${qi+1} of ${questions.length}${q.from?" · "+App.esc(q.from):""}</span><p class="q">${App.esc(q.q)}</p>
      <div class="opts" role="radiogroup">${q.o.map((o,oi)=>{let cls="";if(submitted){if(oi===q.a)cls="correct";else if(answers[qi]===oi)cls="wrong"}return `<button type="button" class="opt ${cls}" role="radio" aria-checked="${answers[qi]===oi}" data-q="${qi}" data-o="${oi}" ${submitted?"disabled":""}><span class="letter">${"ABCD"[oi]}</span><span>${App.esc(o)}</span></button>`}).join("")}</div>
      ${submitted?`<p class="explain ${answers[qi]===q.a?"good":"bad"}">${answers[qi]===q.a?"Correct. ":"Not quite. "}${App.esc(q.e)}${q.lesson?` <a href="#lesson/${q.lesson}">Review lesson</a>`:""}</p>`:""}
    </div>`).join("")}<div class="row" id="qf"></div>`;
    $$(".opt",root).forEach(b=>b.addEventListener("click",()=>{answers[+b.dataset.q]=+b.dataset.o;draw()}));
    const qf=$("#qf",root);
    if(!submitted){const left=answers.filter(a=>a===null).length;qf.innerHTML=`<button class="btn primary" id="submit" ${left?"disabled":""}>Submit answers</button><span class="note">${left?`${left} unanswered`:"All answered"}</span>`;
      $("#submit",root).addEventListener("click",()=>{submitted=true;const correct=answers.filter((a,i)=>a===questions[i].a).length;const pct=Math.round(100*correct/questions.length);last={correct,pct};A.recordQuiz(opts.storeKey,pct);draw();root.scrollIntoView({behavior:"smooth",block:"start"});if(opts.onDone)opts.onDone(pct)});
    }else{qf.innerHTML=`<span class="score num">${last.correct}/${questions.length} · ${last.pct}%</span><span class="chip ${last.pct>=PASS?"ok":"bad"}">${last.pct>=PASS?"Passed":"Below "+PASS+"%, try again"}</span><button class="btn" id="retake">Retake</button>${opts.after||""}`;$("#retake",root).addEventListener("click",()=>{answers=new Array(questions.length).fill(null);submitted=false;draw()})}
  }
  draw();
};

/* ---------- router ---------- */
App.go=hash=>{if(location.hash!==hash)location.hash=hash;else render()};
function parse(){const h=(location.hash||"#home").slice(1);const[view,a,b]=h.split("/");return{view:view||"home",a:a||null,b:b||null}}
function render(){App.route=parse();const v=App.views[App.route.view]||App.views.home;const root=$("#app");root.innerHTML="";try{v(root,App.route)}catch(e){root.innerHTML=`<div class="empty">Something went wrong rendering this page.<br><code>${App.esc(e.message)}</code></div>`;console.error(e)}
  $$(".navlink").forEach(n=>n.setAttribute("aria-current",n.dataset.nav===App.route.view||(n.dataset.mod&&(App.route.a===n.dataset.mod||(App.route.view==="lesson"&&D.lesson(App.route.a)?.m.id===n.dataset.mod)))?"page":"false"));
  $("#side").classList.remove("open");$("#scrim").hidden=true;window.scrollTo({top:0});
  $$("[data-copy-code]",root).forEach(b=>b.addEventListener("click",()=>App.copy(b.closest(".code-wrap").querySelector("code").textContent)));
  if(App.route.view==="lesson"){App.S.lastVisited=App.route.a;App.save()}
}
App.render=render;
App.renderSide=()=>{const g=$("#side-modules");g.innerHTML=`<span class="eyebrow">Modules</span>`+App.data.modules.map(m=>`<a class="navlink ${D.modComplete(m)?"done":""}" href="#module/${m.id}" data-mod="${m.id}"><span class="k">M${m.num}</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${App.esc(m.short)}</span><span class="pct num">${D.modPct(m)}%</span></a>`).join("");
  const p=D.overallPct();$("#side-ring").innerHTML=`${App.ring(p,40,5)}<div><b>${p}% complete</b><small>${D.allLessons().filter(x=>D.lessonDone(x.l.id)).length}/${D.totalLessons()} lessons · ${D.streak()}-day streak</small></div>`};

/* ---------- boot ---------- */
async function boot(){
  const root=$("#app");
  try{
    const meta=await (await fetch("data/meta.json")).json();
    const ids=meta.stages.flatMap(s=>s.modules);
    const mods=(await Promise.all(ids.map(async id=>{try{const r=await fetch(`data/modules/${id}.json`);if(!r.ok)throw new Error(r.status);return await r.json()}catch(e){console.warn(`module ${id} not loaded:`,e.message);return null}}))).filter(Boolean);
    if(!mods.length)throw new Error("no module files found");
    App.data.meta=meta;App.data.modules=mods.sort((a,b)=>a.num-b.num);
    App.data.meta.stages=meta.stages.map(s=>({...s,modules:s.modules.filter(id=>mods.some(m=>m.id===id))})).filter(s=>s.modules.length);
    App.data.meta.plan=meta.plan.filter(w=>mods.some(m=>m.id===w.module));
  }catch(e){root.innerHTML=`<div class="empty">Could not load the curriculum data (${App.esc(e.message)}). Serve this folder over HTTP rather than opening the file directly.</div>`;return}
  App.S=load();App.save();
  App.renderSide();
  window.addEventListener("hashchange",render);
  $("#menu-btn").addEventListener("click",()=>{$("#side").classList.add("open");$("#scrim").hidden=false});
  $("#scrim").addEventListener("click",()=>{$("#side").classList.remove("open");$("#scrim").hidden=true});
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();App.go("#search")}});
  render();
}
boot();
})();
