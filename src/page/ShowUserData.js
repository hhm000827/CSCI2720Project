import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import { Login } from "./Login";
export function ShowUserData() {
    const [admin, setAdmin] = useState("admin");
    const [userData, setUserData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
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

    if (admin) {
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        return <Login></Login>;
    }
}
