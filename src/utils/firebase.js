// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from 'axios';
import "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js";

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
                        callChannel(currentToken);
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



function callChannel(token) {
    let authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjVlMjlmYWRhN2Q1OThmYzc4ZDQ3ZDBjYWM0ZGQ0ZTQ0YzM4ZDM3MWQyZmYxNmEyNWUzNThlMGE0NWM5ZWM5ZmRiZjhkMTIwOThlYjk1YzUiLCJpYXQiOjE2OTQ3NjMwOTkuOTUxMzI5OTQ2NTE3OTQ0MzM1OTM3NSwibmJmIjoxNjk0NzYzMDk5Ljk1MTMzNTkwNjk4MjQyMTg3NSwiZXhwIjoxNjk1MTk1MDk5Ljk0MjYxMjg4NjQyODgzMzAwNzgxMjUsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.FEnntKmZSnIPqjM4X0nbsSb7sz3oHkdmIO7zUqBeKFDhNPnI--HR7yY1UpMJSXzMUQlYvilWK03CgnV0j9Zv2z4UPf-42YfsL5RUsthLgXhqZ0feOjmqJ8vgbCy8I6EC9PJh5X2kM8aruq52hV9GiJ_xEe9ibwO42rGqYZuNqV-q4kkt-aMoDjDd_HBF2yuQZyoJnt5qFQbahOGzvXnhOJwdZ-liZ_pvrPePrxza3WBSU8-ch979dNIIXfwDODfNdwrxTMMbd52jkxJxqwbCXRQ1Rl2EcoYeJGwMp3gmeqoH84qky4kW93VPunT5BeLle4B37mD2m1uKEiemUWBv0DDEjrZgLQMHw-6UOiRwzjOiS4Li9s-Iz9UPjXjuPX-z5uKZrJ9YG69EXSSu5YELsNRSBA7Ut5AlZZf9sWIsC30ZucbQ5m0MgL0O62uYWV9dF6OfgbhsQxLhz3Fu_O4YToPzzGClt-K73Ejhx8fdNy8v7wdsoKngBFqlki1ZbPSmxwftp2pPIWJYbU_yxQYlcLJqqlVE0DRi166yIQHbzd7jYAwuC1xqMzq0ebTkZb_fzdBFzV6ugzOh9GRFLgsvPSfcpYaW40vl5p9o-aWqaKrVQ9-TTgknyFyXFRxuId_MYx2zV6iagD1KulrJbfr5nbxcqVMZR0NWxuzHjRu6ojU";
    axios.post(`https://vorpapidev.visibleone.io/api/v1/fcm-token`, {
        token: token
    }, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }
    ).then((result) => {
        console.log("result ", result)
    });
}