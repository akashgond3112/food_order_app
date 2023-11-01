import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  addFood,
  getAllFoods,
  getProfile,
  logIn,
  logOut,
  updateProfile,
  updateService,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "images");
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString() + `_` + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", logIn);
router.post("/logout", logOut);

router.get("/profile", Authenticate, getProfile);
router.patch("/profile", Authenticate, images, updateProfile);
router.patch("/service", Authenticate, updateService);

router.post("/food", Authenticate, images, addFood);
router.get("/foods", Authenticate, getAllFoods);

export { router as VendorRoutes };
