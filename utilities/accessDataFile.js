const path = require("path");
const fs = require("fs");
const rootDir = require("./getRootDir");

function readDataFile() {
  try {
    const data = fs.readFileSync(
      path.join(rootDir, "data", "products.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

function writeDataFile(data) {
  try {
    fs.writeFileSync(
      path.join(rootDir, "data", "products.json"),
      JSON.stringify(data)
    );
  } catch (err) {
    throw err;
  }
}

module.exports = { readDataFile, writeDataFile };