import { db } from "../models/index.js";
const Movie = db.movie;
const MovieTime = db.movieTime;
const MovieTimePrice = db.movieTimePrice;
const Cinema = db.cinema;
import Sequelize from "sequelize";
import config from "config";
const sequelize = new Sequelize(config.get("postgresURI"));
import { QueryTypes } from "sequelize";

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
      if (record.movie) response.send(record.movie.dataValue);
      else response.send(record);
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

exports.findAllIdsAndTitlesForCinema = (request, response, next) => {
  const { id } = request.params;

  Movie.findAll({
    attributes: ["id", "title"],
    includes: {
      model: MovieTime,
      attributes: ["movieId"],
      where: { cinemaId: id },
    },
  })
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
  sequelize
    .query(
      `SELECT date, array_agg(cinemas) as cinemas
	    FROM (SELECT  date, 
		  json_build_object('title', title, 'cinemaId', c.id, 'movieTimes',
				array_agg(json_build_object('id',m.id, 'time', time, 'prices', prices))) as cinemas
	      FROM public.movie_times m
	      join cinemas c
        on "cinemaId"=c.id join 
         (SELECT m.id as movieTimeId, array_agg(json_build_object('price', price, 'seatTypeId', "seatTypeId")) as prices
	        FROM public.movie_times m
	        join movie_time_prices
	        on "movieTimeId"=m.id	
	        group by  m.id, time) as mtp	
		      on movieTimeId=m.id
	      where   "movieId" = '${id}'
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

exports.findRelevantMovies = (request, response, next) => {
  const id = request.params.id;
  sequelize
    .query(
      `SELECT distinct m.id, title, release_date, end_date, language, description, poster, genre
	    FROM public.movies m
	    join movie_times mt on m.id=mt."movieId"
	    where date>=CURRENT_DATE`,
      { plain: false, type: QueryTypes.SELECT }
    )
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

exports.findRelevantMovieTimes = (request, response, next) => {
  const id = request.params.id;
  sequelize
    .query(
      `SELECT date, array_agg(cinemas) as cinemas
	    FROM (SELECT  date, 
		  json_build_object('title', title, 'cinemaId', c.id, 'movieTimes',
				array_agg(json_build_object('id',m.id, 'time', time, 'prices', prices))) as cinemas
	      FROM public.movie_times m
	      join cinemas c
        on "cinemaId"=c.id join 
         (SELECT m.id as movieTimeId, array_agg(json_build_object('price', price, 'seatTypeId', "seatTypeId")) as prices
	        FROM public.movie_times m
	        join movie_time_prices
	        on "movieTimeId"=m.id	
	        group by  m.id, time) as mtp	
		      on movieTimeId=m.id
	      where   "movieId" = '${id}' AND date>=CURRENT_DATE
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

// Update a Movie by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  Movie.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Movie was updated successfully.",
        });
      } else {
        response.send({
          error: `Cannot update Movie with id = ${id}. Maybe Movie was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a Movie with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  Movie.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "Movie was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete Movie with id = ${id}. Maybe Movie was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all Movies from the database.
exports.deleteAll = (request, response, next) => {};
