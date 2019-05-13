const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    _id: { type: String, require: true },
    name: { type: String, require: true },
    lastName: { type: String, required: true },
    fnac: { type: String, require: true },
    cui: { type: String, required: true },
    tel: { type: String, require: true },
    address: { type: String, require: true },
    val_code: { type: String, require: true },
    course_asigned: [{ type: Schema.ObjectId, ref: 'Course', required: false }]
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentbyCarne = (id, callback) => {
    Student.findById(id).populate('course_asigned').exec(callback);
}