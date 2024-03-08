import { User } from "../users/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source";
import {
  CreateClientRequestBody,
  LoginUserRequestBody,
  TokenData,
  UpdateDataBody,
  UpdatePasswordBody,
} from "../../types/types";

export class UserController {
  async registerUser(req: CreateClientRequestBody) {

    const { username, password, email } = req;

    const userRepository = AppDataSource.getRepository(User);
      //Crear nuevo usuario
      const newUser = userRepository.create({
        username,
        email,
        password_hash: bcrypt.hashSync(password, 10),
        role_name: "client",
      });
      await userRepository.save(newUser);
      //Creamos un nuevo objeto de respuesta para no sacar del controlador el password_hash del nuevo usuario.
      return {
        username: newUser.username,
        email: newUser.email,
        role_name: newUser.role_name
        };
  }

  async login(req : LoginUserRequestBody) {

    const { password, email } = req;

    const userRepository = AppDataSource.getRepository(User);

      // Validar existencia de email y contraseña
      if (!email || !password) {
        throw new Error("LOGIN CREDENTIALS REQUIRED");
      }
      // Encontrar un usuario por email
      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        select: {
          id: true,
          password_hash: true,
          role_name: true,
          username: true,
          first_name: true,
          last_name: true,
          phone_number: true,
        },
      });

      // Verificar contraseña si el usuario existe
      const isPasswordValid = bcrypt.compareSync(password, user!.password_hash);

      // Verificar contraseña valida
      if (!isPasswordValid) {
        throw new Error("BAD LOGIN CREDENTIALS");
        };
    
    // Generar token

      const tokenPayload: TokenData = {
        userId: user?.id?.toString() as string,
        userRol: user?.role_name as string,
        userName: user?.username as string,
        userFirstName: user?.first_name as string,
        userLastName: user?.last_name as string,
        userPhoneNumber: user?.phone_number as string,
      };

      const token = jwt.sign(tokenPayload, "123", {
        expiresIn: "3h",
      });

      return token;
    }
  

  async updatePassword(params: string, body: UpdatePasswordBody){

      const id = +params;
    
      let data = body;

      if (data.current_password === "" || data.new_password === "" ) {
        throw new Error("CAN NOT UPDATE WITH EMPTY FIELDS");
      }

      const newPasswordHash = bcrypt.hashSync(data?.new_password, 10)

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: {
          id: id,
        },
        select: {
          password_hash: true,
        },
      });
      const currentPasswordHash = user?.password_hash as string;

      const isPasswordValid = bcrypt.compareSync(data?.current_password, currentPasswordHash);

      if ( isPasswordValid === true) {
        const userData = {
            password_hash: newPasswordHash
        }
        await userRepository.update({ id: id }, userData);

        return({message: "User updated successfully with new password", userData});
      } else {
        throw new Error("WRONG CURRENT PASSWORD");
      }
  }

  async updateUser(params: string, body: UpdateDataBody){

      const id = +params;
    
      let data = body;

      const userRepository = AppDataSource.getRepository(User);

      if (data.email === "" || data.first_name === "" || data.last_name === "" || data.phone_number === "" || data.username === "" ) {
        throw new Error("CAN NOT UPDATE WITH EMPTY FIELDS");
      }
       
      await userRepository.update({ id: id }, data);

      return({message: "User updated successfully"});
    } 

    async getCompleteUser(params: string){//hacer formato similar para allUsers de vista Admin

      const id = +params;

      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: {id: id},
        relations: {
          //retirar las relaciones con car e inscriptions e incluir una llamada paginada a cada entidad.
          car:true,
          inscription:true,
        },
        select: {
          id:true,
          username:true,
          email:true,
          first_name:true,
          last_name:true,
          phone_number:true,
          car:{
            id:true,
            car_brand:true,
            car_model:true,
            car_spec: true,
            car_category:true,
          },
          inscription:{
            id:true,
            price:true,
            event_id:true,
            car_id:true
          }
        }
      })
      return(user);
    } 


}
