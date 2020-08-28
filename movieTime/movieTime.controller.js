import { db } from "../models/index.js";
const MovieTime = db.movieTime;
const MovieTimePrice = db.movieTimePrice;
const AdditionalGoods = db.additionalGoods;
const MovieTimeAdditionalGoodsPrice = db.movieTimeAdditionalGoodsPrice;
const CinemaHall = db.cinemaHall;
const Cinema = db.cinema;
const Movie = db.movie;

// Create and Save a new MovieTime
export async function create(request, response, next) {
  if (
    !request.body.startDate ||
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

  const {
    time,
    cinemaHallId,
    cinemaId,
    movieId,
    prices,
    startDate,
    endDate,
    additionalGoodsPrices,
  } = request.body;

  const start = new Date(startDate),
    end = new Date(endDate);

  let date = start;

  const movieTimes = await db.sequelize
    .transaction(async (transaction) => {
      while (date >= start && date <= end) {
        let movieTime = {
          date,
          time,
          cinemaHallId,
          cinemaId,
          movieId,
        };
        movieTime = await MovieTime.create(movieTime, { transaction })
          .then(async (movieTime) => {
            const pricesWithMovieTimeId = prices.map((price) => {
              return {
                price: price.amountOfMoney,
                seatTypeId: price.seatsTypeId,
                movieTimeId: movieTime.id,
              };
            });
            await MovieTimePrice.bulkCreate(pricesWithMovieTimeId, {
              transaction,
            });
            if (additionalGoodsPrices) {
              const goodsPricesWithMovieTimeId = additionalGoodsPrices.map(
                (price) => {
                  return {
                    price: price.amountOfMoney,
                    additionalGoodId: price.additionalGoodsId,
                    movieTimeId: movieTime.id,
                  };
                }
              );
              await MovieTimeAdditionalGoodsPrice.bulkCreate(
                goodsPricesWithMovieTimeId,
                {
                  transaction,
                }
              ).catch(next);
            }
          })

          .catch(next);

        date = new Date(date.setDate(date.getDate() + 1));
      }
    })
    .catch(next);

  response.send({
    movieTimes,
  });
}

// Retrieve all MovieTimes from the database.
exports.findAll = (request, response, next) => {
  MovieTime.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

exports.findAllForCinema = (request, response, next) => {
  const id = request.params.id;
  MovieTime.findAll({
    where: { cinemaId: id },
    attributes: ["id", "date", "time", "movieId", "cinemaHallId"],
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single MovieTime with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  MovieTime.findByPk(id, {
    attributes: ["id","date", "time"],
    include: [
      { model: CinemaHall, attributes: ["schema", "title"] },
      { model: Movie, attributes: ["title", "poster"] },
      { model: Cinema, attributes: ["title"] },
      { model: MovieTimePrice, attributes: ["seatTypeId", "price"] },
      {
        model: MovieTimeAdditionalGoodsPrice,
        attributes: ["additionalGoodId", "price"],
        include: {
          model: AdditionalGoods,
          attributes: ["title", "description", "image"],
        },
      },
    ],
  })
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
      if (number == 1) {
        response.send({
          message: "MovieTime was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update MovieTime with id = ${id}. Maybe MovieTime was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a MovieTime with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  MovieTime.destroy({
    where: { id },
  })
    .then((number) => {
      if (number === 1) {
        response.send({
          message: "MovieTime was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete MovieTime with id = ${id}. Maybe MovieTime was not found!`,
        });
      }
    })
    .catch(next);
};

exports.deleteByIds = (request, response, next) => {
  const { ids } = request.body;

  MovieTime.destroy({ where: { id: ids } })
    .then((number) => {
      if (number === 1) {
        response.send({
          message: "MovieTime was deleted successfully!",
        });
      }
    })
    .catch(next);
};
