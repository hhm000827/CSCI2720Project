import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DetailModal = (props) => {
  return (
    <div>
      <label htmlFor={"detail-modal".concat("-", props.event.eventid)} className="btn btn-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </label>
      <input type="checkbox" id={"detail-modal".concat("-", props.event.eventid)} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={"detail-modal".concat("-", props.event.eventid)} className="btn btn-sm btn-circle absolute right-2 top-2">
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const venue = useRef(null);
  const title = useRef(null);
  const date = useRef(null);
  const presenter = useRef(null);
  const description = useRef(null);
  const price = useRef(null);

  function submitUpdate(data) {
    console.log(data);
    fetch("/updateVenueEvent", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventid: props.event.eventid,
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
        if (typeof data !== "string") {
          toast.success("Updated event");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else toast.error(data);
      });
  }

  return (
    <div>
      <label htmlFor={"update-event-modal".concat("-", props.event.eventid)} className="btn btn-xs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </label>
      <input type="checkbox" id={"update-event-modal".concat("-", props.event.eventid)} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={"update-event-modal".concat("-", props.event.eventid)} className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => document.getElementById("updateForm").reset()}>
            ✕
          </label>
          <h3 className="text-lg font-bold">Updating the event</h3>
          <form id="updateForm" onSubmit={handleSubmit((data) => submitUpdate(data))}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event venue</span>
                {errors.venue && <p className="text-red-500 text-xs">Venue is required</p>}
              </label>
              <select
                id="venue-create"
                className="select select-bordered w-full max-w-xs"
                defaultValue=""
                ref={venue}
                {...register("venue", {
                  required: true,
                })}
              >
                <option disabled selected value="">
                  Select a venue
                </option>
                {props.locations && Object.entries(props.locations).map(([key, value]) => <option value={key}>{key}</option>)}
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event title</span>
                {errors.title && <p className="text-red-500 text-xs">Title is required</p>}
              </label>
              <input
                type="text"
                id={"title-update".concat("-", props.event.eventid)}
                className="input input-bordered w-full max-w-xs"
                defaultValue={props.event.title}
                ref={title}
                {...register("title", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event date</span>
                {errors.date && <p className="text-red-500 text-xs">Date is required</p>}
              </label>
              <input
                type="text"
                id={"date-update".concat("-", props.event.eventid)}
                className="input input-bordered w-full max-w-xs"
                defaultValue={props.event.date}
                ref={date}
                {...register("date", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event presenter</span>
                {errors.presenter && <p className="text-red-500 text-xs">Presenter is required</p>}
              </label>
              <input
                type="text"
                id={"presenter-update".concat("-", props.event.eventid)}
                className="input input-bordered w-full max-w-xs"
                defaultValue={props.event.presenter}
                ref={presenter}
                {...register("presenter", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event description</span>
                {errors.description && <p className="text-red-500 text-xs">Description is required</p>}
              </label>
              <input
                type="text"
                id={"description-update".concat("-", props.event.eventid)}
                className="input input-bordered w-full max-w-xs"
                defaultValue={props.event.description}
                ref={description}
                {...register("description", {
                  required: true,
                })}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event price</span>
                {errors.price && <p className="text-red-500 text-xs">Price is required</p>}
              </label>
              <input
                type="text"
                id={"price-update".concat("-", props.event.eventid)}
                className="input input-bordered w-full max-w-xs"
                defaultValue={props.event.price}
                ref={price}
                {...register("price", {
                  required: true,
                })}
              />
            </div>
            <div className="flex flex-row space-x-4">
              <div>
                <button type="submit" className="btn my-3">
                  Submit
                </button>
              </div>
              <div>
                <button type="reset" className="btn my-3" onClick={() => reset()}>
                  Reset
                </button>
              </div>
            </div>
          </form>
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
        if (typeof data !== "string") {
          toast.success("Created event");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else if (data === "Event exists") toast.error("Event exists, pls change the event ID");
        else toast.error(data);
      });
  }

  return (
    <div>
      <label htmlFor="create-event-modal" className="btn btn-xs">
        Create a new event
      </label>
      <input type="checkbox" id="create-event-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="create-event-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Creating a new event</h3>
          <form onSubmit={handleSubmit((data) => submitCreate(data))}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event ID</span>
                {errors.eventid && <p className="text-red-500 text-xs">{errors.eventid.message}</p>}
              </label>
              <input
                type="number"
                id="eventid-create"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                {...register("eventid", {
                  required: "Event ID is required",
                  min: { value: 0, message: "Event ID must at least 1" },
                })}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event venue</span>
                {errors.venue && <p className="text-red-500 text-xs">Venue is required</p>}
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
                {props.locations && Object.entries(props.locations).map(([key, value]) => <option value={key}>{key}</option>)}
              </select>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Event title</span>
                {errors.title && <p className="text-red-500 text-xs">Title is required</p>}
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
                {errors.date && <p className="text-red-500 text-xs">Date is required</p>}
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
                <span className="label-text">Event presenter</span>
                {errors.presenter && <p className="text-red-500 text-xs">Presenter is required</p>}
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
                <span className="label-text">Event description</span>
                {errors.description && <p className="text-red-500 text-xs">Description is required</p>}
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
                {errors.price && <p className="text-red-500 text-xs">Price is required</p>}
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

            <button type="submit" className="btn my-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { DetailModal, UpdateEventModal, CreateEventModal };
