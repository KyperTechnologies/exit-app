// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, query, equalTo, orderByChild } from 'firebase/database';
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

export const addTable = async (id, data) => {
  await set(ref(db, 'tables/' + id), data);
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

export const addProduct = async (id, name, price) => {
  await set(ref(db, 'products/' + id), name, price);
};

export const getProduct = async (type) => {
  const dbRef = ref(db, 'products/');
  let q = query(dbRef);

  if (type) {
    q = query(dbRef, orderByChild('type'), equalTo(type));
  }

  return await get(q)
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

export const updateProduct = async (product) => {

  const updates = {};
  updates['/products/' + product.id] = product;

  return await update(ref(db), updates);
}

export const deleteProduct = async (product) => {
  await remove(ref(db, '/products/' + product.id));
};


export const addOrder = async (id, data) => {

  const orders = await getOrderWithProductId(data.tableId, data.productId);

  if (orders && orders.length > 0) {
    const newValue = orders[0].value + data.value;
    orders[0].value = newValue;
    orders[0].totalPrice = newValue * data.unitPrice;
    await updateOrder(orders[0]);
  }
  else {
    await set(ref(db, 'orders/' + id), data);
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

  return await update(ref(db), updates);
}

export const deleteOrder = async (id) => {
  await remove(ref(db, '/orders/' + id));
}