const express = require("express");

const router = express.Router();
router.use((req, res) => {
  return res
    .status(404)
    .json({ message: "Page Not Found", statusText: "PAGE_NOT_FOUND" });
});
module.exports = router;
