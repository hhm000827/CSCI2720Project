import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const UpdateUsernameButton = ({ userinfo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const updateUsername = (data) => {
    console.log(userinfo);
    let oldName = userinfo;
    console.log(data);
    fetch("/updateAccount", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldUsername: userinfo, newUsername: data.newUsername }),
    })
    .then((res) => (res.text()))
    .then((resData) => {
      if (resData == "success") {
        toast.success("User "+ oldName + " changed username successfully!");
        setTimeout(() => {
          window.location.reload(false)
        }, 1000);
      } else {
        toast.error(resData);
      }
    })
    .catch(err => toast.error(err));
  }

  return (
    <div className="dropdown dropdown-bottom mx-3">
      <label tabIndex={1}>
        Update Username
      </label>
      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 font-normal">
        <form onSubmit={handleSubmit(data => updateUsername(data))}>
          <div className="form-control w-full max-w-xs">

            <label className="label text-left block">
              <span className="label-text">New Username</span>
              {errors.newUsername && <p className="text-red-500 text-xs">Username length needs between 4-20</p>}
            </label>
            <input type="text" placeholder="Type new username" className={`input input-bordered w-full max-w-xs ${errors.newUsername && "input-error"}`} {...register('newUsername', { required: true, minLength: 4, maxLength: 20 })}  />

          </div>
          <input className="mt-4 input input-bordered" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export { UpdateUsernameButton };