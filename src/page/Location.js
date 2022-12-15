// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
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

  if (user) {
    return (
      <div>
        <Nav />
        <LocationInfoBar venueName={venueName} />
        <ArtgoogleMap center={mapCenter} />
        <div className="grid grid-rows-1 md:grid-flow-col grid-flow-row gap-0">
          <div className="flex flex-col">
            <LocationStatistic venueName={venueName} sessionStorageData={sessionStorageData} />
            <CommentDisplay venueName={venueName} />
          </div>
          <LocationTable events={sessionStorageData} />
        </div>
      </div>
    );
  } else return <Login />;
}
