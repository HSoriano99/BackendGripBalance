import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Car } from "../cars/carModel";
  import { Inscription } from "../inscriptions/inscModel";
  
  @Entity("events")
  export class Event {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    event_image!: string;
 
    @Column()
    event_name!: string;
  
    @Column({ type: "enum", enum: ["finished", "open", "closed"] })
    event_status!: string;
  
    @Column()
    start_date!: string;
  
    @Column()
    finish_date!: string;

    @Column({ type: "enum", enum: ["street", "tracktool", "racecar"] })
    event_cars_spec!: string;

    @Column({ type: "enum", enum: ["racing", "drifting", "timeattack"] })
    event_category!: string;
  
    // 1:1 con Inscriptions
    @OneToOne(() => Inscription, (inscription) => inscription.event)
    inscription?: Inscription;
  }