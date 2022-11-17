// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, push, remove } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEAgkWz7-ZzSed38nugxE6bIh2sTfhBbc",
  authDomain: "exit-b6e71.firebaseapp.com",
  databaseURL: "https://exit-b6e71-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "exit-b6e71",
  storageBucket: "exit-b6e71.appspot.com",
  messagingSenderId: "837750412660",
  appId: "1:837750412660:web:2e003bce7ca921b0188821",
  measurementId: "G-9Z0MN8EJZB"

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
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
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

export const updateTable = async (table) => {

  const updates = {};
  updates['/tables/' + table.id] = table;

  return update(ref(db), updates);


}

export const addDrink = (id, name, price) => {
  set(ref(db, 'drinks/' + id), name, price);
};

export const getDrink = async () => {
  const dbRef = ref(db);
  return await get(child(dbRef, `drinks`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
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

export const updateDrink = async (drink) => {

  const updates = {};
  updates['/drinks/' + drink.id] = drink;

  return update(ref(db), updates);


}

export const deleteDrink = (drink) => {

  remove(ref(db, '/drinks/' + drink.id));
};
