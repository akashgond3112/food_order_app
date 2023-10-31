import expres, { Request, Response, NextFunction } from "express";
import { UpdateVendorDtoInput, VendorCredentials } from "../dto";
import { FindVendor } from "./AdminController";
import { ValidatePassword, generateWebToken } from "../utilities";

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorCredentials>req.body;
  const existingVendor = await FindVendor(undefined, email);

  if (existingVendor !== null) {
    const validation = await ValidatePassword(
      existingVendor!.password,
      password,
      existingVendor!.salt
    );

    if (validation) {
      const token = await generateWebToken({
        _id: existingVendor!.id,
        email: existingVendor!.email,
        name: existingVendor!.name,
        foodType: existingVendor!.foodType,
      });

      return res.json(token);
    } else {
      return res.json({
        message: "Login un-successfull, password dosen't match!",
      });
    }
  }

  return res.json({
    message: `Not able to find the user wiht email : ${email}`,
  });
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "Method not implemented!" });
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingUser = await FindVendor(user._id);
    return res.json(existingUser);
  } else {
    return res.json({ message: "User not found" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, ownerName, address, foodType, phone, pincode } = <
    UpdateVendorDtoInput
  >req.body;
  const user = req.user;
  if (user) {
    const existingUser = await FindVendor(user._id);

    if (existingUser !== null) {
      if (name) existingUser!.name = name;
      if (ownerName) existingUser!.ownerName = ownerName;
      if (address) existingUser!.address = address;
      if (foodType) existingUser!.foodType = foodType;
      if (phone) existingUser!.phone = phone;
      if (pincode) existingUser!.pincode = pincode;

      const updatedProfile = await existingUser?.save();
      return res.json(updatedProfile);
    } else {
      return res.json({ message: "User not found" });
    }
  } else {
    return res.json({ message: "User not found" });
  }
};

export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
