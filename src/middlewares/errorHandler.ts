import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (err: Error | QueryFailedError, req: Request, res: Response, next: NextFunction) => {
    if (err.message === "USER DOESNT EXIST") return res.status(404).json({ error: "USER_DOESNT_EXIST" });
    if (err.message === "LOGIN CREDENTIALS REQUIRED") return res.status(403).json({ error: "EMAIL_OR_PASSWORD_REQUIRED" });
    if (err.message === "BAD LOGIN CREDENTIALS") return res.status(403).json({ error: "BAD_LOGIN_CREDENTIALS" });
    if (err.message === "CAN NOT UPDATE WITH EMPTY FIELDS") return res.status(403).json({ error: "EMPTY FIELDS ARE NOT PERMITTED" });
    if (err.message === "WRONG CURRENT PASSWORD") return res.status(403).json({ error: "VERIFY_YOUR_PASSWORD" });
    if (err.message === "REGISTER CREDENTIALS REQUIRED") return res.status(403).json({ error: "ALL_FIELDS_REQUIRED" });
    if (err.message === "ALL FIELDS REQUIRED") return res.status(403).json({ error: "ALL_FIELDS_REQUIRED" });

    if(err.message === 'AUTH REQUIRED') return res.status(403).json({error: 'AUTH_REQUIRED'});
    if(err.message === 'ADMIN AUTH REQUIRED') return res.status(403).json({error: 'ADMIN_AUTH_REQUIRED'});

    // Error desconocido: imprimir y enviar estado HTTP 500
    console.error(err);
    return res.status(500).json({ error: "SERVER_ERROR" });
};