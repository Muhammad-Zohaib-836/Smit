// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";  // custom ye code khud kia ha
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8s3xl3VMbHE7pE_ouoL8dq2kMTFoen0c",
  authDomain: "smit-3.firebaseapp.com",
  projectId: "smit-3",
  storageBucket: "smit-3.firebasestorage.app",
  messagingSenderId: "773648291243",
  appId: "1:773648291243:web:5a93a834c2838677142eee",
  measurementId: "G-WE6P544WTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// custom ye code khud kia ha
const auth = getAuth(app)
export {auth , analytics}