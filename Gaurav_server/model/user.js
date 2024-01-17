const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  subject: String,
  testType: String,
  maxMarks: Number,
  Date: String,
  scoredMarks: Number,
  percentage: Number,
  Name:String,
  clg_id:String,
});

userSchema.pre('save', function (next) {
  this.percentage = (this.scoredMarks / this.maxMarks) * 100 || 0;
  next();
});


const UserModel = mongoose.model('Grades', userSchema);
module.exports = UserModel;