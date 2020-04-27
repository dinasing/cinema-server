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
} from "./movieTimePrice.controller.js";

// Create a new Movie Time Price
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Movie Time Prices
router.get("/", findAll);

// Retrieve a single Movie Time Price with id
router.get("/:id", findOne);

// Update a Movie Time Price with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a Movie Time Price with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
