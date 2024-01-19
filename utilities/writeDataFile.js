const path = require("path");
const fs = require("fs");
const rootDir = require("./getRootDir");

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

module.exports = writeDataFile;
