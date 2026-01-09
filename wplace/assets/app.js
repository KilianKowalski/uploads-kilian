(function () {
  // ---------- Consent Gate (1x akzeptieren, dann gespeichert) ----------
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

    // Klick auf Hintergrund soll NICHT schließen
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  })();

  const data = window.WPLACE_DATA || { projects: [], helperCount: 0 };
  const projects = Array.isArray(data.projects) ? data.projects : [];

  // ---------- Theme ----------
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "" : "light";
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next || "");
  }
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // ---------- Footer Year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Helpers ----------
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

  function cardHTML(p) {
    const tags = (p.tags || []).slice(0, 4).map(t => `<span class="badge">#${esc(t)}</span>`).join("");
    const note = p.note ? `<p class="muted" style="margin:0">${esc(p.note)}</p>` : "";
    return `
      <article class="card">
        <img class="card-img" src="${esc(p.coverImg || "assets/img/placeholder-wip.png")}" alt="${esc(p.title)}" loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${esc(p.title)}</h3>
          <div class="card-meta">
            ${badgeStatus(p.status)}
            ${tags}
          </div>
          ${note}
          <div class="card-actions" style="margin-top:10px">
            <a class="btn btn-secondary" href="${esc(p.coordUrl || "#")}" target="_blank" rel="noopener">Zu den Koordinaten</a>
            ${p.status === "wip" ? `<a class="btn btn-ghost" href="at-work.html#${esc(p.id)}">Zum At-Work-Post</a>` : `<a class="btn btn-ghost" href="galerie.html#${esc(p.id)}">In Galerie öffnen</a>`}
          </div>
        </div>
      </article>
    `;
  }

  function uniqueTags(items) {
    const set = new Set();
    items.forEach(p => (p.tags || []).forEach(t => set.add(String(t))));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "de"));
  }

  function includesQuery(p, q) {
    const hay = [
      p.title, p.note, p.wipText,
      ...(p.tags || [])
    ].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  // ---------- Startseite: Stats + Highlights ----------
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
    const sorted = [...projects].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
    const pick = sorted.slice(0, 6);
    highlightsGrid.innerHTML = pick.map(cardHTML).join("");
  }

  // ---------- Galerie ----------
  const galleryGrid = document.getElementById("galleryGrid");
  const tagChips = document.getElementById("tagChips");
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  let activeTag = "all";

  function renderGallery() {
    if (!galleryGrid) return;

    const q = (searchInput?.value || "").trim();
    const status = statusFilter?.value || "all";

    let filtered = [...projects];

    if (status !== "all") filtered = filtered.filter(p => p.status === status);
    if (activeTag !== "all") filtered = filtered.filter(p => (p.tags || []).map(String).includes(activeTag));
    if (q) filtered = filtered.filter(p => includesQuery(p, q));

    galleryGrid.innerHTML = filtered.map(p => `<div id="${esc(p.id)}">${cardHTML(p)}</div>`).join("");

    if (filtered.length === 0) {
      galleryGrid.innerHTML = `<div class="panel"><b>Nichts gefunden.</b><div class="muted small">Suchbegriff/Filter anpassen.</div></div>`;
    }
  }

  if (tagChips) {
    const tags = uniqueTags(projects);
    const chips = ["all", ...tags].map(t => {
      const label = t === "all" ? "Alle Tags" : `#${t}`;
      const cls = t === "all" ? "chip active" : "chip";
      return `<span class="${cls}" data-tag="${esc(t)}">${esc(label)}</span>`;
    }).join("");

    tagChips.innerHTML = chips;

    tagChips.addEventListener("click", (e) => {
      const el = e.target.closest("[data-tag]");
      if (!el) return;
      activeTag = el.getAttribute("data-tag") || "all";
      [...tagChips.querySelectorAll(".chip")].forEach(c => c.classList.remove("active"));
      el.classList.add("active");
      renderGallery();
    });
  }

  if (galleryGrid) {
    searchInput?.addEventListener("input", renderGallery);
    statusFilter?.addEventListener("change", renderGallery);
    renderGallery();
  }

  // ---------- At-Work ----------
  const wipPosts = document.getElementById("wipPosts");
  const searchInputWip = document.getElementById("searchInputWip");
  const sortWip = document.getElementById("sortWip");

  function postHTML(p) {
    const tags = (p.tags || []).map(t => `<span class="badge">#${esc(t)}</span>`).join("");
    const updated = p.updatedAt ? `<span class="badge">Update: ${esc(p.updatedAt)}</span>` : "";
    const text = esc(p.wipText || p.note || "").replaceAll("\n", "<br>");
    return `
      <article class="post" id="${esc(p.id)}">
        <div class="post-head">
          <img class="post-thumb" src="${esc(p.progressImg || p.coverImg || "assets/img/placeholder-progress.png")}" alt="Progress: ${esc(p.title)}" loading="lazy">
          <div>
            <h2 class="post-title">${esc(p.title)}</h2>
            <div class="card-meta">
              ${badgeStatus(p.status)}
              ${updated}
              ${tags}
            </div>
            <div class="muted small">Koordinaten-Button unten im Footer vom Post.</div>
          </div>
        </div>

        <div class="post-text">${text || "<i>Kein Text hinterlegt.</i>"}</div>

        <div class="post-footer">
          <div class="post-footer-left">
            <a class="btn btn-secondary" href="${esc(p.coordUrl || "#")}" target="_blank" rel="noopener">Zu den Koordinaten</a>
            <a class="btn btn-ghost" href="galerie.html#${esc(p.id)}">In Galerie</a>
          </div>
          <div class="muted small">Final/Preview:</div>
        </div>

        <div style="padding:0 12px 12px">
          <img class="card-img" style="border-radius:14px; border:1px solid var(--border)" src="${esc(p.finalImg || p.coverImg || "assets/img/placeholder-wip.png")}" alt="Final/Preview: ${esc(p.title)}" loading="lazy">
        </div>
      </article>
    `;
  }

  function renderWip() {
    if (!wipPosts) return;

    const q = (searchInputWip?.value || "").trim();
    const mode = sortWip?.value || "newest";

    let items = projects.filter(p => p.status === "wip" || (p.wipText && String(p.wipText).trim().length > 0));

    if (q) items = items.filter(p => includesQuery(p, q));

    items.sort((a, b) => {
      const da = String(a.updatedAt || "");
      const db = String(b.updatedAt || "");
      return mode === "oldest" ? da.localeCompare(db) : db.localeCompare(da);
    });

    wipPosts.innerHTML = items.map(postHTML).join("");

    if (items.length === 0) {
      wipPosts.innerHTML = `<div class="panel"><b>Keine At-Work Posts gefunden.</b><div class="muted small">Suchbegriff anpassen oder Projekte in data.js pflegen.</div></div>`;
    }
  }

  if (wipPosts) {
    searchInputWip?.addEventListener("input", renderWip);
    sortWip?.addEventListener("change", renderWip);
    renderWip();
  }
})();
