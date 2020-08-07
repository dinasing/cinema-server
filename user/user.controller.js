import { db } from "../models/index.js";
const User = db.user;
import bcrypt from "bcryptjs";
import "../passport.js";

// Create and Save a new User
export function create(request, response, next) {
  const { firstName, lastName, email, password } = request.body;
  if (!email || !firstName || !lastName || !password) {
    response.status(400).send({
      message: "Please enter all fields!",
    });
    return;
  }

  bcrypt.hash(password, 3, function (error, hash) {
    const user = {
      firstName,
      lastName,
      email,
      password: hash,
      roleId: request.body.roleId,
    };
    User.create(user)
      .then((record) => {
        response.send(record);
      })
      .catch(next);
  });
}

// Retrieve all Users from the database.
exports.findAll = (request, response, next) => {};

exports.update = (request, response, next) => {
  const id = request.params.id;

  User.update(request.body, {
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "User was updated successfully!"
            : `Cannot update User with id = ${id}. Maybe User was not found!`,
      });
    })
    .catch(next);
};

// Delete a User with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "User was deleted successfully!"
            : `Cannot deleted User with id = ${id}. Maybe User was not found!`,
      });
    })
    .catch(next);
};

// Delete all Users from the database.
exports.deleteAll = (request, response, next) => {};
