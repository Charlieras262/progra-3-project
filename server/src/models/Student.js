const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    fnac: { type: String, required: true },
    cui: { type: String, required: true },
    tel: { type: String, required: true },
    address: { type: String, required: true },
    val_code: { type: String, required: true },
    course_asigned: [{ type: Schema.ObjectId, ref: 'Course', required: false }]
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentbyCarne = (id, callback) => {
    Student.findById(id).populate('course_asigned').exec(callback);
}