import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchFavoriteList(props.userName);
  }, [favoriteList]);

  return (
    <ul className="menu menu-horizontal p-0">
      <li tabIndex={0}>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="red">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </a>
        <ul className="rounded-box bg-base-100 p-2 z-10">
          {typeof favoriteList !== "undefined" && favoriteList.length > 0 ? (
            favoriteList.map((item) => {
              return (
                <li>
                  <p>
                    {item}
                    <button>1</button>
                    <button>2</button>
                  </p>
                </li>
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

export { DropdownMenu, FavoriteLocationDropdown };
