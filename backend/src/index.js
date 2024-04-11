const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

const dataFolderPath = path.join(__dirname, "..", "data");
const tableFilePath = path.join(dataFolderPath, "tableData.json");
let dataToSave = [];

const addTable = (tableInfo) => {
  if (fs.existsSync(tableFilePath)) {
    const existingData = fs.readFileSync(tableFilePath, "utf8");
    dataToSave = JSON.parse(existingData);
    const hasSameId = dataToSave.some((table) => table.id === tableInfo.id);
    if (hasSameId) {
      dataToSave = dataToSave.filter((table) => table.id !== tableInfo.id);
    }
    dataToSave.push(tableInfo);
  } else {
    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath);
    }
    dataToSave.push(tableInfo);

    fs.writeFile(tableFilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Table added to file succesfully");
      }
    });
  }
};

const removeTable = (id) => {
  const existingData = fs.readFileSync(tableFilePath, "utf8");
  dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((table) => table.id !== id);

  fs.writeFile(tableFilePath, JSON.stringify(dataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Table removed and data updated in file successfully");
    }
  });
};

const removeFood = (id) => {
  const datafilePath = path.join(dataFolderPath, `foodData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((food) => food.id !== id);

  fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Food removed and data updated in file successfully");
    }
  });
};
const removeDrink = (id) => {
  const datafilePath = path.join(dataFolderPath, `drinkData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((drink) => drink.id !== id);

  fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Drink removed and data updated in file successfully");
    }
  });
};

const addProductData = (infoToSave, fileName) => {
  const datafilePath = path.join(dataFolderPath, `${fileName}.json`);

  if (fs.existsSync(datafilePath)) {
    const existingData = fs.readFileSync(datafilePath, "utf8");
    let dataToSave = JSON.parse(existingData);
    dataToSave.push(infoToSave);

    fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Product data written to file successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify([infoToSave]), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Product data written to file successfully");
      }
    });
  }
};

const updateProductData = (infoToSave, fileName) => {
  const datafilePath = path.join(dataFolderPath, `${fileName}.json`);

  if (fs.existsSync(datafilePath)) {
    const existingData = fs.readFileSync(datafilePath, "utf8");
    let dataToSave = JSON.parse(existingData);
    dataToSave = dataToSave.filter((product) => product.id !== infoToSave.id);
    dataToSave.push(infoToSave);

    fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Product data updated successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify([infoToSave]), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Product data updated successfully");
      }
    });
  }
};

const addOrderData = (order) => {
  let fileName;
  let existingOrderList;
  fileName = "orderData";
  const orderfilePath = path.join(dataFolderPath, `${fileName}.json`);
  if (fs.existsSync(orderfilePath)) {
    const existingData = fs.readFileSync(orderfilePath, "utf8");
    existingOrderList = JSON.parse(existingData);
    const newOrder = order;
    const selectedOrderWithTableId = existingOrderList.filter(
      (existingOrder) => existingOrder.id === newOrder.order.tableId
    );
    if (selectedOrderWithTableId.length > 0) {
      const selectedOrderWithProductId =
        selectedOrderWithTableId[0].orderOfTable.filter(
          (existingProduct) =>
            existingProduct.productId === newOrder.order.productId
        );
      if (selectedOrderWithProductId.length > 0) {
        selectedOrderWithProductId[0].value += newOrder.order.value;
        selectedOrderWithProductId[0].totalPrice += newOrder.order.totalPrice;
        existingOrderList = existingOrderList.filter(
          (orderToRemove) => orderToRemove.id !== newOrder.order.tableId
        );
        existingOrderList.push(selectedOrderWithTableId[0]);
        dataToSave = existingOrderList;
      } else {
        const data = order;
        const id = data.order.tableId;
        const orderInfo = data.order;
        existingOrderList = existingOrderList.filter(
          (orderToRemove) => orderToRemove.id !== newOrder.order.tableId
        );
        let orderOfTable = selectedOrderWithTableId[0].orderOfTable;
        orderOfTable.push(orderInfo);
        const orderToSave = { id, orderOfTable };
        existingOrderList.push(orderToSave);
        dataToSave = existingOrderList;
      }
    } else {
      const data = order;
      const id = data.order.tableId;
      const orderInfo = data.order;
      let orderOfTable = [];
      orderOfTable.push(orderInfo);
      const orderToSave = { id, orderOfTable };
      existingOrderList.push(orderToSave);
      dataToSave = existingOrderList;
    }

    fs.writeFile(orderfilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Order written to file successfully");
      }
    });
  } else {
    const data = order;
    const id = data.order.tableId;
    const orderInfo = data.order;
    let orderOfTable = [];
    orderOfTable.push(orderInfo);
    const orderToSave = { id, orderOfTable };
    fs.writeFile(orderfilePath, JSON.stringify([orderToSave]), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Order written to file successfully");
      }
    });
  }
};

app.post("/addTable", (req, res) => {
  const { id, name } = req.body;
  addTable({ id, name });
  res.send("Table added successfully");
});

app.get("/getTables", (req, res) => {
  fs.readFile(tableFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file...", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const tableDataFromDb = JSON.parse(data);
      res.json(tableDataFromDb);
    } catch (error) {
      console.error("Error parsing JSON...", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.delete("/removeTable/:id", (req, res) => {
  const idToRemove = req.params.id;
  removeTable(idToRemove);
  res.send("Table removed successfully");
});

app.post("/addProduct", (req, res) => {
  const { id, name, price, type, fileName } = req.body;
  addProductData({ id, name, price, type }, fileName);
  res.send("Product added successfully");
});

app.post("/getProducts", (req, res) => {
  const { type } = req.body;
  const productFilePath = path.join(dataFolderPath, `${type}Data.json`);
  fs.readFile(productFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file...", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const dataFromDb = JSON.parse(data);
      res.json(dataFromDb);
    } catch (error) {
      console.error("Error parsing JSON...", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.delete("/deleteDrink/:id", (req, res) => {
  const idToRemove = req.params.id;
  removeDrink(idToRemove);
  res.send("Drink removed successfully");
});

app.delete("/deleteFood/:id", (req, res) => {
  const idToRemove = req.params.id;
  removeFood(idToRemove);
  res.send("Food removed successfully");
});

app.post("/updateProduct", (req, res) => {
  const { id, name, price, type, fileName } = req.body;
  updateProductData({ id, name, price, type }, fileName);
  res.send("Product updated successfully");
});

app.post("/addOrder", (req, res) => {
  const { order } = req.body;
  addOrderData(order);
  res.send("Order added successfully");
});

app.post("/getOrdersWithTableId", (req, res) => {
  const { tableId } = req.body;
  const orderFilePath = path.join(dataFolderPath, `orderData.json`);
  fs.readFile(orderFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file...", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const existingOrderList = JSON.parse(data);
      const selectedOrderWithTableId = existingOrderList.filter(
        (existingOrder) => existingOrder.id === tableId
      );
      if (selectedOrderWithTableId.length > 0) {
        res.json(selectedOrderWithTableId[0].orderOfTable);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error parsing JSON...", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
