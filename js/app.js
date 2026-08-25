const $=id=>document.getElementById(id);
let role=localStorage.getItem("ppRole")||"frontend";
let selected=JSON.parse(localStorage.getItem("ppSkills")||"[]");
let done=JSON.parse(localStorage.getItem("ppWeeks")||"[]");
let streak=Number(localStorage.getItem("ppStreak")||0);
const questions=["Explain the hardest bug in your last project.","Why did you choose your current state-management approach?","What would you improve if 1,000 people used your app tomorrow?","Show one accessibility decision you made and why.","Which part of your project would you rewrite today?","How did you handle loading, empty and error states?"];
function save(){localStorage.setItem("ppRole",role);localStorage.setItem("ppSkills",JSON.stringify(selected));localStorage.setItem("ppWeeks",JSON.stringify(done));localStorage.setItem("ppStreak",streak);}
function calc(k=role,arr=selected){const total=roles[k].skills.reduce((a,s)=>a+s[1],0);return Math.round(roles[k].skills.filter(s=>arr.includes(s[0])).reduce((a,s)=>a+s[1],0)/total*100)}
function render(){
 const r=roles[role],score=calc();save();
 $("career").innerHTML=Object.entries(roles).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("");$("career").value=role;
 $("roleIcon").textContent=r.short;$("roleName").textContent=r.name;$("roleDesc").textContent=r.desc;
 $("skillsList").innerHTML=r.skills.map(s=>`<button class="skill ${selected.includes(s[0])?"on":""}" data-s="${s[0]}"><b>${s[0]}</b><small>${s[1]}% weight</small></button>`).join("");
 document.querySelectorAll(".skill").forEach(b=>b.onclick=()=>{selected=selected.includes(b.dataset.s)?selected.filter(x=>x!==b.dataset.s):[...selected,b.dataset.s];render()});
 $("score").textContent=score+"%";$("quickScore").textContent=score+"%";$("quickCareer").textContent=r.name;$("quickSkills").textContent=selected.length;
 $("progress").style.width=score+"%";$("owned").textContent=selected.length;$("gaps").textContent=r.skills.length-selected.length;$("high").textContent=r.skills.filter(s=>!selected.includes(s[0])&&s[1]>=15).length;
 const gaps=r.skills.filter(s=>!selected.includes(s[0])).sort((a,b)=>b[1]-a[1]);
 $("nextSkill").textContent=gaps[0]?gaps[0][0]:"All mapped skills selected";
 $("nextText").textContent=gaps[0]?`This skill carries a ${gaps[0][1]}% weight in this role. Make it the focus of your next project or study block.`:"You are ready to shift from learning to proof: build, test and explain a real project.";
 $("scoreLabel").textContent=score>=80?"Ready to prove it":score>=60?"Good direction":score>=35?"Building foundations":"Just starting";
 renderWeeks();renderCompare();renderProjects();updateCv();$("streak").textContent=streak;save();
}
function renderWeeks(){const r=roles[role];$("weeks").innerHTML=r.weeks.map((w,i)=>{let id=role+i,d=done.includes(id);return `<article class="week ${d?"done":""}" data-id="${id}"><div class="week-num">0${i+1}</div><div><small>${w[3]}</small><h3>${w[0]} — ${w[1]}</h3><p>${w[2]}</p></div><button>${d?"✓ Done":"Mark complete"}</button></article>`}).join("");document.querySelectorAll(".week").forEach(x=>x.onclick=()=>{let id=x.dataset.id;done=done.includes(id)?done.filter(v=>v!==id):[...done,id];render()});const n=done.filter(x=>x.startsWith(role)).length;$("weekProgress").textContent=`${n} / 4 weeks`; $("quickProgress").textContent=Math.round(n/4*100)+"%";}
function renderCompare(){$("careerCompare").innerHTML=Object.entries(roles).map(([k,r])=>{let p=calc(k,selected);return `<div class="compare-card ${k===role?"current":""}"><div><span>${r.short}</span><h3>${r.name}</h3></div><b>${p}%</b><i><em style="width:${p}%"></em></i><small>${k===role?"Current choice":"Transferable skill fit"}</small></div>`}).join("")}
function renderProjects(){$("projects").innerHTML=roles[role].projects.map((p,i)=>`<article class="project"><div class="project-top"><span>0${i+1}</span><b>${p[3]}</b></div><h3>${p[0]}</h3><p>${p[1]}</p><div class="project-tags"><span>${p[2]}</span><span>${p[3]}</span></div></article>`).join("")}
function updateCv(){const p=roles[role].projects[0];$("cv").value=`Built ${p[0]}, ${p[1].toLowerCase()} using ${p[2]} and ${p[3]}, focusing on responsive UX, clear user flows and reliable state handling.`}
$("career").onchange=e=>{role=e.target.value;selected=[];done=[];render()};
$("start").onclick=()=>$("skills").scrollIntoView({behavior:"smooth"});
$("demo").onclick=()=>{role="frontend";selected=["HTML & CSS","JavaScript","Git","REST APIs"];render();$("skills").scrollIntoView({behavior:"smooth"})};
$("logDay").onclick=()=>{streak++;render();$("logDay").textContent="Logged ✓";setTimeout(()=>$("logDay").textContent="Log today",1200)};
$("newQuestion").onclick=()=>{$("question").textContent=questions[Math.floor(Math.random()*questions.length)]};
$("copy").onclick=async()=>{await navigator.clipboard.writeText($("cv").value);$("copy").textContent="Copied ✓";setTimeout(()=>$("copy").textContent="Copy bullet",1200)};
$("theme").onclick=()=>{document.body.classList.toggle("light");$("theme").textContent=document.body.classList.contains("light")?"Light mode":"Dark mode";localStorage.setItem("ppTheme",document.body.classList.contains("light")?"light":"dark")};
$("export").onclick=()=>{const text=`PATHPILOT CAREER SNAPSHOT\n\nRole: ${roles[role].name}\nReadiness: ${calc()}%\nSkills: ${selected.join(", ")||"None"}\nWeeks completed: ${done.filter(x=>x.startsWith(role)).length}/4\n\nNext priority: ${roles[role].skills.filter(s=>!selected.includes(s[0])).sort((a,b)=>b[1]-a[1])[0]?.[0]||"Build proof"}\n`;const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));a.download="pathpilot-snapshot.txt";a.click()};
if(localStorage.getItem("ppTheme")==="light"){document.body.classList.add("light");$("theme").textContent="Light mode"}render();