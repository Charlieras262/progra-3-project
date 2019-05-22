const Teacher = require('../models/Teacher');
const Validation = require('../controllers/validations/general.validation');
const TeacherController = {};

TeacherController.getTeachersAmount = async (req, res) => {
  res.json(await Teacher.find().countDocuments());
}

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
  teacher._id = await Validation.generateTeacherCode();
  teacher.valCode = await Validation.generateVerifyCode('P')
  teacher.save(error => {
    if(!error){
      res.json({
        success: true,
        msg: 'profCreated'
      });
    } else {
      res.json({
        success: false,
        msg: 'error'
      });
    }
  });
}


TeacherController.updateTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  await Teacher.findByIdAndUpdate(req.params.id, teacher);
  res.json({
    status: 'Teacher Updated'
  });
}

TeacherController.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({
    msg: 'profDeleted'
  });
}

module.exports = TeacherController;