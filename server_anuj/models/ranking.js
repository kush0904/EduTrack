const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  studentName: String,
  class:String,
  roll_no:Number,
  score: Number,
  attendance: Number,
  behavior: Number,
  extracurricular: Number,
  homework: Number,
});

const Ranking = mongoose.model('rankings', rankingSchema);

module.exports = Ranking;
