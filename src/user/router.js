const express = require("express");
const router = express.Router();

const {
  updateUserHandler,
  showOneUserHandler,
  showUserMessageHandler,
  addNewMessageHandler,
} = require("./handler");
router.get("/show", showOneUserHandler);
router.put("/update", updateUserHandler);
router.post("/messageleave", addNewMessageHandler);
router.get("/show_user_message_leave", showUserMessageHandler);
module.exports = router;
