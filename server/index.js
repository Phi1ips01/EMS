const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/users");
const express = require("express");
const config = require("../config/config");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const authenticateToken = require("../middleware/authenticate");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
const loginRoute = require("../src/login/router");

const userRoute = require("../src/user/router");
const adminRoute = require("../src/admin/router");
app.use("/login", loginRoute);
app.use(authenticateToken);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(config.PORT, () => {
  console.log("server is running");
});
