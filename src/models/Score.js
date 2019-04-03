const mongoose = require("mongoose");
const {Schema} = mongoose;

const ScoreSchema = new Schema({
  p1: {type: Number, required: false}, // Parcial 1
  p2: {type: Number, required: false}, // Parcial 2
  z: {type: Number, required: false},  // Zona
  fe: {type: Number, required: false}  // Examen Final
});

const Score = module.exports = mongoose.model('Score', ScoreSchema);