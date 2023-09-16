import { Router } from "express";
import { signin, signinManagement, signup } from "../controllers/authController.js";


const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/signin-management", signinManagement);

export {
    router as authRouter
}