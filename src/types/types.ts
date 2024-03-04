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

export interface UpdateDataUser {
  email: string ;
  password: string ;
  username: string ;
  phone_number: string ;
}