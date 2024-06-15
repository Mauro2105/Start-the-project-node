import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// Implement route controllers for fighter
router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getAllFighters();
    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const fighter = await fighterService.getFighterById(req.params.id);
    if (fighter) {
      res.data = fighter;
    } else {
      res.err = { message: "Fighter not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.createFighter(req.body);
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const fighter = await fighterService.updateFighter(req.params.id, req.body);
    if (fighter) {
      res.data = fighter;
    } else {
      res.err = { message: "Fighter not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const fighter = await fighterService.deleteFighter(req.params.id);
    if (fighter) {
      res.data = fighter;
    } else {
      res.err = { message: "Fighter not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
