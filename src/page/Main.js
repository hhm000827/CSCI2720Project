import ArtgoogleMap from "../component/Map";
import React, { useEffect, useRef, useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
const Main = () => {
  const [user, setuser] = useState(sessionStorage.getItem("username"));
  if (!user) {
    return <Login></Login>;
  } else {
    return (
      // <div>
      //   <googleMap></googleMap>
      // </div>
      <div>
        <Nav></Nav>
        <ArtgoogleMap></ArtgoogleMap>
      </div>
    );
  }
};

export default Main;
