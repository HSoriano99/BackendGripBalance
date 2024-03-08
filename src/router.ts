import express from "express";
import userRoutes from "./entities/users/userRouter";
import carRoutes from "./entities/cars/carRouter";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);
// Car routes
router.use("/api/cars", carRoutes);

export default router;
