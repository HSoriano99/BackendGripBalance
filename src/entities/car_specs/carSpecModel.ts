import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

 import { Car } from "../cars/carModel";
  
  @Entity("cars")
  export class CarSpec {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    car_id!: number;
 
    @Column()
    car_engine!: string;
  
    @Column()
    car_tires!: string;
  
    @Column()
    car_suspension!: string;

    @Column()
    car_differential!: string;

    @Column()
    car_aero!: string;
  
    // 1:1 con Cars
    @OneToOne(() => Car, (car) => car.carSpec)
    car?: Car;
  }