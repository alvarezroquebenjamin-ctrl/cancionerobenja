const CACHE_NAME = 'cancionero-v1';

// Acá tenés que poner la lista de archivos básicos que querés que funcionen sin internet
const urlsToCache = [
  '/cancionerobenja/',
  '/cancionerobenja/css/cancionero.css',
  '/cancionerobenja/scripts/cancionero.js',
  '/cancionerobenja/images/logo-schoenstatt-png.png',
  '/cancionerobenja/20-albumes.html'
  // Nota: Más adelante podés agregar acá las rutas de tus canciones clave
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados piola');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cuando la página pide un archivo, se fija si está guardado sin internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si lo encuentra en caché, lo devuelve. Si no, va a buscarlo a internet.
        return response || fetch(event.request);
      })
  );
});