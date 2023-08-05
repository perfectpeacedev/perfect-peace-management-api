import { getBusFee, getExpense, getExtraClasses, getFeeding } from "../services/account.js";
import { createClassAttendance, deleteAttendance, getAttendance } from "../services/attendance.js";
import { createClass } from "../services/classes.js";
import { createFee, getFeesData, getOneFee, removeFee } from "../services/fee.js";
import { getNews } from "../services/news.js";
import { getOneAllowance, getOneDeduction, getOneSalary, getSalary, removeAllowance, removeDeductions, removeSalary } from "../services/payroll.js";
import {
  getStudentContact,
  getTeacherContact,
  sendResetPin,
} from "../services/resetPin.js";
import {
  createMarksResult,
  createResult,
  getClassMarks,
  getClassResult,
  removeResult,
} from "../services/results.js";
import {
  createStaff,
  editStaff,
  getStaff,
  removeStaff,
} from "../services/staff.js";
import { createSubject, removeSubject } from "../services/subject.js";
import {
  createStudent,
  editStudent,
  getStudents,
  removeStudent,
} from "../services/test.js";
import {
  changeStudentPassword,
  changeTeacherPassword,
  getStudentDetails,
  getTeacherDetails,
} from "../services/user.js";

//management
const fetchAllStudents = async (req, res, next) => {
  try {
    const data = await getStudents();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchAllStaff = async (req, res, next) => {
  try {
    const data = await getStaff();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchClassMarks = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getClassMarks(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//not complete
const fetchAttendance = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getAttendance(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchFees = async (req, res, next) => {
  const values = req.query;
  try {
    //sample  values
    // const values = {
    //   dateStart: '2022-09-26',
    //   dateEnd: '2023-02-01',
    //   all: false,
    //   term: ""
    // }
    const data = await getFeesData(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchOneFee = async (req, res, next) => {
  const id = req.params.fee_id;
  try {
    const data = await getOneFee(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchClassResult = async (req, res, next) => {
  const values = req.query;
  try {
    const results = await getClassResult(values);
    const marks = await getClassMarks(values);

    const data = results.map((result) => {
        const { studentId } = result.dataValues;
        const studentMarks = marks.filter((mark) => {
            if (mark.studentId === studentId) {
              return mark;
            }
        });

        return {
        ...result.dataValues,
          marks: studentMarks,
        };
    })

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchFeeding = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getFeeding(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchExpense = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getExpense(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchExtraClasses = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getExtraClasses(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchBusFee = async (req, res, next) => {
  const values = req.query;
  try {
    const data = await getBusFee(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchSalary = async (req, res, next) => {
  try {
    const data = await getSalary();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchOneSalary = async (req, res, next) => {
  const id = req.params.salary_id;
  try {
    const salary = await getOneSalary(id);
    const deductions = await getOneDeduction(id);
    const allowances = await getOneAllowance(id);

    const data = {
      ...salary,
      ...deductions,
      ...allowances,
    }
    res.json(data);
  } catch (error) {
    next(error)
  }
}

const addStudent = async (req, res, next) => {
  const values = req.body;
  try {
    const data = await createStudent(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addStaff = async (req, res, next) => {
  const values = req.body;
  console.log(values);
  try {
    const data = await createStaff(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addClass = async (req, res, next) => {
  const values = req.body;
  console.log(values);
  try {
    const data = await createClass(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addSubject = async (req, res, next) => {
  const values = req.body;
  console.log(values);
  try {
    const data = await createSubject(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addFee = async (req, res, next) => {
  const values = req.body;
  console.log(values);
  try {
    const data = await createFee(values);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addResult = async (req, res, next) => {
  const values = req.body;
  const marksData = values?.results;
  try {
    const promises = marksData?.map((mark) => createMarksResult(mark));
    const results = await Promise.allSettled([
      ...promises,
      createResult(values),
    ]);
    return results;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const markAttendance = async (req, res, next) => {
  const values = req.body;

  try {
    // await deleteAttendance(values);
    // const promises = values?.map((mark) => createClassAttendance(mark));
    // const results = await Promise.allSettled([
    //   ...promises
    // ]);
    // return results;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  const values = req.body;
  const student_id = req.params.student_id;

  try {
    const data = await editStudent(values, student_id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStaff = async (req, res, next) => {
  const values = req.body;
  const teacher_id = req.params.teacher_id;

  try {
    const data = await editStaff(values, teacher_id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  const student_id = req.params.student_id;

  try {
    const data = await removeStudent(student_id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteStaff = async (req, res, next) => {
  const teacher_id = req.params.teacher_id;

  try {
    const data = await removeStaff(teacher_id);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteResult = async (req, res, next) => {
  const info = req.params.info;
  const infoArr = info.split("_");
  const values = {
    studentId: infoArr[0],
    class: infoArr[1],
    term: infoArr[2],
    date: infoArr[3],
  };

  try {
    const data = await removeResult(values);
    res, json(data);
  } catch (error) {
    console.log(error);
    next(error)
  }
};

const deleteFee = async (req, res, next) => {
  const id = req.params.fee_id;
  try {
    const data = await removeFee(id);
    res.json(data);
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const deleteSubject = async (req, res, next) => {
  const id = req.params.subject_id;
  try {
    const data = await removeSubject(id);
    res.json(data);
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const deleteSalary = async (req, res, next) => {
  const id = req.params.salary_id;
  try {
    const data = await Promise.allSettled([
      removeDeductions(id),
      removeAllowance(id),
      removeSalary(id)
    ]);
    res.json(data);
  } catch (error) {
    console.log(error)
    next(error)
  }
}

//portal
const fetchNews = async (req, res, next) => {
  try {
    const data = await getNews();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchUserDetails = async (req, res, next) => {
  const { userRole, id } = req.params.user;

  try {
    if (!userRole) {
      throw new Error("Not loggedn");
    }

    if (userRole === "STAFF") {
      const data = await getTeacherDetails(id);
      res.json(data);
    } else {
      const data = await getStudentDetails(id);
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const resetPin = async (req, res, next) => {
  const { userRole, id } = req.params.user;
  let contact = "";
  try {
    if (!userRole) {
      throw new Error("Not loggedn");
    }

    if (userRole === "STAFF") {
      contact = await getTeacherContact(id);
    } else {
      contact = await getStudentContact(id);
    }

    const data = await sendResetPin([contact]);

    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { userRole, id } = req.params.user;
  const { password } = req.body;
  let response;

  try {
    if (!userRole) {
      throw new Error("Not loggedn");
    }

    if (userRole === "STAFF") {
      response = await changeTeacherPassword(id, password);
    } else {
      response = await changeStudentPassword(id, password);
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  fetchAllStudents,
  fetchAllStaff,
  fetchClassResult,
  fetchClassMarks,
  fetchAttendance,
  fetchFees,
  fetchOneFee,
  fetchFeeding,
  fetchExpense,
  fetchExtraClasses,
  fetchBusFee,
  fetchSalary,
  fetchOneSalary,

  addStudent,
  addStaff,
  addClass,
  addResult,
  addFee,
  addSubject,

  updateStudent,
  updateStaff,

  deleteStudent,
  deleteStaff,
  deleteResult,
  deleteFee,
  deleteSubject,
  deleteSalary,

  markAttendance,

  fetchNews,
  fetchUserDetails,
  resetPin,
  updatePassword,
};
