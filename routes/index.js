var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (request, response, next) {
  response.status(200);
});

module.exports = router;
