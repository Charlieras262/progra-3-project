const mongoose = require('mongoose');
const {Schema} = mongoose;

const AsignationSchema = new Schema({
    carne_stud: {type: String, required: true},
    cod_course: {type: String, required: true},
    section: {type: String, required: true}
});

module.exports = mongoose.model('Asignation', AsignationSchema);
