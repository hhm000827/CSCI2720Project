const LocationTable = (props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact table-zebra w-full">
        <thead>
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
                    <br /> <span class="badge badge-ghost badge-sm">Event Id: {event.eventid}</span>
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
