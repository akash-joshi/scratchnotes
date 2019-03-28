/* eslint-disable func-names */
// This is the "Offline copy of pages" service worker

// Install stage sets up the index page (home page) in the cache and opens a new cache
self.addEventListener('install', event => {
  const indexPage = new Request('/');
  event.waitUntil(
    fetch(indexPage).then(async response => {
      const cache = await caches.open('pwabuilder-offline');
      return cache.put(indexPage, response);
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', event => {
  const updateCache = async function(request) {
    const cache = await caches.open('pwabuilder-offline');
    const response = await fetch(request);
    return cache.put(request, response);
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(async error => {
      const cache = await caches.open('pwabuilder-offline');
      const matching = await cache.match(event.request);
      const report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
      return report;
    })
  );
});
