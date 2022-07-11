import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAqfWBU5c1QYWpLjLbucO7WBMJVS8n_Bu4",
    authDomain: "birthday-salutation.firebaseapp.com",
    projectId: "birthday-salutation",
    storageBucket: "birthday-salutation.appspot.com",
    messagingSenderId: "1060683996268",
    appId: "1:1060683996268:web:c1d7c96b3d725e78f28c49"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }