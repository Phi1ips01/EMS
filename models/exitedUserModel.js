const mongoose = require("mongoose");
const exitedEmployeeSchema = new mongoose.Schema({
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
    default: "dd/MM/yyyy",
  },
  exitDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ExitedEmployee", exitedEmployeeSchema);
