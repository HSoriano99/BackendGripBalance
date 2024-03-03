import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";

  import { User } from "../users/userModel";
  import { CarSpec } from "../car_specs/carSpecModel";
  
  @Entity("cars")
  export class Car {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    user_id!: number;
 
    @Column()
    car_image!: string;
  
    @Column()
    car_brand!: string;
  
    @Column()
    car_model!: string;

    @Column({ type: "enum", enum: ["street", "tracktool", "racecar"] })
    car_spec!: string;

    @Column({ type: "enum", enum: ["racing", "drifting", "timeattack"] })
    car_category!: string;

     // N:1 con Users
     @ManyToOne(() => User, (user) => user.car)
     @JoinColumn({name: "user_id", referencedColumnName: "id"})
     user!: User;
  
    // 1:1 con Inscriptions
    @OneToOne(() => CarSpec, (carSpec) => carSpec.car)
    carSpec?: CarSpec;
  }