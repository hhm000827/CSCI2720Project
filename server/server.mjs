import { createRequire } from "module";
import { fileURLToPath } from "url";
import { Account, buildAccountObject } from "./mongodb/accountModel.mjs";
import { buildCommentObject, Comment } from "./mongodb/commentModel.mjs";

const require = createRequire(import.meta.url);
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const dbUrl = "mongodb+srv://stu045:p011313W@cluster0.wenbhsm.mongodb.net/stu045";
app.use(bodyParser.urlencoded({ extended: false }));

//! API for comment (CRD)
app.get("/createComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Comment.create(commentObject, (err, comment) => {
      if (err) res.status(501).send(err);
      res.status(200).send("comment created:" + comment);
    });
  });
});

app.get("/findCommentsByLocation", (req, res) => {
  mongoose.connect(dbUrl, function (err, db) {
    if (err) res.status(500).send(err);
    Comment.find({ location: req.query["location"] }, (err, results) => {
      if (err) res.status(501).send(err);
      res.status(200).send(results);
    });
  });
});

app.get("/deleteComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Comment.deleteOne(commentObject, (err, result) => {
      if (err) res.status(501).send(err);
      res.status(200).send(result);
    });
  });
});

//! API for Account (CRUD)
app.post("/createAccount", async (req, res) => {
  bcrypt.hash(req.body["password"], 10, (err, hash) => {
    if (err) res.status(500).send("cannot hash");
    const accountObject = buildAccountObject(req, hash);
    mongoose.connect(dbUrl, (err, db) => {
      if (err) res.status(500).send(err);
      Account.create(accountObject, (err, result) => {
        if (err) res.status(501).send(err);
        res.status(200).send(result);
      });
    });
  });
});

app.post("/verifyAccount", async (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.findOne({ username: req.body["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      if (!result) res.status(501).send("no user found");
      else
        bcrypt.compare(req.body["password"], result.password, (err, result) => {
          if (err) res.status(500).send(err);
          result ? res.status(200).send(true) : res.status(200).send(false);
        });
    });
  });
});

app.post("/findAllAccount", async (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.find((err, result) => {
      if (err) res.status(501).send(err);
      result ? res.status(200).send(result) : res.status(501).send("no user found");
    });
  });
});

app.post("/updateAccount", async (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.findOne({ username: req.body["oldUsername"] }, (err, result) => {
      if (err) res.status(501).send(err);
      if (!result) res.status(501).send("no user found");
      else {
        bcrypt.hash(req.body["password"], 10, (err, hash) => {
          if (err) res.status(500).send("cannot hash");
          result.username = req.body["newUsername"];
          result.password = hash;
          result.save();
          res.status(200).send("success");
        });
      }
    });
  });
});

app.post("/deleteAccount", async (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.deleteOne({ username: req.body["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      res.status(200).send(result);
    });
  });
});

//! API for Venue (CRUD)

app.use(express.static(path.join(__dirname, "../", "build")));
const server = app.listen(80);
