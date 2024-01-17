const mongoose =require("mongoose")

const goalSchema=new mongoose.Schema({
    serialNumber:{
        type:Number
    },
    goal:{
        type:String,
        required:true
    },
    deadline: {
        type: String, // Change the type to String for simple date format
        default: function () {
            // Convert the date to "YYYY-MM-DD" format
            return this.deadline ? new Date(this.deadline).toLocaleDateString('en-US') : null;
        },
    },
})

module.exports=mongoose.model("Goals",goalSchema);