import express, { Request, Response, NextFunction } from "express";
import { UpdateVendorDtoInput, VendorCredentials, VendorPayLoad } from "../dto";
import { FindVendor } from "./AdminController";
import { ValidatePassword, generateWebToken } from "../utilities";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food } from "../model";

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
  const user: VendorPayLoad | undefined = req.user;
  if (user) {
    const existingUser = await FindVendor(user._id);

    if (existingUser !== null) {
      if (name) existingUser!.name = name;
      if (ownerName) existingUser!.ownerName = ownerName;
      if (address) existingUser!.address = address;
      if (foodType) existingUser!.foodType = foodType;
      if (phone) existingUser!.phone = phone;
      if (pincode) existingUser!.pincode = pincode;

      // Handle cover image update
      if (req.files !== undefined) {
        const files = req.files as [Express.Multer.File];
        const imagesName = files.map(
          (file: Express.Multer.File) => file.filename
        );
        existingUser!.coverImages.push(...imagesName);
      }

      const updatedProfile = await existingUser?.save();
      return res.status(200).json(updatedProfile);
    } else {
      return res.json({ message: "User not found" });
    }
  } else {
    return res.json({ message: "User not found" });
  }
};

export const updateProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: VendorPayLoad | undefined = req.user;
  if (user) {
    const existingUser = await FindVendor(user._id);

    if (existingUser !== null) {
      // Handle files
      const files = req.files as [Express.Multer.File];
      const imagesName = files.map(
        (file: Express.Multer.File) => file.filename
      );

      existingUser!.coverImages.push(...imagesName);

      const updatedProfile = await existingUser?.save();
      return res.status(200).json(updatedProfile);
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
) => {
  const user: VendorPayLoad | undefined = req.user;
  if (user) {
    const existingUser = await FindVendor(user._id);

    if (existingUser !== null) {
      existingUser!.serviceAvailable = !existingUser!.serviceAvailable;

      const updatedProfile = await existingUser?.save();
      return res.status(200).json(updatedProfile);
    } else {
      return res.json({ message: "User not found" });
    }
  } else {
    return res.json({ message: "User not found" });
  }
};

export const addFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: VendorPayLoad | undefined = req.user;
  if (user) {
    const { description, foodType, category, name, readyTime, price } = <
      CreateFoodInputs
    >req.body;

    const existingUser = await FindVendor(user._id);

    if (existingUser !== null) {
      // Handle files
      const files = req.files as [Express.Multer.File];
      const imagesName = files.map(
        (file: Express.Multer.File) => file.filename
      );

      const createdFood = await Food.create({
        vendorId: existingUser!._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        readyTime: readyTime,
        price: price,
        rating: 0,
        images: imagesName,
      });

      existingUser!.foods.push(createdFood);
      const result = await existingUser!.save();

      res.status(201).json(result);
    } else {
      return res.json({ message: "User not found" });
    }
  } else {
    return res.json({
      message: "Something went wrong while getting the food.",
    });
  }
};

export const getAllFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: VendorPayLoad | undefined = req.user;
  if (user) {
    const foods = await Food.find({ vendorId: user._id });
    if (foods !== null) {
      return res.json(foods);
    } else {
      return res.json({ message: "There is not item found for the vendor." });
    }
  } else {
    return res.json({ message: "User not found" });
  }
};
