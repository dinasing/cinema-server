import { db } from "../models/index.js";
const SeatType = db.seatType;

// Create and Save a new SeatType
export function create(request, response, next) {
  if (!request.body.title || !request.body.numberOfPeople) {
    response.status(400).send({
      message: "Content can not be empty! ",
    });
    return;
  }

  const { title, numberOfPeople } = request.body;
  const seatType = {
    title,
    numberOfPeople,
  };
  SeatType.create(seatType)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
}

// Retrieve all SeatTypes from the database.
exports.findAll = (request, response, next) => {
  SeatType.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single SeatType with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  SeatType.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a SeatType by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  SeatType.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "SeatType was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update SeatType with id = ${id}. Maybe SeatType was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a SeatType with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  SeatType.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "SeatType was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete SeatType with id = ${id}. Maybe SeatType was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all SeatTypes from the database.
exports.deleteAll = (request, response, next) => {};
