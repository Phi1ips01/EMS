const mongoose = require("mongoose");

const messageLeaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userMessage: {
    type: String,
    required: true,
  },
  numberOfDates: {
    type: Number,
    required: true,
    default: 1,
  },
  leaveDate: {
    type: String,
    required: true,
  },
  isReplied: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  adminMessage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageLeaveSchema);
