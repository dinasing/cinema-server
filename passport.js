const passport    = require('passport');
const passportJWT = require("passport-jwt");
import { db } from './models/index'
const User = db.user;

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    function (login, password, cb) {
        return User.findOne({login, password})
          .then(user => JSON.parse(JSON.stringify(user)))
          .then(user => {
              if (!user) {
                  return cb(null, false, {message: 'Incorrect email or password.'});
              }

              return cb(null, user, {
                  message: 'Logged In Successfully'
              });
          })
          .catch(err => {
              return cb(err);
          });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'jwt_secret'
    },
    function (jwtPayload, cb) {
      console.log(jwtPayload.id);
      
        return User.findByPk(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));