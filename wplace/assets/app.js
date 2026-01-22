(function () {

  /* ---------- Consent Gate ---------- */
  (function consentGate(){
    const KEY = "wplace_antifa_consent_v1";
    if (localStorage.getItem(KEY) === "accepted") return;

    const overlay = document.createElement("div");
    overlay.id = "consentOverlay";
    overlay.className = "consent-overlay";
    overlay.innerHTML = `
      <div class="consent-modal">
        <h2>Hinweis vor dem Betreten</h2>
        <p>Community-Projekt – Zugriff nur bei Zustimmung.</p>
        <div class="consent-actions">
          <button class="consent-btn consent-accept" id="accept">Akzeptieren</button>
          <button class="consent-btn consent-decline" id="decline">Ablehnen</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector("#accept").onclick = () => {
      localStorage.setItem(KEY, "accepted");
      overlay.remove();
    };
    overlay.querySelector("#decline").onclick = () => {
      window.location.href = "https://afd-verbot.de/";
    };
  })();

  const data = window.WPLACE_DATA || { projects: [], helperCount: 0 };
  const projects = Array.isArray(data.projects) ? data.projects : [];

  const esc = s =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  /* ---------- 🆕 Neu Badge ---------- */
  function isNew(dateStr){
    if (!dateStr) return false;
    const diff = (Date.now() - new Date(dateStr)) / 86400000;
    return diff <= 7;
  }

  function badgeStatus(p){
    return p.status === "done"
      ? `<span class="badge done">Fertig</span>`
      : `<span class="badge wip">In Arbeit</span>`;
  }

  function badgeNew(p){
    return isNew(p.updatedAt)
      ? `<span class="badge" style="color:#7c5cff">🆕 Neu</span>`
      : "";
  }

  function pollBtn(p){
    if (!p.poll?.enabled) return "";
    const slug = p.poll.slug || p.id;
    return `<a class="btn btn-primary" href="umfragen.html#${esc(slug)}">Umfrage</a>`;
  }

  /* ---------- 🧮 STARTSEITE: STATISTIKEN (FIX) ---------- */
  const statTotal = document.getElementById("statTotal");
  const statDone = document.getElementById("statDone");
  const statWip = document.getElementById("statWip");
  const statHelpers = document.getElementById("statHelpers");

  if (statTotal) statTotal.textContent = projects.length;
  if (statDone) statDone.textContent =
    projects.filter(p => p.status === "done").length;
  if (statWip) statWip.textContent =
    projects.filter(p => p.status === "wip").length;
  if (statHelpers) statHelpers.textContent =
    data.helperCount || "–";

  /* ---------- Projekt (At-Work-Style, voll sichtbar) ---------- */
  function projectHTML(p){
    const tags = (p.tags || [])
      .map(t => `<span class="badge">#${esc(t)}</span>`).join("");

    const text = esc(p.wipText || p.note || "")
      .replaceAll("\n", "<br>");

    return `
      <article class="post" id="${esc(p.id)}">
        <div class="post-head">
          <img class="post-thumb"
               src="${esc(p.progressImg || p.coverImg || "assets/img/placeholder-progress.png")}"
               loading="lazy">

          <div>
            <h2 class="post-title">${esc(p.title)}</h2>
            <div class="card-meta">
              ${badgeStatus(p)}
              ${badgeNew(p)}
              ${tags}
            </div>
            <div class="muted small">Koordinaten-Button unten.</div>
          </div>
        </div>

        <div class="post-text">
          ${text || "<i>Kein Text hinterlegt.</i>"}
        </div>

        <div class="post-footer">
          <div class="post-footer-left">
            <a class="btn btn-secondary"
               href="${esc(p.coordUrl || "#")}"
               target="_blank" rel="noopener">
              Zu den Koordinaten
            </a>
            ${pollBtn(p)}
          </div>
          <div class="muted small">
            Update: ${esc(p.updatedAt || "–")}
          </div>
        </div>

        <div style="padding:0 12px 12px">
          <img class="card-img"
               src="${esc(p.finalImg || p.coverImg || "assets/img/placeholder-wip.png")}"
               loading="lazy">
        </div>
      </article>
    `;
  }

  /* ---------- PROJEKTE-SEITE ---------- */
  const list = document.getElementById("projectsList");
  if (list) {
    const search = document.getElementById("searchProjects");
    const filter = document.getElementById("filterStatus");

    function render(){
      let items = [...projects];

      // 🔽 Neueste zuerst
      items.sort((a,b) =>
        String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""))
      );

      if (filter.value !== "all") {
        items = items.filter(p => p.status === filter.value);
      }

      const q = search.value.toLowerCase();
      if (q) {
        items = items.filter(p =>
          [p.title, p.note, p.wipText, (p.tags || []).join(" ")]
            .join(" ").toLowerCase().includes(q)
        );
      }

      list.innerHTML = items.length
        ? items.map(projectHTML).join("")
        : `<div class="panel"><b>Keine Projekte gefunden.</b></div>`;
    }

    search.oninput = render;
    filter.onchange = render;
    render();
  }

  /* ---------- STARTSEITE: HIGHLIGHTS ---------- */
  const highlightsGrid = document.getElementById("highlightsGrid");
  if (highlightsGrid) {
    const sorted = [...projects]
      .sort((a,b)=>String(b.updatedAt||"").localeCompare(String(a.updatedAt||"")))
      .slice(0,6);

    highlightsGrid.innerHTML = sorted.map(p => `
      <div class="card">
        <img class="card-img"
             src="${esc(p.coverImg || "assets/img/placeholder-wip.png")}"
             loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${esc(p.title)}</h3>
          <div class="card-meta">
            ${badgeStatus(p)}
            ${badgeNew(p)}
          </div>
          <a class="btn btn-secondary" href="projekte#${esc(p.id)}">
            Zum Projekt
          </a>
        </div>
      </div>
    `).join("");
  }

  /* ---------- Footer Jahr ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

})();
