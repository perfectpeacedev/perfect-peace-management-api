import { Op } from "sequelize";
import { Class, Teacher } from "../models/index.js";

export const getStaff = async () => {
    try {
        const staff = await Teacher.findAll({
            include: [
                {
                    model: Class,
                    as: "class_",
                    attributes: ["name"]
                }
            ],
        });
        return staff
    } catch (error) {
        console.log(error);
    }
}

export const removeStaff = async (id) => {
    try {

        const response = await Promise.allSettled([
            Teacher.destroy({
                where: {
                    teacherId: id
                }
            })
        ]);

        return response;

    } catch (error) {
        console.log(error);
    }
}

export const createStaff = async (data) => {
    try {
        const _class = await Class.findAll({
            attributes: ["class_id"],
            where: {
                name: data.class
            }
        });

       const response = await Teacher.create({
                fName: data.fName,
                lName: data.lName,
                gender: data.gender,
                phone: data.phone,
                email: data.email,
                address: data.address,
                category: data.category,
                ssnitNumber: data.ssnit,
                tinNumber: data.tin,
                bank: data.bank,
                accountNumber: data.account,
                dateRegistered: Date.now(),
                classId: _class[0]?.classId
            });

        return response;

    } catch (error) {
        console.log(error);
    }
}

export const editStaff = async (data, id) => {
    try {
        console.log(data)
        const _class = await Class.findAll({
            attributes: ["class_id"],
            where: {
                name: data?.class
            }
        });

       const response = await Teacher.update({
                fName: data.fName,
                lName: data.lName,
                gender: data.gender,
                phone: data.phone,
                email: data.email,
                address: data.address,
                category: data.category,
                ssnitNumber: data.ssnit,
                tinNumber: data.tin,
                bank: data.bank,
                accountNumber: data.account,
                dateUpdated: Date.now(),
                classId: _class[0]?.classId
            },
            {
                where: {
                    teacherId: id
                }
            }
            );

        return response;

    } catch (error) {
        console.log(error);
    }
}
