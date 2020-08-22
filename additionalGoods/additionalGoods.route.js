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
} from "./additionalGoods.controller.js";

// Create a new Goods
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all Goods
router.get("/:cinemaId", findAll);

// Retrieve a single Goods with id
router.get("/:id", findOne);

// Update a Goods with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);
// Delete a Goods with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
