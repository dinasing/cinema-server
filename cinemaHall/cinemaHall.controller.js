import { db } from "../models/index.js";
const CinemaHall = db.cinemaHall;

// Create and Save a new CinemaHall
export function create(req, res, next) {
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

// Retrieve all CinemaHalls from the database.
exports.findAllHallsForCinema = (req, res, next) => {
  const id = req.params.id;
  CinemaHall.findAll({
    where: { cinemaId: id },
  })
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
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "Cinema hall was updated successfully!"
            : `Cannot update Cinema hall with id = ${id}. Maybe Cinema hall was not found!`,
      });
    })
    .catch(next);
};

// Delete a CinemaHall with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  CinemaHall.destroy({
    where: { id: id },
  })
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "Cinema hall was deleted successfully!"
            : `Cannot delete Cinema hall with id = ${id}. Maybe Cinema hall was not found!`,
      });
    })
    .catch(next);
};
// Delete all CinemaHalls from the database.
exports.deleteAll = (req, res, next) => {};
