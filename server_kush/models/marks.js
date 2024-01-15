import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  st_id: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  semester: { type: Number, required: true },
  dsa: { type: Number, required: true },
  nalr: { type: Number, required: true },
  web: { type: Number, required: true },
  english: { type: Number, required: true },
  pass10: { type: Number, required: true },
  pass12: { type: Number, required: true },
  marks10: { type: Number, required: true },
  marks12: { type: Number, required: true }
});

const Marks = mongoose.model("marks", marksSchema);

export default Marks;
