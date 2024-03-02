import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateCars1709398342955 } from "../entities/cars/1709398342955-CreateCars";
import { CreateCarSpecs1709398434677 } from "../entities/car_specs/1709398434677-CreateCarSpecs";
import { CreateEvents1709398476511 } from "../entities/eventss/1709398476511-CreateEvents";
import { CreateInscriptions1709398512498 } from "../entities/inscriptions/1709398512498-CreateInscriptions";
import { CreateUsers1709398282943 } from "../entities/users/1709398282943-CreateUsers";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "GripBalance",
    // entities: [`${__dirname}/../models/**/*{.js,.ts}`],
    entities: [

    ],
    // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
    migrations: [
        CreateUsers1709398282943,
        CreateInscriptions1709398512498,
        CreateEvents1709398476511,
        CreateCars1709398342955,
        CreateCarSpecs1709398434677
    ],
    synchronize: false,
    logging: false,
 });
 