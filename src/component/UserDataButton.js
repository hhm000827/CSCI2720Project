import { useForm } from "react-hook-form";
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
          toast.success("User " + data.username + " deleted!");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          toast.error("Wrong username or password!");
        }
      });
  };

  return (
    <button onClick={deleteUser}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  );
};

const UpdateUsernameButton = ({ userinfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      .then((res) => res.text())
      .then((resData) => {
        if (resData == "success") {
          toast.success("User " + oldName + " changed username successfully!");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          toast.error(resData);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="dropdown dropdown-bottom mx-3">
      <button tabIndex={1}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </button>

      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-56 font-normal">
        <form onSubmit={handleSubmit((data) => updateUsername(data))}>
          <div className="form-control w-full max-w-xs">
            <label className="label text-left block">
              <span className="label-text">New Username</span>
              {errors.newUsername && <p className="text-red-500 text-xs">Username length needs between 4-20</p>}
            </label>
            <input
              type="text"
              placeholder="Type new username"
              className={`input input-bordered w-full max-w-xs ${errors.newUsername && "input-error"}`}
              {...register("newUsername", { required: true, minLength: 4, maxLength: 20 })}
            />
          </div>
          <input className="mt-4 input input-bordered" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

const UpdatePasswordButton = ({ userinfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      .then((res) => res.text())
      .then((resData) => {
        if (resData == "success") {
          toast.success("User " + usernameIntable + " changed password!");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          toast.error(resData);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="dropdown dropdown-bottom mx-3">
      <button tabIndex={1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
        </svg>
      </button>

      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-56 font-normal">
        <form onSubmit={handleSubmit((data) => updatePassword(data))}>
          <div className="form-control w-full max-w-xs">
            <label className="label text-left block">
              <span className="label-text">New Password</span>
              {errors.password && <p className="text-red-500 text-xs">Password length needs between 4-20</p>}
            </label>
            <input
              type="text"
              placeholder="Type new password"
              className={`input input-bordered w-full max-w-xs ${errors.password && "input-error"}`}
              {...register("password", { required: true, minLength: 4, maxLength: 20 })}
            />
          </div>
          <input className="mt-4 input input-bordered" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export { DeleteUserButton, UpdateUsernameButton, UpdatePasswordButton };
