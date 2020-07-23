import { db } from "../models/index.js";
const User = db.user;
import bcrypt from "bcryptjs";

require("../passport");
// Create and Save a new User
export function create(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    res.status(400).send({
      msg: "Please enter all fields!",
    });
    return;
  }

  bcrypt.hash(password, 3, function (err, hash) {
    const user = {
      firstName,
      lastName,
      email,
      password: hash,
      roleId: req.body.roleId,
    };
    User.create(user)
      .then((record) => {
        res.send(record);
      })
      .catch(next);
  });
}

// Retrieve all Users from the database.
exports.findAll = (req, res, next) => {};

exports.update = (req, res, next) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      const message =
        num == 1
          ? "User was updated successfully!"
          : `Cannot update User with id = ${id}. Maybe User was not found!`;
      res.send({
        message,
      });
    })
    .catch(next);
};

// Delete a User with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      const message =
        num == 1
          ? "User was deleted successfully!"
          : `Cannot deleted User with id = ${id}. Maybe User was not found!`;
      res.send({
        message,
      });
    })
    .catch(next);
};

// Delete all Users from the database.
exports.deleteAll = (req, res, next) => {};
