import express from "express";
import userRoutes from "./entities/users/userRouter";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);

export default router;
