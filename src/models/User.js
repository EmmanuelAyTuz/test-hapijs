const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

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

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
