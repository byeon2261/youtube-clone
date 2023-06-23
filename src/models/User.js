import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  location: String,
});

const User = mongoose.model("User", userSchema);
export default User;
