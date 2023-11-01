import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import { VendorPayLoad } from "../dto";
import { Request } from "express";
import { AuthPayload } from "../dto/Auth.dto";

const saltRounds = 10;

export const GenerateSalt = async () => {

  return await bcrypt.genSalt(saltRounds);
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  savedPassword: string,
  enteredPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const generateWebToken = async (payload: VendorPayLoad) => {
  const secret = process.env.SECRET_KEY;

  return Jwt.sign(payload, secret!, { expiresIn: "1d" });
};

export const validateWebToken = async (req: Request) => {
  const secret = process.env.SECRET_KEY;

  const token = req.get("Authorization");

  if (token) {
    const payload = Jwt.verify(
      token.split(" ")[1],
      secret!
    ) as AuthPayload;

    req.user = payload;
    return true;
  }

  return false;
};
