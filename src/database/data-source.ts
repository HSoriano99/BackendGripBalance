import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateCars1709398342955 } from "../entities/cars/1709398342955-CreateCars";
import { Car } from "../entities/cars/carModel";
import { CreateCarSpecs1709398434677 } from "../entities/car_specs/1709398434677-CreateCarSpecs";
import { CarSpec } from "../entities/car_specs/carSpecModel";
import { CreateEvents1709398476511 } from "../entities/eventss/1709398476511-CreateEvents";
import { Event } from "../entities/eventss/eventModel";
import { CreateInscriptions1709398512498 } from "../entities/inscriptions/1709398512498-CreateInscriptions";
import { Inscription } from "../entities/inscriptions/inscModel";
import { CreateUsers1709398282943 } from "../entities/users/1709398282943-CreateUsers";
import { User } from "../entities/users/userModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "root",
    database: "GripBalance",
    // entities: [`${__dirname}/../models/**/*{.js,.ts}`],
    entities: [
        User,
        Inscription,
        Event,
        Car,
        CarSpec
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
 