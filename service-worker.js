const CACHE_NAME = 'henan-nav-v1';
const PRECACHE_URLS = [
    '/',
    'index.html',
    'css/style.css',
    'js/config.js',
    'js/app.js',
    'js/utils.js',
    'js/render.js',
    'js/handlers.js',
    'js/data.js',
    'js/data.built.js',
    '404.html',
    'site.webmanifest'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        ))
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.hostname === 'www.google.com' && url.pathname.startsWith('/s2/favicons') || url.hostname === 'api.countapi.xyz' || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(cached => {
            const fetchPromise = fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
            return cached || fetchPromise;
        })
    );
});