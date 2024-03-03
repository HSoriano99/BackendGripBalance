import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
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
  event_id!: number;

  @Column()
  price?: string;

  // 1:1 con Users
  @OneToOne(() => User, (user) => user.inscription)
  @JoinColumn({ name: "user_id" })
  user!: User;

  // 1:1 con Events
  @OneToOne(() => Event, (event) => event.inscription)
  @JoinColumn({ name: "event_id" })
  event!: Event;

}
