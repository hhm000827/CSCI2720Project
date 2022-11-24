import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  eventid: { type: Number, required: true, unique: true },
  price: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  presenter: { type: String, required: true },
  date: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  venuename: { type: String, required: true },
});
const Venue = mongoose.model("Venue", EventSchema);

const buildVenueObject = (req) => {
  return {
    eventid: req.body["eventid"],
    price: req.body["price"],
    title: req.body["title"],
    description: req.body["description"],
    presenter: req.body["presenter"],
    date: req.body["date"],
    latitude: req.body["latitude"],
    longitude: req.body["longitude"],
    venuename: req.body["venuename"],
  };
};

export { Venue, buildVenueObject };
