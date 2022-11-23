import { GoogleMap, MarkerF, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

import React, { useEffect, useRef, useState } from "react";

import googleKey from "../config/googleKey.json";

function PmsGoogleMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map /> : <Spinner animation="grow" />;
}

const Map = () => {
  const searchBox = useRef(null);
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState({
    lat: 22.38,
    lng: 114.177216,
  });
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    addValueInCountRow(locations);
  }, [locations]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    });

  }, []);

  const onLoad = (ref) => (searchBox.current = ref);
  const onPlacesChanged = () => {
    let searchResult = () => {};
    searchResult = searchBox.current.getPlaces();
    setCenter({
      lat: searchResult[0].geometry.location.lat(),
      lng: searchResult[0].geometry.location.lng(),
    });
  };

  return (
    <GoogleMap id="googleMap" center={center} zoom={15} options={{ minZoom: 10.5 }}>
      <MarkerF position={center} />
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input type="text" placeholder="Type your Location" />
      </StandaloneSearchBox>

      {locations
        ? locations.map((location) => {
            let geoLocation = {
              lat: Number(location.latitude),
              lng: Number(location.longitude),
            };
            return (

            );
          })
        : ""}
    </GoogleMap>
  );
};

export default React.memo(PmsGoogleMap);
