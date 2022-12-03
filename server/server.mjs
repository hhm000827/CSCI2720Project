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
const cors = require("cors");
const xmlParser = require("xml2js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const dbUrl = "mongodb+srv://stu045:p011313W@cluster0.wenbhsm.mongodb.net/stu045";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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
    Comment.find({ location: { $regex: ".*" + req.query["location"] + ".*", $options: "i" } }, "location comment username -_id", (err, results) =>
      err ? res.status(501).send(err) : res.status(200).send(results)
    );
  });

  app.delete("/deleteComment", (req, res) => {
    const commentObject = buildCommentObject(req);
    Comment.findOneAndRemove(commentObject, (err, result) => (err ? res.status(501).send(err) : res.status(200).send(result)));
  });

  //! API for Account (CRUD)
  app.post("/createAccount", (req, res) => {
    bcrypt.hash(req.body["password"], 10, (err, hash) => {
      if (err) res.status(500).send("cannot hash");
      else {
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
      }
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
              else {
                result.username = updateAccountObject.newUsername;
                result.password = hash;
                result.save();
                res.status(200).send("success");
              }
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
              err ? res.status(501).send(err) : res.status(200).send(venueEvent);
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

  //! API for Admin update events data in mongoDB
  app.get("/updateXML", (req, res) => {
    fetch("https://www.lcsd.gov.hk/datagovhk/event/events.xml")
      .then((res) => res.text())
      .then((str) => {
        xmlParser.parseString(str, (err, result) => {
          const venueCollection = new Map();
          const events = result.events.event;

          events.forEach((val, index) => {
            if (venueCollection.has(val.venueid[0])) {
              //Count number of events in a specific location, as only output venue has at least 3 events
              const numOfEvent = venueCollection.get(val.venueid[0]) + 1;
              venueCollection.set(val.venueid[0], numOfEvent);
            } else {
              venueCollection.set(val.venueid[0], 1);
            }
          });

          //Sort venues according to the number of events
          const tempVenuesArray = [...venueCollection.entries()].sort((a, b) => b[1] - a[1]);
          let validVenuesArray = tempVenuesArray;

          //Now Fetch Venues
          fetch("https://www.lcsd.gov.hk/datagovhk/event/venues.xml")
            .then((res1) => res1.text())
            .then((str1) => {
              xmlParser.parseString(str1, (err, result) => {
                const xmlVenueInfos = result.venues.venue;
                for (const [i, element] of validVenuesArray.entries()) {
                  //Get Venues name, latitude, longitude
                  for (let xmlVenueInfo of xmlVenueInfos) {
                    if (xmlVenueInfo.$.id == element[0]) {
                      validVenuesArray[i].push(xmlVenueInfo.venuee[0]);
                      validVenuesArray[i].push(xmlVenueInfo.latitude[0]);
                      validVenuesArray[i].push(xmlVenueInfo.longitude[0]);
                      break;
                    }
                  }
                }

                let count = 0;
                let totalFulfillCount = 0;

                let eventsToStore = [];
                let eventIdsToStore = [];
                for (let venueVal of validVenuesArray) {
                  count = 0;
                  for (let val of events) {
                    if (val.venueid[0] == venueVal[0]) {
                      if (val.$.id && val.pricee[0] && val.titlee[0] && val.presenterorge[0] && val.predateE[0] && val.venueid[0] && venueVal[3] && venueVal[4] && venueVal[2]) {
                        count += 1;
                        let eventDescription = "no description";
                        if (val.desce[0]) {
                          eventDescription = val.desce[0];
                        }
                        const dataObj = {
                          eventid: val.$.id,
                          price: val.pricee[0],
                          title: val.titlee[0],
                          description: eventDescription,
                          presenter: val.presenterorge[0],
                          date: val.predateE[0],
                          venueid: val.venueid[0],
                          latitude: venueVal[3],
                          longitude: venueVal[4],
                          venuename: venueVal[2],
                        };
                        eventsToStore.push(dataObj);
                        eventIdsToStore.push(val.$.id);
                      }
                    }
                    if (count == 3) {
                      totalFulfillCount++;
                    }
                  }
                }

                if (totalFulfillCount < 10) {
                  console.log("Not Enough Valid records, i.e. 30 records with all required field not null!!");
                  console.log(totalFulfillCount + " locations only...");
                }
                Venue.find({ eventid: { $in: eventIdsToStore } }, (err, result) => {
                  if (err) res.status(501).send(err);
                  else {
                    let finalEventsToStore = JSON.parse(JSON.stringify(eventsToStore));
                    //Remove those found in the DB from re-creating them
                    if (result.length > 0) {
                      for (var i = result.length - 1; i >= 0; i--) {
                        for (var ind = finalEventsToStore.length - 1; ind >= 0; ind--) {
                          if (result[i].eventid == finalEventsToStore[ind].eventid) {
                            finalEventsToStore.splice(ind, 1);
                            break;
                          }
                        }
                      }
                    }
                    //Create all non-exists events
                    if (finalEventsToStore.length > 0) {
                      Venue.create(finalEventsToStore, (err, venueEvent) => {
                        if (err) res.status(501).send(err);
                        res.status(200).send(eventsToStore);
                      });
                    } else {
                      res.status(200).send(eventsToStore);
                    }
                  }
                });
              });
            });
        });
      });
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../" + "build/index.html"));
  });
});

const server = app.listen(80);
