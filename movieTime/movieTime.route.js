import { Router } from "express";
let router = Router();

import passport from "passport";
import "../passport";

import {
  create,
  findOne,
  update,
  deleteOne,
  findAll,
  findAllForCinema,
  deleteByIds,
} from "./movieTime.controller.js";

// Create a new Movie
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Movies
router.get("/", findAll);

// Retrieve all Movies for cinema
router.get("/cinema/:id", findAllForCinema);

// Retrieve a single Movie with id
router.get("/:id", findOne);

// Update a Movie with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteByIds
);

// Delete a Movie with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
