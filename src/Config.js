// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, query, equalTo, orderByChild } from 'firebase/database';
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
        console.log("No data available1");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
};

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
        console.log("No data available2");
        return [];
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


export const addOrder = async (id, data) => {

  const orders = await getOrderWithProductId(data.tableId, data.productId);

  if (orders && orders.length > 0) {
    const newValue = orders[0].value + data.value;
    orders[0].value = newValue;
    orders[0].totalPrice = newValue * data.unitPrice;
    updateOrder(orders[0]);
  }
  else {
    set(ref(db, 'orders/' + id), data);
  }
};

export const getOrderWithTableId = async (tableId) => {
  const dbRef = ref(db, 'orders/');

  const q = query(dbRef, orderByChild('tableId'), equalTo(tableId));

  return await get(q)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
          return value;
        });

        return data;
      } else {
        console.log("No data available3");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
}

export const getOrderWithProductId = async (tableId, productId) => {
  return await getOrderWithTableId(tableId).then(res => res.filter(ele => ele.productId === productId));
}

export const updateOrder = async (order) => {
  const updates = {};
  updates['/orders/' + order.id] = order;

  return update(ref(db), updates);
}
