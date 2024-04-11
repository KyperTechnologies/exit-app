const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const app = express();
const XLSX = require("xlsx");
const PORT = process.env.PORT || 4000;

const workSheetName = "veresiye-yedek";

const getCredits = async () => {
  try {
    const response = await fetch("http://localhost:4000/getCredits");
    if (!response.ok) {
      console.log("Failed to fetch credits");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const exportUsersToExcel = async () => {
  const date = new Date();
  const filePathToSave = `./veresiye-yedek-${date.toLocaleDateString(
    "tr-TR"
  )}.xlsx`;
  const data = await getCredits();
  const mappedData = await data.map((item) => {
    const obj = {
      İsim: item.ownerName,
      Tutar: -Number(item.totalPrice),
    };
    return obj;
  });
  const workBook = XLSX.utils.book_new();

  const workSheet = XLSX.utils.json_to_sheet(mappedData);
  XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  XLSX.writeFile(workBook, path.resolve(filePathToSave));
  return true;
};

app.use(express.json());

app.use(cors());

cron.schedule("0 0 * * *", () => {
  exportUsersToExcel();
});

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
  }
  fs.writeFile(tableFilePath, JSON.stringify(dataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Table added to file succesfully");
    }
  });
};

const removeTable = (id) => {
  const existingData = fs.readFileSync(tableFilePath, "utf8");
  dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((table) => table.id !== id);

  if (dataToSave.length === 0) {
    fs.unlink(tableFilePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Table removed and file deleted successfully");
      }
    });
  } else {
    fs.writeFile(tableFilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Table removed and data updated in file successfully");
      }
    });
  }
};

const removeFood = (id) => {
  const datafilePath = path.join(dataFolderPath, `foodData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((food) => food.id !== id);

  if (dataToSave.length === 0) {
    fs.unlink(datafilePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Food removed and file deleted successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Food removed and data updated in file successfully");
      }
    });
  }
};
const removeDrink = (id) => {
  const datafilePath = path.join(dataFolderPath, `drinkData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((drink) => drink.id !== id);

  if (dataToSave.length === 0) {
    fs.unlink(datafilePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Table removed and file deleted successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Drink removed and data updated in file successfully");
      }
    });
  }
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

const removeOrder = (tableId, orderId) => {
  let existingOrderList;
  const orderfilePath = path.join(dataFolderPath, `orderData.json`);
  const existingData = fs.readFileSync(orderfilePath, "utf8");
  existingOrderList = JSON.parse(existingData);
  const selectedOrderWithTableId = existingOrderList.filter(
    (existingOrder) => existingOrder.id === tableId
  );
  const selectedOrderWithOrderId =
    selectedOrderWithTableId[0].orderOfTable.filter(
      (existingProduct) => existingProduct.id === orderId
    );
  const orderOfTable = selectedOrderWithTableId[0].orderOfTable.filter(
    (order) => order.id !== selectedOrderWithOrderId[0].id
  );
  const id = selectedOrderWithTableId[0].id;
  const orderToSave = { id, orderOfTable };
  existingOrderList = existingOrderList.filter(
    (orderToRemove) => orderToRemove.id !== selectedOrderWithTableId[0].id
  );
  existingOrderList.push(orderToSave);
  dataToSave = existingOrderList;
  if (dataToSave.length === 0) {
    fs.unlink(orderfilePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Order removed and file deleted successfully");
      }
    });
  } else {
    fs.writeFile(orderfilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Order removed and data updated in file successfully");
      }
    });
  }
};

const addCredit = (newCredit) => {
  let fileName;
  let existingCreditList;
  fileName = "creditData";
  const creditfilePath = path.join(dataFolderPath, `${fileName}.json`);
  if (fs.existsSync(creditfilePath)) {
    const existingData = fs.readFileSync(creditfilePath, "utf8");
    existingCreditList = JSON.parse(existingData);
    const selectedCreditWithId = existingCreditList.filter(
      (existingCredit) => existingCredit.ownerName === newCredit.ownerName
    );
    if (selectedCreditWithId.length > 0) {
      selectedCreditWithId[0].totalPrice += newCredit.totalPrice;
      existingCreditList = existingCreditList.filter(
        (creditToRemove) => creditToRemove.ownerName !== newCredit.ownerName
      );
      existingCreditList.push(selectedCreditWithId[0]);
      dataToSave = existingCreditList;
    } else {
      const creditToSave = newCredit;
      existingCreditList.push(creditToSave);
      dataToSave = existingCreditList;
    }

    fs.writeFile(creditfilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Credit written to file successfully");
      }
    });
  } else {
    const orderToSave = newCredit;
    fs.writeFile(creditfilePath, JSON.stringify([orderToSave]), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Order written to file successfully");
      }
    });
  }
};

const removeCredit = (ownerName) => {
  const datafilePath = path.join(dataFolderPath, `creditData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((credit) => credit.ownerName !== ownerName);

  if (dataToSave.length === 0) {
    fs.unlink(datafilePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("Food removed and file deleted successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Food removed and data updated in file successfully");
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
      if (err.code === "ENOENT") {
        res.json([]);
      } else {
        console.error("Error reading file...", err);
        res.status(500).send("Internal Server Error");
      }
      return;
    } else {
      try {
        const tableDataFromDb = JSON.parse(data);
        res.json(tableDataFromDb);
      } catch (error) {
        console.error("Error parsing JSON...", error);
        res.status(500).send("Internal Server Error");
      }
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
      if (err.code === "ENOENT") {
        res.json([]);
      } else {
        console.error("Error reading file...", err);
        res.status(500).send("Internal Server Error");
      }
      return;
    } else {
      try {
        const dataFromDb = JSON.parse(data);
        res.json(dataFromDb);
      } catch (error) {
        console.error("Error parsing JSON...", error);
        res.status(500).send("Internal Server Error");
      }
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
      if (err.code === "ENOENT") {
        res.json([]);
      } else {
        console.error("Error reading file...", err);
        res.status(500).send("Internal Server Error");
      }
      return;
    } else {
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
    }
  });
});

app.post("/getCreditWithOwnerName", (req, res) => {
  const { ownerName } = req.body;
  const creditFilePath = path.join(dataFolderPath, `creditData.json`);
  fs.readFile(creditFilePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.json([]);
      } else {
        console.error("Error reading file...", err);
        res.status(500).send("Internal Server Error");
      }
      return;
    } else {
      try {
        const existingCreditList = JSON.parse(data);
        const selectedCreditWithOwnerId = existingCreditList.filter(
          (existingCredit) => existingCredit.ownerName === ownerName
        );
        if (selectedCreditWithOwnerId.length > 0) {
          res.json(selectedCreditWithOwnerId[0]);
        } else {
          res.json([]);
        }
      } catch (error) {
        console.error("Error parsing JSON...", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

app.post("/deleteOrderWithTableId", (req, res) => {
  const { tableId, orderId } = req.body;
  removeOrder(tableId, orderId);
  res.send("Drink removed successfully");
});

app.post("/addCredit", (req, res) => {
  const { newCredit } = req.body;
  addCredit(newCredit);
  res.send("Credit added successfully");
});

app.get("/getCredits", (req, res) => {
  const creditFilePath = path.join(dataFolderPath, `creditData.json`);
  fs.readFile(creditFilePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.json([]);
      } else {
        console.error("Error reading file...", err);
        res.status(500).send("Internal Server Error");
      }
      return;
    } else {
      try {
        const creditDataFromDb = JSON.parse(data);
        res.json(creditDataFromDb);
      } catch (error) {
        console.error("Error parsing JSON...", error);
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

app.delete("/deleteCredit/:ownerName", (req, res) => {
  const ownerNameToRemove = req.params.ownerName;
  removeCredit(ownerNameToRemove);
  res.send("Food removed successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
