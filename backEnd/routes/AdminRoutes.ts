import expres, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendorById, GetVendors } from "../controllers";

const router = expres.Router()

router.post("/vendor", CreateVendor)
router.get("/vendor", GetVendors)
router.get("/vendor/:id", GetVendorById)


export {router as AdminRoutes}