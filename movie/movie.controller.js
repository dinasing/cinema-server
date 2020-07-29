import { db } from "../models/index.js";
const Movie = db.movie;
const MovieTime = db.movieTime;
const Cinema = db.cinema;

// Create and Save a new Movie
export function create(request, response, next) {
  if (!request.body.title) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const {
    title,
    genre,
    release_date,
    end_date,
    language,
    description,
    poster,
  } = request.body;
  const movie = {
    title,
    genre,
    release_date,
    end_date,
    language,
    description,
    poster,
  };
  Movie.create(movie)
    .then((record) => {
      response.send(record.movie ? record.movie.dataValue : record);
    })
    .catch(next);
}

// Retrieve all Movies from the database.
exports.findAll = (request, response, next) => {
  Movie.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

exports.findAllIdsAndTitles = (request, response, next) => {
  Movie.findAll({ attributes: ["id", "title"] })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single Movie with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  Movie.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

exports.findMovieTimes = (request, response, next) => {
  const id = request.params.id;
  MovieTime.findAll({
    where: { movieId: id },
    include: [
      {
        model: Cinema,
        attributes: ["title"],
      },
    ],
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Update a Movie by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  Movie.update(request.body, {
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "Movie was updated successfully!"
            : `Cannot update Movie with id = ${id}. Maybe movie was not found!`,
      });
    })
    .catch(next);
};

// Delete a Movie with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  Movie.destroy({
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "Movie was deleted successfully!"
            : `Cannot delete Movie with id = ${id}. Maybe movie was not found!`,
      });
    })
    .catch(next);
};

// Delete all Movies from the database.
exports.deleteAll = (request, response, next) => {};
