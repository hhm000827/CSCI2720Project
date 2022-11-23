import { createRequire } from "module";
import { fileURLToPath } from "url";
import { buildCommentObject, Comment } from "./mongodb/commentModel.mjs";

const require = createRequire(import.meta.url);
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const dbUrl = "mongodb+srv://stu045:p011313W@cluster0.wenbhsm.mongodb.net/stu045";

//! API for comment (CRD)
app.get("/createComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) throw err;
    Comment.create(commentObject, (err, comment) => {
      if (err) console.log(err);
      res.send("comment created:", comment);
    });
  });
});

app.get("/findCommentsByLocation", (req, res) => {
  mongoose.connect(dbUrl, function (err, db) {
    if (err) throw err;
    Comment.find({ location: req.query["location"] }, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});

app.get("/deleteComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) throw err;
    Comment.deleteOne(commentObject, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
});

//! API for Account (CRUD)

//! API for Venue (CRUD)

app.use(express.static(path.join(__dirname, "../", "build")));
const server = app.listen(80);
