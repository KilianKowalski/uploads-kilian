// Passe diese Daten an. Neue Projekte einfach unten anhängen.

window.WPLACE_DATA = {
  // optional – wenn du willst:
  helperCount: 0,

  projects: [
    {
      id: "projekt-001",
      title: "Anti AfD QR-Code (fertig)",
      status: "done", // "done" oder "wip"
      tags: ["afd", "qr"],
      note: "Ein rießen QR-Code, welcher zur Website \"afd-verbot.jetzt\" führt",
      // Koordinaten-Link: trag hier deinen echten Link ein
      coordUrl: "https://wplace.live/?lat=50.027787542721&lng=10.89571255927732&zoom=13.875655009550293",
      // Vorschaubild (Galerie/Highlights)
      coverImg: "assets/img/projekt-001_cover.png",

      // Blog/At-Work:
      updatedAt: "2026-01-08",
      wipText:
        "Die Idee war es, Menschen das wirklich ein AfD Verbot - welches wirklich nötig wäre - noch mehr unter die Nase zu reiben. Gemeinsam mit Steve und Milouch stellte ich es fertig.",
      progressImg: "assets/img/projekt-001_progress.png",
      finalImg: "assets/img/projekt-001_final.png"
    },

    {
      id: "projekt-002",
      title: "Projekt Beispiel (in Arbeit)",
      status: "wip",
      tags: ["wip", "koordination"],
      note: "Hier kannst du kurz schreiben, was gerade fehlt.",
      coordUrl: "https://example.com/wplace?x=999&y=111&z=6",
      coverImg: "assets/img/placeholder-wip.png",

      updatedAt: "2026-01-08",
      wipText:
        "Stand: Outlines stehen, Schattierung fehlt, bitte keine Random-Pixel drüber.\n\nTo-Do:\n- Bereich links oben auffüllen\n- Kontrast anpassen\n- Rand sauber machen",
      progressImg: "assets/img/placeholder-progress.png",
      finalImg: "assets/img/placeholder-wip.png"
    }
  ]
};
