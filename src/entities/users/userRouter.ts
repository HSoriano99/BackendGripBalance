import express from "express";
import { UserController } from "./userController";


const router = express.Router();
const userController = new UserController();

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.login);
router.patch("/update/:id", userController.update);

export default router;