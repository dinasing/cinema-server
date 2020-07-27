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
} from "./sitType.controller.js";

// Create a new SitType
router.post("/", passport.authenticate("jwt", { session: false }), create);

// Retrieve all SitTypes
router.get("/", findAll);

// Retrieve a single SitType with id
router.get("/:id", findOne);

// Update a SitType with id
router.put("/:id", passport.authenticate("jwt", { session: false }), update);

// Delete a SitType with id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOne
);

export default router;
