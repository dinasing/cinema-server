import { Router } from "express";
import passport from "passport";
import "../passport";

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
} from "./movieTime.controller.js";

const router = Router();

// Create a new Movie
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Movies
router.get("/", findAll);

// Retrieve a single Movie with id
router.get("/:id", findOne);

// Update a Movie with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a Movie with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
