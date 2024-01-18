const mongoose = require('mongoose');

const completedGoalsSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  deadline: { type: Date, required: true },
  userId: { type: String, required: true },
});

const CompletedGoalsModel = mongoose.model('CompletedGoals', completedGoalsSchema);

module.exports = CompletedGoalsModel;
