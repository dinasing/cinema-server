import { Router } from 'express';
let router = Router();

import {create, findOne, update} from "../controllers/cinema.controller.js";

// Create a new Cinema
router.post("/", create);

// // Retrieve all Cinemas
// router.get("/", Cinemas.findAll);

// Retrieve a single Cinema with id
router.get("/:id", findOne);

// Update a Cinema with id
router.put("/:id", update);

// // Delete a Cinema with id
// router.delete("/:id", Cinemas.delete);

// // Create a new Cinema
// router.delete("/", Cinemas.deleteAll);
  
export default router;