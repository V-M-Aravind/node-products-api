const express = require("express");

const router = express.Router();
router.use((req, res) => {
  return res.render("404Page");
});
module.exports = router;
