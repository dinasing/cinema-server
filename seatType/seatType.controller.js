import { db } from "../models/index.js";
const SeatType = db.seatType;

// Create and Save a new SeatType
export function create(req, res, next) {
  if (!req.body.title || !req.body.numberOfPeople) {
    res.status(400).send({
      msg: "Content can not be empty! ",
    });
    return;
  }

  const { title, numberOfPeople } = req.body;
  const seatType = {
    title,
    numberOfPeople,
  };
  SeatType.create(seatType)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
}

// Retrieve all SeatTypes from the database.
exports.findAll = (req, res, next) => {
  SeatType.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single SeatType with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  SeatType.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

// Update a SeatType by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  SeatType.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "SitType was update successfully!"
            : `Cannot update SitType with id = ${id}. Maybe SitType was not found!`,
      });
    })
    .catch(next);
};

// Delete a SeatType with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  SeatType.destroy({
    where: { id: id },
  })
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "SitType was deleted successfully!"
            : `Cannot delete SitType with id = ${id}. Maybe SitType was not found!`,
      });
    })
    .catch(next);
};

// Delete all SeatTypes from the database.
exports.deleteAll = (req, res, next) => {};
