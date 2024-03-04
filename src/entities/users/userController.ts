import { Request, Response } from "express";
import { User } from "../users/userModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/data-source";
import {
  CreateClientRequestBody,
  LoginUserRequestBody,
  TokenData,
  UpdateDataUser,
} from "../../types/types";

export class UserController {
  async registerUser(
    //Proceso de registro de nuevo cliente
    req: Request<{}, {}, CreateClientRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { username, password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      //Crear nuevo usuario
      const newUser = userRepository.create({
        username,
        email,
        password_hash: bcrypt.hashSync(password, 10),
        role_name: "client",
      });
      await userRepository.save(newUser);

      res.status(201).json(newUser);
    } catch (error: any) {
      console.error("Error while creating user:", error);
      res.status(500).json({
        message: "Error while creating user",
        error: error.message,
      });
    }
  }

  async login(
    req: Request<{}, {}, LoginUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      // Validar existencia de email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
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

      // Verificar usuario inexistente
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Verificar contraseña si el usuario existe
      const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

      // Verificar contraseña valida
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Generar token

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRol: user.role_name as string,
        userName: user.username as string,
        userFirstName: user.first_name as string,
        userLastName: user.last_name as string,
        userPhoneNumber: user.phone_number as string,
      };

      const token = jwt.sign(tokenPayload, "123", {
        expiresIn: "3h",
      });

      res.status(StatusCodes.OK).json({
        message: "Login successfully",
        token,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
    //   const data: UpdateDataUser = req.body;
      let data = req.body;
      const password = bcrypt.hashSync(data?.new_password, 10)

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: {
          id: id,
        },
        select: {
          password_hash: true,
        },
      });
      const actualPasswordHash = user?.password_hash as string;

      const isPasswordValid = bcrypt.compareSync(data?.actual_password, actualPasswordHash);

      if (data?.actual_password !== "" && data?.new_password !== "" && isPasswordValid ) {
        data = {
            password_hash: password
        }
        await userRepository.update({ id: id }, data);

        res.status(202).json({
          message: "User updated successfully with new password",
        });
      } else {
        res.status(500).json({
          message: "Error while updating password",
        });
      };

      
    } catch (error) {
      res.status(500).json({
        message: "Error while updating user",
      });
    }
  }
}
