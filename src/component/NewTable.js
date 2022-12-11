import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    DetailModal,
    UpdateEventModal,
    CreateEventModal,
} from "../component/Modal";

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
        <div className="overflow-x-auto w-full">
            <table className="table table-compact table-zebra w-full">
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
                                        <br />{" "}
                                        <span class="badge badge-ghost badge-sm">
                                            Event ID: {event.eventid}
                                        </span>
                                    </td>
                                    <td>
                                        <DetailModal event={event} />
                                    </td>
                                    <td>
                                        <UpdateEventModal event={event} locations={props.locations}/>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs"
                                            onClick={() => deleteEvent(event)}
                                        >
                                            Delete
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
        <div className="overflow-x-auto w-full">
            <table className="table table-compact table-zebra w-full">
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th></th>
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
