import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";


const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);

export {
    router as authRouter
}