// const GoalsListModel=require("../models/GoalsListModel");
// const router = require('../routes/GoalsListRoute'); 

// let uid=0;
// let Name='';
// router.post('/api/saveUserId', (req, res) => {
//     console.log(req.body); 
//     uid = req.body.userId;
//     Name=req.body.nm;
//     console.log(uid);    
//     console.log(Name);    

//     res.json({ message: 'UserId saved successfully' }); 
// });
// // GET GOALS FUNCTION
// module.exports.getGoalsList = async (req, res) => {
//     try {
//         const goals = await GoalsListModel.find({ id: uid });
//         res.send(goals);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: 'Internal Server Error', msg: 'Something went wrong!' });
//     }
// };

// // SAVING GOALS FUNCTION


// module.exports.saveGoals=(req,res)=>{
//     const {goal,deadline}=req.body
//       GoalsListModel.create({goal,deadline,uid})
//     .then(data=>{
//         console.log(uid,goal,deadline)

//         console.log("Saved Data Successfully");
//         res.status(201).send(data)
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({error:err,msg:"Something went wrong!"});
//     }); 
// };

// // UPDATING GOALS
// module.exports.updateGoals=(req,res)=>{
//     const{id} =req.params
//     const {goal,deadline}=req.body
//     GoalsListModel.findByIdAndUpdate(id,{goal,deadline})
//     .then(()=>{
//         res.send("Updated Successfully!");
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({error:err,msg:"Something went wrong!"});
//     });    
// };

// // DELETE GOALS
// module.exports.deleteGoals=(req,res)=>{
//     const{id} =req.params
//     const {goal}=req.body
//     GoalsListModel.findByIdAndDelete(id)
//     .then(()=>{
//         res.send("Deleted Successfully!");
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.send({error:err,msg:"Something went wrong!"});
//     });  
// };