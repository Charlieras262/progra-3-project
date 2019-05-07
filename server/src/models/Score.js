const mongoose = require("mongoose");
const {Schema} = mongoose;

const ScoreSchema = new Schema({
  p1: {type: String, required: false}, // Parcial 1 NNI valor por defecto
  p2: {type: String, required: false}, // Parcial 2 NNI valor por defecto
  z: {type: String, required: false},  // Zona NNI valor por defecto
  fe: {type: String, required: false}  // Examen Final NNI valor por defecto
});

const Score = module.exports = mongoose.model('Score', ScoreSchema);