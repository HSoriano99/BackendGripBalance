import { AppDataSource } from "../../database/data-source";
import { Car } from "./carModel";


export class CarController {

    async getCarsByUser(params: string){

        const userId = +params;
  
        const carRepository = AppDataSource.getRepository(Car);
  
        const cars = await carRepository.find({
          where: {user_id: userId},
          relations: {
            carSpec:true
          },
          select: {
            id: true,
            user_id: true,
            car_image: true,
            car_brand: true,
            car_model: true,
            car_spec: true,
            car_category: true,
            carSpec: {
                id: true,
                car_id: true,
                car_engine: true,
                car_tires: true,
                car_suspension: true,
                car_differential: true,
                car_aero: true
            }
          }
        })
        return(cars);
      } 

    async registerCar(req: Request) {

    }
}