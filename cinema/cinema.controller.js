import { db } from "../models/index.js";
const Cinema = db.cinema;
const Movie = db.movie;
const MovieTime = db.movieTime;

// Create and Save a new Cinema
export function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { title, city, address, description, photo } = req.body;
  const cinema = {
    title,
    city,
    address,
    description,
    photo,
  };

  Cinema.create(cinema)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Some error occurred while adding Cinema.",
      });
    });
}

// Retrieve all Cinemas from the database.
exports.findAll = (req, res) => {
  Cinema.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Error retrieving Cinemas",
      });
    });
};

// Find a single Cinema with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cinema.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error retrieving Cinema with id =" + id,
      });
    });
};

exports.findMovieTimes = (req, res) => {
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
    .catch((err) => {
      res.status(500).send({
        msg: err.message || "Error retrieving MoviesTimes",
      });
    });
};
// Update a Cinema by the id in the request
exports.update = (req, res) => {
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
    .catch((err) => {
      res.status(500).send({
        msg: "Error updating Cinema with id =" + id,
      });
    });
};

// Delete a Cinema with the specified id in the request
exports.deleteOne = (req, res) => {
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
    .catch((err) => {
      res.status(500).send({
        msg: "Could not delete Cinema with id = " + id,
      });
    });
};

// Delete all Cinemas from the database.
exports.deleteAll = (req, res) => {};
