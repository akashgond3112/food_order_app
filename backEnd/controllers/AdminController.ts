import expres, { Request, Response, NextFunction } from "express";
import { VendorDtoInput } from "../dto";
import { Vendor } from "../model";
import { GeneratePassword, GenerateSalt } from "../utilities";

export const FindVendor = async (id: string | undefined, email?: string) => {
  let existingVendor;

  if (email) {
    existingVendor = await Vendor.findOne({ email: email });
  } else {
    existingVendor = await Vendor.findById(id);
  }

  if (existingVendor != null) return existingVendor;
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <VendorDtoInput>req.body;

  const existingVendor = await FindVendor(undefined, email);

  if (existingVendor !== null) {
    return res.json(existingVendor);
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
    pincode: pincode,
    address: address,
    phone: phone,
    email: email,
    password: userPassword,
    salt: salt,
    serviceAvailable: true,
    coverImages: [],
    rating: 5,
  });

  return res.json(createVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return res.json(vendors);
  } else {
    return res.json({ message: "No vendors exists" });
  }
};

export const GetVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  if (id == null) {
    return res.json({ message: "Vendor Id should not be null!" });
  }

  const existingVendor = await FindVendor(id);

  if (existingVendor !== null) {
    return res.json(existingVendor);
  } else {
    return res.json({ message: "No vendor exists" });
  }
};
