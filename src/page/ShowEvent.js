import React, { useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function ShowEvent() {
  const [admin, setAdmin] = useState("admin");
  if (admin) {
    return (
      <div>
        <Nav></Nav>ShowEvent
      </div>
    );
  } else {
    return <Login></Login>;
  }
}
