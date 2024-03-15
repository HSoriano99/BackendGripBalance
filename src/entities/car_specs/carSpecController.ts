import { AppDataSource } from "../../database/data-source";
import { CarSpecBody } from "../../types/types";
import { CarSpec } from "./carSpecModel";

export class CarSpecController{
    async updateCarSpecs(params: string, body: CarSpecBody){
        const carSpecRepository = AppDataSource.getRepository(CarSpec);

        const id = +params;

        if (body.car_aero === "" ||
        body.car_engine === "" ||
        body.car_suspension === "" ||
        body.car_tires === "" ||
        body.car_differential === ""
        ) {
            throw new Error("CAN NOT UPDATE WITH EMPTY FIELDS");
        }

        await carSpecRepository.update({ car_id: id }, body);

        return { message: "Car Specs updated successfully" };
    }

    async registerCarSpec(params: string, body: CarSpecBody) {
        const id = +params;
        const {car_aero, car_engine, car_suspension, car_tires, car_differential} = body;
    
        // Validar existencia de los campos recogidos
        if (!car_aero || !car_engine || !car_suspension || !car_tires || !car_differential) {
          throw new Error("ALL FIELDS REQUIRED");
        }
    
        const carSpecRepository = AppDataSource.getRepository(CarSpec);
    
        //Crear nuevo coche
        const newCarSpec = carSpecRepository.create({
          car_id: id,
          car_aero,
          car_engine,
          car_suspension,
          car_tires,
          car_differential
        });
        await carSpecRepository.save(newCarSpec);
    
        return(newCarSpec)
    
      }



}