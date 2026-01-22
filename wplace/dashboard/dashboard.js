const data = window.WPLACE_DATA;
let projects = JSON.parse(JSON.stringify(data.projects));
const qs = id => document.getElementById(id);

/* ---------- Helpers ---------- */
const esc = s =>
  String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");

function imageExists(url){
  return new Promise(resolve=>{
    if(!url) return resolve(false);
    const img = new Image();
    img.onload = ()=>resolve(true);
    img.onerror = ()=>resolve(false);
    img.src = url;
  });
}

/* ---------- Dropdown ---------- */
function refreshSelect(){
  qs("projectSelect").innerHTML =
    `<option value="">– auswählen –</option>` +
    projects.map(p=>`<option value="${p.id}">${p.title}</option>`).join("");
}

/* ---------- Load ---------- */
function loadProject(p){
  for(const k of ["id","title","coordUrl","coverImg","progressImg","finalImg","updatedAt","note","wipText"])
    qs(k).value = p[k] || "";

  qs("status").value = p.status || "wip";
  qs("tags").value = (p.tags||[]).join(", ");

  qs("pollEnabled").checked = !!p.poll?.enabled;
  qs("pollSlug").value = p.poll?.slug || "";
  qs("pollTitle").value = p.poll?.title || "";
  qs("pollEmbed").value = p.poll?.embedUrl || "";

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
    coverImg: qs("coverImg").value,
    progressImg: qs("progressImg").value,
    finalImg: qs("finalImg").value,
    updatedAt: qs("updatedAt").value,
    note: qs("note").value,
    wipText: qs("wipText").value,
    poll: qs("pollEnabled").checked
      ? { enabled:true, slug:qs("pollSlug").value, title:qs("pollTitle").value, embedUrl:qs("pollEmbed").value }
      : { enabled:false }
  };
}

/* ---------- Warnings ---------- */
async function updateWarnings(p){
  const imgs = [
    ["Cover", p.coverImg],
    ["Progress", p.progressImg],
    ["Final", p.finalImg]
  ];

  let warnings = [];

  for(const [label,url] of imgs){
    if(url && !(await imageExists("../"+url))){
      warnings.push(`⚠️ ${label}-Bild nicht gefunden: ${url}`);
    }
  }

  qs("imgWarnings").innerHTML = warnings.join("<br>");

  const dup = projects.some(x=>x.id===p.id);
  qs("idWarning").style.display = dup ? "block" : "none";
  qs("idWarning").textContent = dup ? "⚠️ Diese ID existiert bereits." : "";
}

/* ---------- Previews ---------- */
function previewCard(p){
  return `
  <article class="card" style="max-width:420px">
    <img class="card-img" src="${esc(p.coverImg||"../assets/img/placeholder-wip.png")}"
         onerror="this.src='../assets/img/placeholder-wip.png'">
    <div class="card-body">
      <h3 class="card-title">${esc(p.title||"Titel")}</h3>
      <div class="card-meta">
        <span class="badge ${p.status==="done"?"done":"wip"}">
          ${p.status==="done"?"Fertig":"In Arbeit"}
        </span>
        ${(p.tags||[]).map(t=>`<span class="badge">#${esc(t)}</span>`).join("")}
      </div>
      ${p.note?`<p class="muted">${esc(p.note)}</p>`:""}
    </div>
  </article>`;
}

function previewWip(p){
  return `
  <article class="post">
    <div class="post-head">
      <img class="post-thumb" src="${esc(p.progressImg||p.coverImg||"../assets/img/placeholder-progress.png")}"
           onerror="this.src='../assets/img/placeholder-progress.png'">
      <div>
        <h2 class="post-title">${esc(p.title||"Titel")}</h2>
        <div class="card-meta">
          <span class="badge wip">In Arbeit</span>
        </div>
      </div>
    </div>
    <div class="post-text">${esc(p.wipText||"").replaceAll("\n","<br>")}</div>
    <div style="padding:12px">
      <img class="card-img" src="${esc(p.finalImg||p.coverImg||"../assets/img/placeholder-wip.png")}"
           onerror="this.src='../assets/img/placeholder-wip.png'">
    </div>
  </article>`;
}

async function updateAll(){
  const p = collect();
  qs("previewCard").innerHTML = previewCard(p);
  qs("previewWip").innerHTML = previewWip(p);
  await updateWarnings(p);
}

/* ---------- Export ---------- */
function projectToJS(p){
  return JSON.stringify(p,null,2).replace(/"([^"]+)":/g,"$1:");
}

/* ---------- Events ---------- */
qs("projectSelect").onchange = e=>{
  const p = projects.find(x=>x.id===e.target.value);
  if(p) loadProject(p);
};

qs("newProjectBtn").onclick = ()=>loadProject({});

qs("generateBlock").onclick = ()=>{
  qs("output").textContent = projectToJS(collect()) + ",";
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
};

qs("repoBtn").href = "https://github.com/DEINNAME/DEINREPO";

document.querySelectorAll("input,textarea,select")
  .forEach(el=>el.addEventListener("input",updateAll));

refreshSelect();
