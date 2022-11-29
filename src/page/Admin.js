import React, { useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function Admin() {
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const [admin, setAdmin] = useState("admin");
  if (admin) {
    return (
      <div>
        <Nav></Nav>Admin
      </div>
    );
  } else {
    return <Login></Login>;
  }
}
