import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const DetailModal = (props) => {
    return (
        <div>
            <label
                htmlFor={"detail-modal".concat("-", props.event.eventid)}
                className="btn btn-xs"
            >
                Details
            </label>
            <input
                type="checkbox"
                id={"detail-modal".concat("-", props.event.eventid)}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor={"detail-modal".concat(
                            "-",
                            props.event.eventid
                        )}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Details of the event</h3>
                    <table className="table table-compact table-zebra w-full">
                        <tbody>
                            <tr>
                                <th>Event title</th>
                                <td>{props.event.title}</td>
                            </tr>
                            <tr>
                                <th>Event ID</th>
                                <td>{props.event.eventid}</td>
                            </tr>
                            <tr>
                                <th>Event date</th>
                                <td>{props.event.date}</td>
                            </tr>
                            <tr>
                                <th>Event venue</th>
                                <td>{props.event.venuename}</td>
                            </tr>
                            <tr>
                                <th>Event presenter</th>
                                <td>{props.event.presenter}</td>
                            </tr>
                            <tr>
                                <th>Event description</th>
                                <td>{props.event.description}</td>
                            </tr>
                            <tr>
                                <th>Event price</th>
                                <td>{props.event.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const UpdateEventModal = (props) => {
    const [venue, setVenue] = useState(props.event.venuename);
    const [title, setTitle] = useState(props.event.title);
    const [date, setDate] = useState(props.event.date);
    const [presenter, setPresenter] = useState(props.event.presenter);
    const [description, setDescription] = useState(props.event.description);
    const [price, setPrice] = useState(props.event.price);

    function submitUpdate() {
        if (venue && title && date && presenter && description && price) {
            fetch("/updateVenueEvent", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventid: props.event.eventid,
                    price: price,
                    title: title,
                    description: description,
                    presenter: presenter,
                    date: date,
                    latitude: props.locations[venue].latitude,
                    longitude: props.locations[venue].longitude,
                    venuename: venue,
                }),
            })
                .then((res) => (res.status === 200 ? res.json() : res.text()))
                .then((data) => {
                    toast.success("Updated event");
                })
                .then(() => {
                    window.location.reload(false);
                    window.scrollTo(0, 0);
                });
        } else {
            toast.error("Please fill in all the information!");
        }
    }

    useEffect(() => {
        setVenue(props.event.venuename);
        setTitle(props.event.title);
        setDate(props.event.date);
        setPresenter(props.event.presenter);
        setDescription(props.event.description);
        setPrice(props.event.price);
    }, [props.event]);

    return (
        <div>
            <label
                htmlFor={"update-event-modal".concat("-", props.event.eventid)}
                className="btn btn-xs"
            >
                Update
            </label>
            <input
                type="checkbox"
                id={"update-event-modal".concat("-", props.event.eventid)}
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor={"update-event-modal".concat(
                            "-",
                            props.event.eventid
                        )}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Updating the event</h3>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Event venue</span>
                        </label>
                        <select
                            id="venue-create"
                            className="select select-bordered w-full max-w-xs"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        >
                            <option disabled selected>
                                Select a venue
                            </option>
                            {props.locations &&
                                Object.entries(props.locations).map(
                                    ([key, value]) => <option>{key}</option>
                                )}
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Event title</span>
                        </label>
                        <input
                            type="text"
                            id={"title-update".concat("-", props.event.eventid)}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Event date</span>
                        </label>
                        <input
                            type="text"
                            id={"date-update".concat("-", props.event.eventid)}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Event presenter</span>
                        </label>
                        <input
                            type="text"
                            id={"presenter-update".concat(
                                "-",
                                props.event.eventid
                            )}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={presenter}
                            onChange={(e) => setPresenter(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">
                                Event description
                            </span>
                        </label>
                        <input
                            type="text"
                            id={"description-update".concat(
                                "-",
                                props.event.eventid
                            )}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Event price</span>
                        </label>
                        <input
                            type="text"
                            id={"price-update".concat("-", props.event.eventid)}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn my-3"
                        onClick={() => submitUpdate(props.event.eventid)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateEventModal = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function submitCreate(data) {
        fetch("/createVenueEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventid: data.eventid,
                price: data.price,
                title: data.title,
                description: data.description,
                presenter: data.presenter,
                date: data.date,
                latitude: props.locations[data.venue].latitude,
                longitude: props.locations[data.venue].longitude,
                venuename: data.venue,
            }),
        })
            .then((res) => (res.status === 200 ? res.json() : res.text()))
            .then((data) => {
                toast.success("Created event");
            })
            .then(() => {
                window.location.reload(false);
                window.scrollTo(0, 0);
            });
    }

    return (
        <div>
            <label htmlFor="create-event-modal" className="btn btn-xs">
                Create a new event
            </label>
            <input
                type="checkbox"
                id="create-event-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="create-event-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">Creating a new event</h3>
                    <form onSubmit={handleSubmit((data) => submitCreate(data))}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Event ID</span>{" "}
                                {errors.eventid && (
                                    <p className="text-red-500 text-xs">
                                        Event id is required
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="eventid-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("eventid", {
                                    required: true,
                                    min: 0,
                                })}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Event venue</span>
                                {errors.venue && (
                                    <p className="text-red-500 text-xs">
                                        Venue is required
                                    </p>
                                )}
                            </label>
                            <select
                                id="venue-create"
                                className="select select-bordered w-full max-w-xs"
                                {...register("venue", {
                                    required: true,
                                })}
                            >
                                <option disabled selected value="">
                                    Select a venue
                                </option>
                                {props.locations &&
                                    Object.entries(props.locations).map(
                                        ([key, value]) => <option value={key}>{key}</option>
                                    )}
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Event title</span>
                                {errors.title && (
                                    <p className="text-red-500 text-xs">
                                        Title is required
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="title-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("title", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Event date</span>
                                {errors.date && (
                                    <p className="text-red-500 text-xs">
                                        Date is required
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="date-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("date", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Event presenter
                                </span>              {errors.presenter && (
                                <p className="text-red-500 text-xs">
                                    Presenter is required
                                </p>
                            )}
                            </label>
              
                            <input
                                type="text"
                                id="presenter-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("presenter", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">
                                    Event description
                                </span>
                                {errors.description && (
                                    <p className="text-red-500 text-xs">
                                        Description is required
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="description-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("description", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Event price</span>
                                {errors.price && (
                                    <p className="text-red-500 text-xs">
                                        Price is required
                                    </p>
                                )}
                            </label>
                            <input
                                type="text"
                                id="price-create"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                {...register("price", {
                                    required: true,
                                })}
                            />
                        </div>

                        <button className="btn my-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { DetailModal, UpdateEventModal, CreateEventModal };
