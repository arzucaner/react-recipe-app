const CACHE_NAME = 'recipe-cache-v1';
const urlsToCache = [
  '/', 
  '/index.html', 
  '/App.js', 
  '/Dropdown.js', 
  '/RecipeDetail.js', 
  '/App.css', 
  '/Dropdown.css', 
  '/RecipeDetail.css',
  '/fallback.html' 
];

/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);  
    })
  );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          if (!event.request.url.includes('/recipes/')) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
            });
          }
          return fetchResponse;
        });
      }).catch(() => {
        return caches.match('/fallback.html');
      })
    );
  });  

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName); // Burada eksik olan return ifadesi eklenmiştir.
            }
            return null; // map fonksiyonu her durumda bir değer döndürmeli.
          })
        );
      })
    );
  });