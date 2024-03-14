// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH8a5mEcL5SQz9ZZ2lDPHRvaVueSPJDnc",
  authDomain: "seraphic-alloy-413210.firebaseapp.com",
  databaseURL: "https://seraphic-alloy-413210-default-rtdb.firebaseio.com",
  projectId: "seraphic-alloy-413210",
  storageBucket: "seraphic-alloy-413210.appspot.com",
  messagingSenderId: "502577434149",
  appId: "1:502577434149:web:090486c6c01e653f4bf9cc",
  measurementId: "G-LMT2MT3DQH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rdb= getDatabase(app);

// const auth = getAuth(app);
// export {db, auth}

// const db=firebase.firestore()
// const temp=db.collection("dc");

