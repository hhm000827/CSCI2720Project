import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  let adminBar = null;
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const [role, setRole] = useState(sessionStorage.getItem("role"));

  const searchBar = useRef(null);

  function handleKeyDown(event) {
    let url = "/searchLocation?venuename=" + searchBar.current.value;
    if (event.keyCode === 13) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => (res.status === 200 ? res.json() : res.text()))
        .then((data) => {
          console.log(data);
          //cannot get 501
        });
    }
  }

  if (role === "admin") {
    adminBar = (
      <li>
        <Link to="/admin">Admin page</Link>
      </li>
    );
  }
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <span>
          Welcome back, {user} ({role})
        </span>
      </div>
      <div className="flex-none">
        <div className="form-control">
          <input ref={searchBar} type="text" onKeyDown={handleKeyDown} placeholder="Search" className="input input-bordered" />
        </div>
        <ul className="menu menu-horizontal p-0">
          <button className="btn btn-ghost btn-circle" onClick={backMain}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          {adminBar}
          <button className="btn btn-ghost btn-circle" onClick={Logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
          </button>
        </ul>
      </div>
    </div>
  );
};

function Logout() {
  sessionStorage.clear();
  window.location.assign("/");
}
function backMain() {
  window.location.assign("/main");
}
export default Nav;
