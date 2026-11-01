// Keeps the app working without a network: every file of a build is fetched
// at install and served from the cache from then on. tool/build_pwa.py fills
// in the version and the file list. A new build takes over at the next start.
// Requests to other servers (Discogs, MusicBrainz) are left alone.
'use strict';

const VERSION = 'cc4b9ef9a3cb';
const FILES = ["assets/AssetManifest.bin", "assets/AssetManifest.bin.json", "assets/FontManifest.json", "assets/NOTICES", "assets/assets/fonts/Inter-Medium.ttf", "assets/assets/fonts/Inter-OFL.txt", "assets/assets/fonts/Inter-Regular.ttf", "assets/assets/fonts/Inter-SemiBold.ttf", "assets/fonts/MaterialIcons-Regular.otf", "assets/shaders/ink_sparkle.frag", "assets/shaders/stretch_effect.frag", "canvaskit/canvaskit.js", "canvaskit/canvaskit.wasm", "drift_worker.js", "favicon.png", "flutter.js", "flutter_bootstrap.js", "icons/Icon-192.png", "icons/Icon-512.png", "icons/Icon-maskable-192.png", "icons/Icon-maskable-512.png", "index.html", "main.dart.js", "manifest.json", "sqlite3.wasm", "version.json"];
const PREFIX = 'b-seite-';
const CACHE = PREFIX + VERSION;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // no-cache: revalidates, so unchanged files are not downloaded again.
    await cache.addAll(FILES.map((file) => new Request(file, { cache: 'no-cache' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const sameOrigin = new URL(request.url).origin === self.location.origin;
  if (request.method !== 'GET' || !sameOrigin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = request.mode === 'navigate'
      ? await cache.match('index.html')
      : await cache.match(request, { ignoreSearch: true });
    return cached || fetch(request);
  })());
});
