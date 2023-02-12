// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8voqJODuXDn0ZtoXOBdSIWsHVF5pLD4Q",
    authDomain: "devcamp-shop-24h-19469.firebaseapp.com",
    projectId: "devcamp-shop-24h-19469",
    storageBucket: "devcamp-shop-24h-19469.appspot.com",
    messagingSenderId: "264312014997",
    appId: "1:264312014997:web:52e861680ce5713893339c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default storage;
