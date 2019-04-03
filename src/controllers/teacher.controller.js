const Teacher = require('../models/Teacher');
const TeacherController = {};

TeacherController.getTeachers = async (req, res) => {
  const teacher = await Teacher.find();
  if (!teacher) {
      return res.json({ success: false, msg: 'Teachers not found' })
  } else {
      return res.json(teacher);
  }
}

TeacherController.getTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.json({ success: false, msg: 'Teacher not found' })
  } else {
    return res.json(teacher);
  }
}

TeacherController.createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json({
       status: 'Teacher created'
  });
}


TeacherController.updateTeacher = async (req, res) => {
  const teacher = {
       name: req.body.name,
       cod_teacher: req.body.cod_teacher,
       cycle: req.body.cycle,
       section: req.body.section,
       cod_teacher: req.body.cod_teacher
  }
  await Teacher.findByIdAndUpdate(req.params.id, teacher);
  res.json({
    status: 'Teacher Updated'
  });
}

TeacherController.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({
    status: 'Teacher Deleted'
  });
}

module.exports = TeacherController;