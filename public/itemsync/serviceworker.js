var CACHE_NAME = 'cache-v9';
const CACHE_KEYS = [
  CACHE_NAME
];
var urlsToCache = [
  '/itemsync/',
  '/itemsync/public',
  '/itemsync/private',
  '/itemsync/create',
  '/itemsync/manifest.json',
//  '/itemsync/serviceworker.js',
  '/images/icon.png',
  '/images/add_item.png',
  '/images/checked.svg',
  '/images/settings.svg',
  '/stylesheets/jumbotron.css',
  '/stylesheets/animation.css',
  '/stylesheets/style.css',
  '/javascripts/channel.bundle.js',
  '/javascripts/create_channel.bundle.js',
  '/javascripts/index.bundle.js',
  '/javascripts/private_channels.bundle.js',
  '/javascripts/privatechannel.bundle.js',
  '/javascripts/public_channels.bundle.js',
  '/javascripts/publicchannel.bundle.js',
  '/javascripts/anonymouschannel.bundle.js'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
              cache.put(url, response);
            })
          })
        )
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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_NAME.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});