const CACHE_NAME = 'elementra-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  // Add any other CSS or JS filenames you have here
];

// Install Event: Cache all core app files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});