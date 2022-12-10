import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Nav from "../component/Nav";
import { DropdownCreateUser } from "../component/DropdownCreateUser";
import { DeleteUserButton } from "../component/DeleteUserButton";
import { UpdateUsernameButton } from "../component/UpdateUsernameButton";
import { UpdatePasswordButton } from "../component/UpdatePasswordButton";

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
                <div className="flex flex-row justify-between items-center my-2">
                    <DropdownCreateUser />
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered input-primary w-full max-w-xs"
                        onChange={filterTable}
                    />
                </div>
                {/* <div className="overflow-x-auto"> */}
                <div>
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
                                        <UpdateUsernameButton className="font-normal" userinfo={user.username} />
                                    </th>
                                    <th>
                                        <UpdatePasswordButton className="font-normal" userinfo={user.username} />
                                    </th>
                                    <th>
                                        <DeleteUserButton className="font-normal" userinfo={user.username} />
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
