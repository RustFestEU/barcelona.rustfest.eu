const CACHE = 'network-or-cache-V8';
const NETWORK_TIMEOUT_MS = 500;

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    caches.delete(CACHE);
    cleanupOldCaches(evt);
    evt.waitUntil(precache());
});

self.addEventListener('activate', function(event) {
    cleanupOldCaches(event);
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromNetwork(evt.request).catch(function () {
        return fromCache(evt.request).catch(useFallback);
    }));
});

self.addEventListener('message', function(event){
    const url = event.data;
    console.log("SW Received Message: " + url);
    const req = new Request(url);
    event.waitUntil(fromNetwork(req));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            '/',
            '/schedule/',
            '/workshops/',
            '/about_impl_days/',
            '/location/',
            '/pre_post_conf_events/',
            '/info/',
            '/about/',
            '/sponsors/',
            '/code-of-conduct/',
            '/accessibility/',
            '/imprint/',
        ]);
    });
}

function fromNetwork(request) {
    return new Promise(function (fulfill, reject) {
        const timeoutId = setTimeout(reject, NETWORK_TIMEOUT_MS);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            caches.open(CACHE).then(function (cache) {
                cache.put(request, response.clone());
                fulfill(response);
            });
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function cleanupOldCaches(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE) {
                    console.log('SW: activate cleanup', key);
                    return caches.delete(key);
                }
            }));
        })
    );
}

const FALLBACK =
    '<!DOCTYPE html> <html lang="en">' +
    '<head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width"/>' +
    '<link rel="stylesheet" type="text/css" href="/theme/css/basic.css" />' +
    '</head> <body>' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">' +
    '  <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>' +
    '  <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>' +
    '  <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>' +
    '  <circle cy="138" r="9" cx="100" fill="#aaa"/>' +
    '</svg>' +
    '<h1>You are Offline</h1>' +
    '</body> </html>';

function useFallback() {
    return Promise.resolve(new Response(FALLBACK, {
        headers: {
            'Content-Type': 'text/html'
        }
    }));
}
