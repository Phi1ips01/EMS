const express = require("express");
const router = express.Router();
const {
  createAdminHandler,
  showAllAdminHandler,
  updateAdminHandler,
  deleteOneAdminHandler,
  showOneAdminHandler,
  showAllMessagesHandler,
  updateLeaveReplyHandler,
  addNewDeptHandler,
  getDeptsHandler,
} = require("./handler");

router.get("/showOne", showOneAdminHandler);
router.post("/add", createAdminHandler);
router.get("/showall", showAllAdminHandler);
router.put("/update", updateAdminHandler);
router.delete("/delete", deleteOneAdminHandler);
router.get("/showAllMessages", showAllMessagesHandler);
router.put("/leaveReply", updateLeaveReplyHandler);
router.get("/getDepts", getDeptsHandler);
router.post("/addDepts", addNewDeptHandler);

module.exports = router;
