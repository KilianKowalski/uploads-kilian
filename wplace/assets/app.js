(function () {

  /* ---------- Consent ---------- */
  (function(){
    const KEY = "wplace_antifa_consent_v1";
    if(localStorage.getItem(KEY)==="accepted") return;

    const overlay = document.createElement("div");
    overlay.id = "consentOverlay";
    overlay.className = "consent-overlay";
    overlay.innerHTML = `
      <div class="consent-modal">
        <h2>Hinweis vor dem Betreten</h2>
        <p>Community-Projekt – nur bei Zustimmung.</p>
        <button id="accept" class="consent-btn consent-accept">Akzeptieren</button>
        <button id="decline" class="consent-btn consent-decline">Ablehnen</button>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector("#accept").onclick = ()=>{
      localStorage.setItem(KEY,"accepted");
      overlay.remove();
    };
    overlay.querySelector("#decline").onclick = ()=>{
      window.location.href="https://afd-verbot.de/";
    };
  })();

  const data = window.WPLACE_DATA || {projects:[], helperCount:0};
  const projects = [...data.projects];

  const esc = s => String(s??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");

  /* ---------- 🆕 Neu Badge ---------- */
  function isNew(d){
    if(!d) return false;
    const diff = (Date.now()-new Date(d)) / 86400000;
    return diff <= 7;
  }

  function badgeStatus(p){
    return p.status==="done"
      ? `<span class="badge done">Fertig</span>`
      : `<span class="badge wip">In Arbeit</span>`;
  }

  function badgeNew(p){
    return isNew(p.updatedAt)
      ? `<span class="badge" style="color:#7c5cff">🆕 Neu</span>`
      : "";
  }

  function pollBtn(p){
    if(!p.poll?.enabled) return "";
    const slug = p.poll.slug || p.id;
    return `<a class="btn btn-primary" href="umfragen.html#${esc(slug)}">Umfrage</a>`;
  }

  /* ---------- Projekt Render ---------- */
  function projectHTML(p){
    const tags = (p.tags||[]).map(t=>`<span class="badge">#${esc(t)}</span>`).join("");
    const text = p.status==="wip"
      ? esc(p.wipText||"").replaceAll("\n","<br>")
      : esc(p.note||"");

    const img =
      p.status==="wip"
        ? (p.progressImg||p.coverImg)
        : (p.finalImg||p.coverImg);

    return `
      <article class="post" id="${esc(p.id)}">
        <div class="post-head">
          <img class="post-thumb" src="${esc(img||"assets/img/placeholder-wip.png")}" loading="lazy">
          <div>
            <h2 class="post-title">${esc(p.title)}</h2>
            <div class="card-meta">
              ${badgeStatus(p)}
              ${badgeNew(p)}
              ${tags}
            </div>
          </div>
        </div>

        <div class="post-text">${text || "<i>Kein Text.</i>"}</div>

        <div class="post-footer">
          <div class="post-footer-left">
            <a class="btn btn-secondary" href="${esc(p.coordUrl||"#")}" target="_blank">Koordinaten</a>
            ${pollBtn(p)}
          </div>
          <div class="muted small">
            Update: ${esc(p.updatedAt||"–")}
          </div>
        </div>
      </article>
    `;
  }

  /* ---------- Projekte-Seite ---------- */
  const list = document.getElementById("projectsList");
  if(list){
    const search = document.getElementById("searchProjects");
    const filter = document.getElementById("filterStatus");

    function render(){
      let items = [...projects];

      // 🔽 Neueste zuerst
      items.sort((a,b)=>String(b.updatedAt||"").localeCompare(String(a.updatedAt||"")));

      if(filter.value!=="all"){
        items = items.filter(p=>p.status===filter.value);
      }

      const q = search.value.toLowerCase();
      if(q){
        items = items.filter(p =>
          [p.title,p.note,p.wipText,(p.tags||[]).join(" ")]
            .join(" ").toLowerCase().includes(q)
        );
      }

      list.innerHTML = items.map(projectHTML).join("") ||
        `<div class="panel"><b>Keine Projekte gefunden.</b></div>`;
    }

    search.oninput = render;
    filter.onchange = render;
    render();
  }

  /* ---------- Footer Jahr ---------- */
  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();

})();
