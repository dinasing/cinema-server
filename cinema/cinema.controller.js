import { db } from "../models/index.js";
const Cinema = db.cinema;
const Movie = db.movie;
const MovieTime = db.movieTime;
const CinemaHall = db.cinemaHall;

// Create and Save a new Cinema
export function create(req, res, next) {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { title, city, address, description, photo, cinemaHalls } = req.body;
  const cinema = {
    title,
    city,
    address,
    description,
    photo,
  };
  let response;
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
      if (records) res.send(cinema);
    })
    .catch(next);
}

// Retrieve all Cinemas from the database.
exports.findAll = (req, res, next) => {
  Cinema.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Retrieve all Cinemas with its Halls from the database.
exports.findAllWithHalls = (req, res, next) => {
  Cinema.findAll({
    include: {
      model: CinemaHall,
    },
  })
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single Cinema with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  Cinema.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

exports.findMovieTimes = (req, res, next) => {
  const id = req.params.id;
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
      res.send(records);
    })
    .catch(next);
};
// Update a Cinema by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  Cinema.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          msg: "Cinema was updated successfully.",
        });
      } else {
        res.send({
          msg: `Cannot update Cinema with id = ${id}. Maybe Cinema was not found or req.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a Cinema with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  Cinema.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          msg: "Cinema was deleted successfully!",
        });
      } else {
        res.send({
          msg: `Cannot delete Cinema with id = ${id}. Maybe Cinema was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all Cinemas from the database.
exports.deleteAll = (req, res, next) => {};
