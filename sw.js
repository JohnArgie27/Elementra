const CACHE_NAME = 'elementra-v4';

// Core local files that MUST be cached for offline play
const LOCAL_ASSETS = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Install Event: Cache local files only (avoids CDN CORS blocking)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(LOCAL_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Serve cached local files offline, fallback safely
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return networkResponse;
      }).catch(() => {
        // Fallback to main index.html if offline and asset isn't cached
        return caches.match('./index.html');
      });
    })
  );
});
