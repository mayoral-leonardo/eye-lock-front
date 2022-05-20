import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfERv7uYBO5nCS_zNy9NdJy4vdcIBW6Ss",
  authDomain: "eye-lock-database.firebaseapp.com",
  projectId: "eye-lock-database",
  storageBucket: "eye-lock-database.appspot.com",
  messagingSenderId: "176501973151",
  appId: "1:176501973151:web:a2cce711d2e7892aeb42aa"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;