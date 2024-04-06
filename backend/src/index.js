const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

const dataFolderPath = path.join(__dirname, "..", "data");
const filePath = path.join(dataFolderPath, "tableData.json");
let tableDataToSave = [];

const addTable = (id, tableInfo) => {
  console.log("data", tableDataToSave);
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

app.post("/addTable", (req, res) => {
  const { id, name } = req.body;
  addTable(id, { id, name });
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
