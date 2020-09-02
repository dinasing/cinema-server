import { db } from "../models/index.js";
import Sequelize from "sequelize";
import config from "config";
const sequelize = new Sequelize(config.get("postgresURI"));
import { QueryTypes } from "sequelize";
const BookingTransaction = db.bookingTransaction;
const Ticket = db.ticket;
const PurchasedGoods = db.purchasedGoods;
const MovieTimePrice = db.movieTimePrice;
const AdditionalGoodsPrice = db.movieTimeAdditionalGoodsPrice;
const MovieTime = db.movieTime;
const Movie = db.movie;
const Cinema = db.cinema;
const CinemaHall = db.cinemaHall;
const SeatType = db.seatType;
const AdditionalGoods = db.additionalGoods;

// Create and Save a new BookingTransaction
export async function create(request, response, next) {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const {
    userId,
    movieTimeId,
    seatsPreparedForBooking,
    additionalGoods,
  } = request.body;

  const bookingTransaction = {
    userId,
    movieTimeId,
  };
  let bookedSeats = [];
  db.sequelize
    .transaction((transaction) => {
      return BookingTransaction.create(bookingTransaction, {
        transaction,
      }).then(async (bookingTransaction) => {
        const tickets = seatsPreparedForBooking.map((seat) => {
          return {
            row: seat.row,
            seat: seat.seat,
            bookingTransactionId: bookingTransaction.id,
            seatTypeId: seat.seatTypeId,
          };
        });

        bookedSeats = await Ticket.bulkCreate(tickets, {
          transaction,
        });

        if (additionalGoods.length > 0) {
          const purchasedGoods = additionalGoods.map((goods) => {
            return {
              additionalGoodId: goods.id,
              number: goods.number,
              bookingTransactionId: bookingTransaction.id,
            };
          });
          await PurchasedGoods.bulkCreate(purchasedGoods, { transaction });
        }
      });
    })
    .then((records) => {
      if (records) response.send(bookedSeats);
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

exports.findAllForUser = (request, response, next) => {
  const { userId } = request.params;

  BookingTransaction.findAll({
    attributes: [],
    include: [
      {
        model: Ticket,
        attributes: ["row", "seat", "seatTypeId"],
        include: { model: SeatType, attributes: ["title"] },
      },
      {
        model: MovieTime,
        attributes: ["date", "time"],
        include: [
          {
            model: MovieTimePrice,
            attributes: ["price", "seatTypeId"],
          },
          {
            model: AdditionalGoodsPrice,
            attributes: ["price", "additionalGoodId"],
          },
          { model: Movie, attributes: ["title"] },
          { model: Cinema, attributes: ["title"] },
          { model: CinemaHall, attributes: ["title"] },
        ],
      },
      {
        model: PurchasedGoods,
        attributes: ["additionalGoodId", "number"],
        include: { model: AdditionalGoods, attributes: ["title"] },
      },
    ],
    where: { userId },
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
