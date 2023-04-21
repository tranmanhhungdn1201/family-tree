import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, update, remove } from "firebase/database"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdw2Qg2HjSYImRjEUcbwaTtn_FU6lQ-jk",
    authDomain: "family-tree-e7563.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    projectId: "family-tree-e7563",
    storageBucket: "family-tree-e7563.appspot.com",
    messagingSenderId: "824725887880",
    appId: "1:824725887880:web:a4ab31d65da7545b8cb83d",
    measurementId: "G-NE2V49TCEB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get a list of cities from your database
export async function getData(resource) {
    const dbRef = ref(db);
    return get(child(dbRef, `${resource}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return []
        }
    }).catch((error) => {
        console.error(error);
        return []
    });
}

export async function updateData(resource, data) {
    const updates = {};
    updates[`${resource}`] = data;
    update(ref(db), updates);
}

export async function removeData(resource) {
    remove(ref(db, `${resource}`)).then(() => {
        console.log('removed')
    }).catch(() => {
        console.error('err')
    });
}