import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  created: Date,
  updated: Date
});


const User = mongoose.model("User", userSchema);
export default User;
