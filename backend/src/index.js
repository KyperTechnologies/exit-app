const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

const dataFolderPath = path.join(__dirname, "..", "data");
const filePath = path.join(dataFolderPath, "tableData.json");
let tableDataToSave = [];

const addTable = (tableInfo) => {
  tableDataToSave.push(tableInfo);

  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
  }

  fs.writeFile(filePath, JSON.stringify(tableDataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Table added and data written to file successfully");
    }
  });
};

const removeTable = (id) => {
  tableDataToSave = tableDataToSave.filter((table) => table.id !== id);

  fs.writeFile(filePath, JSON.stringify(tableDataToSave), (err) => {
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
      console.log("Table removed and data updated in file successfully");
    }
  });
};
const removeDrink = (id) => {
  const datafilePath = path.join(dataFolderPath, `drinkData.json`);
  const existingData = fs.readFileSync(datafilePath, "utf8");
  let dataToSave = JSON.parse(existingData);
  dataToSave = dataToSave.filter((table) => table.id !== id);

  fs.writeFile(datafilePath, JSON.stringify(dataToSave), (err) => {
    if (err) {
      console.error("Error...", err);
    } else {
      console.log("Table removed and data updated in file successfully");
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
        console.log("Data written to file successfully");
      }
    });
  } else {
    fs.writeFile(datafilePath, JSON.stringify([infoToSave]), (err) => {
      if (err) {
        console.error("Error...", err);
      } else {
        console.log("Data written to file successfully");
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
  fs.readFile(filePath, "utf8", (err, data) => {
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
  res.send("Drink added successfully");
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
  res.send("Table removed successfully");
});

app.delete("/deleteFood/:id", (req, res) => {
  const idToRemove = req.params.id;
  removeFood(idToRemove);
  res.send("Table removed successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
