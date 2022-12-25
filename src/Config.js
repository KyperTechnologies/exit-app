// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, query, equalTo, orderByChild } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "**********",
  authDomain: "**********",
  databaseURL: "**********",
  projectId: "**********",
  storageBucket: "**********",
  messagingSenderId: "**********",
  appId: "**********",
  measurementId: "**********"
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
        console.log("No Table");
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
        console.log("No Product");
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
        console.log("No TableId");
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

export const deleteAllOrder = async (tableId) => {
  const dbRef = ref(db, 'orders/');

  const q = query(dbRef, orderByChild('tableId'), equalTo(tableId));

  await remove(q)
}

export const deleteTable = async (tableId) => {
  await deleteAllOrder(tableId);

  await remove(ref(db, '/tables/' + tableId));
}

export const getCredit = async () => {
  const dbRef = ref(db);
  return await get(child(dbRef, `credits`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
          return value;
        });

        return data;
      } else {
        console.log("No Credit");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
};

export const addCredit = async (id, data) => {

  const credits = await getCreditWithOwnerName(data.ownerName);

  if (credits && credits.length > 0) {
    const newTotalPrice = credits[0].totalPrice + data.totalPrice;
    credits[0].totalPrice = newTotalPrice;
    await updateCredit(credits[0]);
  }
  else {
    await set(ref(db, 'credits/' + id), data);
  }
};

export const updateCredit = async (credit) => {
  const updates = {};
  updates['/credits/' + credit.ownerId] = credit;

  return await update(ref(db), updates);
}

export const getCreditWithOwnerName = async (ownerName) => {
  const dbRef = ref(db, 'credits');

  const q = query(dbRef, orderByChild('ownerName'), equalTo(ownerName));


  return await get(q)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
          return value;
        });

        return data;
      } else {
        console.log("No Credit OwnerName");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
}

export const deleteCredit = async (ownerName) => {
  await remove(ref(db, '/credits/' + ownerName));
}

export const getSplitOrder = async () => {
  const dbRef = ref(db);
  return await get(child(dbRef, `splitOrder`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.exportVal()).map(([key, value]) => {
          return value;
        });

        return data;
      } else {
        console.log("No SplitOrder");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
};

export const deleteSplitOrder = async () => {
  // eslint-disable-next-line
  await remove(ref(db, '/splitOrder/' + "split"));
}

export const addSplitOrder = async (id, data) => {

  const splits = await getSplitOrder();

  if (splits && splits.length > 0) {
    const newTotalPrice = splits[0].totalSplitPrice + data.totalSplitPrice;
    splits[0].totalSplitPrice = newTotalPrice;
    await updateSplitOrder(splits[0]);
  }
  else {
    await set(ref(db, 'splitOrder/' + id), data);
  }
};

export const updateSplitOrder = async (split) => {
  const updates = {};
  // eslint-disable-next-line
  updates['/splitOrder/' + "split"] = split;

  return await update(ref(db), updates);
}
