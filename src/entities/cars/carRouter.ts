import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { CarController } from "./carController";


const router = express.Router();
const carController = new CarController();

router.get("/get-user-car/:id", auth, async (req, res, next) => {
    try {
        res.json(await carController.getCarsByUser(req.params.id, req.query));
    } catch (e) {
        next(e);
    }
});

router.post("/register-user-car-carspec/:id", auth, async (req, res, next) => {
    try {
        res.json(await carController.registerUserCarWithCarSpecs(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

router.post("/register-user-car/:id", auth, async (req, res, next) => {
    try {
        res.json(await carController.registerUserCar(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});

router.delete("/delete-user-car/:id", auth, async (req, res, next) => {
    try {
        res.json(await carController.deleteUserCar(req.params.id));
    } catch (e) {
        next(e);
    }
});

export default router;