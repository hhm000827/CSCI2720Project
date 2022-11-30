import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import googleKey from "../config/googleKey.json";
import "./SingleLocationMap.css";
const library = ["places"];

function ArtgoogleMap(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
    libraries: library,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map center={props.center} /> : <Spinner animation="grow" />;
}

const Map = (props) => {
  const zoom = 18;
  const [center, setCenter] = useState({
    lat: Number(props.center.lat),
    lng: Number(props.center.lng),
  });

  return (
    <GoogleMap id="googleMap" center={center} zoom={zoom} options={{ gestureHandling: "none" }}>
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default React.memo(ArtgoogleMap);
