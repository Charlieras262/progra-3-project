const Student = require('../models/Student');
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

studentCTRL.getStudent = async(req, res) => {
    await Student.findById(req.params.id).populate('course_asigned').exec((err, course) => {
        if (err) throw err;
        if (!course) {
            return res.json({ success: false, msg: 'Student not found' })
        } else {
            return res.json(course);
        }
    });
}

studentCTRL.createStudent = async(req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({
        status: 'Student Created'
    });
}

studentCTRL.editStudent = async(req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Student Edited'
    });
}

studentCTRL.deleteStudent = async(req, res) => {
    await Student.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Student Deleted'
    });
}

module.exports = studentCTRL;