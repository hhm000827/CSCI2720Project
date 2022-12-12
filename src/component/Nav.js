import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FavoriteLocationDropdown } from "./DropdownMenu";

const isContained = (arr, str) => {
  if (typeof arr === "undefined" || arr.length == 0) return false;
  return arr.some((element) => element.toLowerCase() === str.toLowerCase());
};

const Nav = () => {
  let adminBar = null;
  let searchbar = null;
  const user = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const [locationList, setLocationList] = useState();
  const [filterList, setFilterList] = useState();

  const fetchLocationList = () => {
    let location = [];
    fetch("/listOutLocation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        for (let i = 0; i < data.length; i++) location.push(data[i]["venuename"]);
        for (let i = 0; i < location.length; i++) {
          location[i] = location[i].split("(")[0].trim();
        }
        location = [...new Set(location)];

        setLocationList(location);
      });
  };

  function handleKeyChange(event) {
    if (event.key === "Enter") {
      let keyword = document.querySelector("#searchBarInput").value || document.querySelector("#searchBarInput2").value;
      if (!keyword || /^\s*$/.test(keyword)) toast.error("Empty typing is invalid");
      else if (!isContained(locationList, keyword)) toast.error("Invalid location");
      else {
        let path = locationList.find((element) => element.toLowerCase() === keyword.toLowerCase());
        path = path.replace(/ /g, "_");
        window.location.assign(`/location/${path}`);
      }
    } else handleSearchKeywordChange();
  }

  function handleSearchKeywordChange() {
    let keyword = document.querySelector("#searchBarInput").value || document.querySelector("#searchBarInput2").value;
    if (typeof locationList !== "undefined" && locationList.length > 0) {
      let result = locationList.filter((item) => item.toLowerCase().includes(keyword.toLowerCase()));
      if (typeof result !== "undefined" && result.length > 0) setFilterList(result);
    }
  }

  useEffect(() => {
    fetchLocationList();
  }, []);
  if (role === "admin") {
    adminBar = (
      <li tabIndex={0}>
        <a>
          <a className="hidden md:block">Admin Panel</a>
          <a className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-kanban" viewBox="0 0 16 16">
              <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
              <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
            </svg>
          </a>
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        </a>
        <ul className="p-2 bg-base-100 z-10">
          <li>
            <Link to="/showEvent">Event page</Link>
          </li>
          <li>
            <Link to="/showUserData">User Data page</Link>
          </li>
        </ul>
      </li>
    );
  }

  searchbar = (
    <div>
      {/* dropdown searchbar input if <md */}
      <div className="dropdown md:hidden dropdown-bottom dropdown-end dropdown-hover">
        <label tabIndex={0} className="btn m-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </label>
        <div tabIndex={0} className="dropdown-content form-control">
          <input id="searchBarInput2" list="locList2" type="text" onKeyDown={(e) => handleKeyChange(e)} onInput={handleSearchKeywordChange} placeholder="Search" className="input input-bordered" />
          <datalist id="locList2">
            {filterList &&
              filterList.map((item) => {
                if (item.toLowerCase() !== document.querySelector("#searchBarInput").value.toLowerCase()) return <option>{item}</option>;
              })}
          </datalist>
        </div>
      </div>
      {/* searchbar input if >=md */}
      <div className="form-control hidden md:block">
        <input id="searchBarInput" list="locList" type="text" onKeyDown={(e) => handleKeyChange(e)} onInput={handleSearchKeywordChange} placeholder="Search" className="input input-bordered" />
        <datalist id="locList">
          {filterList &&
            filterList.map((item) => {
              if (item.toLowerCase() !== document.querySelector("#searchBarInput").value.toLowerCase()) return <option>{item}</option>;
            })}
        </datalist>
      </div>
    </div>
  );

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <span>
          Welcome back, {user} ({role})
        </span>
        &nbsp;
        {role === "admin" ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        )}
      </div>
      <div className="flex-none">
        <FavoriteLocationDropdown userName={user} />
        {searchbar}
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
