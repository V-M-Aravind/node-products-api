const express = require("express");
const fs = require("fs");
const rootDir = require("../utilities/getRootDir");
const path = require("path");

const router = express.Router();
router.use((req, res) => {
  return res.render("404Page");
});
module.exports = router;
