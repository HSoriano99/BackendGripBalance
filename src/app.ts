import express, { Application } from "express";
import router from "./router";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

// -----------------------------------------------------------------------------

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use(router);
app.use(errorHandler);


export default app;
