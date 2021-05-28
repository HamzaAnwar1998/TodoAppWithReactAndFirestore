import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCuYQBgQfFari359VVfxA9jbXclPNAhel8",
    authDomain: "todoappwithreactandfirebase.firebaseapp.com",
    projectId: "todoappwithreactandfirebase",
    storageBucket: "todoappwithreactandfirebase.appspot.com",
    messagingSenderId: "167166982530",
    appId: "1:167166982530:web:fcc25dda0d91b586f1b79b",
    measurementId: "G-JG8TVXR2L4"
  };

  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db} 