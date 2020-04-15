import { db } from "../models/index.js";
const Movie = db.movie;
const MovieTime = db.movieTime;
const Cinema = db.cinema;

// Create and Save a new Movie
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      msg: "Content can not be empty!",
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
  } = req.body;
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
      if (record.movie) res.send(record.movie.dataValue);
      else res.send(record);
    })
    .catch(next);
}

// Retrieve all Movies from the database.
exports.findAll = (req, res, next) => {
  Movie.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single Movie with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Movie.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

exports.findMovieTimes = (req, res, next) => {
  const id = req.params.id;
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
      res.send(records);
    })
    .catch(next);
};

// Update a Movie by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  Movie.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Movie with id = ${id}. Maybe Movie was not found or req.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a Movie with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  Movie.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Movie with id = ${id}. Maybe Movie was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all Movies from the database.
exports.deleteAll = (req, res, next) => {};
