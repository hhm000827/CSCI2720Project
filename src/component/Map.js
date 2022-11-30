import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import googleKey from "../config/googleKey.json";
import "./GoogleMap.css";

function ArtgoogleMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map /> : <Spinner animation="grow" />;
}

const Map = () => {
  const [center, setCenter] = useState({
    lat: 22.38,
    lng: 114.177216,
  });

  return (
    <GoogleMap id="googleMap" center={center} zoom={11}>
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default React.memo(ArtgoogleMap);
