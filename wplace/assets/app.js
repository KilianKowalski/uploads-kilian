(function () {
  /* ---------- Consent Gate ---------- */
  (function consentGate(){
    const overlay = document.getElementById("consentOverlay");
    if (!overlay) return;

    const acceptBtn = document.getElementById("consentAccept");
    const declineBtn = document.getElementById("consentDecline");

    const KEY = "wplace_antifa_consent_v1";
    const redirectUrl = "https://afd-verbot.de/";

    const accepted = localStorage.getItem(KEY) === "accepted";

    function show(){
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function hide(){
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }

    if (!accepted) show();

    acceptBtn?.addEventListener("click", () => {
      localStorage.setItem(KEY, "accepted");
      hide();
    });

    declineBtn?.addEventListener("click", () => {
      window.location.href = redirectUrl;
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  })();

  const data = window.WPLACE_DATA || { projects: [], helperCount: 0 };
  const projects = Array.isArray(data.projects) ? data.projects : [];

  /* ---------- Helpers ---------- */
  const esc = (s) =>
    String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  function badgeStatus(status) {
    if (status === "done") return `<span class="badge done">Fertig</span>`;
    return `<span class="badge wip">In Arbeit</span>`;
  }

  /* 🆕 NEU-BADGE-LOGIK */
  function isNew(updatedAt){
    if(!updatedAt) return false;
    const updated = new Date(updatedAt);
    if(isNaN(updated)) return false;

    const now = new Date();
    const diffDays = (now - updated) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }

  function newBadgeHTML(p){
    return isNew(p.updatedAt)
      ? `<span class="badge" style="color:#7c5cff">🆕 Neu</span>`
      : "";
  }

  function pollBtnHTML(p){
    const poll = p.poll || {};
    if (!poll.enabled) return "";
    const slug = poll.slug || p.id;
    return `<a class="btn btn-primary" href="umfragen.html#${esc(slug)}">Umfrage</a>`;
  }

  /* ---------- Card ---------- */
  function cardHTML(p) {
    const tags = (p.tags || []).slice(0, 4)
      .map(t => `<span class="badge">#${esc(t)}</span>`).join("");

    const note = p.note ? `<p class="muted" style="margin:0">${esc(p.note)}</p>` : "";

    return `
      <article class="card">
        <img class="card-img"
             src="${esc(p.coverImg || "assets/img/placeholder-wip.png")}"
             alt="${esc(p.title)}"
             loading="lazy">

        <div class="card-body">
          <h3 class="card-title">${esc(p.title)}</h3>

          <div class="card-meta">
            ${badgeStatus(p.status)}
            ${newBadgeHTML(p)}
            ${tags}
          </div>

          ${note}

          <div class="card-actions" style="margin-top:10px">
            <a class="btn btn-secondary"
               href="${esc(p.coordUrl || "#")}"
               target="_blank" rel="noopener">
              Zu den Koordinaten
            </a>

            ${p.status === "wip"
              ? `<a class="btn btn-ghost" href="at-work.html#${esc(p.id)}">Zum At-Work-Post</a>`
              : `<a class="btn btn-ghost" href="galerie.html#${esc(p.id)}">In Galerie öffnen</a>`}

            ${pollBtnHTML(p)}
          </div>
        </div>
      </article>
    `;
  }

  /* ---------- Startseite ---------- */
  const statTotal = document.getElementById("statTotal");
  const statDone = document.getElementById("statDone");
  const statWip = document.getElementById("statWip");
  const statHelpers = document.getElementById("statHelpers");

  if (statTotal) statTotal.textContent = projects.length;
  if (statDone) statDone.textContent = projects.filter(p => p.status === "done").length;
  if (statWip) statWip.textContent = projects.filter(p => p.status === "wip").length;
  if (statHelpers) statHelpers.textContent = data.helperCount || "–";

  const highlightsGrid = document.getElementById("highlightsGrid");
  if (highlightsGrid) {
    const sorted = [...projects]
      .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))
      .slice(0, 6);

    highlightsGrid.innerHTML = sorted.map(cardHTML).join("");
  }

  /* ---------- Galerie ---------- */
  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    galleryGrid.innerHTML = projects.map(p =>
      `<div id="${esc(p.id)}">${cardHTML(p)}</div>`
    ).join("");
  }

})();
