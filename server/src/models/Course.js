const mongoose = require("mongoose");
const {Schema} = mongoose;

const CourseSchema = new Schema({
    name: {type: String, required: true},
    cod_course: {type: String, required: true},
    cycle: {type: Number, required: true},
    cod_teacher: {type: String, required: false},
    pensum: {type: Schema.ObjectId, ref: 'Pensum'},
    score: {type: Schema.ObjectId, ref: 'Score'}
});

const Course = module.exports = mongoose.model('Course', CourseSchema);
