// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfd7_HcTl2oFfOaUpPgc7OWgEI1R0gqVE",
  authDomain: "ekart-00.firebaseapp.com",
  databaseURL:"https://ekart-00-default-rtdb.firebaseio.com/",
  projectId: "ekart-00",
  storageBucket: "ekart-00.appspot.com",
  messagingSenderId: "1059310201702",
  appId: "1:1059310201702:web:38e52678907183a32db6a7",
  measurementId: "G-E3DXW3TPDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export default app