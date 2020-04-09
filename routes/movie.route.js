import { Router } from "express";
let router = Router();

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findMovieTimes,
} from "../controllers/movie.controller.js";

// Create a new Movie
router.post("/", create);

// Retrieve all Movies
router.get("/", findAll);

// Retrieve a single Movie with id
router.get("/:id", findOne);

// Retrieve all MovieTimes with id
router.get("/:id/movie-time/", findMovieTimes);

// Update a Movie with id
router.put("/:id", update);
// Delete a Movie with id
router.delete("/:id", deleteOne);

export default router;
