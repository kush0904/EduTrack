const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 4001;
const UserModel = require('./model/user');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser'); 
const { setUserId, getUserId } = require('../server_shashank/userIdStore');
 
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());  

mongoose.connect("mongodb://localhost:27017/GradeTracker");
 
var uid=getUserId();
app.get('/getGrades', async (req, res) => {
    try {
        const grades = await UserModel.find({clg_id:uid});
        res.json(grades);  
        console.log(grades);
    } catch (err) {  
        console.error(err);
        res.status(500).json({  error: 'Internal Server Error' });
    }
}); 
 
app.post('/api/saveUserId', (req, res) => { 
    const { userId } = req.body;
    setUserId(userId);  
    res.json({ message: 'UserId saved successfully' }); 
});
  app.post('/addGrade', async (req, res) => {  
    const { subject, testType, date, maxMarks, scoredMarks } = req.body;
     
  
    try { 
      const newGrade = new UserModel({
        subject,
        testType,
        date,
        maxMarks, 
        scoredMarks,  
        clg_id: getUserId(),
      }); 
      const savedGrade = await newGrade.save();
      console.log('Grade added successfully:', savedGrade);
      res.json(savedGrade);
    } catch (err) {
      console.error('Error adding grade:', err); 
      res.status(500).json({ error: 'Failed to add grade' });
    } 
  });

app.post('/removeGrade', async (req, res) => {
  const { _id } = req.body;
  try { 
      const result = await UserModel.deleteOne({_id:_id});
      console.log('Grade removed successfully:', result);
      res.json(result);
  } catch (err) {
      console.error('Error removing grade:', err);
      res.status(500).json({ error: 'Failed to remove grade' });
  }             
}); 
app.post('/sortGrades', async (req, res) => {
  try {
      const { selectedOption, currentSortOrder } = req.body;
      let sortCriteria = {};  

      switch (selectedOption) {
          case 'Subject':
              sortCriteria = { _id: currentSortOrder === 'ASC' ? -1 : 1};
              break;
          case 'Test-type':
              sortCriteria = { testType: currentSortOrder === 'ASC' ? 1 : -1 };
              break;
          case 'Max-Marks':
              sortCriteria = { maxMarks: currentSortOrder === 'ASC' ? 1 : -1 };
              break;
          case 'Scored-Marks':
              sortCriteria = { scoredMarks: currentSortOrder === 'ASC' ? 1 : -1 };
              break;
          default:
              break;
      } 

      const grades = await UserModel.find().sort(sortCriteria);
      res.json(grades);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/filterGrades', async (req, res) => {
  const { filterOption, filterValue } = req.body;

  try {
      console.log('Received filter request:', filterOption, filterValue);

      let filterQuery = {};
      if (filterOption !== 'None' && filterValue) {
          if (filterOption === 'maxMarks' || filterOption === 'scoredMarks') {
              filterQuery[filterOption] = parseInt(filterValue, 10);
          } else {
              filterQuery[filterOption] = filterValue;
          }
      }

      console.log('Filter query:', filterQuery);

      const filteredGrades = await UserModel.find(filterQuery);
      console.log('Filtered grades:', filteredGrades);

      res.json(filteredGrades);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
      