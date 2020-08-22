import { db } from "../models/index.js";
import Sequelize from "sequelize";
import config from "config";
const sequelize = new Sequelize(config.get("postgresURI"));
import { QueryTypes } from "sequelize";
const Ticket = db.ticket;
const BookingTransaction = db.bookingTransaction;

// Create and Save a new BookingTransaction
export function create(request, response, next) {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const { userId, movieTimeId, selectedSeats } = request.body;
  const bookingTransaction = {
    userId,
    movieTimeId,
  };

  db.sequelize
    .transaction((transaction) => {
      return BookingTransaction.create(bookingTransaction, {
        transaction,
      }).then((bookingTransaction) => {
        const tickets = selectedSeats.map((seat) => {
          return {
            row: seat.row,
            seat: seat.seat,
            bookingTransactionId: bookingTransaction.id,
            seatTypeId: seat.seatTypeId,
          };
        });
        return Ticket.bulkCreate(tickets, {
          transaction,
        });
      });
    })
    .then((records) => {
      if (records) response.send(bookingTransaction);
    })
    .catch(next);
}

// Retrieve all BookingTransactions from the database.
exports.findAll = (request, response, next) => {
  const { movieTimeId } = request.params;
  BookingTransaction.findAll({
    where: { movieTimeId },
    include: { model: Ticket },
  })
    .then((records) => {
      response.send(records);
    })
    .catch(next);
};

// Find a single BookingTransaction with an id
exports.findOne = (request, response, next) => {
  const id = request.params.id;

  BookingTransaction.findByPk(id)
    .then((record) => {
      response.send(record);
    })
    .catch(next);
};

// Update a BookingTransaction by the id in the request
exports.update = (request, response, next) => {
  const id = request.params.id;

  BookingTransaction.update(request.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "BookingTransaction was updated successfully.",
        });
      } else {
        response.send({
          message: `Cannot update BookingTransaction with id = ${id}. Maybe BookingTransaction was not found or request.body is empty!`,
        });
      }
    })
    .catch(next);
};

// Delete a BookingTransaction with the specified id in the request
exports.deleteOne = (request, response, next) => {
  const id = request.params.id;

  BookingTransaction.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        response.send({
          message: "BookingTransaction was deleted successfully!",
        });
      } else {
        response.send({
          message: `Cannot delete BookingTransaction with id = ${id}. Maybe BookingTransaction was not found!`,
        });
      }
    })
    .catch(next);
};
