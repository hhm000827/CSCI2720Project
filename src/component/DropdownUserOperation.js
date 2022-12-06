import { useState } from "react";
import toast from "react-hot-toast";

//Currently no update password API, if user needs update username, he must type password, but do we need to check? Or should we allow change username only api

const DropdownUserOperation = (props) => {
    const [createUsername, setCreateUsername] = useState("");
    const [createPw, setCreatePw] = useState("");
    const [createRole, setCreateRole] = useState("user");

    const [updateNameOldUsername, setUpdateNameOldUsername] = useState("");
    const [updateNameNewUsername, setUpdateNameNewUsername] = useState("");
    const [updateNamePw, setUpdateNamePw] = useState("");

    const submitCreateUserInfo = (event) => {
      let validName = true;
      let validPw = true;
      if (createUsername.length > 20 || createUsername.length < 4) {
        document.getElementById("cUsernameLabel").style.display="inline";
        document.getElementById("cUsernameInput").classList.add("input-error");
        validName = false;
      } else {
        document.getElementById("cUsernameLabel").style.display="none";
        document.getElementById("cUsernameInput").classList.remove("input-error");
      }

      if (createPw.length > 20 || createPw.length < 4) {
        validPw = false;
        document.getElementById("cPwLabel").style.display="inline";
        document.getElementById("cPwInput").classList.add("input-error");
      } else {
        document.getElementById("cPwLabel").style.display="none";
        document.getElementById("cPwInput").classList.remove("input-error");
      }

      if (!validPw || !validName) {
        toast.error("Invalid username or password!");
        return;
      } else {
        document.getElementById("cUsernameLabel").style.display="none";
        document.getElementById("cUsernameInput").classList.remove("input-error");
        document.getElementById("cPwLabel").style.display="none";
        document.getElementById("cPwInput").classList.remove("input-error");
      }

      fetch("/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: createUsername, password: createPw, role: createRole }),
      })
        .then((res) => (res.status === 200 ? res.json() : res.text()))
        .then((data) => {
          if (data.username) {
            toast("User " + data.username + "Created!");
          } else if (data == "account exists") {
            toast.error("Account exists!");
          } else {
            toast.error("Wrong username or password!");
          }
        });
    }


    const submitUpdateUserName = (event) => {
      let validName = true;
      let validNewName = true;
      let validPw = true;
      if (updateNameOldUsername.length > 20 || updateNameOldUsername.length < 4) {
        document.getElementById("uOldUsernameLabel").style.display="inline";
        document.getElementById("uOldUsernameInput").classList.add("input-error");
        validName = false;
      } else {
        document.getElementById("uOldUsernameLabel").style.display="none";
        document.getElementById("uOldUsernameInput").classList.remove("input-error");
      }
      if (updateNameNewUsername.length > 20 || updateNameNewUsername.length < 4) {
        validNewName = false;
        document.getElementById("uNewUsernameLabel").style.display="inline";
        document.getElementById("uNewUsernameInput").classList.add("input-error");
      } else {
        document.getElementById("uNewUsernameLabel").style.display="none";
        document.getElementById("uNewUsernameInput").classList.remove("input-error");
      }
      
      if (updateNamePw.length > 20 || updateNamePw.length < 4) {
        validPw = false;
        document.getElementById("uNewUsernamePwLabel").style.display="inline";
        document.getElementById("uNewUsernamePwInput").classList.add("input-error");
      } else {
        document.getElementById("uNewUsernamePwLabel").style.display="none";
        document.getElementById("uNewUsernamePwInput").classList.remove("input-error");
      }

      if (!validPw || !validName || !validNewName) {
        toast.error("Invalid username or password!");
        return;
      } else {
        document.getElementById("uOldUsernameLabel").style.display="none";
        document.getElementById("uOldUsernameInput").classList.remove("input-error");
        document.getElementById("uNewUsernameLabel").style.display="none";
        document.getElementById("uNewUsernameInput").classList.remove("input-error");
        document.getElementById("uNewUsernamePwLabel").style.display="none";
        document.getElementById("uNewUsernamePwInput").classList.remove("input-error");
      }

      fetch("/updateAccount", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldUsername: updateNameOldUsername, newUsername: updateNameNewUsername, password: updateNamePw }),
      })
        .then((res) => (res.status === 200 ? res.json() : res.text()))
        .then((data) => {
          if (data.username) {
            toast("User " + data.username + "Updated!");
          } else if (data == "account exists") {
            toast.error("Account exists!");
          } else {
            toast.error("Wrong username or password!");
          }
        });
    }
    return (
      <>
        <div className="dropdown dropdown-bottom mx-3">
            <label tabIndex={0} className="btn btn-xs">
                Create User
            </label>
              <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <label className="label text-left block">
                      <span className="label-text text-left block">Username</span>
                      <span className="label-text text-left text-xs block text-red-500" style={{display: "none"}} id="cUsernameLabel">Length needs between 4-20</span>
                  </label>
                  <input type="text" className="input input-bordered w-full max-w-xs" id="cUsernameInput" value={createUsername} onChange={e => setCreateUsername(e.target.value)}/>

                  <label className="label text-left block">
                      <span className="label-text text-left block">Password</span>
                      <span className="label-text text-left text-xs block text-red-500" style={{display: "none"}} id="cPwLabel">Length needs between 4-20</span>
                  </label>
                  <input type="text" className="input input-bordered w-full max-w-xs" id="cPwInput" value={createPw} onChange={e => setCreatePw(e.target.value)}/>
                  <label className="label">
                      <span className="label-text">Role</span>
                  </label>

                  <select value={createRole} onChange={e => setCreateRole(e.target.value)} className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                  <button className="mt-3 btn btn-outline w-full" onClick={submitCreateUserInfo}>
                  Create
                  </button>
              </div>
        </div>
        {/* Update User */}
        <div className="dropdown dropdown-bottom mx-3">
          <label tabIndex={1} className="btn btn-xs">
                Update User Name
          </label>
          <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <label className="label text-left block">
                  <span className="label-text text-left block">Old Username</span>
                  <span className="label-text text-left text-xs block text-red-500" style={{display: "none"}} id="uOldUsernameLabel">Length needs between 4-20</span>
              </label>
              <input type="text" className="input input-bordered w-full max-w-xs" id="uOldUsernameInput" value={updateNameOldUsername} onChange={e => setUpdateNameOldUsername(e.target.value)}/>

              <label className="label text-left block">
                <span className="label-text text-left block">New Username</span>
                <span className="label-text text-left text-xs block text-red-500" style={{display: "none"}} id="uNewUsernameLabel">Length needs between 4-20</span>
              </label>
              <input type="text" className="input input-bordered w-full max-w-xs" id="uNewUsernameInput" value={updateNameNewUsername} onChange={e => setUpdateNameNewUsername(e.target.value)}/>

              <label className="label text-left block">
                <span className="label-text text-left block">Password</span>
                <span className="label-text text-left text-xs block text-red-500" style={{display: "none"}} id="uNewUsernamePwLabel">Length needs between 4-20</span>
              </label>
              <input type="text" className="input input-bordered w-full max-w-xs" id="uNewUsernamePwInput" value={updateNamePw} onChange={e => setUpdateNamePw(e.target.value)}/>

              <button className="mt-3 btn btn-outline w-full" onClick={submitUpdateUserName}>
              Update
              </button>
          </div>
        </div>
      </>
    );
};

export { DropdownUserOperation };