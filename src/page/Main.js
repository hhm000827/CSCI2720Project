import React, { useEffect, useState } from "react";
import ArtgoogleMap from "../component/Map";
import Nav from "../component/Nav";
import { Login } from "./Login";
const Main = () => {
  const [user, setuser] = useState(sessionStorage.getItem("username"));
  const [locations, setLocations] = useState();

  function listingOutLocation() {
    let url = "/updateXML";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        sessionStorage.setItem("event", JSON.stringify(data));
        let locationNames = [...new Set(data.map((item) => item.venuename))];
        let locationDict = {};

        for (let locationName of locationNames) {
          locationDict[locationName] = {
            latitude: "",
            longitude: "",
            numberOfEvents: 0,
          };
        }

        for (let item of data) {
          if (locationDict[item.venuename].latitude == "") {
            locationDict[item.venuename].latitude = item.latitude;
            locationDict[item.venuename].longitude = item.longitude;
            locationDict[item.venuename].numberOfEvents = 1;
          } else {
            locationDict[item.venuename].numberOfEvents += 1;
          }
        }

        setLocations(locationDict);
      });
  }

  useEffect(() => {
    listingOutLocation();
  }, []);
  if (!user) {
    return <Login></Login>;
  } else {
    return (
      // <div>
      //   <googleMap></googleMap>
      // </div>
      <div>
        <Nav></Nav>
        <ArtgoogleMap></ArtgoogleMap>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {" "}
            <thead>
              <tr>
                <th>Venue name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Number of events</th>
              </tr>
            </thead>
            <tbody>
              {locations &&
                Object.entries(locations).map(([key, value]) => (
                  <tr className="hover">
                    <td>{key}</td>
                    <td>{locations[key].latitude}</td>
                    <td>{locations[key].longitude}</td>
                    <td>{locations[key].numberOfEvents}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Main;
