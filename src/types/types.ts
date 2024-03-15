export interface CreateClientRequestBody {
  email: string;
  password: string;
  username: string;
}
export interface TokenData {
  userId: string;
  userRol: string;
  userName?: string;
  userFirstName?: string;
  userLastName?: string;
  userPhoneNumber?: string;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface UpdatePasswordBody {
  current_password: string;
  new_password: string;
}

export interface UpdateDataBody {
  email?: string ;
  username?: string ;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
}

export interface CarSpecBody {
  car_aero?: string ;
  car_engine?: string ;
  car_suspension?: string;
  car_tires?: string;
  car_differential?: string;
}

export interface RegisterCarAndCarSpecBody {
  car_aero?: string ;
  car_engine?: string ;
  car_suspension?: string;
  car_tires?: string;
  car_differential?: string;
  car_brand?: string;
  car_model?: string;
  car_spec?: string;
  car_category?: string;
  car_image?: string;
}