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
        <button tabIndex={1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
          </svg>
        </button>

      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-56 font-normal">
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
