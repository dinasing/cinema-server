import { Router } from "express";
let router = Router();

import passport from "passport";
import "../passport";

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findAllHallsForCinema,
} from "./cinemaHall.controller.js";

// Create a new Hall
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Halls
router.get("/", findAll);

// Retrieve all Halls for Cinema with id
router.get("/cinema/:id", findAllHallsForCinema);

// Retrieve a single Hall with id
router.get("/:id", findOne);

// Update a Hall with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a Hall with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
