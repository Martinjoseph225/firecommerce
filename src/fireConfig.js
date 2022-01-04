// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcVf4yfgmutcx4rAOG8ho1qjtMMQ4wuRI",
  authDomain: "firecommerce-7ff38.firebaseapp.com",
  projectId: "firecommerce-7ff38",
  storageBucket: "firecommerce-7ff38.appspot.com",
  messagingSenderId: "488747661229",
  appId: "1:488747661229:web:c92ee1f6ffea05ef68d324",
  measurementId: "G-BC9P3JQ12X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
export default fireDB;
