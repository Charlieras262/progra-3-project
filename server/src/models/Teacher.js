const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeacherSchema = new Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    fnac: {type: String, required: true},
    cui: {type: String, required: true},
    esp: {type: String, required: true},
    asings: {type: Number, required: false},
    alert: {type: Schema.ObjectId, ref: 'Alert',required: false}
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);

module.exports.getTeacherbyCode = function(id, callback){
    var query = {code: id}; 
    Teacher.findOne(query, callback);
}