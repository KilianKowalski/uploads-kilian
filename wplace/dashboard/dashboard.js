const data = window.WPLACE_DATA;
let projects = JSON.parse(JSON.stringify(data.projects));
const qs = id => document.getElementById(id);

const esc = s => String(s ?? "")
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;");

function imgPath(p){
  if(!p) return "../assets/img/placeholder-wip.png";
  if(p.startsWith("http")) return p;
  if(p.startsWith("assets/")) return "../" + p;
  return p;
}

function today(){
  return new Date().toISOString().slice(0,10);
}

/* ---------- Dropdown ---------- */
function refreshSelect(){
  qs("projectSelect").innerHTML =
    `<option value="">– auswählen –</option>` +
    projects.map(p=>`<option value="${p.id}">${p.title}</option>`).join("");
}

/* ---------- Auto ID ---------- */
function suggestId(){
  const nums = projects
    .map(p=>parseInt(p.id?.split("-")[1]))
    .filter(n=>!isNaN(n));
  const next = (Math.max(0,...nums)+1).toString().padStart(3,"0");
  return `projekt-${next}`;
}

/* ---------- Load ---------- */
function loadProject(p={}){
  qs("id").value = p.id || suggestId();
  qs("title").value = p.title || "";
  qs("status").value = p.status || "wip";
  qs("tags").value = (p.tags||[]).join(", ");
  qs("coordUrl").value = p.coordUrl || "";
  qs("updatedAt").value = p.updatedAt || today();
  qs("coverImg").value = p.coverImg || "";
  qs("progressImg").value = p.progressImg || "";
  qs("finalImg").value = p.finalImg || "";
  qs("note").value = p.note || "";
  qs("wipText").value = p.wipText || "";
  updateAll();
}

/* ---------- Collect ---------- */
function collect(){
  return {
    id: qs("id").value.trim(),
    title: qs("title").value.trim(),
    status: qs("status").value,
    tags: qs("tags").value.split(",").map(t=>t.trim()).filter(Boolean),
    coordUrl: qs("coordUrl").value,
    updatedAt: qs("updatedAt").value,
    coverImg: qs("coverImg").value,
    progressImg: qs("progressImg").value,
    finalImg: qs("finalImg").value,
    note: qs("note").value,
    wipText: qs("wipText").value,
    poll:{enabled:false}
  };
}

/* ---------- Bildpfade ---------- */
qs("genImgPaths").onclick = ()=>{
  const id = qs("id").value.trim();
  if(!id) return;
  qs("coverImg").value = `assets/img/${id}/${id}_cover.png`;
  qs("progressImg").value = `assets/img/${id}/${id}_progress.png`;
  qs("finalImg").value = `assets/img/${id}/${id}_final.png`;
  updateAll();
};

/* ---------- Status ---------- */
function checkAll(p){
  let warn = [];

  if(!p.id) warn.push("ID fehlt");
  else if(projects.some(x=>x.id===p.id)) warn.push("ID existiert bereits");

  if(!p.title) warn.push("Titel fehlt");
  if(!p.coordUrl) warn.push("Koordinaten fehlen");
  if(!p.coverImg) warn.push("Cover fehlt");
  if(!p.progressImg) warn.push("Progress fehlt");
  if(!p.finalImg) warn.push("Final fehlt");

  qs("projectStatus").className = "panel status " + (warn.length ? "warn":"ok");
  qs("projectStatus").innerHTML = warn.length
    ? "🟡 Unvollständig:<br>– " + warn.join("<br>– ")
    : "🟢 Projekt vollständig – bereit für Veröffentlichung";
}

/* ---------- Preview ---------- */
function previewCard(p){
  return `
  <article class="card">
    <img class="card-img" src="${esc(imgPath(p.coverImg))}">
    <div class="card-body">
      <h3>${esc(p.title||"Titel")}</h3>
      <span class="badge ${p.status==="done"?"done":"wip"}">${p.status}</span>
    </div>
  </article>`;
}

function previewWip(p){
  return `
  <article class="post">
    <div class="post-head">
      <img class="post-thumb" src="${esc(imgPath(p.progressImg||p.coverImg))}">
      <h2>${esc(p.title||"Titel")}</h2>
    </div>
    <div class="post-text">${esc(p.wipText||"").replaceAll("\n","<br>")}</div>
    <img class="card-img" src="${esc(imgPath(p.finalImg||p.coverImg))}">
  </article>`;
}

/* ---------- Update ---------- */
function updateAll(){
  const p = collect();
  qs("previewCard").innerHTML = previewCard(p);
  qs("previewWip").innerHTML = previewWip(p);
  checkAll(p);
}

/* ---------- Code Export ---------- */
function projectToJS(p){
  return JSON.stringify(p,null,2).replace(/"([^"]+)":/g,"$1:");
}

function copyOutput(){
  const text = qs("output").textContent.trim();
  if(!text) return;

  navigator.clipboard.writeText(text);

  const btn = qs("copyCode");
  btn.classList.add("copied");
  qs("copyStatus").textContent = "✅ Code kopiert";

  setTimeout(()=>{
    btn.classList.remove("copied");
    qs("copyStatus").textContent = "";
  },1200);
}

qs("generateBlock").onclick = ()=>{
  qs("output").textContent = projectToJS(collect()) + ",";
  copyOutput();
};

qs("generateFull").onclick = ()=>{
  const p = collect();
  const list = projects.filter(x=>x.id!==p.id).concat(p);
  qs("output").textContent =
`window.WPLACE_DATA = {
  helperCount: ${data.helperCount||0},
  projects: [
${list.map(projectToJS).join(",\n")}
  ]
};`;
  copyOutput();
};

qs("copyCode").onclick = copyOutput;

/* ---------- Events ---------- */
qs("newProjectBtn").onclick = ()=>loadProject();

qs("projectSelect").onchange = e=>{
  const p = projects.find(x=>x.id===e.target.value);
  if(p) loadProject(p);
};

qs("repoBtn").href = "https://github.com/DEINNAME/DEINREPO";

document.querySelectorAll("input,textarea,select")
  .forEach(el=>el.addEventListener("input",()=>{
    qs("updatedAt").value = today();
    updateAll();
  }));

refreshSelect();
loadProject();
