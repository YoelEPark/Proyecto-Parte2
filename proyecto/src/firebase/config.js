// Import the functions you need from the SDKs you need
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsSd5dIFk4sAohcETaI2xtbcP27uUACb8",
  authDomain: "proyecto-integrador-d333e.firebaseapp.com",
  projectId: "proyecto-integrador-d333e",
  storageBucket: "proyecto-integrador-d333e.appspot.com",
  messagingSenderId: "803265452057",
  appId: "1:803265452057:web:95befe2dbf39cef1d83288"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth  = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();