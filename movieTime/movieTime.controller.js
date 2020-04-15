import { db } from "../models/index.js";
const MovieTime = db.movieTime;

// Create and Save a new MovieTime
export function create(req, res) {
  if (
    !req.body.date ||
    !req.body.time ||
    !req.body.cinemaHallId ||
    !req.body.movieId ||
    !req.body.cinemaId
  ) {
    res.status(400).send({
      msg: "Content can not be empty!",
    });
    return;
  }

  const { date, time, cinemaHallId, cinemaId, movieId } = req.body;
  const movieTime = {
    date,
    time,
    cinemaHallId,
    cinemaId,
    movieId,
  };
  MovieTime.create(movieTime)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
}

// Retrieve all MovieTimes from the database.
exports.findAll = (req, res, next) => {
  MovieTime.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single MovieTime with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  MovieTime.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

// Update a MovieTime by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  MovieTime.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          msg: "MovieTime was updated successfully.",
        });
      } else {
        res.send({
          msg: `Cannot update MovieTime with id = ${id}. Maybe MovieTime was not found or req.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a MovieTime with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  MovieTime.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          msg: "MovieTime was deleted successfully!",
        });
      } else {
        res.send({
          msg: `Cannot delete MovieTime with id = ${id}. Maybe MovieTime was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all MovieTimes from the database.
exports.deleteAll = (req, res, next) => {};
