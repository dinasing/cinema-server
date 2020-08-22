import { db } from "../models/index.js";
const Ticket = db.ticket;
const BookingTransaction = db.bookingTransaction;

// Retrieve all Tickets from the database.
exports.findAll = (request, response, next) => {
  const movieTimeId = request.params;
  Ticket.findAll({
    attributes: ["row", "seat"],
    include: {
      model: BookingTransaction,
      where: movieTimeId,
      attributes: [],
    },
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Update a Ticket by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  Ticket.update(request.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        response.send({
          message: "Ticket was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update Ticket with id = ${id}. Maybe Ticket was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a Ticket with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  Ticket.destroy({
    where: { id },
  })
    .then((number) => {
      if (number === 1) {
        response.send({
          message: "Ticket was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete Ticket with id = ${id}. Maybe Ticket was not found!`,
        });
      }
    })
    .catch(next);
};

exports.deleteByIds = (request, response, next) => {
  const { ids } = request.body;

  Ticket.destroy({ where: { id: ids } })
    .then((number) => {
      if (number === 1) {
        response.send({
          message: "Ticket was deleted successfully!",
        });
      }
    })
    .catch(next);
};
