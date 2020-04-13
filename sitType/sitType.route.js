import { Router } from "express";
let router = Router();

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
} from "./sitType.controller.js";

// Create a new SitType
router.post("/", create);

// Retrieve all SitTypes
router.get("/", findAll);

// Retrieve a single SitType with id
router.get("/:id", findOne);

// Update a SitType with id
router.put("/:id", update);

// Delete a SitType with id
router.delete("/:id", deleteOne);

export default router;
