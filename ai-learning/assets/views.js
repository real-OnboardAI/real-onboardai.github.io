/* LLM Engineer Path — views (part A: dashboard, roadmap, plan, catalog, module, lesson) */
(function(){
"use strict";
const {esc,d:D,act:A,$,$$}=App;
const V=App.views;
const stageBadge=m=>{const s=D.stageOf(m);return s?`<span class="chip">${esc(s.name)}</span>`:""};

/* ---------- Dashboard ---------- */
V.home=root=>{
  const meta=App.data.meta,mods=App.data.modules,next=D.nextLesson(),pct=D.overallPct();
  const last=App.S.lastVisited&&D.lesson(App.S.lastVisited);
  const todayMin=App.S.log[App.today()]||0;
  const thisWeek=(()=>{const doneCount=D.allLessons().filter(x=>D.lessonDone(x.l.id)).length;let acc=0;for(const w of meta.plan){const m=D.mod(w.module);const share=Math.round(m.lessons.length*w.hours/meta.plan.filter(x=>x.module===w.module).reduce((n,x)=>n+x.hours,0));acc+=share;if(doneCount<acc)return w}return meta.plan[meta.plan.length-1]})();
  root.innerHTML=`
  <header class="hero">
    <span class="eyebrow">${esc(meta.title)} · 12 weeks · ${mods.length} sources · ${D.totalLessons()} lessons · ${App.fmtH(D.totalMinutes())}</span>
    <h1>${esc(meta.tagline)}</h1>
    <p class="lede">Seven of the best free resources on large language models, arranged into one path: how models work, how to engineer applications around them, how to evaluate and fine-tune, how to build agents that survive production, and how to serve all of it fast.</p>
    <div class="row">
      ${next?`<a class="btn primary" href="#lesson/${next.l.id}">${pct?"Continue":"Start"}: ${esc(next.l.title)} →</a>`:`<a class="btn primary" href="#exam">Take the final exam →</a>`}
      <a class="btn" href="#roadmap">View the roadmap</a>
      <a class="btn ghost" href="#plan">Week-by-week plan</a>
    </div>
  </header>
  <div class="grid g4">
    <div class="stat"><span class="v num">${pct}%</span><span class="l">overall complete</span></div>
    <div class="stat"><span class="v num">${D.allLessons().filter(x=>D.lessonDone(x.l.id)).length}<span class="muted" style="font-size:1rem">/${D.totalLessons()}</span></span><span class="l">lessons done</span></div>
    <div class="stat"><span class="v num">${mods.filter(D.quizPassed).length}<span class="muted" style="font-size:1rem">/${mods.length}</span></span><span class="l">quizzes passed</span></div>
    <div class="stat"><span class="v num">${D.streak()}</span><span class="l">day streak · ${todayMin} min today</span></div>
  </div>
  <section class="block">
    <div class="block-head"><h2>Up next</h2><p>Week ${thisWeek.week} of the plan: ${esc(thisWeek.focus)}</p></div>
    <div class="grid g2">
      ${last&&!D.lessonDone(last.l.id)?`<a class="card link" href="#lesson/${last.l.id}"><span class="eyebrow">Resume where you left off</span><h3>${esc(last.l.title)}</h3><p class="muted">Module ${last.m.num} · ${last.l.minutes} min</p></a>`:""}
      ${next?`<a class="card link" href="#lesson/${next.l.id}"><span class="eyebrow">Next lesson</span><h3>${esc(next.l.title)}</h3><p class="muted">${esc(next.m.title)} · ${esc(next.l.sourceRef)} · ${next.l.minutes} min</p><p>${esc(next.l.summary.split(". ")[0])}.</p></a>`:""}
      <a class="card link" href="#flashcards"><span class="eyebrow">Review</span><h3>Flashcards due</h3><p class="muted">${dueCount()} cards due across modules you have started</p></a>
      <a class="card link" href="#projects"><span class="eyebrow">Build</span><h3>Module projects</h3><p class="muted">${Object.values(App.S.projects).filter(p=>p.done).length} of ${mods.length} projects recorded</p></a>
    </div>
  </section>
  <section class="block">
    <div class="block-head"><h2>Modules</h2><p>Four stages, seven modules. Each module is one source, turned into lessons with notebooks, exercises, flashcards, a quiz and a project.</p></div>
    <div class="grid g2">${mods.map(m=>modCard(m)).join("")}</div>
  </section>
  <section class="block">
    <div class="block-head"><h2>Study activity</h2><p>Minutes logged per day over the last 12 weeks. Marking a lesson done logs its estimated time.</p></div>
    ${heat()}
  </section>
  <section class="block">
    <div class="block-head"><h2>Questions people ask</h2></div>
    <div class="grid g2">${meta.faq.map(f=>`<div class="card"><h4>${esc(f.q)}</h4><p class="muted">${esc(f.a)}</p></div>`).join("")}</div>
  </section>
  ${foot()}`;
};
function dueCount(){let n=0;App.data.modules.forEach(m=>{if(!D.modLessonsDone(m))return;m.flashcards.forEach((c,i)=>{const r=App.S.cards[m.id+":"+i];if(!r||!r.due||r.due<=Date.now())n++})});return n}
function modCard(m){const pct=D.modPct(m),done=D.modComplete(m);return `<a class="card link" href="#module/${m.id}"><div class="row between"><span class="eyebrow">Module ${m.num} · ${esc(m.weeks)} · ${esc(m.level)}</span>${done?`<span class="chip ok">Complete</span>`:D.quizPassed(m)?`<span class="chip ok">Quiz passed</span>`:""}</div><h3>${esc(m.title)}</h3><p class="muted">${esc(m.source.name)} · ${esc(m.source.authors)}</p><p>${esc(m.blurb)}</p><div class="row between"><span class="chips"><span class="chip">${m.lessons.length} lessons</span><span class="chip">${m.hours} h</span><span class="chip">${m.lessons.filter(l=>l.colabUrl).length} notebooks</span></span><span class="num muted" style="font-size:.8rem">${D.modLessonsDone(m)}/${m.lessons.length}</span></div><div class="bar ${done?"ok":""}"><i style="width:${pct}%"></i></div></a>`}
function heat(){const days=84,out=[];const d=new Date();d.setDate(d.getDate()-days+1);for(let i=0;i<days;i++){const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");const v=App.S.log[k]||0;out.push(`<i class="${v>=120?"l3":v>=45?"l2":v>0?"l1":""}" title="${k}: ${v} min"></i>`);d.setDate(d.getDate()+1)}return `<div class="heat">${out.join("")}</div><p class="note">${App.fmtH(D.minutesLogged())} logged in total.</p>`}
function foot(){return `<footer class="foot"><span>Curated from seven public resources. Summaries, exercises, flashcards and quizzes are original study material; credit for the underlying content goes to the authors linked on each module.</span><span>${App.data.modules.map(m=>`<a href="${esc(m.source.url)}" target="_blank" rel="noopener">${esc(m.source.name)}</a>`).join(" · ")}</span></footer>`}
App.foot=foot;

/* ---------- Roadmap ---------- */
V.roadmap=root=>{
  const meta=App.data.meta,next=D.firstIncompleteModule();
  root.innerHTML=`<header class="hero"><span class="eyebrow">Roadmap</span><h1>Four stages, seven stations.</h1><p class="lede">Each station is one source. Finish the lessons, pass the quiz, build the project, move on. The rail marks where you are.</p></header>
  <div class="rail">${meta.stages.map(s=>`<div class="stage-label"><h3>${esc(s.name)}</h3><p>${esc(s.goal)}</p></div>${s.modules.map(id=>{const m=D.mod(id);const cls=D.modComplete(m)?"done":m.id===next.id?"active":"";return `<div class="station ${cls}" role="link" tabindex="0" data-href="#module/${m.id}"><div><span class="eyebrow">Module ${m.num} · ${esc(m.weeks)} · ${esc(m.level)}</span><h3>${esc(m.title)}</h3><span class="note">${esc(m.source.name)} · ${esc(m.source.authors)}</span></div><div class="right"><span class="num">${m.lessons.length} lessons · ${m.hours} h</span><span class="bar" style="width:130px"><i style="width:${D.modPct(m)}%"></i></span><span class="num">${D.modLessonsDone(m)}/${m.lessons.length} done${D.quizPassed(m)?" · quiz ✓":""}</span></div><p class="blurb">${esc(m.why)}</p></div>`}).join("")}`).join("")}</div>
  <section class="block"><div class="block-head"><h2>What you will be able to do</h2></div><div class="grid g2">${App.data.modules.map(m=>`<div class="card"><span class="eyebrow">After module ${m.num}</span><ul>${m.outcomes.slice(0,4).map(o=>`<li>${esc(o)}</li>`).join("")}</ul></div>`).join("")}</div></section>${foot()}`;
  $$(".station",root).forEach(s=>{const go=()=>App.go(s.dataset.href);s.addEventListener("click",go);s.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
};

/* ---------- Plan ---------- */
V.plan=root=>{
  const meta=App.data.meta;
  root.innerHTML=`<header class="hero"><span class="eyebrow">Lesson plan</span><h1>Twelve weeks, about six hours a week.</h1><p class="lede">Fundamentals first, production last. If you already know how transformers work, start at week 4 and finish in nine.</p></header>
  <div class="table-wrap"><table><thead><tr><th>Week</th><th>Module</th><th>Focus</th><th>Deliverable</th><th class="num">Hours</th></tr></thead><tbody>${meta.plan.map(w=>{const m=D.mod(w.module);return `<tr><td class="num">${w.week}</td><td><a href="#module/${m.id}">M${m.num} · ${esc(m.short)}</a></td><td>${esc(w.focus)}</td><td>${esc(w.deliverable)}</td><td class="num">${w.hours}</td></tr>`}).join("")}<tr><td></td><td></td><td><strong>Total</strong></td><td></td><td class="num"><strong>${meta.plan.reduce((n,w)=>n+w.hours,0)}</strong></td></tr></tbody></table></div>
  <section class="block"><div class="block-head"><h2>How to study each lesson</h2></div><div class="grid g3">${meta.method.map((s,i)=>`<div class="card"><span class="eyebrow">${i+1} · ${esc(s.step)}</span><h4>${esc(s.title)}</h4><p class="muted">${esc(s.text)}</p></div>`).join("")}</div></section>
  <section class="block"><div class="block-head"><h2>Prerequisites and setup by module</h2></div><div class="grid g2">${App.data.modules.map(m=>`<div class="card"><span class="eyebrow">Module ${m.num}</span><h4>${esc(m.title)}</h4><p class="muted"><strong>Needs:</strong> ${m.prerequisites.map(esc).join(", ")}</p><p class="muted"><strong>Setup:</strong> ${esc(m.source.setup)}</p></div>`).join("")}</div></section>${foot()}`;
};

/* ---------- Catalog ---------- */
V.catalog=root=>{root.innerHTML=`<header class="hero"><span class="eyebrow">All modules</span><h1>The seven modules.</h1></header><div class="grid g2">${App.data.modules.map(modCard).join("")}</div>${foot()}`};

/* ---------- Module ---------- */
V.module=(root,r)=>{
  const m=D.mod(r.a)||D.firstIncompleteModule();const idx=App.data.modules.indexOf(m),prev=App.data.modules[idx-1],nxt=App.data.modules[idx+1];
  const tab=r.b||"overview";
  const tabs=[["overview","Overview"],["lessons",`Lessons (${m.lessons.length})`],["resources",`Resources (${m.resources.length})`],["quiz","Quiz"],["project","Project"],["glossary","Glossary"]];
  root.innerHTML=`<div class="crumbs"><a href="#catalog">Modules</a><span>/</span><span>Module ${m.num}</span></div>
  <header class="hero" style="padding-top:12px">
    <div class="row"><span class="eyebrow">Module ${m.num} · ${esc(m.weeks)} · ${esc(m.level)} · ≈ ${m.hours} hours</span>${stageBadge(m)}</div>
    <h1>${esc(m.title)}</h1>
    <p class="lede">${esc(m.blurb)}</p>
    <div class="row"><span class="chip">${esc(m.source.name)}</span><span class="chip">${esc(m.source.authors)}</span><span class="chip">${esc(m.source.kind)}</span><a class="btn sm" href="${esc(m.source.url)}" target="_blank" rel="noopener">Open the source ↗</a></div>
    <div class="row between"><div class="bar" style="max-width:420px"><i style="width:${D.modPct(m)}%"></i></div><span class="num muted" style="font-size:.85rem">${D.modLessonsDone(m)}/${m.lessons.length} lessons · quiz ${D.quizBest(m)===null?"not taken":"best "+D.quizBest(m)+"%"}</span></div>
  </header>
  <div class="row" role="tablist" style="border-bottom:1px solid var(--line);padding-bottom:10px">${tabs.map(([k,l])=>`<a class="btn sm ${tab===k?"primary":"ghost"}" role="tab" aria-selected="${tab===k}" href="#module/${m.id}/${k}">${l}</a>`).join("")}</div>
  <div id="tab" style="padding-top:18px"></div>
  <section class="block"><div class="pager">${prev?`<a class="btn" href="#module/${prev.id}">← Module ${prev.num}: ${esc(prev.short)}</a>`:"<span></span>"}${nxt?`<a class="btn primary" href="#module/${nxt.id}">Module ${nxt.num}: ${esc(nxt.short)} →</a>`:`<a class="btn primary" href="#exam">Take the final exam →</a>`}</div></section>${foot()}`;
  const T=$("#tab",root);
  if(tab==="overview")T.innerHTML=`<div class="grid g2">
      <div class="callout"><span class="eyebrow">Why this module, here</span><p>${esc(m.why)}</p></div>
      <div class="callout info"><span class="eyebrow">Setup</span><p>${esc(m.source.setup)}</p>${m.source.license?`<p class="note">License: ${esc(m.source.license)}</p>`:""}</div>
      <div class="card"><span class="eyebrow">Outcomes</span><ul>${m.outcomes.map(o=>`<li>${esc(o)}</li>`).join("")}</ul></div>
      <div class="card"><span class="eyebrow">Prerequisites</span><ul>${m.prerequisites.map(o=>`<li>${esc(o)}</li>`).join("")}</ul><span class="eyebrow" style="margin-top:8px">Format</span><p class="muted">${esc(m.source.format)}</p></div>
    </div>
    <section class="block"><div class="block-head"><h2>Lessons</h2><a class="btn sm" href="#module/${m.id}/lessons">Open the lesson list</a></div><div class="grid" style="gap:8px">${m.lessons.slice(0,4).map(l=>App.lessonRow(m,l)).join("")}${m.lessons.length>4?`<a class="btn ghost" href="#module/${m.id}/lessons">All ${m.lessons.length} lessons →</a>`:""}</div></section>
    <section class="block"><div class="block-head"><h2>Practice</h2></div><div class="grid g3"><a class="card link" href="#flashcards/${m.id}"><span class="eyebrow">Flashcards</span><h4>${m.flashcards.length} cards</h4><p class="muted">Spaced review of the module's concepts.</p></a><a class="card link" href="#module/${m.id}/quiz"><span class="eyebrow">Quiz</span><h4>${m.quiz.length} questions</h4><p class="muted">Pass mark ${App.data.meta.passMark}%.</p></a><a class="card link" href="#module/${m.id}/project"><span class="eyebrow">Project</span><h4>${esc(m.project.title)}</h4><p class="muted">≈ ${m.project.hours} h with a rubric.</p></a></div></section>`;
  if(tab==="lessons")T.innerHTML=`<div class="row between"><p class="note">${m.lessons.reduce((n,l)=>n+l.minutes,0)} minutes of reading, notebooks and exercises.</p><button class="btn sm" id="mark-all">${D.modLessonsDone(m)===m.lessons.length?"Mark all not done":"Mark all lessons done"}</button></div><div class="grid" style="gap:8px;margin-top:12px">${m.lessons.map(l=>App.lessonRow(m,l)).join("")}</div>`;
  if(tab==="resources")T.innerHTML=`<p class="note">Module-level links: bonus material, papers, tools and talks. Each lesson also has its own resources.</p><div class="res-list" style="margin-top:12px">${m.resources.map(x=>App.resItem(x)).join("")}</div>`;
  if(tab==="quiz"){T.innerHTML=`<div class="block-head"><h2>Module ${m.num} quiz</h2><p>${m.quiz.length} questions · pass mark ${App.data.meta.passMark}% · unlimited retakes · each explanation links back to its lesson</p></div><div class="quiz" id="quiz"></div>`;App.mountQuiz($("#quiz",root),m.quiz,{storeKey:m.id,after:nxt?`<a class="btn primary" href="#module/${nxt.id}">Next module →</a>`:`<a class="btn primary" href="#exam">Final exam →</a>`})}
  if(tab==="project")T.innerHTML=projectCard(m,true);
  if(tab==="glossary")T.innerHTML=`<dl class="gl">${m.glossary.slice().sort((a,b)=>a.term.localeCompare(b.term)).map(g=>`<dt>${esc(g.term)}</dt><dd>${esc(g.def)}</dd>`).join("")}</dl>`;
  const ma=$("#mark-all",root);if(ma)ma.addEventListener("click",()=>{const all=D.modLessonsDone(m)===m.lessons.length;m.lessons.forEach(l=>A.toggleLesson(l.id,!all));App.render()});
  bindProject(root);
};
function projectCard(m,full){const p=m.project,st=App.S.projects[m.id]||{crit:{}};const met=Object.keys(st.crit).length;return `<div class="card" data-project="${m.id}"><div class="row between"><span class="eyebrow">Module ${m.num} project · ≈ ${p.hours} h</span>${st.done?`<span class="chip ok">Recorded as done</span>`:`<span class="chip">${met}/${p.rubric.length} rubric items met</span>`}</div><h3>${esc(p.title)}</h3><p>${esc(p.brief)}</p>
  ${full?`<span class="eyebrow" style="margin-top:8px">Steps</span><ol class="steps">${p.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join("")}</ol>`:""}
  <span class="eyebrow" style="margin-top:8px">Rubric · self-assessment</span><ul class="checklist">${p.rubric.map((r,i)=>`<li class="${st.crit[i]?"done":""}"><input type="checkbox" id="rub-${m.id}-${i}" data-crit="${i}" ${st.crit[i]?"checked":""}><label for="rub-${m.id}-${i}"><strong>${esc(r.criterion)}.</strong> <span class="muted">${esc(r.meets)}</span></label></li>`).join("")}</ul>
  ${p.stretch&&p.stretch.length?`<span class="eyebrow" style="margin-top:8px">Stretch goals</span><ul>${p.stretch.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>`:""}
  <div class="row" style="margin-top:8px"><button class="btn ${st.done?"":"primary"}" data-pdone>${st.done?"Mark project not done":"Record project as done"}</button>${!full?`<a class="btn ghost" href="#module/${m.id}/project">Open module</a>`:""}</div></div>`}
App.projectCard=projectCard;
function bindProject(root){$$("[data-project]",root).forEach(card=>{const mid=card.dataset.project;$$("[data-crit]",card).forEach(cb=>cb.addEventListener("change",()=>{A.projectCrit(mid,+cb.dataset.crit,cb.checked);cb.closest("li").classList.toggle("done",cb.checked);App.render()}));const b=$("[data-pdone]",card);b.addEventListener("click",()=>{A.projectDone(mid,!(App.S.projects[mid]||{}).done);App.render()})})}
App.bindProject=bindProject;

/* ---------- Lesson ---------- */
V.lesson=(root,r)=>{
  const hit=D.lesson(r.a);if(!hit){root.innerHTML=`<div class="empty">Lesson not found.</div>`;return}
  const {m,l,i}=hit,prev=m.lessons[i-1],nxt=m.lessons[i+1],nextMod=App.data.modules[App.data.modules.indexOf(m)+1];
  const done=D.lessonDone(l.id),bm=!!App.S.bookmarks[l.id],note=(App.S.notes[l.id]||{}).text||"",ex=App.S.ex[l.id]||{};
  const toc=[["summary","Summary"],["concepts","Concepts"],["points","Key points"],["walk","Walkthrough"],l.code?["code","Code"]:null,["exercise","Exercise"],["check","Check yourself"],["resources","Resources"],["notes","My notes"]].filter(Boolean);
  root.innerHTML=`<div class="crumbs"><a href="#catalog">Modules</a><span>/</span><a href="#module/${m.id}">Module ${m.num} · ${esc(m.short)}</a><span>/</span><span>Lesson ${m.num}.${i+1}</span></div>
  <header class="lesson-head">
    <span class="eyebrow">Lesson ${m.num}.${i+1} · ${esc(l.sourceRef)} · ${l.minutes} min</span>
    <h1>${esc(l.title)}</h1>
    <div class="row">
      <a class="btn" href="${esc(l.sourceUrl)}" target="_blank" rel="noopener">Read the source ↗</a>
      ${l.colabUrl?`<a class="btn primary" href="${esc(l.colabUrl)}" target="_blank" rel="noopener">Open in Colab ↗</a>`:""}
      ${l.notebookUrl?`<a class="btn" href="${esc(l.notebookUrl)}" target="_blank" rel="noopener">Notebook on GitHub ↗</a>`:""}
      ${l.videoUrl?`<a class="btn" href="${esc(l.videoUrl)}" target="_blank" rel="noopener">Watch the talk ↗</a>`:""}
    </div>
  </header>
  <div class="lesson-grid">
    <div class="prose">
      <section id="summary"><p class="summary">${esc(l.summary)}</p></section>
      <section id="concepts"><h2>Concepts</h2><div class="concepts">${l.concepts.map(c=>`<div class="concept"><b>${esc(c.term)}</b>${esc(c.def)}</div>`).join("")}</div></section>
      <section id="points"><h2>Key points</h2><ul>${l.keyPoints.map(p=>`<li>${esc(p)}</li>`).join("")}</ul></section>
      <section id="walk"><h2>Walkthrough</h2><p class="note">Follow this alongside the source${l.colabUrl?" and the notebook":""}.</p><ol class="steps">${l.walkthrough.map(s=>`<li><span>${esc(s)}</span></li>`).join("")}</ol></section>
      ${l.code?`<section id="code"><h2>Code</h2>${App.codeBlock(l.code)}</section>`:""}
      <section id="exercise"><h2>Exercise: ${esc(l.exercise.title)}</h2><p class="note">≈ ${l.exercise.minutes||45} min. Tick steps as you go; progress is saved.</p><ul class="checklist">${l.exercise.steps.map((s,k)=>`<li class="${ex[k]?"done":""}"><input type="checkbox" id="ex-${k}" data-ex="${k}" ${ex[k]?"checked":""}><label for="ex-${k}"><span>${esc(s)}</span></label></li>`).join("")}</ul><div class="callout ok"><span class="eyebrow">Deliverable</span><p>${esc(l.exercise.deliverable)}</p></div></section>
      <section id="check"><h2>Check yourself</h2><ul>${l.checkYourself.map(q=>`<li>${esc(q)}</li>`).join("")}</ul></section>
      <section id="resources"><h2>Resources</h2><div class="res-list">${l.resources.map(x=>App.resItem(x)).join("")}</div></section>
      <section id="notes"><h2>My notes</h2><textarea class="input" id="note" placeholder="What surprised you? What would you do differently? Notes stay in this browser.">${esc(note)}</textarea><div class="row"><button class="btn sm" id="save-note">Save note</button><span class="note" id="note-msg">${note?"Saved "+new Date(App.S.notes[l.id].at).toLocaleString():""}</span></div></section>
      <div class="lesson-actions">
        <button class="btn ${done?"":"primary"}" id="toggle-done">${done?"✓ Done · mark as not done":"Mark lesson done"}</button>
        <button class="btn ghost" id="bm">${bm?"★ Bookmarked":"☆ Bookmark"}</button>
        <span style="flex:1"></span>
        ${prev?`<a class="btn sm ghost" href="#lesson/${prev.id}">← ${esc(prev.title)}</a>`:""}
        ${nxt?`<a class="btn sm" href="#lesson/${nxt.id}">${esc(nxt.title)} →</a>`:`<a class="btn sm" href="#module/${m.id}/quiz">Module quiz →</a>`}
      </div>
    </div>
    <nav class="toc" aria-label="On this page"><span class="eyebrow" style="padding:4px 8px">On this page</span>${toc.map(([id,t])=>`<a href="#lesson/${l.id}" data-anchor="${id}">${t}</a>`).join("")}<span class="eyebrow" style="padding:12px 8px 4px">Module ${m.num}</span>${m.lessons.map((x,k)=>`<a href="#lesson/${x.id}" style="${x.id===l.id?"color:var(--fg);border-color:var(--accent)":""}">${k+1}. ${esc(x.title)}${D.lessonDone(x.id)?" ✓":""}</a>`).join("")}</nav>
  </div>`;
  $$("[data-anchor]",root).forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const el=document.getElementById(a.dataset.anchor);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}));
  $("#toggle-done",root).addEventListener("click",()=>{A.toggleLesson(l.id);App.toast(D.lessonDone(l.id)?"Lesson marked done":"Lesson marked not done");if(D.lessonDone(l.id)&&nxt)App.go("#lesson/"+nxt.id);else if(D.lessonDone(l.id)&&!nxt)App.go(`#module/${m.id}/quiz`);else App.render()});
  $("#bm",root).addEventListener("click",()=>{A.bookmark(l.id);App.render()});
  $$("[data-ex]",root).forEach(cb=>cb.addEventListener("change",()=>{A.exStep(l.id,+cb.dataset.ex,cb.checked);cb.closest("li").classList.toggle("done",cb.checked)}));
  $("#save-note",root).addEventListener("click",()=>{A.note(l.id,$("#note",root).value);$("#note-msg",root).textContent="Saved "+new Date().toLocaleString();App.toast("Note saved")});
};
})();
/* LLM Engineer Path — views (part B: flashcards, projects, exam, search, resources, glossary, notes, progress, certificate) */
(function(){
"use strict";
const {esc,d:D,act:A,$,$$}=App;
const V=App.views;

/* ---------- Flashcards ---------- */
V.flashcards=(root,r)=>{
  const mods=App.data.modules;const mid=r.a||null;
  if(!mid){root.innerHTML=`<header class="hero"><span class="eyebrow">Flashcards</span><h1>Spaced review, one module at a time.</h1><p class="lede">Rate each card Again, Good or Easy. Cards move through six boxes with intervals from one day to a month. Start with a module you have begun.</p></header>
    <div class="grid g2">${mods.map(m=>{const total=m.flashcards.length;let seen=0,due=0,mastered=0;m.flashcards.forEach((c,i)=>{const s=App.S.cards[m.id+":"+i];if(s){seen++;if(s.box>=4)mastered++;if(!s.due||s.due<=Date.now())due++}else due++});return `<a class="card link" href="#flashcards/${m.id}"><span class="eyebrow">Module ${m.num}</span><h3>${esc(m.title)}</h3><div class="row"><span class="chip">${total} cards</span><span class="chip ${due?"warm":""}">${due} due</span><span class="chip ok">${mastered} mastered</span></div><div class="bar"><i style="width:${Math.round(100*mastered/total)}%"></i></div></a>`}).join("")}</div>${App.foot()}`;return}
  const m=D.mod(mid);if(!m){App.go("#flashcards");return}
  const order=m.flashcards.map((c,i)=>i).filter(i=>{const s=App.S.cards[m.id+":"+i];return !s||!s.due||s.due<=Date.now()});
  const queue=order.length?order:m.flashcards.map((c,i)=>i);
  let pos=0,flipped=false,rated=0;
  function draw(){const i=queue[pos];const c=m.flashcards[i];const s=App.S.cards[m.id+":"+i];
    root.innerHTML=`<div class="crumbs"><a href="#flashcards">Flashcards</a><span>/</span><span>Module ${m.num}</span></div>
    <header class="hero" style="padding-top:12px"><span class="eyebrow">Module ${m.num} · ${order.length?order.length+" due":"nothing due, reviewing all"} · ${rated} rated this session</span><h1>${esc(m.short)} flashcards</h1></header>
    <div class="deck">
      <div class="row between"><span class="note">Card ${pos+1} of ${queue.length}${s?` · box ${s.box} · seen ${s.seen}×`:" · new"}</span><span class="note">Click the card or press space to flip</span></div>
      <div class="fc ${flipped?"flipped":""}" id="fc" tabindex="0" role="button" aria-label="Flashcard"><div class="inner"><div class="face"><span class="eyebrow">Question</span><div>${esc(c.front)}</div></div><div class="face back"><span class="eyebrow">Answer</span><div>${esc(c.back)}</div></div></div></div>
      <div class="rate">${["again","good","easy"].map(g=>`<button class="btn ${g}" data-g="${g}" ${flipped?"":"disabled"}>${g[0].toUpperCase()+g.slice(1)}<span class="muted" style="font-weight:400;font-size:.75rem">${g==="again"?"1 day":g==="good"?"next box":"skip a box"}</span></button>`).join("")}</div>
      <div class="row between"><a class="btn sm ghost" href="#module/${m.id}">Back to module</a><button class="btn sm ghost" id="skip">Skip →</button></div>
    </div>`;
    const fc=$("#fc",root);const flip=()=>{flipped=!flipped;draw()};fc.addEventListener("click",flip);fc.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}});
    $$("[data-g]",root).forEach(b=>b.addEventListener("click",()=>{A.rateCard(m.id+":"+i,b.dataset.g);rated++;advance()}));
    $("#skip",root).addEventListener("click",advance);
    if(!flipped)fc.focus({preventScroll:true});
  }
  function advance(){flipped=false;pos++;if(pos>=queue.length){root.innerHTML=`<header class="hero"><span class="eyebrow">Module ${m.num}</span><h1>Deck finished.</h1><p class="lede">${rated} cards rated. Cards you marked Again come back tomorrow; Good and Easy push them further out.</p><div class="row"><a class="btn primary" href="#flashcards/${m.id}">Review again</a><a class="btn" href="#module/${m.id}/quiz">Take the module quiz</a><a class="btn ghost" href="#flashcards">All decks</a></div></header>`;return}draw()}
  draw();
};

/* ---------- Projects ---------- */
V.projects=root=>{root.innerHTML=`<header class="hero"><span class="eyebrow">Projects</span><h1>Seven projects, one per module.</h1><p class="lede">Each project has steps, a rubric for self-assessment and stretch goals. Record them here; the certificate lists how many you completed.</p></header><div class="grid" style="gap:14px">${App.data.modules.map(m=>App.projectCard(m,false)).join("")}</div>${App.foot()}`;App.bindProject(root)};

/* ---------- Final exam ---------- */
let examSet=null;
function buildExam(){const meta=App.data.meta;const picks=[];App.data.modules.forEach(m=>{picks.push(...m.quiz.slice().sort(()=>Math.random()-.5).slice(0,meta.examPerModule).map(q=>({...q,from:"Module "+m.num})))});return picks.sort(()=>Math.random()-.5).slice(0,meta.examQuestions)}
V.exam=root=>{
  const meta=App.data.meta,ready=App.data.modules.every(D.modComplete);if(!examSet)examSet=buildExam();
  root.innerHTML=`<header class="hero"><span class="eyebrow">Final exam</span><h1>${meta.examQuestions} questions across all seven modules.</h1><p class="lede">Drawn at random from the module quizzes, ${meta.examPerModule} per module. Pass mark ${meta.passMark}%. Retake as often as you like; the certificate records your best score.</p><div class="row"><span class="chip ${ready?"ok":""}">${ready?"All modules complete":"Modules remaining: "+App.data.modules.filter(m=>!D.modComplete(m)).map(m=>"M"+m.num).join(", ")}</span><button class="btn sm" id="reshuffle">New random set</button></div></header><div class="quiz" id="exam"></div>${App.foot()}`;
  $("#reshuffle",root).addEventListener("click",()=>{examSet=buildExam();App.render()});
  App.mountQuiz($("#exam",root),examSet,{storeKey:"exam",after:ready?`<a class="btn primary" href="#certificate">Go to certificate →</a>`:""});
};

/* ---------- Search ---------- */
function index(){if(App._idx)return App._idx;const idx=[];App.data.modules.forEach(m=>{m.lessons.forEach((l,i)=>{idx.push({kind:"lesson",title:l.title,where:`Module ${m.num} · Lesson ${m.num}.${i+1}`,text:[l.summary,...l.keyPoints,...l.walkthrough,l.exercise.title].join(" "),href:"#lesson/"+l.id});l.concepts.forEach(c=>idx.push({kind:"concept",title:c.term,where:`Concept · Lesson ${m.num}.${i+1}`,text:c.def,href:"#lesson/"+l.id}));l.resources.forEach(r=>idx.push({kind:"resource",title:r.title,where:`Resource · Lesson ${m.num}.${i+1}`,text:(r.note||"")+" "+App.hostOf(r.url),href:r.url,ext:true}))});m.glossary.forEach(g=>idx.push({kind:"glossary",title:g.term,where:`Glossary · Module ${m.num}`,text:g.def,href:"#glossary"}));m.resources.forEach(r=>idx.push({kind:"resource",title:r.title,where:`Resource · Module ${m.num}`,text:(r.note||"")+" "+App.hostOf(r.url),href:r.url,ext:true}));m.flashcards.forEach((c,i)=>idx.push({kind:"flashcard",title:c.front,where:`Flashcard · Module ${m.num}`,text:c.back,href:"#flashcards/"+m.id}))});return App._idx=idx}
V.search=(root,r)=>{
  root.innerHTML=`<header class="hero"><span class="eyebrow">Search</span><h1>Find a lesson, concept, resource or term.</h1><div class="search-box"><input class="input" id="q" type="search" placeholder="e.g. KV cache, reranker, LoRA, stateless reducer" autocomplete="off"><select class="input" id="kind"><option value="">Everything</option><option value="lesson">Lessons</option><option value="concept">Concepts</option><option value="glossary">Glossary</option><option value="resource">Resources</option><option value="flashcard">Flashcards</option></select></div></header><div class="grid" id="hits" style="gap:8px"></div>`;
  const q=$("#q",root),kind=$("#kind",root),hits=$("#hits",root);
  function run(){const term=q.value.trim().toLowerCase();if(term.length<2){hits.innerHTML=`<div class="empty">Type at least two characters. Tip: press <kbd>/</kbd> anywhere to jump here.</div>`;return}
    const words=term.split(/\s+/);const res=index().filter(x=>!kind.value||x.kind===kind.value).map(x=>{const t=x.title.toLowerCase(),b=x.text.toLowerCase();let s=0;words.forEach(w=>{if(t.includes(w))s+=5;if(b.includes(w))s+=1});return{x,s}}).filter(o=>o.s>0).sort((a,b)=>b.s-a.s).slice(0,60);
    const mark=s=>{let out=esc(s);words.forEach(w=>{out=out.replace(new RegExp("("+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig"),"<mark>$1</mark>")});return out};
    hits.innerHTML=res.length?res.map(({x})=>{const i=x.text.toLowerCase().indexOf(words[0]);const snip=x.text.slice(Math.max(0,i-60),i+140);return `<a class="hit" href="${esc(x.href)}" ${x.ext?'target="_blank" rel="noopener"':""}><span class="where">${esc(x.where)}</span><strong>${mark(x.title)}</strong><span class="snip">${i>=0?(i>60?"…":"")+mark(snip)+"…":esc(x.text.slice(0,140))}</span></a>`}).join(""):`<div class="empty">No matches for “${esc(q.value)}”.</div>`}
  q.addEventListener("input",run);kind.addEventListener("change",run);run();q.focus();
};

/* ---------- Resource library ---------- */
V.resources=root=>{
  const all=[];App.data.modules.forEach(m=>{m.resources.forEach(r=>all.push({...r,m,scope:"module"}));m.lessons.forEach((l,i)=>l.resources.forEach(r=>all.push({...r,m,l,scope:`Lesson ${m.num}.${i+1}`})))});
  const seen=new Set();const uniq=all.filter(r=>{if(seen.has(r.url))return false;seen.add(r.url);return true});
  const types=[...new Set(uniq.map(r=>r.type||"link"))].sort();
  root.innerHTML=`<header class="hero"><span class="eyebrow">Resource library</span><h1>${uniq.length} links from the seven sources.</h1><p class="lede">Notebooks, papers, videos, docs and tools referenced across the path, de-duplicated. Filter by module or type.</p><div class="row"><select class="input" id="fm"><option value="">All modules</option>${App.data.modules.map(m=>`<option value="${m.id}">M${m.num} · ${esc(m.short)}</option>`).join("")}</select><select class="input" id="ft"><option value="">All types</option>${types.map(t=>`<option>${esc(t)}</option>`).join("")}</select><input class="input" id="fq" type="search" placeholder="Filter by title" style="max-width:260px"></div></header><div class="res-list" id="list"></div>${App.foot()}`;
  const fm=$("#fm",root),ft=$("#ft",root),fq=$("#fq",root),list=$("#list",root);
  function run(){const q=fq.value.trim().toLowerCase();const rows=uniq.filter(r=>(!fm.value||r.m.id===fm.value)&&(!ft.value||(r.type||"link")===ft.value)&&(!q||r.title.toLowerCase().includes(q)||(r.note||"").toLowerCase().includes(q)));list.innerHTML=rows.length?rows.map(r=>App.resItem(r,`<span class="chip" style="font-size:.62rem">M${r.m.num} · ${esc(r.scope)}</span>`)).join(""):`<div class="empty">No resources match.</div>`}
  [fm,ft].forEach(s=>s.addEventListener("change",run));fq.addEventListener("input",run);run();
};

/* ---------- Glossary ---------- */
V.glossary=root=>{
  const terms=[];App.data.modules.forEach(m=>m.glossary.forEach(g=>terms.push({...g,m})));terms.sort((a,b)=>a.term.localeCompare(b.term));
  const letters=[...new Set(terms.map(t=>t.term[0].toUpperCase()))];
  root.innerHTML=`<header class="hero"><span class="eyebrow">Glossary</span><h1>${terms.length} terms across the path.</h1><div class="az">${letters.map(L=>`<a href="#glossary" data-l="${L}">${L}</a>`).join("")}</div><input class="input" id="gq" type="search" placeholder="Filter terms" style="max-width:320px"></header><dl class="gl" id="gl"></dl>${App.foot()}`;
  const gl=$("#gl",root),gq=$("#gq",root);
  function run(){const q=gq.value.trim().toLowerCase();let cur="";gl.innerHTML=terms.filter(t=>!q||t.term.toLowerCase().includes(q)||t.def.toLowerCase().includes(q)).map(t=>{const L=t.term[0].toUpperCase();const head=L!==cur?`<dt id="L-${L}" class="eyebrow" style="margin-top:14px">${L}</dt>`:"";cur=L;return head+`<dt>${esc(t.term)}<a class="m" href="#module/${t.m.id}/glossary">M${t.m.num}</a></dt><dd>${esc(t.def)}</dd>`}).join("")}
  gq.addEventListener("input",run);run();
  $$("[data-l]",root).forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const el=document.getElementById("L-"+a.dataset.l);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}));
};

/* ---------- Notes & bookmarks ---------- */
V.notes=root=>{
  const notes=Object.entries(App.S.notes).map(([id,n])=>({id,...n,hit:D.lesson(id)})).filter(x=>x.hit).sort((a,b)=>b.at.localeCompare(a.at));
  const bms=Object.keys(App.S.bookmarks).map(id=>D.lesson(id)).filter(Boolean);
  root.innerHTML=`<header class="hero"><span class="eyebrow">My notes</span><h1>Notes and bookmarks.</h1><p class="lede">Everything you wrote on lesson pages, newest first. Stored in this browser; export from the Progress page to keep a copy.</p><div class="row"><button class="btn sm" id="copy-notes" ${notes.length?"":"disabled"}>Copy all notes as Markdown</button></div></header>
  <section class="block"><div class="block-head"><h2>Bookmarks</h2></div>${bms.length?`<div class="grid" style="gap:8px">${bms.map(({m,l})=>App.lessonRow(m,l)).join("")}</div>`:`<div class="empty">No bookmarks yet. Use ☆ Bookmark on any lesson.</div>`}</section>
  <section class="block"><div class="block-head"><h2>Notes</h2></div>${notes.length?`<div class="grid" style="gap:10px">${notes.map(n=>`<a class="card link" href="#lesson/${n.id}"><span class="eyebrow">Module ${n.hit.m.num} · ${esc(n.hit.l.title)} · ${new Date(n.at).toLocaleDateString()}</span><p style="white-space:pre-wrap">${esc(n.text)}</p></a>`).join("")}</div>`:`<div class="empty">No notes yet. Each lesson page has a notes box at the bottom.</div>`}</section>${App.foot()}`;
  $("#copy-notes",root).addEventListener("click",()=>App.copy(notes.map(n=>`## ${n.hit.l.title} (Module ${n.hit.m.num})\n_${new Date(n.at).toLocaleString()}_\n\n${n.text}\n`).join("\n")));
};

/* ---------- Progress ---------- */
V.progress=root=>{
  const mods=App.data.modules,PASS=App.data.meta.passMark;
  root.innerHTML=`<header class="hero"><span class="eyebrow">Progress</span><h1>Where you are on the path.</h1><p class="lede">Saved in this browser only. Export a copy before clearing site data or switching devices.</p></header>
  <div class="grid g4"><div class="stat"><span class="v num">${D.overallPct()}%</span><span class="l">overall</span></div><div class="stat"><span class="v num">${D.allLessons().filter(x=>D.lessonDone(x.l.id)).length}/${D.totalLessons()}</span><span class="l">lessons</span></div><div class="stat"><span class="v num">${mods.filter(D.quizPassed).length}/${mods.length}</span><span class="l">quizzes passed</span></div><div class="stat"><span class="v num">${App.S.exam?App.S.exam.best+"%":"—"}</span><span class="l">best exam score</span></div><div class="stat"><span class="v num">${App.fmtH(D.minutesLogged())}</span><span class="l">study time logged</span></div><div class="stat"><span class="v num">${D.streak()}</span><span class="l">day streak</span></div><div class="stat"><span class="v num">${Object.keys(App.S.cards).filter(k=>App.S.cards[k].box>=4).length}</span><span class="l">flashcards mastered</span></div><div class="stat"><span class="v num">${Object.values(App.S.projects).filter(p=>p.done).length}/${mods.length}</span><span class="l">projects done</span></div></div>
  <section class="block"><div class="block-head"><h2>By module</h2></div><div class="table-wrap"><table><thead><tr><th>Module</th><th>Lessons</th><th>Quiz best</th><th>Flashcards mastered</th><th>Project</th><th>Status</th></tr></thead><tbody>${mods.map(m=>{const q=D.quizBest(m);const mast=m.flashcards.filter((c,i)=>(App.S.cards[m.id+":"+i]||{}).box>=4).length;const p=App.S.projects[m.id];return `<tr><td><a href="#module/${m.id}">M${m.num} · ${esc(m.short)}</a></td><td class="num">${D.modLessonsDone(m)}/${m.lessons.length}<div class="bar" style="width:90px;margin-top:4px"><i style="width:${D.modPct(m)}%"></i></div></td><td class="num">${q===null?"—":`<span class="chip ${q>=PASS?"ok":"bad"}">${q}%</span>`}</td><td class="num">${mast}/${m.flashcards.length}</td><td>${p&&p.done?`<span class="chip ok">done</span>`:p?`${Object.keys(p.crit).length}/${m.project.rubric.length} rubric`:"—"}</td><td>${D.modComplete(m)?`<span class="chip ok">complete</span>`:D.modLessonsDone(m)?`<span class="chip">in progress</span>`:`<span class="chip">not started</span>`}</td></tr>`}).join("")}</tbody></table></div></section>
  <section class="block"><div class="block-head"><h2>Backup</h2></div><div class="row"><button class="btn sm" id="export">Copy progress JSON</button><button class="btn sm" id="import">Paste progress JSON</button><button class="btn sm" id="reset">Reset all progress</button><span class="note" id="msg"></span></div>
    <div id="import-area" hidden class="grid" style="max-width:640px"><textarea class="input" id="import-text" style="font-family:var(--mono);font-size:.78rem"></textarea><div><button class="btn sm primary" id="import-apply">Apply</button></div></div>
    <div id="reset-confirm" hidden class="row"><span class="note">This clears every lesson, quiz, note, flashcard and project record in this browser.</span><button class="btn sm" id="reset-yes" style="border-color:var(--bad);color:var(--bad)">Yes, reset</button><button class="btn sm" id="reset-no">Keep my progress</button></div></section>${App.foot()}`;
  const msg=$("#msg",root);
  $("#export",root).addEventListener("click",async()=>{const t=JSON.stringify(App.S);if(!(await App.copy(t))){$("#import-area",root).hidden=false;$("#import-text",root).value=t;$("#import-text",root).select()}});
  $("#import",root).addEventListener("click",()=>{const a=$("#import-area",root);a.hidden=!a.hidden;$("#import-text",root).value=""});
  $("#import-apply",root).addEventListener("click",()=>{try{App.importState($("#import-text",root).value);App.renderSide();App.render();App.toast("Progress restored")}catch(e){msg.textContent="That did not parse as progress JSON."}});
  $("#reset",root).addEventListener("click",()=>{const c=$("#reset-confirm",root);c.hidden=!c.hidden});
  $("#reset-no",root).addEventListener("click",()=>$("#reset-confirm",root).hidden=true);
  $("#reset-yes",root).addEventListener("click",()=>{App.reset();examSet=null;App.renderSide();App.render();App.toast("Progress reset")});
};

/* ---------- Certificate ---------- */
function code(name,date){let h=0;const s=name+"|"+date+"|llm-path";for(let i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0}return "LLMP-"+h.toString(16).toUpperCase().padStart(8,"0")}
V.certificate=root=>{
  const mods=App.data.modules,PASS=App.data.meta.passMark,unlocked=D.allComplete();
  const reqs=[...mods.map(m=>[`Module ${m.num}: all ${m.lessons.length} lessons done and quiz ≥ ${PASS}%`,D.modComplete(m)]),[`Final exam ≥ ${PASS}%`,D.examPassed()]];
  root.innerHTML=`<header class="hero"><span class="eyebrow">Certificate</span><h1>Certificate of completion.</h1><p class="lede">Unlocked when every lesson is done, every module quiz is passed and the final exam is passed. Projects are optional but are listed on the certificate.</p></header>
  <div class="grid g2" style="margin-bottom:22px"><div class="card"><span class="eyebrow">Requirements</span><div class="req">${reqs.map(([t,ok])=>`<div><span class="ck ${ok?"on":""}">${ok?"✓":""}</span><span>${t}</span></div>`).join("")}</div></div>
  <div class="card"><span class="eyebrow">Your details</span><form id="cf" class="grid"><label class="note">Full name<input class="input" id="cn" value="${esc(App.S.name)}" placeholder="e.g. Priya Raman" autocomplete="name"></label><div class="row"><button class="btn primary" id="issue" ${unlocked?"":"disabled"}>Issue certificate</button><button class="btn" type="button" id="cc">Copy verification code</button></div><span class="note" id="cm">${unlocked?(App.S.issued?"Issued. Change the name and re-issue if needed.":"Requirements met. Enter your name and issue."):"Complete the requirements to unlock."}</span></form></div></div>
  <div id="cert"></div>${App.foot()}`;
  drawCert($("#cert",root));
  $("#cf",root).addEventListener("submit",e=>{e.preventDefault();if(!unlocked)return;const name=$("#cn",root).value.trim();if(!name){$("#cm",root).textContent="Enter your name first.";return}const date=new Date().toISOString();App.S.name=name;App.S.issued={name,date,exam:App.S.exam.best,code:code(name,date),projects:Object.values(App.S.projects).filter(p=>p.done).length};App.save();App.render()});
  $("#cc",root).addEventListener("click",()=>{if(!App.S.issued){$("#cm",root).textContent="Issue the certificate first.";return}App.copy(App.S.issued.code)});
};
function drawCert(root){const mods=App.data.modules,L=D.totalLessons();
  if(!App.S.issued){root.innerHTML=`<div class="cert" aria-hidden="true" style="opacity:.55"><div class="top"><span class="eyebrow">Certificate of completion · LLM Engineer Path</span><span class="eyebrow">Preview</span></div><div class="name">Your name here</div><p class="body">has completed the twelve-week LLM Engineer Path: ${L} lessons across seven modules, seven module quizzes and the final exam.</p><div class="foot"><span>Date —</span><span>Verification —</span></div></div>`;return}
  const d=App.S.issued,date=new Date(d.date).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  root.innerHTML=`<div class="cert"><div class="top"><span class="eyebrow">Certificate of completion · LLM Engineer Path</span><span class="seal">LLM<br>PATH</span></div><span class="eyebrow">This certifies that</span><div class="name">${esc(d.name)}</div>
  <p class="body">has completed the twelve-week LLM Engineer Path: ${L} lessons across seven modules, passed all seven module quizzes, and passed the final exam with a best score of <strong class="num">${d.exam}%</strong>, demonstrating working knowledge of language model fundamentals, AI engineering practice, evaluation and fine-tuning, production lessons, agent frameworks, 12-factor agent design and LLM inference optimization.${d.projects?` ${d.projects} of ${mods.length} module projects were recorded as complete.`:""}</p>
  <div class="mods">${mods.map(m=>`<div><span class="n">M${m.num}</span><span>${esc(m.title)} <span class="num muted">· quiz ${D.quizBest(m)}%</span></span></div>`).join("")}</div>
  <div class="foot"><span>Issued ${esc(date)}</span><span>≈ ${App.fmtH(D.totalMinutes())} of study</span><span>Verification ${esc(d.code)}</span></div></div>
  <p class="note" style="margin-top:12px">Self-issued on completion of this study path. Take a screenshot to keep a copy; the verification code is derived from the name and date so a holder can show the same code regenerates here.</p>`}
})();
