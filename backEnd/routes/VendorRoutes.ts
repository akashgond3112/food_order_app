import expres, { Request, Response, NextFunction } from "express";
import {
  getProfile,
  logIn,
  logOut,
  updateProfile,
  updateService,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = expres.Router();

router.post("/login", logIn);
router.post("/logout", logOut);

router.use(Authenticate);
router.get("/profile", getProfile);
router.patch("/profile", updateProfile);
router.patch("/service", updateService);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Admin." });
});

export { router as VendorRoutes };
