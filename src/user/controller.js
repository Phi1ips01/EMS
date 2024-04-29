const User = require("../../models/userModel");
const Message = require("../../models/messageModel");
async function showOneControllerUser(UserId) {
  try {
    const response = await User.findOne({ _id: UserId });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data from User");
  }
}

async function updateControllerUser(UserId, data) {
  try {
    await User.updateOne(UserId, data);
    const response = await User.findOne({ _id: UserId });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating User");
  }
}

async function showUserMessageController(userId) {
  try {
    const messages = await Message.find({ userId: userId })
      .populate("userId", "_id name")
      .populate("adminId", "_id name")
      .sort({ createdAt: -1 });
    return messages;
  } catch (error) {
    console.error(error);
    throw new Error("Error showing message of User");
  }
}

async function addNewMessageController(data) {
  try {
    const { userId, numberOfDates } = data;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user);
    console.log(user.leave);

    if (user.leave - numberOfDates >= 0) {
      const message = new Message(data);
      await message.save();
      console.log(message);
      return message;
    } else {
      throw new Error(
        "Error: User doesn't have enough leaves left to apply",
        user.leave - numberOfDates
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = {
  updateControllerUser,
  showOneControllerUser,
  showUserMessageController,
  addNewMessageController,
};
