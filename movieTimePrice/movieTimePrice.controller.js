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
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "MovieTimePrice was updated successfully."
            : `Cannot update MovieTimePrice with id = ${id}. Maybe MovieTimePrice was not found or req.body is empty!`,
      });
    })
    .catch(next);
};

// Delete a MovieTimePrice with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  MovieTimePrice.destroy({
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "Movie time's price was deleted successfully!"
            : `Cannot delete Movie time's price with id = ${id}. Maybe price was not found!`,
      });
    })
    .catch(next);
};

// Delete all MovieTimePrices from the database.
exports.deleteAll = (request, response, next) => {};
