const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  emp_Id: {
    type: String,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    required: true,
  },
  leave: {
    type: Number,
    default: 1,
  },
  joiningDate: {
    type: String,
    default: Date.now,
  },
  isQuit: {
    type: Boolean,
    default: false,
  },
  exitDate: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
