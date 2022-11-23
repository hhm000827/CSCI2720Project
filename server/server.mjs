import { createRequire } from "module";
import { fileURLToPath } from "url";
import { createComment, findCommentsByLocation } from "./mongodb/commentTable/commentCrud.mjs";

const require = createRequire(import.meta.url);
const express = require("express");
const path = require("path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//! API for comment (CR)
app.get("/createComment", (req, res) => {
  const commentObject = {
    location: req.query["location"],
    username: req.query["username"],
    comment: req.query["comment"],
  };
  createComment(commentObject);
  res.send("Success");
});

app.get("/findCommentsByLocation", (req, res) => {
  const location = req.query["location"];
  findCommentsByLocation(location);
  res.send("Success");
});

app.use(express.static(path.join(__dirname, "../", "build")));
const server = app.listen(80);
