

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('okamiicv').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/assets/css/now-ui-kit.css',
                '/assets/css/bootstrap.min.css',
                '/assets/img/bg1.jpg',
                '/assets/img/bg2.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.title || "Something Has Happened";
    var message = data.message || "Here's something you might want to check out.";
    //var icon = "images/new-notification.png";

    var notification = new self.Notification(title, {
        body: message,
        tag: 'simple-push-demo-notification',
        icon: icon
    });

    notification.addEventListener('click', function() {
        if (clients.openWindow) {
            clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
        }
    });
});

