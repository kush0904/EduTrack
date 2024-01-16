const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:String,
  university:String,
  Degree:String,
  id:String,
});


const dataModel = mongoose.model('user', userSchema);
module.exports = dataModel;