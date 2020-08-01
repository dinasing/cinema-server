import { db } from "../models/index.js";
const Cinema = db.cinema;
import Sequelize from "sequelize";
import config from "config";
const sequelize = new Sequelize(config.get("postgresURI"));
import { QueryTypes } from "sequelize";
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

// Update a Cinema by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  Cinema.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Cinema was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update Cinema with id = ${id}. Maybe Cinema was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a Cinema with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  Cinema.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Cinema was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete Cinema with id = ${id}. Maybe Cinema was not found!`,
        });
      }
    })
    .catch(next);
};

exports.findMovieTimes = (request, response, next) => {
  const id = request.params.id;
  sequelize
    .query(
      `SELECT date, array_agg(movies) as movies
	    FROM (SELECT  date, 
		  json_build_object('title', title, 'movieId', c.id, 'movieTimes',
				array_agg(json_build_object('id',m.id, 'time', time, 'prices', prices))) as movies
	      FROM public.movie_times m
	      join movies c
        on "movieId"=c.id join 
         (SELECT m.id as movieTimeId, array_agg(json_build_object('price', price, 'seatTypeId', "seatTypeId")) as prices
	        FROM public.movie_times m
	        join movie_time_prices
	        on "movieTimeId"=m.id	
	        group by  m.id, time) as mtp	
		      on movieTimeId=m.id
	      where   "cinemaId" = '${id}'
	      group by date, title, c.id
	      ORDER BY date) as c
	    group by date
	    ORDER BY date`,
      { plain: false, type: QueryTypes.SELECT }
    )
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Delete all Cinemas from the database.
exports.deleteAll = (request, response, next) => {};
