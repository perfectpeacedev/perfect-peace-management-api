import { Router } from "express";
import { fetchNews, fetchUserDetails, resetPin, updatePassword } from "../controllers/generalController.js";
import { authenticateUser } from "../utils/middlewares.js";
import { fetchClass, fetchSubject } from "../controllers/onlyTeacherController.js";

const router = Router();

router.get("/news", authenticateUser, fetchNews);
router.get("/user-details", authenticateUser, fetchUserDetails);
router.get("/get-pin", resetPin);
router.get("/class", fetchClass);
router.get("/subject", fetchSubject);

router.post('/update-password', updatePassword);

export {router as generalRouter};