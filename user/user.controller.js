import { db } from "../models/index.js";
const User = db.user;
import bcrypt from "bcryptjs";

// Create and Save a new User
export function create(req, res) {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !firstName || !lastName || !password) {
    res.status(400).send({
      msg: "Please enter all fields!"
    });
    return;
  }

  bcrypt.hash(password, 3, function(err, hash) {
    const user = {
      firstName,
      lastName,
      email,
      password: hash,
      roleId: req.body.roleId
    };
    User.create(user)
      .then(record => {
        res.send(record);
      })
      .catch(err => {
        res.status(500).send({
          msg: err.message || "Some error occurred while adding user."
        });
      });
  });
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id =" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id = " + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};

// Find all published Users
exports.findAllPublished = (req, res) => {};
