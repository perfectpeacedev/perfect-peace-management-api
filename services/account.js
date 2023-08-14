import { BusFee, Expense, ExtraClasses, FeedingFee } from "../models/index.js";
import { Op, literal } from "sequelize";

const createFeeding = async (data) => {
  const response = await FeedingFee.create({
    teacher: data?.teacher,
    class: data?.class,
    amount: data?.amount,
    date: data?.date,
  });

  return response;
};

const createExpense = async (data) => {
  const response = await Expense.create({
    expense: data?.name,
    amount: data?.amount,
    date: data?.date,
  });

  return response;
};

const createExtraClasses = async (data) => {
  const response = await ExtraClasses.create({
    teacher: data?.teacher,
    class: data?.class,
    amount: data?.amount,
    date: data?.date,
  });

  return response;
};

const createBusFee = async (data) => {
  const response = await BusFee.create({
    teacher: data?.teacher,
    class: data?.class,
    amount: data?.amount,
    date: data?.date,
  });

  return response;
};

const getFeeding = async (data) => {
  if (data.all === "true") {
    return await FeedingFee.findAll();
  } else if (data.startDate === data.endDate) {
    const startDate = new Date(data.startDate).toISOString();
    return await FeedingFee.findAll({
      where: {
        date: {
          [Op.eq]: literal(`CONVERT(DATE, '${startDate}', 126)`),
        },
      },
    });
  } else {
    const startDate = new Date(data.startDate).toISOString();
    const endDate = new Date(data.endDate).toISOString();
    return await FeedingFee.findAll({
      where: {
        date: {
          [Op.gte]: literal(`CONVERT(DATE, '${startDate}', 126)`),
          [Op.lte]: literal(`CONVERT(DATE, '${endDate}', 126)`),
        },
      },
    });
  }
};

const getExpense = async (data) => {
  if (data.all === "true") {
    return await Expense.findAll();
  } else if (data.startDate === data.endDate) {
    const startDate = new Date(data.startDate).toISOString();
    return await Expense.findAll({
      where: {
        date: {
          [Op.eq]: literal(`CONVERT(DATE, '${startDate}', 126)`),
        },
      },
    });
  } else {
    const startDate = new Date(data.startDate).toISOString();
    const endDate = new Date(data.endDate).toISOString();
    return await Expense.findAll({
      where: {
        date: {
          [Op.gte]: literal(`CONVERT(DATE, '${startDate}', 126)`),
          [Op.lte]: literal(`CONVERT(DATE, '${endDate}', 126)`),
        },
      },
    });
  }
};

const getExtraClasses = async (data) => {
  const startDate = new Date(data.dateStart).toISOString();
  const endDate = new Date(data.dateEnd).toISOString();

  if (data.all) {
    return await ExtraClasses.findAll();
  } else {
    return await ExtraClasses.findAll({
      where: {
        date: {
          [Op.gte]: literal(`CONVERT(DATE, '${startDate}', 126)`),
          [Op.lte]: literal(`CONVERT(DATE, '${endDate}', 126)`),
        },
      },
    });
  }
};

const getBusFee = async (data) => {
  const startDate = new Date(data.dateStart).toISOString();
  const endDate = new Date(data.dateEnd).toISOString();

  if (data.all) {
    return await BusFee.findAll();
  } else {
    return await BusFee.findAll({
      where: {
        date: {
          [Op.gte]: literal(`CONVERT(DATE, '${startDate}', 126)`),
          [Op.lte]: literal(`CONVERT(DATE, '${endDate}', 126)`),
        },
      },
    });
  }
};

const removeFeeding = async (id) => {
  const response = await FeedingFee.destroy({
    where: {
      id: id,
    },
  });
  return response;
};

const removeExpense = async (id) => {
  const response = await Expense.destroy({
    where: {
      id: id,
    },
  });
  return response;
};

const removeExtraClasses = async (id) => {
  const response = await ExtraClasses.destroy({
    where: {
      id: id,
    },
  });
  return response;
};

const removeBusFee = async (id) => {
  const response = await BusFee.destroy({
    where: {
      id: id,
    },
  });
  return response;
};

export {
  createFeeding,
  createExpense,
  createExtraClasses,
  createBusFee,
  getFeeding,
  getExpense,
  getExtraClasses,
  getBusFee,
  removeFeeding,
  removeExpense,
  removeExtraClasses,
  removeBusFee,
};
