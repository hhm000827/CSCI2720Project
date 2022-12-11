import React from "react";
import toast from "react-hot-toast";
import { DetailModal, UpdateEventModal } from "../component/Modal";

const AdminLocationTable = (props) => {
  function deleteEvent(event) {
    let url = "/deleteVenueEvent";
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventid: event.eventid,
      }),
    })
      .then((res) => (res.status === 200 ? res.json() : res.text()))
      .then((data) => {
        toast.success("Deleted event");
      })
      .then(() => {
        window.location.reload(false);
        window.scrollTo(0, 0);
      });
  }

  return (
    <div className="overflow-x-auto w-full z-0">
      <table className="table table-compact table-zebra w-full z-0">
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Detail</th>
            <th>Update Event</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.events &&
            props.events.map((event) => {
              return (
                <tr className="hover">
                  <td>
                    {event.title}
                    <br /> <span class="badge badge-ghost badge-sm">Event ID: {event.eventid}</span>
                  </td>
                  <td>
                    <DetailModal event={event} />
                  </td>
                  <td>
                    <UpdateEventModal event={event} locations={props.locations} />
                  </td>
                  <td>
                    <button className="btn btn-xs" onClick={() => deleteEvent(event)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th>Event Title</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const LocationTable = (props) => {
  return (
    <div className="overflow-x-auto w-full z-0">
      <table className="table table-compact table-zebra w-full z-0">
        <thead>
          <tr>
            <th>Event Title</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {props.events &&
            props.events.map((event) => {
              return (
                <tr className="hover">
                  <td>
                    {event.title}
                    <br /> <span class="badge badge-ghost badge-sm">Event ID: {event.eventid}</span>
                  </td>
                  <td>
                    <DetailModal event={event} />
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th>Event Title</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export { AdminLocationTable, LocationTable };
