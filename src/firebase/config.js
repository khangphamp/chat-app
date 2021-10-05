import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAn7rWiV5z2JH-v4HA5fJkOGI-SVNPpWzc",
    authDomain: "chap-app-b1866.firebaseapp.com",
    projectId: "chap-app-b1866",
    storageBucket: "chap-app-b1866.appspot.com",
    messagingSenderId: "571131804673",
    appId: "1:571131804673:web:55e8c31d133d5b1890d400",
    measurementId: "G-TW1Y1PLVL4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if( window.location.hostname === 'localhost' ){
//     db.useEmulator('localhost','8080');
// }

export { db, auth };
export default firebase;