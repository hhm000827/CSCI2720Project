import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const UpdatePasswordButton = ({ userinfo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const updatePassword = (data) => {
    console.log(userinfo);
    let usernameIntable = userinfo;
    console.log(data);
    fetch("/updateAccountPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password, username: userinfo }),
    })
    .then((res) => (res.text()))
    .then((resData) => {
      if (resData == "success") {
        toast.success("User "+ usernameIntable + " changed password!");
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
      <button tabIndex={1}>Update Password</button>
      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 font-normal">
        <form onSubmit={handleSubmit(data => updatePassword(data))}>
          <div className="form-control w-full max-w-xs">

            <label className="label text-left block">
              <span className="label-text">New Password</span>
              {errors.newPassword && <p className="text-red-500 text-xs">Password length needs between 4-20</p>}
            </label>
            <input type="text" placeholder="Type new password" className={`input input-bordered w-full max-w-xs ${errors.password && "input-error"}`} {...register('password', { required: true, minLength: 4, maxLength: 20 })}  />

          </div>
          <input className="mt-4 input input-bordered" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export { UpdatePasswordButton };
