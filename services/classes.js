import { Class, Teacher } from "../models/index.js";

const classes = async () => {
  return await Class.findAll();
};

const createClass = async (data) => {
  await Class.create({
    name: data?.name,
    section: data?.section,
    capacity: data?.capacity,
    teacherId: data?.teacher_id,

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

  const newClass = await Class.findOne({
    where: {
      teacherId: data?.teacher_id,
    },
  });

  if (data.teacher_id) {
    const updateTeacher = await Teacher.update(
      {
        classId: newClass.dataValues.classId,
      },
      {
        where: {
          teacherId: data.teacher_id,
        },
      }
    );
    console.log(updateTeacher);
    console.log(newClass);
  }

  console.log(newClass);
  return newClass;
};

const editClass = async (data) => {
  const updatedClass = await Class.update(
    {
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
    }
  );

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

const removeClass = async (id) => {
  const deletedClass = await Class.destroy({
    where: {
      class_id: id,
    },
  });

  const updateTeacher = await Teacher.update(
    {
      classId: '',
    },
    {
      where: {
        classId: id,
      },
    }
  );

  return deletedClass;
};

export { createClass, removeClass, classes };
