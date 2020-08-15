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
  findMovieTimes,
  findAllIdsAndTitles,
  findAllIdsAndTitlesForCinema,
  findRelevantMovieTimes,
  findRelevantMovies,
} from "./movie.controller.js";

// Create a new Movie
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Movies
router.get("/", findAll);

// Retrieve all Movies
router.get("/relevant", findRelevantMovies);

// Retrieve all Movies
router.get("/cinema/:id", findAllIdsAndTitlesForCinema);

// Retrieve all Movies
router.get("/for-movie-times", findAllIdsAndTitles);

// Retrieve a single Movie with id
router.get("/:id", findOne);

// Retrieve all MovieTimes with id
router.get("/:id/movie-time/", findMovieTimes);

// Retrieve all MovieTimes with id
router.get("/:id/relevant-movie-time/", findRelevantMovieTimes);

// Update a Movie with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);
// Delete a Movie with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
