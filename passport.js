import passport from "passport";
import passportJWT from "passport-jwt";
import bcrypt from "bcryptjs";
import config from "config";
import { db } from "./models/index";
const User = db.user;

const ExtractJWT = passportJWT.ExtractJwt;

import { Strategy as LocalStrategy } from "passport-local";

const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      return User.findOne({
        where: { email },
      })
        .then((user) => {
          return JSON.parse(JSON.stringify(user));
        })
        .then((user) => {
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return cb(null, false, {
              message: "Incorrect email or password.",
            });
          } else {
            delete user.password;
            return cb(null, user, {
              message: "Logged In Successfully",
            });
          }
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("jwtSecret"),
    },
    function (jwtPayload, cb) {
      return User.findByPk(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
