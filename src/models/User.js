import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("password >>>:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("hash password >>>:", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
