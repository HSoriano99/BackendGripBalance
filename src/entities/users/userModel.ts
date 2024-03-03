import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Car } from "../cars/carModel";
import { Inscription } from "../inscriptions/inscModel";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ["admin", "client"] })
  role_name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password_hash!: string;

  @Column()
  username!: string;

  @Column()
  first_name?: string;

  @Column()
  last_name?: string;

  @Column()
  phone_number?: string;

  // 1:N con Cars
  @OneToMany(() => Car, (car) => car.user)
  car?: Car;

  // 1:1 con Inscriptions
  @OneToOne(() => Inscription, (inscription) => inscription.user)
  inscription?: Inscription;

 
}
