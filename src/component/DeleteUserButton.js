import { useState } from "react";
import toast from "react-hot-toast";

const DeleteUserButton = ({ userinfo }) => {

    const deleteUser = () => {
      console.log(userinfo);
      fetch("/deleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userinfo }),
      })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        if (data.username) {
          toast.success("User " + data.username + "deleted!");
          setTimeout(() => {
            window.location.reload(false)
          }, 1000);
        } else {
          toast.error("Wrong username or password!");
        }
      });
    }

    return (
        <button onClick={deleteUser}>Delete</button>
    );
};

export { DeleteUserButton };
