import { GoogleMap, MarkerF, StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import googleKey from "../config/googleKey.json";
import "./GoogleMap.css";
const library = ["places"];

const clickMarker = (venueName) => {
  let pathParam = venueName.replace(/ /g, "_").split("(")[0];
  if (pathParam[pathParam.length - 1] === "_") pathParam = pathParam.slice(0, -1);
  window.location.assign(`/location/${pathParam}`);
};

function ArtgoogleMap(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleKey.googleKey,
    libraries: library,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry. You may refresh your browser.</div>;
  }
  return isLoaded ? <Map locationList={props.locationList} /> : <Spinner animation="grow" />;
}

const Map = (props) => {
  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({
    lat: 22.38,
    lng: 114.177216,
  });
  const [locationList, setLocationList] = useState();

  useEffect(() => {
    setLocationList(props.locationList);
  }, [props.locationList]);

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
      {locationList
        ? Object.entries(locationList).map(([key, value]) => {
            let point = { lat: Number(locationList[key].latitude), lng: Number(locationList[key].longitude) };
            return <MarkerF position={point} onClick={() => clickMarker(key)} />;
          })
        : ""}

      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input type="text" id="googleSearch" placeholder="Type your Location" />
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default React.memo(ArtgoogleMap);
