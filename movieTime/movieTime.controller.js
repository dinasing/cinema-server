import { db } from "../models/index.js";
const MovieTime = db.movieTime;
const MovieTimePrice = db.movieTimePrice;

// Create and Save a new MovieTime
export function create(request, response, next) {
  if (
    !request.body.date ||
    !request.body.time ||
    !request.body.cinemaHallId ||
    !request.body.movieId ||
    !request.body.cinemaId ||
    !request.body.prices
  ) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { date, time, cinemaHallId, cinemaId, movieId, prices } = request.body;
  const movieTime = {
    date,
    time,
    cinemaHallId,
    cinemaId,
    movieId,
  };
  db.sequelize
    .transaction((transaction) => {
      return MovieTime.create(movieTime, { transaction: transaction }).then(
        (movieTime) => {
          const pricesWithMovieTimeId = prices.map((price) => ({
            amountOfMoney: price.amountOfMoney,
            sitTypeId: price.sitsTypeId,
            movieTimeId: movieTime.id,
          }));
          return MovieTimePrice.bulkCreate(pricesWithMovieTimeId, {
            transaction: transaction,
          });
        }
      );
    })
    .catch(next);
}

// Retrieve all MovieTimes from the database.
exports.findAll = (request, response, next) => {
  MovieTime.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single MovieTime with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  MovieTime.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a MovieTime by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  MovieTime.update(request.body, {
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "Movie time was updated successfully!"
            : `Cannot update Movie time with id = ${id}. Maybe Movie time was not found!`,
      });
    })
    .catch(next);
};

// Delete a MovieTime with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  MovieTime.destroy({
    where: { id: id },
  })
    .then((number) => {
      response.send({
        message:
          number === 1
            ? "Movie time was deleted successfully!"
            : `Cannot delete Movie time with id = ${id}. Maybe Movie time was not found!`,
      });
    })
    .catch(next);
};

// Delete all MovieTimes from the database.
exports.deleteAll = (request, response, next) => {};
