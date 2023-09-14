// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEL-BVb6fBVzZJvWdeENXlyH3AZukGbwE",
    authDomain: "vorp-dev.firebaseapp.com",
    projectId: "vorp-dev",
    storageBucket: "vorp-dev.appspot.com",
    messagingSenderId: "771475577564",
    appId: "1:771475577564:web:a279194da7dc77acf8b219",
    measurementId: "G-WMV0EGY6N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const requestPermission = () => {

    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {

        if (permission === "granted") {

            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: `BMvhCYSd59XSw4AE1PpkSDVHUPacvZW_felQ3o4bEDB4oHX-1lk0hhAP45bKkNo7XuzWp9gFh-BDyKsCsGO817U` })
                .then((currentToken) => {

                    if (currentToken) {

                        console.log('Client Token: ', currentToken);

                        //    messaging.getInstance().subscribeToTopic("news");
                    } else {

                        console.log('Failed to generate the app registration token.');
                    }
                })
                .catch((err) => {

                    console.log('An error occurred when requesting to receive the token.', err);
                });
        } else {

            console.log("User Permission Denied.");
        }
    });

}

requestPermission();

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

function subscribeToTopic() {
    // test()
    //     .subscribeToTopic('vo-channel')
    //     .then(() => console.log('Subscribed to topic!'));
}