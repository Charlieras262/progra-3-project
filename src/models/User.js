const mongoose = require('mongoose');
const {Schema} = mongoose;

// En este esquema se establece el modelo del Usuario
const UserSchema = new Schema({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true}});

// Se exporta el esquema como un modelo para utilizarlo en el controllador
module.exports = mongoose.model('User', UserSchema);
