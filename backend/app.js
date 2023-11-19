require("dotenv").config();
require("./db");
const express = require("express");

const app = express();
require("./config")(app);

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const incomeRoutes = require("./routes/income");
const expenseRoutes = require("./routes/expense");
const categoryRoutes = require("./routes/category");
const profileRoutes = require("./routes/profile");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);
app.use("/category", categoryRoutes);
app.use('/profile', profileRoutes);

require("./error-handling")(app);

module.exports = app;


