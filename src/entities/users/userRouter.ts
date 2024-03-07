import express from "express";
import { UserController } from "./userController";


const router = express.Router();
const userController = new UserController();//revisar class puesto que no se utiliza mas userController como clase

router.post("/registerUser", async (req, res, next) => {
    try {
        res.json(await userController.registerUser(req.body));
    } catch (e) {
        next(e);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        res.json(await userController.login(req.body));
    } catch (e) {
        next(e);
    }
});
router.patch("/update-password/:id", async (req, res, next) => {
    try {
        res.json(await userController.updatePassword(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

router.patch("/update-user/:id", async (req, res, next) => {
    try {
        res.json(await userController.updateUser(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

export default router;