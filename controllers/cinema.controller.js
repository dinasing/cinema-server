import { db } from "../models/index.js";
const Cinema = db.cinema;

// Create and Save a new Cinema
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const cinema = {
    title: req.body.title,
    city: req.body.city,
  };

  Cinema.create(cinema)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding Cinema.",
      });
    });
}

// Retrieve all Cinemas from the database.
exports.findAll = (req, res) => {
  Cinema.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Cinemas",
      });
    });
};

// Find a single Cinema with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cinema.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Cinema with id =" + id,
      });
    });
};

// Update a Cinema by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cinema.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cinema was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Cinema with id = ${id}. Maybe Cinema was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cinema with id =" + id,
      });
    });
};

// Delete a Cinema with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Cinema.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cinema was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Cinema with id = ${id}. Maybe Cinema was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cinema with id = " + id,
      });
    });
};

// Delete all Cinemas from the database.
exports.deleteAll = (req, res) => {};
