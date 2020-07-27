import { Router } from "express";
import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findMovieTimes,
  findAllWithHalls,
} from "./cinema.controller.js";

import passport from "passport";
import "../passport";

const router = Router();

// Create a new Cinema
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Cinemas
router.get("/", findAll);

// Retrieve all Cinemas with it's halls
router.get("/with-halls", findAllWithHalls);

// Retrieve a single Cinema with id
router.get("/:id", findOne);

// Retrieve all MovieTimes for cinema with id
router.get("/:id/movie-time/", findMovieTimes);

// Update a Cinema with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a Cinema with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
