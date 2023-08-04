import { Attendance } from "../models/index.js"


const createClassAttendance = async (data) => {
    const dateEnd = "" // change it and get the data from db

    const attendance = await Attendance.create({
        studentId: data?.studentId,
        class: data?.class,
        status: data?.status,
        dateMarked: data?.dataMarked,
        dateEnd: dateEnd
    });

    return attendance;
}

const deleteAttendance = async (data) => {
    const response = await Attendance.destroy({
        where: {
            class: data?.class,
            dateMarked: data?.dataMarked
        }
    })

    return response;
}

const getAttendance = async (data) => {
    const response = await Attendance.findAll({
        where: {
            class: data?.class,
            dateMarked: data?.date
        }
    })
}

export {
    createClassAttendance,
    deleteAttendance,
    getAttendance
}