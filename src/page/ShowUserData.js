import React, { useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
import { DropdownUserOperation } from "../component/DropdownUserOperation";
export function ShowUserData() {
  const [admin, setAdmin] = useState("admin");
  if (admin) {
    return (
      <div>
        <Nav></Nav>ShowUserData
        <DropdownUserOperation />
      </div>
    );
  } else {
    return <Login></Login>;
  }
}
