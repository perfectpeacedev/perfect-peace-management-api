import { Router } from "express";
import {
  addBusFee,
  addClass,
  addExpense,
  addExtraClasses,
  addFee,
  addFeeding,
  addResult,
  addSalary,
  addSalaryPayment,
  addStaff,
  addStudent,
  addSubject,
  assignSalary,
  deleteAttendance,
  deleteBusFee,
  deleteClass,
  deleteExpense,
  deleteExtraClasses,
  deleteFee,
  deleteFeeding,
  deleteResult,
  deleteSalary,
  deleteSalaryPayment,
  deleteStaff,
  deleteStudent,
  deleteSubject,
  fetchAllStaff,
  fetchAllStudents,
  fetchAllowances,
  fetchAttendance,
  fetchBusFee,
  fetchClassMarks,
  fetchClassResult,
  fetchDeductions,
  fetchEmployeeSalary,
  fetchExpense,
  fetchExtraClasses,
  fetchFeeding,
  fetchFees,
  fetchNews,
  fetchOneFee,
  fetchOneSalary,
  fetchOneStudentResult,
  fetchSalary,
  fetchSalaryPayment,
  fetchUserDetails,
  markAttendance,
  resetPin,
  updatePassword,
  updateStaff,
  updateStudent,
} from "../controllers/generalController.js";
import { authenticateUser } from "../utils/middlewares.js";
import {
  fetchClass,
  fetchSubject,
} from "../controllers/onlyTeacherController.js";

const router = Router();

router.get("/news", authenticateUser, fetchNews);
router.get("/user-details", authenticateUser, fetchUserDetails);
router.get("/get-pin", resetPin);
router.get("/class", fetchClass);
router.get("/subject", fetchSubject);

router.get("/events", fetchNews);
router.get("/students", fetchAllStudents);
router.get("/staff", fetchAllStaff);
router.get("/student-results", fetchClassResult);
router.get("/student-marks", fetchOneStudentResult);
router.get("/student-attendance", fetchAttendance);
router.get("/fees", fetchFees);
router.get("/fees/:fee_id", fetchOneFee);
router.get("/feeding", fetchFeeding);
router.get("/expense", fetchExpense);
router.get("/extra-classes", fetchExtraClasses);
router.get("/bus-fee", fetchBusFee);
router.get("/salary", fetchSalary);
router.get("/deductions", fetchDeductions);
router.get("/allowances", fetchAllowances);
router.get("/salary/:salary_id", fetchOneSalary);
router.get("/salary-payment", fetchSalaryPayment);
router.get("/employee-salary", fetchEmployeeSalary);
// router.get("/teachers-weekly-report", fetchWeeklyReport);

router.post("/add-student", addStudent);
router.post("/add-class", addClass);
router.post("/add-staff", addStaff);
router.post("/add-result", addResult);
router.post("/add-fee", addFee);
router.post("/add-subject", addSubject);
router.post("/add-salary", addSalary);
router.post("/add-salary-payment", addSalaryPayment);
router.post("/add-expense", addExpense);
router.post("/add-feeding", addFeeding);
router.post("/add-bus-fee", addBusFee);
router.post("/add-extra-classes", addExtraClasses);
// router.post("/ass-teachers-weekly-report", addWeeklyReport);
// router.post("/add-event", addEvent);

router.post("/mark-attendance", markAttendance);
router.post("/delete-attendance", deleteAttendance);
router.post("/assign-salary", assignSalary);

router.put("/update-student/:student_id", updateStudent);
router.put("/update-staff/:teacher_id", updateStaff);

router.delete("/delete-student/:student_id", deleteStudent);
router.delete("/delete-staff/:teacher_id", deleteStaff);
router.delete("/delete-class/:class_id", deleteClass);
router.delete("/delete-result", deleteResult);
router.delete("/delete-fee/:fee_id", deleteFee);
router.delete("/delete-subject/:subject_id", deleteSubject);
router.delete("/delete-salary/:salary_id", deleteSalary);
router.delete("/delete-salary-payment/:payment_id", deleteSalaryPayment);
router.delete("/delete-expense/:expense_id", deleteExpense);
router.delete("/delete-feeding/:feeding_id", deleteFeeding);
router.delete("/delete-extra-classes/:extraclasses_id", deleteExtraClasses);
router.delete("/delete-bus-fee/:busfee_id", deleteBusFee);

router.post("/update-password", updatePassword);

export { router as generalRouter };
