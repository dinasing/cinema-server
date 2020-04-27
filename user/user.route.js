const express = require("express");
const router = express.Router();

/* GET user profile */
router.get("/profile", (req, res, next) => {
  res.send(user);
});

module.exports = router;
