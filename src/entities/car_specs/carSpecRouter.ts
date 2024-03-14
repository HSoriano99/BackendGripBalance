import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { CarSpecController } from "./carSpecController";


const router = express.Router();
const carSpecController = new CarSpecController();

router.patch("/update-carSpec-car/:id", auth, async (req, res, next) => {
    try {
        res.json(await carSpecController.updateCarSpecs(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
});


export default router;