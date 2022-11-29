import React, { useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function Location() {
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  if (user) {
    return (
      <div>
        <Nav></Nav>Location
      </div>
    );
  } else return <Login></Login>;
}
