import { Router } from "express";
let router = Router();

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findMovieTimes,
} from "./cinema.controller.js";

// Create a new Cinema
router.post("/", create);

// Retrieve all Cinemas
router.get("/", findAll);

// Retrieve a single Cinema with id
router.get("/:id", findOne);

// Retrieve all MovieTimes for cinema with id
router.get("/:id/movie-time/", findMovieTimes);

// Update a Cinema with id
router.put("/:id", update);

// Delete a Cinema with id
router.delete("/:id", deleteOne);

// // Create a new Cinema
// router.delete("/", Cinemas.deleteAll);

export default router;
