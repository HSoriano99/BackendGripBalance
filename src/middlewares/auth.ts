import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenData } from "../types/types";

// -----------------------------------------------------------------------------

export const auth = (req: Request, res: Response, next: NextFunction) => {
  

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new Error('AUTH REQUIRED'));
  }

  // Decodificar el token
  const decoded = jwt.verify(token, "123") as JwtPayload;

  // Modificar el objeto Request con los datos del payload

  const decodedPayload: TokenData = {
    userId: decoded.userId,
    userRol: decoded.userRol,
  };

  req.tokenData = decodedPayload;

  next();
};
