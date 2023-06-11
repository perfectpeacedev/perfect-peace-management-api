import sequelize from "../config/database.js";
import { KgAssessment } from "../models/index.js";


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
        type: sequelize.QueryTypes.SELECT
    });


    return results;
    
}


const getNurseryResults = async (indexNumber) => {
        const results = await KgAssessment.findAll({
        where: {
            student_id: indexNumber
        },
        attributes: { include: [[sequelize.literal(`FORMAT(date, 'yyyy')`), 'formatted_date']] }
        });
    
        return results;
}

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
        type: sequelize.QueryTypes.SELECT
    });
    return results;
}

export {
    getResults,
    getNurseryResults,
    getResultDetails
}



