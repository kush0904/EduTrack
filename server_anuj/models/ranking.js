const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  subject: String,
  testType: String,
  maxMarks: Number,
  Date: String,
  scoredMarks: Number,
  percentage: Number,
  Name:String,
  clg_id:String,
});

const Ranking = mongoose.model('rankings', rankingSchema);

module.exports = Ranking;
