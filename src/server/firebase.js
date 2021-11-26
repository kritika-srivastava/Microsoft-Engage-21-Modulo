import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBQcSjhRX900fOAI0of9MCNAOKVVQkk4mM",
  authDomain: "modulo-dd1f4.firebaseapp.com",
  databaseURL: "https://modulo-dd1f4-default-rtdb.firebaseio.com",
  projectId: "modulo-dd1f4",
  storageBucket: "modulo-dd1f4.appspot.com",
  messagingSenderId: "299719871334",
  appId: "1:299719871334:web:6d80c6c6774d30c6c8d6a7",
  measurementId: "G-BL1GG8DTKH",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
