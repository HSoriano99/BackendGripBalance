import express from "express";
import { UserController } from "./userController";


const router = express.Router();
const userController = new UserController();//revisar class puesto que no se utiliza mas userController como clase

router.post("/registerUser", userController.registerUser);
// router.post("/login", userController.login);
router.patch("/update/:id", userController.update);
router.post("/login", async (req, res, next) => {
    try {
        res.json(await userController.login(req.body));
    } catch (e) {
        next(e);
    }
});

export default router;