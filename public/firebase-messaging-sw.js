importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

//the Firebase config object 
const firebaseConfig = {
    apiKey: "AIzaSyBEL-BVb6fBVzZJvWdeENXlyH3AZukGbwE",
    authDomain: "vorp-dev.firebaseapp.com",
    projectId: "vorp-dev",
    storageBucket: "vorp-dev.appspot.com",
    messagingSenderId: "771475577564",
    appId: "1:771475577564:web:a279194da7dc77acf8b219",
    measurementId: "G-WMV0EGY6N1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
    console.log(event);
    let url = "http://vorpdev.visibleone.io";
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});