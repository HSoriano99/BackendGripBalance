import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
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
router.patch("/update-password/:id", auth, async (req, res, next) => {
    try {
        res.json(await userController.updatePassword(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

router.patch("/update-user/:id", auth, isAdmin, async (req, res, next) => {
    try {
        res.json(await userController.updateUser(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

router.get("/get-complete-user/:id", auth, async (req, res, next) => {
    try {
        res.json(await userController.getCompleteUser(req.params.id, req.query));
    } catch (e) {
        next(e);
    }
});



export default router;