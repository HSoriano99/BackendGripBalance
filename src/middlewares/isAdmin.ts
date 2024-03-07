import { NextFunction, Request, Response } from "express";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

   const roles = req.tokenData.userRol;
 
   if (!roles.includes("admin")) {
    return next(new Error("ADMIN AUTH REQUIRED"));
   }

   next();
};
