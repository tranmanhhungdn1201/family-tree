import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdw2Qg2HjSYImRjEUcbwaTtn_FU6lQ-jk",
    authDomain: "family-tree-e7563.firebaseapp.com",
    databaseURL: "https://family-tree-e7563-default-rtdb.asia-southeast1.firebasedatabase.app",
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
export async function getData(db) {
    console.log('getData', db)
}