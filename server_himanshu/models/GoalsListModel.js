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
        type: String,
        default: function () {
            return this.deadline ? new Date(this.deadline).toLocaleDateString('en-US') : null;
        },
    },
    id:{
        type:String
    }
})

module.exports=mongoose.model("Goals",goalSchema);