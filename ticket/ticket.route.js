import { Router } from "express";
let router = Router();

import passport from "passport";
import "../passport";

import {
  findOne,
  update,
  deleteOne,
  findAll,
  deleteByIds,
} from "./ticket.controller.js";

// Retrieve all Movies
router.get("/:movieTimeId", findAll);

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
