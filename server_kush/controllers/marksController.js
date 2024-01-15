import Marks from "../models/marks.js";
export const assignMarks = async (req, res) => {
  try {
    const marksData = req.body;
    const newMarks = new Marks(marksData);
    const result = await newMarks.save();
    res.status(201).json({ message: 'User data saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
