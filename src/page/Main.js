// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import React, { useEffect, useState } from "react";
import { currentDateTime } from "../component/Date";
import { DropdownMenu } from "../component/DropdownMenu";
import ArtgoogleMap from "../component/Map";
import Nav from "../component/Nav";
import { Login } from "./Login";

const Main = () => {
  const user = sessionStorage.getItem("username");
  const [locations, setLocations] = useState();
  const date = currentDateTime();

  function sortOnNumberOfEvents(asc) {
    const sorted = Object.fromEntries(Object.entries(locations).sort(([, a], [, b]) => (asc ? a.numberOfEvents - b.numberOfEvents : b.numberOfEvents - a.numberOfEvents)));
    setLocations(sorted);
  }

  function sortOnLongitude(asc) {
    const sorted = Object.fromEntries(Object.entries(locations).sort(([, a], [, b]) => (asc ? a.longitude - b.longitude : b.longitude - a.longitude)));
    setLocations(sorted);
  }

  function sortOnLatitude(asc) {
    const sorted = Object.fromEntries(Object.entries(locations).sort(([, a], [, b]) => (asc ? a.latitude - b.latitude : b.latitude - a.latitude)));
    setLocations(sorted);
  }

  function sortOnNames(asc) {
    let sorted = [];
    for (var key in locations) {
      sorted.push(key);
    }
    if (asc == true) {
      sorted.sort();
    } else {
      sorted.sort().reverse();
    }

    let tempDict = {};
    for (let i = 0; i < sorted.length; i++) {
      tempDict[sorted[i]] = locations[sorted[i]];
    }

    setLocations(tempDict);
  }

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
        let locationNames = [...new Set(data.map((item) => item.venuename.split("(")[0].trim()))];
        let locationDict = {};

        for (let locationName of locationNames) {
          locationDict[locationName] = {
            latitude: "",
            longitude: "",
            numberOfEvents: 0,
          };
        }

        for (let item of data) {
          let venuename = item.venuename.split("(")[0].trim();
          if (locationDict[venuename].latitude == "") {
            locationDict[venuename].latitude = item.latitude;
            locationDict[venuename].longitude = item.longitude;
            locationDict[venuename].numberOfEvents = 1;
          } else {
            locationDict[venuename].numberOfEvents += 1;
          }
        }

        setLocations(locationDict);
      });
  }

  useEffect(() => {
    listingOutLocation();
  }, []);

  useEffect(() => {}, [locations]);
  if (!user) {
    return <Login></Login>;
  } else {
    return (
      <div>
        <Nav></Nav>
        <ArtgoogleMap locationList={locations}></ArtgoogleMap>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  Venue name
                  <DropdownMenu sortingFunction={sortOnNames} />
                </th>
                <th>
                  Latitude
                  <DropdownMenu sortingFunction={sortOnLatitude} />
                </th>
                <th>
                  Longitude
                  <DropdownMenu sortingFunction={sortOnLongitude} />
                </th>
                <th>
                  Number of events
                  <DropdownMenu sortingFunction={sortOnNumberOfEvents} />
                </th>
                <th></th>
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
                    <th>
                      <button className="btn btn-ghost btn-xs" onClick={() => window.location.assign("/location/".concat(key.replace(/ /g, "_")))}>
                        details
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <footer className="footer p-4 bg-base-300 text-base-content">
          <div>
            <p>{currentDateTime()}</p>
          </div>
        </footer>
      </div>
    );
  }
};

export default Main;
