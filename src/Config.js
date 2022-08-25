// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, child } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5N2CZdRTOTAN7ljykmnSXOkdQ8u8b_tA",
  authDomain: "exit-app-467ee.firebaseapp.com",
  databaseURL: "https://exit-app-467ee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "exit-app-467ee",
  storageBucket: "exit-app-467ee.appspot.com",
  messagingSenderId: "283117816450",
  appId: "1:283117816450:web:932de74ba84faf99e8429b",
  measurementId: "G-S776M7DHKV"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();
  
export const addTable = (id, data) => {
  set(ref(db, 'tables/' + id), data);
};

export const getTable = async () => {
  const dbRef = ref(db);
  return await get(child(dbRef, `tables`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value])=> {
          return value;
        });

        return data;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
};