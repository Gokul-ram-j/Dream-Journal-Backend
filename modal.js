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
  userDetail: {
    type: {
      age: {
        type: Number,
        default: null,
      },
      phoneNumber: {
        type: String,
        validate: {
          validator: function (v) {
            return v === "N/A" || /^\d{10}$/.test(v);
          },
          message: "Phone number must be exactly 10 digits or 'N/A'.",
        },
        default: "N/A",
      },

      address: {
        type: String,
        default: "N/A",
      },
    },
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
        dreamAnalysis: { type: String, required: true },
      },
    ],
    default: [],
  },
});

export default mongoose.model("userdreams", UserSchema);
