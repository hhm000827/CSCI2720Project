// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import googleKey from "../config/googleKey.json";
import "./GoogleMap.css";

const clickMarker = (venueName) => {
  let pathParam = venueName.split("(")[0].trim().replace(/ /g, "_");
  window.location.assign(`/location/${pathParam}`);
};

function ArtgoogleMap(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map locationList={props.locationList} /> : <Spinner animation="grow" />;
}

const Map = (props) => {
  const center = { lat: 22.38, lng: 114.177216 };
  const [locationList, setLocationList] = useState();

  useEffect(() => {
    setLocationList(props.locationList);
  }, [props.locationList]);

  return (
    <GoogleMap id="googleMap" center={center} zoom={11}>
      {locationList
        ? Object.entries(locationList).map(([key, value]) => {
            let point = { lat: Number(locationList[key].latitude), lng: Number(locationList[key].longitude) };
            return <MarkerF position={point} onClick={() => clickMarker(key)} />;
          })
        : ""}
    </GoogleMap>
  );
};

export default React.memo(ArtgoogleMap);
