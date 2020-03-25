import { db } from '../models/index.js'
const Cinema = db.cinema;

// Create and Save a new Cinema
export function create(req, res) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const cinema = {
      title: req.body.title,
      city: req.body.city,
    };

    Cinema.create(cinema)
      .then(record => {
        res.send(record);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding Cinema."
        });
      });
  };

// Retrieve all Cinemas from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Cinema with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cinema.findByPk(id)
    .then(record => {
      res.send(record);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cinema with id =" + id
      });
    });
};

// Update a Cinema by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Cinema with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Cinemas from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Cinemas
exports.findAllPublished = (req, res) => {
  
};