const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
import config from "config";
import { create } from "../user/user.controller.js";
require("../passport");

router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        msg: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, config.get("jwtSecret"));

      return res.json({ user, token });
    });
  })(req, res);
});

router.post("/signup", create);

module.exports = router;
