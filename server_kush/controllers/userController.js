import User from "../models/user.js";
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const result = await newUser.save();
    res.status(201).json({ message: 'User data saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
