import { db } from "../models/index.js";
const Cinema = db.cinema;
const Movie = db.movie;
const MovieTime = db.movieTime;
const CinemaHall = db.cinemaHall;

// Create and Save a new Cinema
export function create(request, response, next) {
  if (!request.body.title) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const {
    title,
    city,
    address,
    description,
    photo,
    cinemaHalls,
  } = request.body;
  const cinema = {
    title,
    city,
    address,
    description,
    photo,
  };

  db.sequelize
    .transaction((t) => {
      return Cinema.create(cinema, { transaction: t }).then((cinema) => {
        response = cinema;
        const cinemaHallsWithCinemaId = cinemaHalls.map((cinemaHall) => {
          return {
            title: cinemaHall.title,
            schema: cinemaHall.schema,
            cinemaId: cinema.id,
          };
        });
        return CinemaHall.bulkCreate(cinemaHallsWithCinemaId, {
          transaction: t,
        });
      });
    })
    .then((records) => {
      if (records) response.send(cinema);
    })
    .catch(next);
}

// Retrieve all Cinemas from the database.
exports.findAll = (request, response, next) => {
  Cinema.findAll()
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Retrieve all Cinemas with its Halls from the database.
exports.findAllWithHalls = (request, response, next) => {
  Cinema.findAll({
    include: {
      model: CinemaHall,
    },
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single Cinema with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  Cinema.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

exports.findMovieTimes = (request, response, next) => {
  const id = request.params.id;
  MovieTime.findAll({
    where: { cinemaId: id },
    include: [
      {
        model: Movie,
        attributes: ["title"],
      },
    ],
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};
// Update a Cinema by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  Cinema.update(request.body, {
    where: { id: id },
  })
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "Cinema was updated successfully!"
            : `Cannot update Cinema with id = ${id}. Maybe Cinema was not found!`,
      });
    })
    .catch(next);
};

// Delete a Cinema with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  Cinema.destroy({
    where: { id: id },
  })
    .then((number) => {
      res.send({
        message:
          number === 1
            ? "Cinema was deleted successfully!"
            : `Cannot delete Cinema with id = ${id}. Maybe Cinema was not found!`,
      });
    })
    .catch(next);
};

// Delete all Cinemas from the database.
exports.deleteAll = (request, response, next) => {};
