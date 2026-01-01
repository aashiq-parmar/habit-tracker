const cacheName = 'habit-cache-v1';
const assets = [
    '/',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css',
    'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.global.min.js',
    'https://code.jquery.com/jquery-3.7.1.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache =>
            cache.addAll(assets).catch(err => console.error('Cache failed:', err))
        )
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
