const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const app = express();
const PORT = 3001; 

app.use(cors());

mongoose.connect('mongodb://localhost:27017/School', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Ranking = require('./models/ranking');

app.get('/api/rankings', async (req, res) => {
  try {
    const rankings = await Ranking.find();
    res.json(rankings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
