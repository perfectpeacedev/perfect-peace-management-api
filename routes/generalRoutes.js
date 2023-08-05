import { Router } from "express";
import { addClass, addResult, addStaff, addStudent, deleteResult, deleteStaff, deleteStudent, fetchAllStaff, fetchAllStudents, fetchAttendance, fetchClassMarks, fetchClassResult, fetchFees, fetchNews, fetchUserDetails, markAttendance, resetPin, updatePassword, updateStaff, updateStudent } from "../controllers/generalController.js";
import { authenticateUser } from "../utils/middlewares.js";
import { fetchClass, fetchSubject } from "../controllers/onlyTeacherController.js";

const router = Router();

router.get("/news", authenticateUser, fetchNews);
router.get("/user-details", authenticateUser, fetchUserDetails);
router.get("/get-pin", resetPin);
router.get("/class", fetchClass);
router.get("/subject", fetchSubject);

router.get("/students", fetchAllStudents);
router.get("/staff", fetchAllStaff);
router.get("/student-results", fetchClassResult);
router.get("/student-marks", fetchClassMarks);
router.get("/student-attendance", fetchAttendance);
router.get("/fees", fetchFees);

router.post("/add-student", addStudent);
router.post("/add-class", addClass);
router.post("/add-staff", addStaff);
router.post("/add-result", addResult);

router.post("/mark-attendance", markAttendance);

router.put("/update-student/:student_id", updateStudent);
router.put("/update-staff/:teacher_id", updateStaff);

router.delete("/delete-student/:student_id", deleteStudent);
router.delete("/delete-staff/:teacher_id", deleteStaff);
router.delete("/delete-staff/:info", deleteResult);

router.post('/update-password', updatePassword);


export {router as generalRouter};