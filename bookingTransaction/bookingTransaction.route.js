import { Router } from "express";
let router = Router();

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findMovieTimes,
  findAllWithHalls,
  findAllForUser,
} from "./bookingTransaction.controller.js";

import passport from "passport";
require("../passport");

// Create a new BookingTransaction
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all BookingTransactions
router.get("/:movieTimeId", findAll);

// Retrieve all BookingTransactions for user
router.get("/user/:userId", findAllForUser);

// Retrieve a single BookingTransaction with id
router.get("/:id", findOne);

// Update a BookingTransaction with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a BookingTransaction with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
