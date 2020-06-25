const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    //name: { type: String, required: true, uppercase: true, trim: true },
    //flastname: { type: String, required: true, uppercase: true, trim: true },
    //mlastname: { type: String, required: true, uppercase: true, trim: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    //email: { type: String, required: true, index: { unique: true } },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
