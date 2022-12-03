import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SimpleInfoBar = (props) => {
    return (
        <div className="alert alert-info shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <span>{props.text}</span>
            </div>
        </div>
    );
};
const LocationInfoBar = (props) => {
    const infoText = `You are visiting ${props.venueName}`;
    const [Favorite, setFavorite] = useState(false);
    const username = sessionStorage.getItem("username");

    useEffect(() => {
        fetch(`/getFavLoc?username=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => (res.status === 200 ? res.json() : res.text()))
            .then((data) => {
                if (
                    data.favoritelist &&
                    data.favoritelist.includes(props.venueName)
                )
                    setFavorite(true);
            });
    }, []);

    const toggleFavorite = () => {
        if (!Favorite) {
            fetch("/createFavLoc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    favLoc: props.venueName,
                }),
            })
                .then((res) => (res.status === 200 ? res.json() : res.text()))
                .then((data) => {
                    toast.success("Added to favorites");
                });
        } else {
            fetch("/deleteFavLoc", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    favLoc: props.venueName,
                }),
            })
                .then((res) => (res.status === 200 ? res.json() : res.text()))
                .then((data) => {
                    toast.success("Removed from favorites");
                });
        }

        setFavorite(!Favorite);
    };

    return (
        <div className="alert alert-info shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
                <span>{infoText}</span>
            </div>
            <div>
                Add to Favorite
                <input
                    type="checkbox"
                    className={`toggle toggle-lg toggle-warning`}
                    checked={Favorite}                   
                    onClick={toggleFavorite}
                />
            </div>
        </div>
    );
};

export { SimpleInfoBar, LocationInfoBar };
