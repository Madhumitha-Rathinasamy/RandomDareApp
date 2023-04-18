const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");

const url = "mongodb://localhost/dare";
mongoose.set("strictQuery", false);
mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

const user = require("./router/user_router/user");
app.use("/user", user);

const admin = require("./router/admin_router/admin");
app.use("/admin", admin);

app.listen(8080, () => {
  console.log("Server start at 8080")
})