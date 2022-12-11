import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Nav from "../component/Nav";
import { AdminLocationTable } from "../component/NewTable";
import { CreateEventModal } from "../component/Modal";

export function ShowEvent() {
    const role = sessionStorage.getItem("role");
    const [locationList, setLocationList] = useState();
    const [filterLocationList, setFilterLocationList] = useState();
    const [filterLocationListWithInfo, setFilterLocationListWithInfo] =
        useState();
    const [selected, setSelected] = useState("Show All Locations");

    const fetchLocationList = () => {
        let location = [];
        let locationWithInfo = [];
        fetch("/listOutLocation", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => (res.status === 200 ? res.json() : res.text()))
            .then((data) => {
                setLocationList(data);
                for (let i = 0; i < data.length; i++)
                    location.push(data[i]["venuename"]);

                for (let i = 0; i < location.length; i++) {
                    location[i] = location[i].split("(")[0].trim();
                }
                location = [...new Set(location)];
                setFilterLocationList(location);
            });
    };

    function locationWithInfo() {
        let url = "/listOutLocation";

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => (res.status === 200 ? res.json() : res.text()))
            .then((data) => {
                let locationNames = [
                    ...new Set(
                        data.map((item) => item.venuename.split("(")[0].trim())
                    ),
                ];
                let locationDict = {};

                for (let locationName of locationNames) {
                    locationDict[locationName] = {
                        latitude: "",
                        longitude: "",
                    };
                }

                for (let item of data) {
                    let venuename = item.venuename.split("(")[0].trim();
                    if (locationDict[venuename].latitude == "") {
                        locationDict[venuename].latitude = item.latitude;
                        locationDict[venuename].longitude = item.longitude;
                    }
                }
                setFilterLocationListWithInfo(locationDict);
            });
    }

    let handleChange = (event) => {
        setSelected(event.target.value);
    };

    let find = (venueName) => {
        let keyword;
        venueName === "Show All Locations"
            ? (keyword = " ")
            : (keyword = venueName);
        console.log("This is locattion list = ", locationList);
        return locationList && locationList.length !== 0
            ? locationList.filter((item) => item.venuename.includes(keyword))
            : [];
    };

    useEffect(() => {
        fetchLocationList();
        locationWithInfo();
        if (role !== "admin")
            toast.error(
                "You are not admin, now you are redirected to login page!"
            );
    }, []);

    if (role === "admin") {
        return (
            <div>
                <Nav />
                <div className="flex flex-row-reverse my-2">
                    <div>
                        <select
                            onChange={handleChange}
                            className="select select-secondary w-100"
                        >
                            <option>Show All Locations</option>
                            {filterLocationList &&
                                filterLocationList.map((item) => {
                                    console.log(item);
                                    return (
                                        <option>
                                            <a value={item}> {item}</a>
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                                        <div>
                        <CreateEventModal
                            locations={filterLocationListWithInfo}
                        />
                    </div>
                </div>
                {locationList && (
                    <AdminLocationTable
                        events={find(selected)}
                        locations={filterLocationListWithInfo}
                    />
                )}
            </div>
        );
    } else {
        setTimeout(() => {
            window.location.assign("/");
        }, 1000);
    }
}
