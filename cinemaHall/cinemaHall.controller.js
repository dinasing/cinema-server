import { db } from "../models/index.js";
const CinemaHall = db.cinemaHall;

// Create and Save a new CinemaHall
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      msg: "Content can not be empty!",
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
    .catch(next);
}

// Retrieve all CinemaHalls from the database.
exports.findAll = (req, res, next) => {
  CinemaHall.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single CinemaHall with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  CinemaHall.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

// Update a CinemaHall by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  CinemaHall.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mag: "CinemaHall was updated successfully.",
        });
      } else {
        res.send({
          mag: `Cannot update CinemaHall with id = ${id}. Maybe CinemaHall was not found or req.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a CinemaHall with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  CinemaHall.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          mag: "CinemaHall was deleted successfully!",
        });
      } else {
        res.send({
          mag: `Cannot delete CinemaHall with id = ${id}. Maybe CinemaHall was not found!`,
        });
      }
    })
    .catch(next);
};
// Delete all CinemaHalls from the database.
exports.deleteAll = (req, res, next) => {};
