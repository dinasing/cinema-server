import { Router } from "express";
let router = Router();

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
} from "./movieTimePrice.controller.js";

// Create a new Movie Time Price
router.post("/", create);

// Retrieve all Movie Time Prices
router.get("/", findAll);

// Retrieve a single Movie Time Price with id
router.get("/:id", findOne);

// Update a Movie Time Price with id
router.put("/:id", update);

// Delete a Movie Time Price with id
router.delete("/:id", deleteOne);

export default router;
