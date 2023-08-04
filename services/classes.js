import { Class, Teacher } from "../models/index.js";

const classes = async () => {
  return await Class.findAll({
    attributes: ["name"],
  });
};

const createClass = async (data) => {
  const newClass = await Class.create({
    name: data?.name,
    section: data?.section,
    capacity: data?.capacity,
    teacher_id: data?.teacher_id,

    //fees dismantled
    tuition: data?.tuitionFee,
    firstAid: data?.firstAidFee,
    pta: data?.ptaFee,
    water: data?.waterFee,
    maintenance: data?.maintenanceFee,
    stationary: data?.stationaryFee,
    cocurricular: data?.cocurricular,

    fees: data?.fees,
  });

  if (data.teacher_id) {
    const updateTeacher = await Teacher.update(
      {
        class_id: newClass.class_id,
      },
      {
        where: {
          teacher_id: data.teacher_id,
        },
      }
    );
    console.log(updateTeacher);
  }

  return newClass;
};

const editClass = async (data) => {
  const updatedClass = await Class.update({
    name: data?.name,
    section: data?.section,
    capacity: data?.capacity,
    teacher_id: data?.teacher_id,

    //fees dismantled
    tuition: data?.tuitionFee,
    firstAid: data?.firstAidFee,
    pta: data?.ptaFee,
    water: data?.waterFee,
    maintenance: data?.maintenanceFee,
    stationary: data?.stationaryFee,
    cocurricular: data?.cocurricular,

    fees: data?.fees,
  },
  {
    where: {
      class_id: data.class_id,
    },
  });

  if (data.teacher_id) {
    const updateTeacher = await Teacher.update(
      {
        class_id: updatedClass.class_id,
      },
      {
        where: {
          teacher_id: data.teacher_id,
        },
      }
    );
    console.log(updateTeacher);
  }

  return newClass;
};

export { 
  createClass,

  classes 
};
