import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CommentDisplay } from "../component/Comment";
import { LocationInfoBar } from "../component/InfoBar";
import Nav from "../component/Nav";
import ArtgoogleMap from "../component/SingleLocationMap";
import { LocationStatistic } from "../component/Statistic";
import { LocationTable } from "../component/Table";
import { Login } from "./Login";

export function Location() {
  let { venueName } = useParams();
  venueName = venueName.replace(/_/g, " ");
  const user = sessionStorage.getItem("username");
  const sessionStorageData = JSON.parse(sessionStorage.getItem("event")).filter((item) => item.venuename.includes(venueName));
  let mapCenter = {
    lat: sessionStorageData[0].latitude,
    lng: sessionStorageData[0].longitude,
  };
  const infoText = `You are visiting ${venueName}`;

  useEffect(() => {}, []);

  if (user) {
    return (
      <div>
        <Nav />
        <LocationInfoBar text={infoText} />
        <ArtgoogleMap center={mapCenter} />
        <LocationTable events={sessionStorageData} />
        <div class="grid grid-rows-1 grid-flow-col gap-0">
          <div>
            <CommentDisplay venueName={venueName} />
          </div>
          <LocationStatistic venueName={venueName} sessionStorageData={sessionStorageData} />
        </div>
      </div>
    );
  } else return <Login />;
}
