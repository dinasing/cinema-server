import { db } from '../models/index.js'
const user = db.user;

// Create and Save a new User
export function create(req, res) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const user = {
      login: req.body.login,
      email: req.body.email,
      password: req.body.password,
      roleId: req.body.roleId
    };

    User.create(user)
      .then(record => {
        res.send(record);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding user."
        });
      });
  };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};

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
exports.deleteAll = (req, res) => {
  
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  
};