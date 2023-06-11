import { Class, FeeCheck, Student } from "../models/index.js";


const getFeeCheck = async () => {
    return await FeeCheck.findAll({
        attributes: ["value"]
    });
}

const getFeeList = async (indexNumber) => {
    const student = await Student.findOne({
        where: {
          student_id: indexNumber
        },
        attributes: ['class']
      });

      if (student) {
        const studentClass = student.class;
  
        const classDetails = await Class.findOne({
          where: {
            name: studentClass
          }
        });
  
        return classDetails;
      } else {
        return null;
      }
}


export {
    getFeeCheck,
    getFeeList
}