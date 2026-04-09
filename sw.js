// sw.js
// 1. Cambiamos el nombre del caché. Esto es VITAL. 
// Al cambiar "v1" a "pro-v1", obligamos al navegador a borrar la basura vieja.
const CACHE_NAME = 'aprende-y-juega-pro-v1';

// 2. La nueva lista exacta de nuestra arquitectura modular
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/variables.css',
    './css/main-style.css',
    './css/animations.css',
    './js/main.js',
    './js/niveles.js',
    './js/core/GameEngine.js',
    './js/modules/memoria.js',
    './js/modules/arrastre.js',
    './js/modules/seleccion.js',
    './manifest.json'
];

// Instalación: Descarga y guarda todos los archivos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('📦 Service Worker: Cacheando archivos Pro');
            return cache.addAll(ASSETS_TO_CACHE);
        })
        .then(() => self.skipWaiting())
    );
});

// Activación: Limpia los cachés viejos (Borra el rastro de la app Junior)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('🧹 Service Worker: Borrando caché antiguo', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepción: Si no hay internet, saca los archivos del caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Devuelve lo que está en caché, o si no lo tiene, lo busca en internet
            return response || fetch(event.request);
        })
    );
});