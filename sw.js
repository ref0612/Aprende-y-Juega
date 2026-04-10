// sw.js v3.2
const CACHE_NAME = 'aprende-y-juega-v3.2';

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/favicon.ico',
    './assets/icon-192.svg',
    './css/variables.css',
    './css/main-style.css',
    './css/animations.css',
    './js/main.js',
    './js/niveles.js',
    './js/core/GameEngine.js',
    './js/core/Progreso.js',
    './js/core/Transicion.js',
    './js/modules/memoria.js',
    './js/modules/arrastre.js',
    './js/modules/seleccion.js',
    './js/modules/avatar.js',
    './js/modules/math.js',
    './js/modules/emociones.js',
    './js/modules/higiene.js',
    './js/modules/abecedario.js',
    './js/modules/opuestos.js',
    './js/modules/frutas.js',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(names => Promise.all(
                names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    const isOwn = url.origin === location.origin;

    if (isOwn) {
        e.respondWith(
            caches.match(e.request).then(r => r || fetch(e.request).then(res => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
                return res;
            })).catch(() => caches.match('./index.html'))
        );
    } else {
        // Recursos externos (emojis CDN): network con fallback silencioso
        e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request))
        );
    }
});