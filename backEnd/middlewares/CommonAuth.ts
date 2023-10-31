import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { validateWebToken } from "../utilities";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateWebToken(req);

  if (validate) {
    next();
  } else {
    return res.status(403).json({ message: "User is not Authorized" });
  }
};
