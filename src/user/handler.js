const {
  showOneControllerUser,
  updateControllerUser,
  addNewMessageController,
  showUserMessageController,
} = require("./controller");

async function updateUserHandler(req, res) {
  try {
    const { id } = req.body;
    const UserData = {
      password: req.body.password,
    };
    const response = await updateControllerUser(id, UserData);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function showOneUserHandler(req, res) {
  try {
    const { userId } = req.query;
    console.log("hi", userId);
    const response = await showOneControllerUser(userId);
    console.log("Response,", response);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function showUserMessageHandler(req, res) {
  try {
    const { userId } = req.query;
    const response = await showUserMessageController(userId);
    console.log("Response,", response);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

async function addNewMessageHandler(req, res) {
  try {
    const { userId } = req.query;
    const messageData = {
      userId: userId,
      userMessage: req.body.message,
      leaveDate: req.body.date,
      numberOfDates: req.body.numberOfDates,
    };
    console.log("handler", messageData);
    const response = await addNewMessageController(messageData);
    res.status(200).json({ response: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  showOneUserHandler,
  updateUserHandler,
  addNewMessageHandler,
  showUserMessageHandler,
};
