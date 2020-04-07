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
      message: "Content can not be empty!",
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
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding MovieTime.",
      });
    });
}

// Retrieve all MovieTimes from the database.
exports.findAll = (req, res) => {
  MovieTime.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving MovieTimes",
      });
    });
};

// Find a single MovieTime with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  MovieTime.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving MovieTime with id =" + id,
      });
    });
};

// Update a MovieTime by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  MovieTime.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MovieTime was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update MovieTime with id = ${id}. Maybe MovieTime was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating MovieTime with id =" + id,
      });
    });
};

// Delete a MovieTime with the specified id in the request
exports.deleteOne = (req, res) => {
  const id = req.params.id;

  MovieTime.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "MovieTime was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete MovieTime with id = ${id}. Maybe MovieTime was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MovieTime with id = " + id,
      });
    });
};

// Delete all MovieTimes from the database.
exports.deleteAll = (req, res) => {};
