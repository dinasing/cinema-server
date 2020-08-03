const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
import config from "config";
import { create } from "../user/user.controller.js";
require("../passport");

router.post("/login", function (request, response, next) {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      return response.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    request.login(user, { session: false }, (error) => {
      if (error) {
        response.send(error);
      }

      const token = jwt.sign(user, config.get("jwtSecret"));

      return response.json({ user, token });
    });
  })(request, response);
});

router.post("/signup", create);

module.exports = router;
