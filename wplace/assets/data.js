// Passe diese Daten an. Neue Projekte einfach unten anhängen.

window.WPLACE_DATA = {
  helperCount: 0,

  projects: [
    {
      id: "projekt-001",
      title: "Anti AfD QR-Code (fertig)",
      status: "done",
      tags: ["afd", "qr"],
      note: "Ein rießen QR-Code, welcher zur Website \"afd-verbot.jetzt\" führt",
      coordUrl: "https://wplace.live/?lat=50.027787542721&lng=10.89571255927732&zoom=13.875655009550293",
      coverImg: "assets/img/projekt-001/projekt-001_cover.png",

      updatedAt: "2026-01-05",
      wipText:
        "Die Idee war, Menschen die Notwendigkeit eines AfD-Verbots noch deutlicher vor Augen zu führen. Gemeinsam mit Steve und Milouch habe ich das Projekt fertiggestellt.",
      progressImg: "assets/img/projekt-001/projekt-001_progress.png",
      finalImg: "assets/img/projekt-001/projekt-001_final.png",

      poll: { enabled: false }
    },

    {
      id: "projekt-002",
      title: "Antifa Logo (fertig)",
      status: "done",
      tags: ["161", "afa", "antifa"],
      note: "Klassisches Antifa Logo",
      coordUrl: "https://wplace.live/?lat=50.287823275144575&lng=10.513564121777332&zoom=13.813709128010684",
      coverImg: "assets/img/projekt-002/projekt-002_cover.png",

      updatedAt: "2026-01-08",
      wipText:
        "An dieser Stelle befand sich bereits ein fertiges Logo der Antifaschistischen Aktion. Meiner Meinung nach war es etwas zu klein, weshalb ich begann, die Konturen eines größeren Logos darüber zu pixeln. Dank der Hilfe von Tabby, Earthflare, Flair Bear, Greedy und vielen anderen konnte dieses Projekt umgesetzt werden. Da ich hauptsächlich politische Kunstwerke starte, ist es völlig normal, mit Leuten zu rechnen, die diese gerne zerstören wollen. Auch hier war das der Fall. Und obwohl ich das Schematic verloren hatte, hielt dieses Werk stand! Danke an alle Pixler:innen!",
      progressImg: "assets/img/projekt-002/projekt-002_progress.png",
      finalImg: "assets/img/projekt-002/projekt-002_final.png",

      poll: { enabled: false }
    },

    {
      id: "projekt-003",
      title: "FCK NZS",
      status: "done",
      tags: ["fcknzs", "nzs", "161"],
      note: "FCK NZS aber mal in richtig groß",
      coordUrl: "https://wplace.live/?lat=50.32128052607682&lng=10.667021153027314&zoom=12.806498399076112",
      coverImg: "assets/img/projekt-003/projekt-003_cover.png",

      updatedAt: "2026-01-15",
      wipText:
        "Ein Klassiker, wir kennen es alle. Das FCK NZS Schild mal in groß. Es wurde erfolgreich fertiggestellt. Mit rießiger Unterstützung von Tabby, Greedy, den Pixel Punks und weiteren!",
      progressImg: "assets/img/projekt-003/projekt-003_progress.png",
      finalImg: "assets/img/projekt-003/projekt-003_final.png",

      // HIER aktivieren + Link eintragen:
      poll: {
        enabled: false,
        slug: "projekt-003-bg",
        title: "Abstimmung: Background bei FCK NZS",
        // Ersetze das mit deinem echten Embed-Link:
        // Google Form -> "Senden" -> "<>" Einbetten -> Link kopieren (endet meist mit ?embedded=true)
        embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdNJPKY7UxY25rSgIU1S3J6JUveu0wZ2Q0NIGwkQqA-JAklHQ/viewform?embedded=true"
      }
    },
  ]
};
