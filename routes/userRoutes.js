import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// Implement route controllers for user
router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.data = users;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.data = {
        ...user,
        firstName: user.firstName,
        lastName: user.lastName
      };
    } else {
      res.err = { message: "User not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post("/", createUserValid, async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.data = user;
    } else {
      res.err = { message: "User not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (user) {
      res.data = user;
    } else {
      res.err = { message: "User not found", status: 404 };
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
