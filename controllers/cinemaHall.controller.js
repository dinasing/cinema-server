import { db } from "../models/index.js";
const CinemaHall = db.cinemaHall;

// Create and Save a new CinemaHall
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { title, cinemaId, schema } = req.body;
  const cinemaHall = {
    title,
    cinemaId,
    schema,
  };
  CinemaHall.create(cinemaHall)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding CinemaHall.",
      });
    });
}

// Retrieve all CinemaHalls from the database.
exports.findAll = (req, res) => {
  CinemaHall.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving CinemaHalls",
      });
    });
};

// Find a single CinemaHall with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CinemaHall.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving CinemaHall with id =" + id,
      });
    });
};

// Update a CinemaHall by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CinemaHall.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CinemaHall was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update CinemaHall with id = ${id}. Maybe CinemaHall was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CinemaHall with id =" + id,
      });
    });
};

// Delete a CinemaHall with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  CinemaHall.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CinemaHall was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete CinemaHall with id = ${id}. Maybe CinemaHall was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete CinemaHall with id = " + id,
      });
    });
};

// Delete all CinemaHalls from the database.
exports.deleteAll = (req, res) => {};
