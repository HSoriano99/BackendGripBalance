export interface CreateClientRequestBody {
  email: string;
  password: string;
  username: string;
}
export interface TokenData {
  userId: string;
  userRol: string;
  userName: string;
  userFirstName: string;
  userLastName: string;
  userPhoneNumber: string;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface UpdatePasswordBody {
  current_password: string;
  new_password: string;
}

export interface IdParams {
  id: string;
}

export interface UpdateDataBody {
  email: string ;
  password: string ;
  username: string ;
  phone_number: string ;
}