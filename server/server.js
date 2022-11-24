const express = require("express");
const path = require("path");
const app = express();
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/new");
// const db = mongoose.connection;
// db.once("open", function () {
//   console.log("Connection is open...");
// });

app.get("/api/*", (req, res) => res.send("Success"));
app.use(express.static(path.join(__dirname, "../", "build")));
const server = app.listen(80);
