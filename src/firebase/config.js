import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { initializeFirestore, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAxxbwLJm63XOq-yzXbYmyCSdCl9yjCH8c",
  authDomain: "my-health-1408c.firebaseapp.com",
  projectId: "my-health-1408c",
  storageBucket: "my-health-1408c.appspot.com",
  messagingSenderId: "488168037567",
  appId: "1:488168037567:web:b880efd1af112f5541fa0a"
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app)

const db = initializeFirestore(app, {experimentalForceLongPolling: true})

const db_get = getFirestore(app)

const storage = getStorage(app)

export {app, auth_mod, db, db_get, storage}