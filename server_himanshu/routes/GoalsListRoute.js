const express = require('express');
const GoalsListModel = require('../models/GoalsListModel');
const router = express.Router();
router.post('/get', async (req, res) => {
    const { uid } = req.body;  

    try {
        const goals = await GoalsListModel.find({id:uid});
        
        res.send(goals); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error', msg: 'Something went wrong!' });
    }  
});  
 
router.post('/saveGoals', (req, res) => {
    const { goal, deadline, id } = req.body;  
    GoalsListModel.create({ goal, deadline, id })
      .then(data => {
        console.log("Saved Data Successfully");
        res.status(201).send(data);
      }) 
      .catch((err) => {
        console.log(err);
        res.send({ error: err, msg: "Something went wrong!" });
      });
  });

router.put('/updateGoals/:id', (req, res) => {
    const { id } = req.params;
    const { goal, deadline } = req.body;
    GoalsListModel.findByIdAndUpdate(id, { goal, deadline })
        .then(() => {
            res.send("Updated Successfully!");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        });
});

router.delete('/deleteGoals/:id', (req, res) => {
    const { id } = req.params;
    const { goal } = req.body;
    GoalsListModel.findByIdAndDelete(id)
        .then(() => {
            res.send("Deleted Successfully!");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        });
});

module.exports = router;
            