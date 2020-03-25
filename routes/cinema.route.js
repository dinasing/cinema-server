import { Router } from 'express';
let router = Router();

import {create} from "../controllers/cinema.controller.js";

// Create a new Cinema
router.post("/", create);

// Retrieve all Cinemas
router.get("/", Cinemas.findAll);

// Retrieve all published Cinemas
router.get("/published", Cinemas.findAllPublished);

// Retrieve a single Cinema with id
router.get("/:id", Cinemas.findOne);

// Update a Cinema with id
router.put("/:id", Cinemas.update);

// Delete a Cinema with id
router.delete("/:id", Cinemas.delete);

// Create a new Cinema
router.delete("/", Cinemas.deleteAll);
  
export default router;