import { Router } from "express";
import userRoute from "./modules/user/user.route";

const router = Router();

router.use("/user", userRoute);

export default router;