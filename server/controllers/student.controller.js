const Student = require('../models/Student');
const User = require('../models/User');
const Validations = require('../controllers/validations/general.validation');
const studentCTRL = {};

studentCTRL.getStudents = async(req, res) => {
    await Student.find().populate('course_asigned').exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Course not found' })
        } else {
            return res.json(course);
        }
    });
}

studentCTRL.getStudentsAmount = async(req, res) => {
    res.json(await Student.find().countDocuments());
}

studentCTRL.getStudent = async(req, res) => {
    Student.findById(req.params.id).populate({
        path: 'course_asigned',
        populate: {
            path: 'score'
        }
    }).exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Student not found' })
        } else {
            return res.json(course);
        }
    });
}

studentCTRL.createStudent = async(req, res) => {
    const student = new Student({
        _id: req.body._id,
        name: req.body.name,
        lastName: req.body.lastName,
        fnac: req.body.fnac,
        cui: req.body.cui,
        tel: req.body.tel,
        address: req.body.address,
        val_code: req.body.val_code,
        registered: false
    });
    if (await Student.findById(student._id).countDocuments() == 0) {
        student.val_code = await Validations.generateVerifyCode('E');
        student._id = await Validations.generateStudentCode(req.body.inst_code);
        await student.save().then(student => {
            res.json('student.created');
        }).catch(err => {
            throw err;
        });
    } else {
        res.json({
            msg: 'ID is already registered',
            success: false
        });
    }
}

studentCTRL.editStudent = async(req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        msg: 'stuUpdated',
        success: true
    });
}

studentCTRL.deleteStudent = async(req, res) => {
    const student = await Student.findById(req.params.id);
    await User.findOneAndRemove({ val_code: student.val_code });
    await Student.findByIdAndRemove(req.params.id);
    res.json({
        msg: 'stuDeleted',
        success: true
    });
}

module.exports = studentCTRL;