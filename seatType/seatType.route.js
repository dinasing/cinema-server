import { Router } from "express";
import passport from "passport";
import "../passport";

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
} from "./seatType.controller.js";

const router = Router();

// Create a new SitType
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
