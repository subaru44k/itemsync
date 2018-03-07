var CACHE_NAME = 'cache-v2';
var urlsToCache = [
//  '/itemsync/',
  '/itemsync/manifest.json',
  '/itemsync/serviceworker.js',
  '/images/icon.png',
  '/images/add_item.png',
  '/images/checked.svg',
  '/stylesheets/jumbotron.css',
//  '/stylesheets/style.css',
  '/stylesheets/animation.css',
//  '/javascripts/bundle.js'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // キャッシュがあったのでそのレスポンスを返す
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
})