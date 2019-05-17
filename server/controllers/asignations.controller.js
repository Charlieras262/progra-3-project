const Asignation = require('../models/Asignation');
const Student = require('../models/Student');
const Course = require('../models/Course');
const asignationCTRL = {};

asignationCTRL.getAsignations = async(req, res) => {
    const asignation = await Asignation.find();
    res.json(asignation);
};

asignationCTRL.getAsignation = async(req, res) => {
    const asignation = await Asignation.findById(req.params.id);
    res.json(asignation);
};

asignationCTRL.createAsignation = async(req, res) => {
    const asignation = new Asignation(req.body)
    await Course.getCoursebyCode(asignation.cod_course, async(err, course) => {
        if (err) throw err;
        Student.getStudentbyCarne(asignation.carne_stud, (ex, stRes) => {
            if (ex) throw ex;
            const student = JSON.parse(JSON.stringify(stRes));
            if (student.course_asigned.length < 5) {
                var stFlag = true;
                student.course_asigned.forEach(element => {
                    if (asignation.cod_course === element.cod_course) {
                        stFlag = false;
                        return;
                    }
                });
                if (stFlag) {
                    asignation.save();
                    Student.findByIdAndUpdate(asignation.carne_stud, { $push: { course_asigned: course._id } }, (err, student) => {
                        if (student) {
                            res.json({ success: true, msg: 'Asignation Added Successfuly' });
                        } else {
                            res.json({ success: false, msg: 'Error: ' + err });
                        }
                    });
                } else {
                    res.json({ success: false, msg: 'You have already added the course ' + asignation.cod_course });
                }
            } else {
                res.json({ success: false, msg: 'Cannot add more courses to current student.' });
            }
        });
    });
};

asignationCTRL.editAsignation = async(req, res) => {
    await Asignation.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Asignation Updated'
    });
};

asignationCTRL.deleteAsignation = async(req, res) => {
    var asignation = JSON.parse(req.body);
    await Asignation.findByIdAndDelete(req.params.id);
    await Course.getCoursebyCode(asignation.cod_course, (err, course) => {
        if (err) throw err;
        Student.findOneAndUpdate({ carne: asignation.carne_stud }, { $pull: { course_asigned: course._id } }, (err, student) => {
            if (student) {
                res.json({ success: true, msg: 'Asignation Deleted Successfuly' });
            } else {
                res.json({ success: true, msg: 'Error: ' + err });
            }
        });
    });
};

asignationCTRL.addAsignation = async(req, res) => {
    var asignation = JSON.parse(req.body);

};

asignationCTRL.delAsignation = async(req, res) => {
    var asignation = JSON.parse(req.params.id);
};

module.exports = asignationCTRL;