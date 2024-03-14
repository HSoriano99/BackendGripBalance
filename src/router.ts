import express from "express";
import userRoutes from "./entities/users/userRouter";
import carRoutes from "./entities/cars/carRouter";
import carSpecRoutes from "./entities/car_specs/carSpecRouter";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);
// Car routes
router.use("/api/cars", carRoutes);
// CarSpec routes
router.use("/api/carspec", carSpecRoutes);

export default router;
