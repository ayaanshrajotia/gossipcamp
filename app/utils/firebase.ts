// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCa-dwVgYWikhJ2LzjGqM5IB_ACOcS9f9w",
    authDomain: "college-khabar-dff9c.firebaseapp.com",
    projectId: "college-khabar-dff9c",
    storageBucket: "college-khabar-dff9c.appspot.com",
    messagingSenderId: "872905059762",
    appId: "1:872905059762:web:242b68bcd454a32eb548ab",
    measurementId: "G-ENXWPC6R53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
