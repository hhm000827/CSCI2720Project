import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LocationInfoBar } from "../component/InfoBar";
import Nav from "../component/Nav";
import ArtgoogleMap from "../component/SingleLocationMap";
import { Login } from "./Login";

const FetchLocationInDb = (keyword) => {
  let url = `/searchLocation?venuename=${keyword}`;
  let result;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => (res.status === 200 ? res.json() : res.text()))
    .then((data) => {
      result = typeof data === "string" ? [] : data;
    });

  return result;
};

export function Location() {
  let { venueName } = useParams();
  venueName = venueName.replace(/_/g, " ");
  const user = sessionStorage.getItem("username");
  const sessionStorageData = JSON.parse(sessionStorage.getItem("event")).filter((item) => item.venuename.includes(venueName));
  const locationDataInDb = FetchLocationInDb(venueName);
  let mapCenter = {
    lat: sessionStorageData ? sessionStorageData[0].latitude : locationDataInDb[0].latitude,
    lng: sessionStorageData ? sessionStorageData[0].longitude : locationDataInDb[0].longitude,
  };
  const infoText = `You are visiting ${venueName}`;

  useEffect(() => {}, []);

  if (user) {
    return (
      <div>
        <Nav />
        <LocationInfoBar text={infoText} />
        <ArtgoogleMap center={mapCenter} />
      </div>
    );
  } else return <Login />;
}
