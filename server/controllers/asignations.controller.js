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
    Course.getCoursebyCode(asignation.cod_course, async(err, course) => {
        if (err) throw err;
        if(course){
            Student.findById(asignation.carne_stud, (ex, stRes) => {
                if (ex) throw ex;
                const student = JSON.parse(JSON.stringify(stRes));
                if(student){
                    if (student.course_asigned.length < 5) {
                        var stFlag = student.course_asigned.includes(''+course._id);
                        if (!stFlag) {
                            asignation.save();
                            Student.findByIdAndUpdate(asignation.carne_stud, { $push: { course_asigned: course._id } }, (err, student) => {
                                if (student) {
                                    res.json({ success: true, msg: 'assignAdded' });
                                } else {
                                    res.json({ success: false, msg: 'error'});
                                }
                            });
                        } else {
                            res.json({ success: false, msg: 'assignAl', node: 'code' });
                        }
                    } else {
                        res.json({ success: false, msg: 'full' });
                    }
                }else {
                    res.json({ success: false, msg: 'carneWrong', node: 'carnet' });
                }
            });
        } else {
            res.json({ success: false, msg: 'courseWrong', node: 'code' });
        }
    });
};

asignationCTRL.editAsignation = async(req, res) => {
    await Asignation.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Asignation Updated'
    });
};

asignationCTRL.deleteAsignation = async(req, res) => {
    var asignation = await Asignation.findById(req.params.id);
    await Asignation.findByIdAndDelete(req.params.id);
    Course.getCoursebyCode(asignation.cod_course, (err, course) => {
        if (err) throw err;
        Student.findOneAndUpdate({ _id: asignation.carne_stud }, { $pull: { course_asigned: course._id } }, (err, student) => {
            if (student) {
                res.json({ success: true, msg: 'assignDeleted' });
            } else {
                res.json({ success: false, msg: 'Error: ' + err });
            }
        });
    });
};

module.exports = asignationCTRL;