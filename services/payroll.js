import { Allowance, Deductions, Salary } from "../models/index.js";


const getSalary = async () => {
    const response = await Salary.findAll();
    return response;
}

const getOneSalary = async (id) => {
    const response = await Salary.findAll({
        where: {
            salaryId: id
        }
    });
    return response;
}

const getOneDeduction = async (id) => {
    const response = await Deductions.findAll({
        where: {
            salaryId: id
        }
    });
    return response;
}

const getOneAllowance = async (id) => {
    const response = await Allowance.findAll({
        where: {
            salaryId: id
        }
    });
    return response;
}

const createSalary = async (data) => {
    const response = await Salary.create({
        title: data?.title,
        rank: data?.rank,
        amount: data?.amount
    })

    return response;
}

const createDeduction = async (data) => {
    const response = await Deductions.create({
        salaryId: data?.salaryId,
        title: data?.title,
        amount: data?.amount
    })

    return response;
}

const createAllowance = async (data) => {
    const response = await Allowance.create({
        salaryId: data?.salaryId,
        title: data?.title,
        amount: data?.amount
    });

    return response;
}

const removeSalary = async (id) => {
    const response = await Salary.destroy({
        where: {
            salaryId: id
        }
    });
    return response
}

const removeDeductions = async (id) => {
    const response = await Deductions.destroy({
        where: {
            salaryId: id
        }
    });
    return response
}

const removeAllowance = async (id) => {
    const response = await Allowance.destroy({
        where: {
            salaryId: id
        }
    });
    return response
}

export {
    getSalary,
    getOneSalary,
    getOneDeduction,
    getOneAllowance,
    
    createSalary,
    createDeduction,
    createAllowance,

    removeSalary,
    removeDeductions,
    removeAllowance,
}