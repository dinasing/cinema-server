import { db } from "../models/index.js";
const CinemaHall = db.cinemaHall;

// Create and Save a new CinemaHall
export function create(request, response, next) {
  if (!request.body.title) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { title, cinemaId, schema } = request.body;
  const cinemaHall = {
    title,
    cinemaId,
    schema,
  };
  CinemaHall.create(cinemaHall)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
}

// Retrieve all CinemaHalls from the database.
exports.findAll = (request, response, next) => {
  CinemaHall.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Retrieve all CinemaHalls from the database.
exports.findAllHallsForCinema = (request, response, next) => {
  const id = request.params.id;
  CinemaHall.findAll({
    where: { cinemaId: id },
    attributes: ["id", "title"],
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single CinemaHall with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  CinemaHall.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a CinemaHall by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  CinemaHall.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          mag: "CinemaHall was updated successfully.",
        });
      } else {
        response.send({
          mag: `Cannot update CinemaHall with id = ${id}. Maybe CinemaHall was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a CinemaHall with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  CinemaHall.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          mag: "CinemaHall was deleted successfully!",
        });
      } else {
        response.send({
          mag: `Cannot delete CinemaHall with id = ${id}. Maybe CinemaHall was not found!`,
        });
      }
    })
    .catch(next);
};
// Delete all CinemaHalls from the database.
exports.deleteAll = (request, response, next) => {};
