import { db } from "../models/index.js";
const AdditionalGoods = db.additionalGoods;
import Sequelize from "sequelize";
import config from "config";
const sequelize = new Sequelize(config.get("postgresURI"));
import { QueryTypes } from "sequelize";

// Create and Save a new AdditionalGoods
export function create(request, response, next) {
  if (!request.body.title) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { title, cinemaId, description, image } = request.body;
  const additionalGoods = { title, cinemaId, description, image };

  AdditionalGoods.create(additionalGoods)
    .then((record) => {
      if (record.movie) response.send(record.movie.dataValue);
      else response.send(record);
    })
    .catch(next);
}

// Retrieve all AdditionalGoods from the database.
exports.findAll = (request, response, next) => {
  const cinemaId = request.params.id;
  AdditionalGoods.findAll({ where: cinemaId })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single AdditionalGoods with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  AdditionalGoods.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a AdditionalGoods by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  AdditionalGoods.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "AdditionalGoods was updated successfully.",
        });
      } else {
        response.send({
          error: `Cannot update AdditionalGoods with id = ${id}. Maybe AdditionalGoods was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a AdditionalGoods with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  AdditionalGoods.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "AdditionalGoods was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete AdditionalGoods with id = ${id}. Maybe AdditionalGoods was not found!`,
        });
      }
    })
    .catch(next);
};

// Delete all AdditionalGoods from the database.
exports.deleteAll = (request, response, next) => {};
