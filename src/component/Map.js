import { GoogleMap, MarkerF, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import googleKey from "../config/googleKey.json";
import "./GoogleMap.css";
const library = ["places"];

function ArtgoogleMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
    libraries: library,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map /> : <Spinner animation="grow" />;
}

const Map = () => {
  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({
    lat: 22.38,
    lng: 114.177216,
  });

  useEffect(() => {}, []);

  const onLoad = (ref) => setSearchBox(ref);
  const onPlacesChanged = () => {
    let searchResult = () => {};
    searchResult = searchBox.getPlaces();
    setCenter({
      lat: searchResult[0].geometry.location.lat(),
      lng: searchResult[0].geometry.location.lng(),
    });
  };

  return (
    <GoogleMap id="googleMap" center={center} zoom={11}>
      <MarkerF position={center} />
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input type="text" id="googleSearch" placeholder="Type your Location" />
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default React.memo(ArtgoogleMap);
