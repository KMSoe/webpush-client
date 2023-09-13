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
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});