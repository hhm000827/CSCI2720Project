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
        <button tabIndex={1}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        </button>

      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 font-normal">
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
