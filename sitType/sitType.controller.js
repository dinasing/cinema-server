import { db } from "../models/index.js";
const SitType = db.sitType;

// Create and Save a new SitType
export function create(req, res, next) {
  if (!req.body.title || !req.body.numberOfPeople) {
    res.status(400).send({
      msg: "Content can not be empty! ",
    });
    return;
  }

  const { title, numberOfPeople } = req.body;
  const sitType = {
    title,
    numberOfPeople,
  };
  SitType.create(sitType)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
}

// Retrieve all SitTypes from the database.
exports.findAll = (req, res, next) => {
  SitType.findAll()
    .then((records) => {
      res.send(records);
    })
    .catch(next);
};

// Find a single SitType with an id
exports.findOne = (req, res, next) => {
  const id = req.params.id;

  SitType.findByPk(id)
    .then((record) => {
      res.send(record);
    })
    .catch(next);
};

// Update a SitType by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.id;

  SitType.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        const message =
          num == 1
            ? "SitType was update successfully!"
            : `Cannot update SitType with id = ${id}. Maybe SitType was not found!`;
        res.send({
          message,
        });
      }
    })
    .catch(next);
};

// Delete a SitType with the specified id in the request
exports.deleteOne = (req, res, next) => {
  const id = req.params.id;

  SitType.destroy({
    where: { id: id },
  })
    .then((num) => {
      const message =
        num == 1
          ? "SitType was deleted successfully!"
          : `Cannot delete SitType with id = ${id}. Maybe SitType was not found!`;
      res.send({
        message,
      });
    })
    .catch(next);
};

// Delete all SitTypes from the database.
exports.deleteAll = (req, res, next) => {};
