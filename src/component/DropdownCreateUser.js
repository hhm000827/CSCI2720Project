import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const DropdownCreateUser = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitCreateUserInfo = (data) => {
      fetch("/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: data.username, password: data.password, role: data.role }),
      })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        if (data.username) {
          toast.success("User " + data.username + "Created!");
          setTimeout(() => {
            window.location.reload(false)
          }, 1000);
        } else if (data == "account exists") {
          toast.error("Account exists!");
        } else {
          toast.error("Wrong username or password!");
        }
      });
    }

    return (
      <div className="dropdown dropdown-bottom mx-3">
        <label tabIndex={1} className="btn btn-active btn-ghost">
            Create User
        </label>
        <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
          <form onSubmit={handleSubmit(data => submitCreateUserInfo(data))}>
            <div className="form-control w-full max-w-xs">

              <label className="label text-left block">
                <span className="label-text">Username</span>
                {errors.username && <p className="text-red-500 text-xs">Username length needs between 4-20</p>}
              </label>
              <input type="text" placeholder="Type username here" className={`input input-bordered w-full max-w-xs ${errors.username && "input-error"}`} {...register('username', { required: true, minLength: 4, maxLength: 20 })}  />

              <label className="label text-left block">
                <span className="label-text">Password</span>
                {errors.password && <p className="text-red-500 text-xs">Password length needs between 4-20</p>}
              </label>
              <input type="text" placeholder="Type password here" className={`input input-bordered w-full max-w-xs ${errors.password && "input-error"}`} {...register('password', { required: true, minLength: 4, maxLength: 20 })}  />

              <label className="label text-left block">
                <span className="label-text">Role</span>
                {errors.role && <p className="text-red-500 text-xs">Please select a role</p> }
              </label>

              <select name="role" className={`select select-bordered w-full max-w-xs ${errors.role && "select-error"}`} {...register("role", { required: true })} >
                <option disabled selected value=''>Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

            </div>
            <input className="mt-4 input input-bordered" type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
};

export { DropdownCreateUser };
