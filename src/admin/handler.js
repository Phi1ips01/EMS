const {
  createControllerAdmin,
  updateControllerAdmin,
  showAllControllerAdmin,
  destroyControllerAdmin,
  showOneControllerAdmin,
  showAllMessagesController,
  updateLeaveReplyController,
  getDeptsController,
  addNewDeptController,
} = require("./controller");

const bcrypt = require("bcrypt");
async function createAdminHandler(req, res) {
  const hashedPassword = await securePassword(req.body.password);
  let isAdmin = 0;
  if (req.body.dept === "Human Resource") {
    isAdmin = 1;
  }
  try {
    const joiningDate = req.body.joiningDate.split("T")[0];
    const UserData = {
      emp_Id: req.body.emp_Id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      department: req.body.dept,
      designation: req.body.designation,
      address: req.body.address,
      contact: req.body.contact,
      isAdmin,
      joiningDate,
    };
    const response = await createControllerAdmin(UserData);
    //console.log("response", response);
    res.status(201).json({ response: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const securePassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    //console.log(error.message);
  }
};
const showAllAdminHandler = async (req, res) => {
  try {
    console.log("showalladminhandler");
    const column = req.query.column ? req.query.column : "";
    const keyword = req.query.keyword ? req.query.keyword : "";
    console.log("req", column, keyword);

    const response = await showAllControllerAdmin(column, keyword);
    console.log(response);
    res.status(201).json({ response: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOneAdminHandler = async (req, res) => {
  try {
    //console.log(req.body);
    const response = await destroyControllerAdmin(
      req.body.userId,
      req.body.exitDate
    );
    //console.log("deleted ", response);
    res.status(201).json({ response: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function updateAdminHandler(req, res) {
  let hashedPassword;
  if (!!req.body.password) {
    hashedPassword = await securePassword(req.body.password);
  }

  let isAdmin = undefined;
  if (!!req.body.dept && req.body.dept === "Human Resource") {
    isAdmin = 1;
  }

  try {
    const id = req.body._id;
    const joiningDate = req.body.joiningDate.split("T")[0];
    const UserData = {
      emp_Id: req.body.emp_Id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      department: req.body.dept,
      designation: req.body.designation,
      address: req.body.address,
      contact: req.body.contact,
      leave: req.body.leave,
      isAdmin,
      joiningDate: joiningDate,
    };

    // Filter out empty or undefined values from UserData
    Object.keys(UserData).forEach((key) => {
      if (UserData[key] === undefined || UserData[key] === "") {
        delete UserData[key];
      }
    });

    const response = await updateControllerAdmin(id, UserData);
    //console.log("userdata", response);

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function showOneAdminHandler(req, res) {
  try {
    const { userId } = req.query;
    //console.log("hi", userId);
    const response = await showOneControllerAdmin(userId);
    //console.log("Response,", response);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function updateLeaveReplyHandler(req, res) {
  try {
    const { _id } = req.query;
    const { userId } = req.body;
    const updatingData = {
      adminId: req.body.adminId,
      isReplied: true,
      status: req.body.status ? "approved" : "rejected",
      adminMessage: req.body.adminMessage ? req.body.adminMessage : "",
    };
    const response = await updateLeaveReplyController(
      _id,
      userId,
      updatingData
    );
    res.status(201).json({ response: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function showAllMessagesHandler(req, res) {
  try {
    const response = await showAllMessagesController();
    res.status(201).json({ response: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function getDeptsHandler(req, res) {
  try {
    const response = await getDeptsController();
    res.status(201).json({ response: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
async function addNewDeptHandler(req, res) {
  try {
    //console.log("req.body, ", req.body);
    const Dept = { name: req.body.name };
    const response = await addNewDeptController(Dept);
    res.status(201).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAdminHandler,
  securePassword,
  showAllAdminHandler,
  deleteOneAdminHandler,
  updateAdminHandler,
  showOneAdminHandler,
  updateLeaveReplyHandler,
  showAllMessagesHandler,
  getDeptsHandler,
  addNewDeptHandler,
};
