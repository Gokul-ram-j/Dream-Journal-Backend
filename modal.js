import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true, 
  },
  userName: {
    type: String,
    required: true,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  dreams: {
    type: [
      {
        dreamTitle: { type: String, required: true },
        dreamDesc: { type: String, required: true },
        dreamEmotion: { type: String, required: true },
        dateLogged: { type: Date, default: Date.now }, 
      },
    ],
    default: [], 
  },
});

export default  mongoose.model("userdreams", UserSchema);

