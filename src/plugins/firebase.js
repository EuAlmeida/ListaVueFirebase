import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
        apiKey: "AIzaSyBm-JkTbegEvVyZHLLRGBotDHyXB-7QOAo",
        authDomain: "lista-vue-97b6e.firebaseapp.com",
        projectId: "lista-vue-97b6e",
        storageBucket: "lista-vue-97b6e.appspot.com",
        messagingSenderId: "42712173523",
        appId: "1:42712173523:web:f120573dcf2c8d3d773d26"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export {
    db, auth, profileCollection, tasksCollection, googleProvider

}