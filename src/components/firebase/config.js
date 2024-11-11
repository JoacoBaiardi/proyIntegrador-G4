import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8ll68y0SlF0el3LH46I-uUZd_vbEvXHc",
    authDomain: "proyintegrador-g4.firebaseapp.com",
    projectId: "proyintegrador-g4",
    storageBucket: "proyintegrador-g4.firebasestorage.app",
    messagingSenderId: "743841116474",
    appId: "1:743841116474:web:ba8b978164e86b3880e003"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
