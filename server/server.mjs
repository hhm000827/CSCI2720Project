import { createRequire } from "module";
import { fileURLToPath } from "url";
import { Account, buildAccountObject, buildUpdateAccountObject } from "./mongodb/accountModel.mjs";
import { buildCommentObject, Comment } from "./mongodb/commentModel.mjs";
import { buildVenueObject, Venue } from "./mongodb/venueModel.mjs";

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
app.post("/createComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Comment.create(commentObject, (err, comment) => {
      if (err) res.status(501).send(err);
      res.status(200).send(comment);
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

app.delete("/deleteComment", (req, res) => {
  const commentObject = buildCommentObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Comment.findOneAndRemove(commentObject, (err, result) => {
      if (err) res.status(501).send(err);
      res.status(200).send(result);
    });
  });
});

//! API for Account (CRUD)
app.post("/createAccount", (req, res) => {
  bcrypt.hash(req.body["password"], 10, (err, hash) => {
    if (err) res.status(500).send("cannot hash");
    const accountObject = buildAccountObject(req, hash);
    mongoose.connect(dbUrl, (err, db) => {
      if (err) res.status(500).send(err);
      Account.findOne((err, result) => {
        if (err) res.status(501).send(err);
        result
          ? res.status(501).send("account exists")
          : Account.create(accountObject, (err, result) => {
              if (err) res.status(501).send(err);
              res.status(200).send(result);
            });
      });
    });
  });
});

app.post("/verifyAccount", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.findOne({ username: req.body["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      if (!result) res.status(501).send("no user found");
      else
        bcrypt.compare(req.body["password"], result.password, (err, isMatch) => {
          if (err) res.status(500).send(err);
          isMatch ? res.status(200).send({ result: true, role: result.role }) : res.status(200).send(false);
        });
    });
  });
});

app.get("/findAccount", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.findOne({ username: req.query["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      result ? res.status(200).send(result) : res.status(501).send("no user found");
    });
  });
});

app.get("/findAllAccount", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.find((err, result) => {
      if (err) res.status(501).send(err);
      result ? res.status(200).send(result) : res.status(501).send("no user found");
    });
  });
});

app.put("/updateAccount", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    let updateAccountObject = buildUpdateAccountObject(req);
    Account.findOne({ username: updateAccountObject.oldUsername }, (err, result) => {
      if (err) res.status(501).send(err);
      if (!result) res.status(501).send("no user found");
      else {
        bcrypt.hash(updateAccountObject.password, 10, (err, hash) => {
          if (err) res.status(500).send("cannot hash");
          result.username = updateAccountObject.newUsername;
          result.password = hash;
          result.save();
          res.status(200).send("success");
        });
      }
    });
  });
});

app.delete("/deleteAccount", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Account.findOneAndRemove({ username: req.body["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      res.status(200).send(result);
    });
  });
});

//! API for Venue (CRUD)
app.post("/createVenueEvent", (req, res) => {
  const venueObject = buildVenueObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Venue.findOne({ eventid: venueObject.eventid }, (err, result) => {
      if (err) res.status(501).send(err);
      result
        ? res.status(501).send("Event exists")
        : Venue.create(venueObject, (err, venueEvent) => {
            if (err) res.status(501).send(err);
            res.status(200).send(venueEvent);
          });
    });
  });
});

app.get("/searchLocation", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Venue.find({ venuename: req.query["venuename"] }, (err, result) => {
      if (err) res.status(501).send(err);
      result ? res.status(200).send(result) : res.status(501).send("no venue found");
    });
  });
});

app.get("/listOutLocation", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Venue.find((err, result) => {
      if (err) res.status(501).send(err);
      result ? res.status(200).send(result) : res.status(501).send("no venue found");
    });
  });
});

app.put("/updateVenueEvent", (req, res) => {
  const venueObject = buildVenueObject(req);
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Venue.findOneAndUpdate({ eventid: venueObject.eventid }, venueObject, (err, result) => {
      err ? res.status(501).send(err) : res.status(200).send(result);
    });
  });
});

app.delete("/deleteVenueEvent", (req, res) => {
  mongoose.connect(dbUrl, (err, db) => {
    if (err) res.status(500).send(err);
    Venue.findOneAndRemove({ eventid: req.body["eventid"] }, (err, result) => {
      if (err) res.status(501).send(err);
      res.status(200).send(result);
    });
  });
});

app.use(express.static(path.join(__dirname, "../", "build")));
const server = app.listen(80);
