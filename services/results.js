import { Op } from "sequelize";
import sequelize from "../config/database.js";
import { KgAssessment, StudentMarks, StudentResult } from "../models/index.js";

const createMarksResult = async (data) => {
  if (data.classMark && data.examMark) {
    const response = await StudentMarks.create({
      studentId: data?.studentId,
      subjectId: data?.subjectId,
      examScore: data?.examMark,
      classScore: data?.classMark,
      classScorePercentage: data?.classP,
      examScorePercentage: data?.examP,
      totalScore: data?.total,
      class: data?.class,
      term: data?.term,
      date: Date.now(),
    });
    return response;
  } 

  return ""
};

const createResult = async (data) => {
  const response = await StudentResult.create({
    studentId: data?.studentId, //
    rawScore: data?.rawScore, //
    passRawScore: data?.passRawScore, //
    totalRawScore: data?.totalRawScore, //
    classTotal: data?.classTotal, //
    resultStatus: data?.status, //
    promotedTo: data?.promotedTo, //
    class: data?.class, //
    term: data?.term, //
    conduct: data?.conduct, //
    attitude: data?.attitude, //
    interest: data?.interest, //
    teacherRemarks: data?.remarks, //
    date: Date.now(),
  });

  return response;
};

const removeResult = async (data) => {
  const response = await Promise.all([
    StudentMarks.destroy({
      where: {
        studentId: data?.studentId,
        class: data?.class,
        term: data?.term,
        date: {
          [Op.like]: `%${data?.date}%`,
        },
      },
    }),
    StudentResult.destroy({
      where: {
        studentId: data?.studentId,
        class: data?.class,
        term: data?.term,
        date: {
          [Op.like]: `%${data?.date}%`,
        },
      },
    }),
  ]);

  return response;
};

const getClassMarks = async (data) => {
  const query = `
    SELECT
      [student_marks_id] AS [studentMarksId],
      [subject_id] AS [subjectId],
      [student_id] AS [studentId],
      [exam_score] AS [examScore],
      [exam_score_percentage] AS [examScorePercentage],
      [class_score] AS [classScore],
      [class_score_percentage] AS [classScorePercentage],
      [total_score] AS [totalScore],
      [class],
      [remarks],
      [term],
      [date],
      (
        SELECT COUNT(*) + 1 
        FROM Student_marks s
        WHERE s.class=Student_marks.class
        AND s.term=Student_marks.term
        AND YEAR(s.date)=YEAR(Student_marks.date)
        AND s.subject_id=Student_marks.subject_id 
        AND s.total_score > Student_marks.total_score
    ) AS [subjectPosition]
    FROM
      [dbo].[Student_marks]
    WHERE
        [date] LIKE '%${data?.year}%'
      AND [class] = '${data?.class}'
      AND [term] = '${data?.term}'
  `;

  // const response = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  const results = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });

  return results;
};

// const getClassMarks = async (data) => {
//   const response = await StudentMarks.findAll({
//     where: {
//       class: data?.class,
//       term: data?.term,
//       [Op.and]: [
//         sequelize.literal(`date LIKE '%${data?.year}%'`)
//       ]
//     },
//   });

//   return response
// };

const getClassResult = async (data) => {
  const response = await StudentResult.findAll({
    attributes: {
      include: [
        [
          sequelize.literal("RANK() OVER (ORDER BY raw_score DESC)"),
          "position",
        ],
      ],
    },
    where: {
      class: data?.class,
      term: data?.term,
      [Op.and]: [sequelize.literal(`date LIKE '%${data?.year}%'`)],
    },
  });

  return response;
};

const getResults = async (indexNumber) => {
  const query = `
    SELECT 
        Subject.name AS name1, 
        exam_score_percentage, 
        class_score_percentage, 
        total_score,
        remarks,
        term,
        class,
        FORMAT(date, 'yyyy') AS year,
        section,
        (
            SELECT COUNT(*) + 1 
            FROM Student_marks s
            WHERE s.class=Student_marks.class
            AND s.term=Student_marks.term
            AND YEAR(s.date)=YEAR(Student_marks.date)
            AND s.subject_id=Student_marks.subject_id 
            AND s.total_score > Student_marks.total_score
        ) AS subject_position
    FROM Student_marks 
    LEFT JOIN Subject ON Student_marks.subject_id=Subject.subject_id 
    LEFT JOIN Class ON Student_marks.class = Class.name
    WHERE student_id = :indexNumber`;

  const results = await sequelize.query(query, {
    replacements: { indexNumber },
    type: sequelize.QueryTypes.SELECT,
  });
  return results;
};

const getNurseryResults = async (indexNumber) => {
  const results = await KgAssessment.findAll({
    where: {
      student_id: indexNumber,
    },
    attributes: {
      include: [[sequelize.literal(`FORMAT(date, 'yyyy')`), "formatted_date"]],
    },
  });

  return results;
};

const getResultDetails = async (indexNumber) => {
  const query = `
    SELECT 
    *,
    (SELECT COUNT(*) + 1 FROM Student_result s 
      WHERE s.class = Student_result.class
      AND s.term = Student_result.term
      AND YEAR(s.date) = YEAR(Student_result.date)
      AND s.raw_score > Student_result.raw_score
    ) AS position
    FROM Student_result 
    WHERE student_id = :indexNumber`;

  const results = await sequelize.query(query, {
    replacements: { indexNumber },
    type: sequelize.QueryTypes.SELECT,
  });
  return results;
};

export {
  getResults,
  getNurseryResults,
  getResultDetails,
  getClassResult,
  getClassMarks,
  createMarksResult,
  createResult,
  removeResult,
};
