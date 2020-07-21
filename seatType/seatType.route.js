import { Router } from "express";
let router = Router();
import passport from "passport";
require("../passport");

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
} from "./seatType.controller.js";

// Create a new SeatType
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all SeatTypes
router.get("/", findAll);

// Retrieve a single SeatType with id
router.get("/:id", findOne);

// Update a SeatType with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a SeatType with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
