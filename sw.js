// Service Worker do Ultron PWA
const CACHE = "ultron-v1";
const FILES = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
    // Só cacheia GET
    if (e.request.method !== "GET") return;

    // Não cacheia chamadas da API
    if (e.request.url.includes("trycloudflare")) return;

    e.respondWith(
        caches.match(e.request).then((cached) => {
            return cached || fetch(e.request);
        })
    );
});
