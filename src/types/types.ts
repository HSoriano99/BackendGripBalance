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

export interface UpdateCarSpecBody {
  car_aero?: string ;
  car_engine?: string ;
  car_suspension?: string;
  car_tires?: string;
  car_differential?: string;
}