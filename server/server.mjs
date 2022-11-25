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

mongoose.connect(dbUrl);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connection is open...");
  app.use(express.static(path.join(__dirname, "../", "build")));

  //! API for comment (CRD)
  app.post("/createComment", (req, res) => {
    const commentObject = buildCommentObject(req);
    Comment.create(commentObject, (err, comment) => (err ? res.status(501).send(err) : res.status(200).send(comment)));
  });

  app.get("/findCommentsByLocation", (req, res) => {
    Comment.find({ location: req.query["location"] }, "location comment username -_id", (err, results) => (err ? res.status(501).send(err) : res.status(200).send(results)));
  });

  app.delete("/deleteComment", (req, res) => {
    const commentObject = buildCommentObject(req);
    Comment.findOneAndRemove(commentObject, (err, result) => (err ? res.status(501).send(err) : res.status(200).send(result)));
  });

  //! API for Account (CRUD)
  app.post("/createAccount", (req, res) => {
    bcrypt.hash(req.body["password"], 10, (err, hash) => {
      if (err) res.status(500).send("cannot hash");
      const accountObject = buildAccountObject(req, hash);
      Account.findOne({ username: accountObject.username }, (err, result) => {
        if (err) res.status(501).send(err);
        else {
          result
            ? res.status(501).send("account exists")
            : Account.create(accountObject, (err, result) => {
                if (err) res.status(501).send(err);
                res.status(200).send(result);
              });
        }
      });
    });
  });

  app.post("/verifyAccount", (req, res) => {
    Account.findOne({ username: req.body["username"] }, (err, result) => {
      if (err) res.status(501).send(err);
      else {
        !result
          ? res.status(501).send("no user found")
          : bcrypt.compare(req.body["password"], result.password, (err, isMatch) => {
              if (err) res.status(500).send(err);
              isMatch ? res.status(200).send({ result: true, username: result.username, role: result.role }) : res.status(200).send(false);
            });
      }
    });
  });

  app.get("/findAccount", (req, res) => {
    Account.findOne({ username: req.query["username"] }, "username password role favouritelist -_id", (err, result) => {
      if (err) res.status(501).send(err);
      else {
        result ? res.status(200).send(result) : res.status(501).send("no user found");
      }
    });
  });

  app.get("/findAllAccount", (req, res) => {
    Account.find()
      .select("username password role favouritelist -_id")
      .exec((err, result) => {
        if (err) res.status(501).send(err);
        else {
          result ? res.status(200).send(result) : res.status(501).send("no user found");
        }
      });
  });

  app.put("/updateAccount", (req, res) => {
    let updateAccountObject = buildUpdateAccountObject(req);
    Account.findOne({ username: updateAccountObject.oldUsername }, (err, result) => {
      if (err) res.status(501).send(err);
      else {
        !result
          ? res.status(501).send("no user found")
          : bcrypt.hash(updateAccountObject.password, 10, (err, hash) => {
              if (err) res.status(500).send("cannot hash");
              result.username = updateAccountObject.newUsername;
              result.password = hash;
              result.save();
              res.status(200).send("success");
            });
      }
    });
  });

  app.delete("/deleteAccount", (req, res) => {
    Account.findOneAndRemove({ username: req.body["username"] }, (err, result) => (err ? res.status(501).send(err) : res.status(200).send(result)));
  });

  //! API for Venue (CRUD)
  app.post("/createVenueEvent", (req, res) => {
    const venueObject = buildVenueObject(req);
    Venue.findOne({ eventid: venueObject.eventid }, (err, result) => {
      if (err) res.status(501).send(err);
      else {
        result
          ? res.status(501).send("Event exists")
          : Venue.create(venueObject, (err, venueEvent) => {
              if (err) res.status(501).send(err);
              res.status(200).send(venueEvent);
            });
      }
    });
  });

  app.get("/searchLocation", (req, res) => {
    Venue.find({ venuename: req.query["venuename"] }, "eventid price title description presenter date latitude longitude venuename -_id", (err, result) => {
      if (err) res.status(501).send(err);
      else {
        result ? res.status(200).send(result) : res.status(501).send("no venue found");
      }
    });
  });

  app.get("/listOutLocation", (req, res) => {
    Venue.find()
      .select("eventid price title description presenter date latitude longitude venuename -_id")
      .exec((err, result) => {
        if (err) res.status(501).send(err);
        else {
          result ? res.status(200).send(result) : res.status(501).send("no venue found");
        }
      });
  });

  app.put("/updateVenueEvent", (req, res) => {
    const venueObject = buildVenueObject(req);
    Venue.findOneAndUpdate({ eventid: venueObject.eventid }, venueObject, (err, result) => (err ? res.status(501).send(err) : res.status(200).send(result)));
  });

  app.delete("/deleteVenueEvent", (req, res) => {
    Venue.findOneAndRemove({ eventid: req.body["eventid"] }, (err, result) => (err ? res.status(501).send(err) : res.status(200).send(result)));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../", "build/index.html"));
  });
});

const server = app.listen(80);
