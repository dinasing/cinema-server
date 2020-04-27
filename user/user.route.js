const express = require("express");
const router = express.Router();

/* GET user profile */
router.get("/profile", (req, res, next) => {
  console.log(req.user);

  res.send(req.user);
});

module.exports = router;
