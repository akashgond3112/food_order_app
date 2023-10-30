import expres, { Request, Response, NextFunction } from "express";
import { VendorDtoInput } from "../dto";

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerNmae,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <VendorDtoInput>req.body;

  return res.json({
    name,
    ownerNmae,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  });
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
