import { AppDataSource } from "../../database/data-source";
import { RegisterCarAndCarSpecBody } from "../../types/types";
import { CarSpec } from "../car_specs/carSpecModel";
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

  async registerUserCarWithCarSpecs(params: string, body: RegisterCarAndCarSpecBody) {
    const userId = +params;
    const {car_brand, car_model, car_spec, car_category, car_image, car_aero, car_engine, car_suspension, car_tires, car_differential} = body;

    // Validar existencia de los campos recogidos
    if (!car_brand || !car_model || !car_spec || !car_category || !car_image || !car_aero || !car_engine || !car_suspension || !car_tires || !car_differential) {
      throw new Error("ALL FIELDS REQUIRED");
    }

    const carRepository = AppDataSource.getRepository(Car);
    const carSpecRepository = AppDataSource.getRepository(CarSpec);

    //Crear nuevo coche
    const newCar = carRepository.create({
      user_id: userId,
      car_brand,
      car_model,
      car_image,
      car_spec,
      car_category
    });
    await carRepository.save(newCar);

    //Crear nueva carSpec para el coche recien creado
    const carId = newCar.id
    const newCarSpec = carSpecRepository.create({
      car_id: carId,
      car_aero,
      car_engine,
      car_suspension,
      car_tires,
      car_differential
    });
    await carSpecRepository.save(newCarSpec);

    return(newCarSpec)

  }

  async registerUserCar(params: string, body: RegisterCarAndCarSpecBody) {
    const userId = +params;
    const {car_brand, car_model, car_spec, car_category, car_image} = body;

    // Validar existencia de los campos recogidos
    if (!car_brand || !car_model || !car_spec || !car_category || !car_image) {
      throw new Error("ALL FIELDS REQUIRED");
    }

    const carRepository = AppDataSource.getRepository(Car);

    //Crear nuevo coche
    const newCar = carRepository.create({
      user_id: userId,
      car_brand,
      car_model,
      car_image,
      car_spec,
      car_category
    });
    await carRepository.save(newCar);

    return(newCar)

  }
}
