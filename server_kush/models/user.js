import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  st_id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age:  { type: Number, required: true},
  email: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export default User;
