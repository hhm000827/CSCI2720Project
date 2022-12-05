import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import { LocationTable } from "../component/Table";
import { Login } from "./Login";

export function ShowEvent() {
  const role = sessionStorage.getItem("role");
  const [locationList, setLocationList] = useState();
  const [selected, setSelected] = useState("Show All Locations");
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
          location[i] = location[i].split("(")[0];
          location[i] = location[i].slice(0, -1);
        }
        location = [...new Set(location)];
        setLocationList(location);
      });
  };

  let handleChange = (event) => {
    setSelected(event.target.value);
  };

  let find = (venueName) => {
    let keyword;
    venueName === "Show All Locations" ? (keyword = " ") : (keyword = venueName);
    const sessionStorageData = JSON.parse(sessionStorage.getItem("event")).filter((item) => item.venuename.includes(keyword));
    return sessionStorageData;
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  if (role) {
    return (
      <div>
        <Nav />
        <div className="flex flex-row-reverse">
          <div>
            <select onChange={handleChange} className="select select-secondary w-80">
              <option>Show All Locations</option>
              {locationList &&
                locationList.map((item) => {
                  return (
                    <option>
                      <a value={item}> {item}</a>
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <LocationTable events={find(selected)} />
      </div>
    );
  } else {
    return <Login />;
  }
}
