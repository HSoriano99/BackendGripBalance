import { AppDataSource } from "../../database/data-source";
import { Car } from "./carModel";

export class CarController {
  async getCarsByUser(params: string, query: any) {
    let { page, limit } = query;

    let currentPage = page ? +page : 1;
    let itemsPerPage = limit ? +limit : 3;

    const userId = +params;

    const carRepository = AppDataSource.getRepository(Car);

    const [allCars, count] = await carRepository.findAndCount({
      where: { user_id: userId },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      relations: {
        carSpec: true,
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
          car_aero: true,
        },
      },
    });

    const response = {
      totalCars: count,
      limit: itemsPerPage,
      page: currentPage,
      results: allCars,
    };
    return response;
  }

  async registerUserCar(req: Request) {}
}
