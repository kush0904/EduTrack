const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    subject: String,
  testType: String,
  maxMarks: Number,
  Date:String,
  scoredMarks: Number,
  percentage: Number,
})

const UserModel=mongoose.model("Grades",userSchema)
module.exports=UserModel;