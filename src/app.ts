import express, { Application } from "express";
import router from "./router";
import cors from "cors";

// -----------------------------------------------------------------------------

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
// Rutas
app.use(router)


export default app;
