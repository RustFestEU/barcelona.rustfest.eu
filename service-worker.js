const CACHE = 'network-or-cache-V9';
const NETWORK_TIMEOUT_MS = 500;

self.addEventListener('message', function(event){
    const url = event.data;
    console.log("SW Received Message: " + url);
    const req = new Request(url);
    event.waitUntil(fromNetwork(req));
});

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
        ]).catch(function (error) {
            console.error(["SW: precache failed", error, error.toString()]);
            return Promise.resolve();
        });
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
            return matching || Promise.reject({ error: 'no-match', request: request });
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

const URL_TAG = '==========';
const BACK_IMAGE = '<svg height="64" viewBox="0 0 16.933333 16.933333" width="64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-linecap="square" stroke-linejoin="round" stroke-width="2.645833"><path d="m14.952047 8.4666664h-10.5956874"/><path d="m6.6388391 13.51806-5.0513939-5.0513937 5.0513939-5.0513936"/></g></svg>';
const RELOAD_IMAGE = '<svg height="64" viewBox="0 0 16.933333 16.933333" width="64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-linecap="square" stroke-linejoin="round" stroke-width="2.645833"><path d="m12.499935 14.041195a6.8791666 6.8791666 0 0 1 -7.948927.083943 6.8791666 6.8791666 0 0 1 -2.7208156-7.4692468 6.8791666 6.8791666 0 0 1 6.1405256-5.0484086 6.8791666 6.8791666 0 0 1 6.802141 4.1138012"/><path d="m15.610416 1.3229166v5.2916666h-5.291666"/></g></svg>';
const FALLBACK_IMAGE =
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">' +
    '  <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>' +
    '  <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>' +
    '  <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>' +
    '  <circle cy="138" r="9" cx="100" fill="#aaa"/>' +
    '</svg>';
const FALLBACK_HTML =
    '<!DOCTYPE html> <html lang="en">' +
    '<head> <meta charset="utf-8" /> <meta name="viewport" content="width=device-width"/>' +
    '<link rel="stylesheet" type="text/css" href="/theme/css/basic.css" />' +
    '</head> <body> <section>' +
    '<div>' + URL_TAG + '</div>' +
    FALLBACK_IMAGE +
    '<h1>You are Offline</h1>' +
    '<h2>' +
    '  <button onclick="history.back()">' + BACK_IMAGE + ' Go back</button>' +
    '  <button onclick="location.reload(true)">' + RELOAD_IMAGE + ' Try again</button>' +
    '</h2>' +
    '</section> </body> </html>';

function useFallback(event) {
    console.log(['useFallback', event]);
    let res = {
        content: FALLBACK_HTML,
        type: 'text/html',
    };
    try {
        const url_parts = event.request.url.split('.');
        const last = url_parts[url_parts.length - 1].toLowerCase();

        if (['svg', 'png', 'jpg', 'jpeg'].indexOf(last) !== -1) {
            res = {
                content: FALLBACK_IMAGE,
                type: 'image/svg+xml',
            };
        } else {
            res.content = res.content.replace(URL_TAG, event.request.url);
        }
    } finally { }
    return Promise.resolve(new Response(res.content, {
        headers: {
            'Content-Type': res.type
        }
    }));
}
