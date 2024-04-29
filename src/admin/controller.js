const User = require("../../models/userModel");
const Message = require("../../models/messageModel");
const cron = require("node-cron");
const Dept = require("../../models/deptModel");

async function createControllerAdmin(data) {
  try {
    const user = new User(data);
    const response = await user.save();
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating User");
  }
}
async function showAllControllerAdmin(column, keyword) {
  try {
    let response;

    if (column && keyword) {
      // Search for the keyword in the specified column (case-insensitive)
      response = await User.find({
        [column]: { $regex: new RegExp(keyword, "i") },
      }).sort({ _id: -1 }); // Newest first
    } else {
      // No column or keyword specified, return all data
      response = await User.find({}).sort({ _id: -1 }); // Newest first
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function updateControllerAdmin(UserId, data) {
  try {
    await User.updateOne({ _id: UserId }, { $set: data });
    const response = await User.findOne({ _id: UserId });
    //console.log("updated");
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating User");
  }
}

async function destroyControllerAdmin(UserId, exitDate) {
  try {
    const trimmedExitDate = exitDate.split("T")[0];
    const deleteTerm = await User.updateOne(
      {
        _id: UserId,
      },
      {
        $set: {
          isQuit: true,
          exitDate: trimmedExitDate,
        },
      }
    );
    //console.log("deleted item", deleteTerm);
    return deleteTerm;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting User");
  }
}

cron.schedule("0 0 1 * * *", async () => {
  try {
    const users = await User.find({});
    for (let user of users) {
      user.leave += 1;
      //console.log("yoyoyo", user.leave);
      await user.save();
    }
    //console.log("Leave count updated for all users");
  } catch (error) {
    console.error("Error updating leave count:", error);
    throw new Error(error.message);
  }
});
async function showOneControllerAdmin(UserId) {
  try {
    const response = await User.findOne({ _id: UserId });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
async function showAllMessagesController() {
  try {
    const activeUsers = await User.find({ isQuit: false }).select("_id");
    const activeUserIds = activeUsers.map((user) => user._id);
    //console.log("showallmessages", activeUserIds);
    const messages = await Message.find({ userId: { $in: activeUserIds } })
      .sort({ _id: -1 })
      .populate("userId", "_id name leave")
      .populate("adminId", "_id name");

    //console.log("showallmessages", messages);
    return messages;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving messages with names");
  }
}

async function updateLeaveReplyController(_id, userId, updatingData) {
  try {
    //console.log("user update, , ", userId);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { leave: -1 } },
      { new: true }
    );
    //console.log("updatingdata, ", user);

    const updatedMessage = await Message.findOneAndUpdate(
      { _id },
      { $set: updatingData },
      { new: true }
    );

    if (!updatedMessage) {
      throw new Error("Message not found");
    }
    //console.log("updatedmessage ", updatedMessage);
    return updatedMessage.populate("userId", "_id name leave");
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
async function getDeptsController() {
  try {
    const response = await Dept.find({}).sort({ _id: -1 });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
async function addNewDeptController(dept) {
  try {
    //console.log(dept);
    const newDept = new Dept(dept);
    const response = await newDept.save();
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  showAllControllerAdmin,
  createControllerAdmin,
  updateControllerAdmin,
  destroyControllerAdmin,
  showOneControllerAdmin,
  showAllMessagesController,
  updateLeaveReplyController,
  getDeptsController,
  addNewDeptController,
};
