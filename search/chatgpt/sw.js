self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      new Response("Offline – NEOSEARCH schläft 😴", {
        headers: { "Content-Type": "text/plain" }
      })
    )
  );
});
