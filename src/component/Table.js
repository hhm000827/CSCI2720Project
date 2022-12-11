import { EventDropdownMenu } from "../component/DropdownMenu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LocationTable = (props) => {
    const [selectedEvent, setSelectedEvent] = useState();

    function deleteEvent() {
        let url = "/deleteVenueEvent";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventid: selectedEvent.eventid,
            }),
        })
            .then((res) => (res.status === 200 ? res.json() : res.text()))
            .then((data) => {
                toast.success("Deleted event");
            })
            .then(() => {
                window.location.reload(false);
            });
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full">
                <thead>
                    <tr>
                        <label htmlFor="my-modal-3" className="btn">
                            Delete an event
                        </label>
                        <input
                            type="checkbox"
                            id="my-modal-3"
                            className="modal-toggle"
                        />
                        <div className="modal">
                            <div className="modal-box max-w-none w-9/12 max-h-none h-full">
                                <label
                                    htmlFor="my-modal-3"
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                    onClick={() => setSelectedEvent()}
                                >
                                    ✕
                                </label>
                                <h3 className="text-lg font-bold">
                                    Create an event
                                </h3>
                                <EventDropdownMenu
                                    events={props.events}
                                    handleFunction={setSelectedEvent}
                                />
                                {selectedEvent && (
                                    <table className="table table-compact table-zebra w-full">
                                        <tr>
                                            <th>Event title</th>
                                            <th>{selectedEvent.title}</th>
                                        </tr>
                                        <tr>
                                            <th>Event ID</th>
                                            <th>{selectedEvent.eventid}</th>
                                        </tr>
                                        <tr>
                                            <th>Event date</th>
                                            <th>{selectedEvent.date}</th>
                                        </tr>
                                        <tr>
                                            <th>Event venue</th>
                                            <th>{selectedEvent.venuename}</th>
                                        </tr>
                                        <tr>
                                            <th>Event presenter</th>
                                            <th>{selectedEvent.presenter}</th>
                                        </tr>
                                        <tr>
                                            <th>Event description</th>
                                            <th>{selectedEvent.description}</th>
                                        </tr>
                                        <tr>
                                            <th>Event price</th>
                                            <th>{selectedEvent.price}</th>
                                        </tr>
                                    </table>
                                )}
                                {selectedEvent && (
                                    <button
                                        className="btn warning"
                                        onClick={() => deleteEvent()}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                        <button>Update an event</button>
                        <button>Delete an event</button>
                    </tr>
                    <tr>
                        <th>Event Title</th>
                        <th>date</th>
                        <th>Venue</th>
                        <th>presenter</th>
                        <th>description</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {props.events &&
                        props.events.map((event) => {
                            return (
                                <tr className="hover">
                                    <td>
                                        {event.title}
                                        <br />{" "}
                                        <span class="badge badge-ghost badge-sm">
                                            Event ID: {event.eventid}
                                        </span>
                                    </td>
                                    <td>{event.date}</td>
                                    <td>{event.venuename}</td>
                                    <td>{event.presenter}</td>
                                    <td>{event.description}</td>
                                    <td>{event.price}</td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Event Title</th>
                        <th>date</th>
                        <th>Venue</th>
                        <th>presenter</th>
                        <th>description</th>
                        <th>price</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export { LocationTable };
