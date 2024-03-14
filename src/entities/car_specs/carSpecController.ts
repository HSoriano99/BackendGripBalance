import { AppDataSource } from "../../database/data-source";
import { UpdateCarSpecBody } from "../../types/types";
import { CarSpec } from "./carSpecModel";

export class CarSpecController{
    async updateCarSpecs(params: string, body: UpdateCarSpecBody){
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



}