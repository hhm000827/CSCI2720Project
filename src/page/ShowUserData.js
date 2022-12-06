import React from "react";
import { DropdownUserOperation } from "../component/DropdownUserOperation";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function ShowUserData() {
  const role = sessionStorage.getItem("role");
  if (role == "admin") {
    return (
      <div>
        <Nav></Nav>ShowUserData
        <DropdownUserOperation />
      </div>
    );
  } else {
    return <Login />;
  }
}
