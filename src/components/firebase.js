import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxWumWlq41CdjjUA_CXTYS7dlXN0NXrSE",
  authDomain: "itd112lab2.firebaseapp.com",
  projectId: "itd112lab2",
  storageBucket: "itd112lab2.appspot.com",
  messagingSenderId: "828771084935",
  appId: "1:828771084935:web:3e8c8de2641ec366c2e622",
  measurementId: "G-7DVHKPHJT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db };