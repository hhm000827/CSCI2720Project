// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DropdownCreateUser } from "../component/DropdownMenu";
import Nav from "../component/Nav";
import { UserTable } from "../component/Table";

export function ShowUserData() {
  const [userData, setUserData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const role = sessionStorage.getItem("role");

  // filter the table with the search bar
  const filterTable = (event) => {
    const search = event.target.value;
    const filteredData = userData.filter((user) => {
      // filter by username
      let username = user.username.toLowerCase();
      return username.indexOf(search.toLowerCase()) !== -1;
    });
    setFilterData(filteredData);
  };

  useEffect(() => {
    // check if the user is admin
    if (role !== "admin") {
      toast.error("You are not admin, now you are redirected to login page!");
      // timeout for 1 seconds
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    }

    fetch("/findAllAccount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        setUserData(data);
        setFilterData(data);
      });
  }, []);

  if (role === "admin") {
    return (
      <div>
        <Nav />
        <div className="px-20">
          <div className="flex flex-row justify-between items-center my-2">
            <DropdownCreateUser />
            <input type="text" placeholder="Search" className="input input-bordered input-primary w-full max-w-xs" onChange={filterTable} />
          </div>
          <div>
            <UserTable filterData={filterData} />
          </div>
        </div>
      </div>
    );
  }
}
