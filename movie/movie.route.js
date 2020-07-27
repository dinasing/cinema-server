import { Router } from "express";
import passport from "passport";
import "../passport";

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findMovieTimes,
  findAllIdsAndTitles,
} from "./movie.controller.js";

const router = Router();

// Create a new Movie
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Movies
router.get("/", findAll);

// Retrieve all Movies
router.get("/for-movie-times", findAllIdsAndTitles);

// Retrieve a single Movie with id
router.get("/:id", findOne);

// Retrieve all MovieTimes with id
router.get("/:id/movie-time/", findMovieTimes);

// Update a Movie with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);
// Delete a Movie with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
