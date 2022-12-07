import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Nav from "../component/Nav";

export function ShowUserData() {
    const [userData, setUserData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        // check if the user is admin
        if (role !== "admin") {
            toast.error(
                "You are not admin, now you are redirected to login page!"
            );
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

        return (
            <div>
                <Nav />
                <h2>ShowUserData</h2>
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={filterTable}
                />
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Favorite Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((user) => (
                                <tr className="hover">
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>{user.favoritelist}</td>
                                    <th>
                                        <button>Delete</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
