const CACHE_NAME = 'cancionero-v2'; // Poné v2 (o v3 si ya tenías v2)

// Acá tenés que poner la lista de archivos básicos que querés que funcionen sin internet
const urlsToCache = [
  '/cancionerobenja/',
  '/cancionerobenja/index.html', // Agregá este por las dudas
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

// Cuando la página pide un archivo...
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 1. Si lo encuentra en la mochila (caché), lo devuelve al instante
        if (response) {
          return response;
        }

        // 2. Si no está en la mochila, intenta ir a internet
        return fetch(event.request).catch(() => {
          // 3. EL PARACAÍDAS: Si no hay internet y no estaba en la mochila, 
          // evitamos que Safari tire el error de "Load failed"
          console.log("Estás offline y este archivo no se guardó: ", event.request.url);
          
          // Opcional: podrías devolver una página genérica de "Sin conexión" acá
        });
      })
  );
});