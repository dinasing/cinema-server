var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function(req, res, next) {
  res.status(200);
});

module.exports = router;
