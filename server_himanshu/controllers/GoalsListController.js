const GoalsListModel=require("../models/GoalsListModel");

// GET GOALS FUNCTION
module.exports.getGoalsList=async (req,res)=>{
    try {
        const goals = await GoalsListModel.find({}, 'goal deadline'); // Include 'deadline' in the projection
        res.send(goals);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error', msg: 'Something went wrong!' });
      }
    };

// SAVING GOALS FUNCTION


module.exports.saveGoals=(req,res)=>{
    const {goal,deadline}=req.body

   
    GoalsListModel.create({goal,deadline})
    .then(data=>{
        console.log("Saved Data Successfully");
        res.status(201).send(data)
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    }); 
};

// UPDATING GOALS
module.exports.updateGoals=(req,res)=>{
    const{id} =req.params
    const {goal,deadline}=req.body
    GoalsListModel.findByIdAndUpdate(id,{goal,deadline})
    .then(()=>{
        res.send("Updated Successfully!");
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });    
};

// DELETE GOALS
module.exports.deleteGoals=(req,res)=>{
    const{id} =req.params
    const {goal}=req.body
    GoalsListModel.findByIdAndDelete(id)
    .then(()=>{
        res.send("Deleted Successfully!");
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });  
};