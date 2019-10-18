if ("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js", {
            scope: '/',
        })
        .then(registration => {
            if (registration.waiting) {
                registration.waiting
                    .postMessage(location.pathname);
            }
        });
    })
}