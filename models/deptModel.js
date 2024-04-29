const mongoose = require("mongoose");

const deptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of role names
  },
});

module.exports = mongoose.model("Dept", deptSchema);
