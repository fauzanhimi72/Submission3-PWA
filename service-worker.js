//import workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log("workbox gagal dimuat");
}

//pendaftaran aset untuk Precaching
  workbox.precaching.precacheAndRoute(
    [
      { url: '/push.js', revision: '1' },
      { url: '/nav.html', revision: '1' },
      { url: '/index.html', revision: '1' },
      { url: '/images/favicon.png', revision: '1' },
      { url: '/images/icon-512px.png', revision: '1' },
      { url: '/images/icon-192px.png', revision: '1' },
      { url: '/images/home-banner.jpg', revision: '1' },
      { url: '/css/webfonts/fa-brands-400.eot', revision: '1' },
      { url: '/css/webfonts/fa-brands-400.svg', revision: '1' },
      { url: '/css/webfonts/fa-brands-400.ttf', revision: '1' },
      { url: '/css/webfonts/fa-brands-400.woff', revision: '1' },
      { url: '/css/webfonts/fa-brands-400.woff2', revision: '1' },
      { url: '/css/webfonts/fa-regular-400.eot', revision: '1' },
      { url: '/css/webfonts/fa-regular-400.svg', revision: '1' },
      { url: '/css/webfonts/fa-regular-400.ttf', revision: '1' },
      { url: '/css/webfonts/fa-regular-400.woff', revision: '1' },
      { url: '/css/webfonts/fa-regular-400.woff2', revision: '1' },
      { url: '/css/webfonts/fa-solid-900.eot', revision: '1' },
      { url: '/css/webfonts/fa-solid-900.svg', revision: '1' },
      { url: '/css/webfonts/fa-solid-900.ttf', revision: '1' },
      { url: '/css/webfonts/fa-solid-900.woff', revision: '1' },
      { url: '/css/webfonts/fa-solid-900.woff2', revision: '1' },
      { url: '/css/webfonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
      { url: '/css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eqVww.woff2', revision: '1' },
      { url: '/css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eSVw0iC.woff2', revision: '1' },
      { url: '/css/webfonts/7Aujp_0qiz-afTfcIyoiGtm2P0wG05Fz4eWVw0iC.woff2', revision: '1' },
      { url: '/css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk30eg.woff2', revision: '1' },
      { url: '/css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk40eiNxw.woff2', revision: '1' },
      { url: '/css/webfonts/7Aulp_0qiz-aVz7u3PJLcUMYOFnOkEk50eiNxw.woff2', revision: '1' },
      { url: '/pages/home.html', revision: '1' },
      { url: '/pages/jadwal.html', revision: '1' },
      { url: '/pages/favorit.html', revision: '1' },
      { url: '/css/materialize.min.css', revision: '1' },
      { url: '/css/custom.css', revision: '1' },
      { url: '/css/fontawesome/fontawesome.min.css', revision: '1' },
      { url: '/css/fontawesome/all.min.css', revision: '1' },
      { url: '/js/materialize.js', revision: '1' },
      { url: '/js/materialize.min.js', revision: '1' },
      { url: '/js/nav.js', revision: '1' },
      { url: '/js/idb.js', revision: '1' },
      { url: '/js/api.js', revision: '1' },
      { url: '/js/jquery.min.js', revision: '1' },
      { url: '/js/main.js', revision: '1' },
      { url: '/js/pertandingan_terakhir.js', revision: '1' },
      { url: '/js/pertandingan_mendatang.js', revision: '1' },
      { url: '/js/jadwal_pertandingan.js', revision: '1' },
      { url: '/js/detail_pertandingan.js', revision: '1' },
      { url: '/js/dbfunction.js', revision: '1' },
      { url: '/js/dbfootball.js', revision: '1' },
      { url: '/detail_pertandingan.html', revision: '1' },
      { url: '/manifest.json', revision: '1' },
  ],
      {
        // ignore all URL parameters.
         ignoreURLParametersMatching: [/.*/],
      }
  );

  const {registerRoute} = workbox.routing;
  const {StaleWhileRevalidate, NetworkFirst, CacheFirst} = workbox.strategies;

  //register all logo in logos folder with cachefirst strategies
  workbox.routing.registerRoute(
    new RegExp('/images/'),
  new CacheFirst({
      cacheName: 'supersoccer-img',
    })
  );

    //register all file in pages folder using staleWhileRevalidate strategies
    workbox.routing.registerRoute(
      new RegExp('/pages/'),
    new StaleWhileRevalidate({
        cacheName: "pages"
      })
    )

    //register api using staleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
  new StaleWhileRevalidate({
    cacheName: 'football-data.org',
  })
  )


//Response Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
