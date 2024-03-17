import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../users/userModel";
import { Event } from "../eventss/eventModel";

@Entity("inscriptions")
export class Inscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  car_id!: number;

  @Column()
  event_id!: number;

  @Column()
  price?: string;

  // N:1 con Users
  @ManyToOne(() => User, (user) => user.inscription)
  @JoinColumn({ name: "user_id", referencedColumnName: "id"})
  user!: User;

  // N:1 con Events
  @ManyToOne(() => Event, (event) => event.inscription)
  @JoinColumn({ name: "event_id" })
  event!: Event;

}
