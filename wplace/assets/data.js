// Passe diese Daten an. Neue Projekte einfach unten anhängen.

window.WPLACE_DATA = {
  // optional – wenn du willst:
  helperCount: 0,

  projects: [
    {
      id: "projekt-001",
      title: "Projekt Beispiel (fertig)",
      status: "done", // "done" oder "wip"
      tags: ["politik", "collab"],
      note: "Kurzer Platzhaltertext für die Galerie.",
      // Koordinaten-Link: trag hier deinen echten Link ein
      coordUrl: "https://example.com/wplace?x=123&y=456&z=8",
      // Vorschaubild (Galerie/Highlights)
      coverImg: "assets/img/placeholder-done.png",

      // Blog/At-Work:
      updatedAt: "2026-01-06",
      wipText:
        "Längerer Text möglich: Was war die Idee, wer hat geholfen, welche Farben fehlen noch, etc.",
      progressImg: "assets/img/placeholder-progress.png",
      finalImg: "assets/img/placeholder-done.png"
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
