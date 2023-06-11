import { Student } from "../models/index.js";

export const getStudents = async () => {
    try {
        const students = await Student.findAll();
        return students
    } catch (error) {
        console.log(error);
    }
}

