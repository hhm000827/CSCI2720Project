// Hau Ho Man (1155142373) 	Li Pok Man (1155144098)
// Chan Ho Him (1155142195)	Chan King Yu (1155142699)
// Ng Hon Ling (1155136169)	Thalang Ikshahang (1155136408)
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DropdownMenu = (props) => {
  return (
    <div className="dropdown dropdown-bottom mx-3">
      <label tabIndex={0} className="btn btn-xs">
        Sort
      </label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => props.sortingFunction(true)}>Sort asc</a>
        </li>
        <li>
          <a onClick={() => props.sortingFunction(false)}>Sort desc</a>
        </li>
      </ul>
    </div>
  );
};

const FavoriteLocationDropdown = (props) => {
  const [favoriteList, setFavoriteList] = useState();
  const [isMouseOver, setIsMouseOver] = useState(0);

  const fetchFavoriteList = (userName) => {
    fetch(`/getFavLoc?username=${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        if (data.favoritelist) setFavoriteList(data.favoritelist);
      });
  };

  const removeFavoriteList = (userName, venueName) => {
    fetch("/deleteFavLoc", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        favLoc: venueName,
      }),
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        toast.success("Removed from favorites");
        setFavoriteList((favoriteList) => favoriteList.filter((data) => data !== venueName));
      });
  };

  useEffect(() => {
    fetchFavoriteList(props.userName);
  }, [isMouseOver]);

  const changeIsMouseOver = (is) => {
    setIsMouseOver(is);
  };

  return (
    <ul className="menu menu-horizontal p-0">
      <li tabIndex={0}>
        <a onMouseOver={() => changeIsMouseOver(1)} onMouseOut={() => changeIsMouseOver(0)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="red">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </a>
        <ul className="rounded-box bg-base-100 p-2 z-10">
          {typeof favoriteList !== "undefined" && favoriteList.length > 0 ? (
            favoriteList.map((item) => {
              return (
                <div className="flex flex-row justify-between">
                  <div>
                    <li>
                      <a href={`/location/${item.replace(/ /g, "_")}`}>{item}</a>
                    </li>
                  </div>
                  <div>
                    <button className="w-full h-full" onClick={(e) => removeFavoriteList(props.userName, item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <li>
              <p>Add Location here!</p>
            </li>
          )}
        </ul>
      </li>
    </ul>
  );
};

const DropdownCreateUser = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          toast.success("User " + data.username + " created!");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else if (data == "account exists") {
          toast.error("Account exists!");
        } else {
          toast.error("Wrong username or password!");
        }
      });
  };

  return (
    <div className="dropdown dropdown-bottom mx-3">
      <label tabIndex={1} className="btn btn-active btn-ghost">
        Create User
      </label>
      <div tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
        <form onSubmit={handleSubmit((data) => submitCreateUserInfo(data))}>
          <div className="form-control w-full max-w-xs">
            <label className="label text-left block">
              <span className="label-text">Username</span>
              {errors.username && <p className="text-red-500 text-xs">Username length needs between 4-20</p>}
            </label>
            <input
              type="text"
              placeholder="Type username here"
              className={`input input-bordered w-full max-w-xs ${errors.username && "input-error"}`}
              {...register("username", { required: true, minLength: 4, maxLength: 20 })}
            />

            <label className="label text-left block">
              <span className="label-text">Password</span>
              {errors.password && <p className="text-red-500 text-xs">Password length needs between 4-20</p>}
            </label>
            <input
              type="text"
              placeholder="Type password here"
              className={`input input-bordered w-full max-w-xs ${errors.password && "input-error"}`}
              {...register("password", { required: true, minLength: 4, maxLength: 20 })}
            />

            <label className="label text-left block">
              <span className="label-text">Role</span>
              {errors.role && <p className="text-red-500 text-xs">Please select a role</p>}
            </label>

            <select name="role" className={`select select-bordered w-full max-w-xs ${errors.role && "select-error"}`} {...register("role", { required: true })}>
              <option disabled selected value="">
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <input className="btn btn-success mt-4 input input-bordered" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export { DropdownMenu, FavoriteLocationDropdown, DropdownCreateUser };
