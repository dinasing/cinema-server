import { db } from "../models/index.js";
const MovieTimePrice = db.movieTime;

// Retrieve all MovieTimePrices from the database.
exports.findAll = (request, response, next) => {
  MovieTimePrice.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single MovieTimePrice with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  MovieTimePrice.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a MovieTimePrice by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  MovieTimePrice.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "MovieTimePrice was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update MovieTimePrice with id = ${id}. Maybe MovieTimePrice was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a MovieTimePrice with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  MovieTimePrice.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "MovieTimePrice was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete MovieTimePrice with id = ${id}. Maybe MovieTimePrice was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all MovieTimePrices from the database.
exports.deleteAll = (request, response, next) => {};
