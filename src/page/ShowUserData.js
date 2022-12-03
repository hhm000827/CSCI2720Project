import React, { useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function ShowUserData() {
  const [admin, setAdmin] = useState("admin");
  if (admin) {
    return (
      <div>
        <Nav></Nav>ShowUserData
      </div>
    );
  } else {
    return <Login></Login>;
  }
}
