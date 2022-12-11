import { DeleteUserButton } from "./DeleteUserButton";
import { UpdatePasswordButton } from "./UpdatePasswordButton";
import { UpdateUsernameButton } from "./UpdateUsernameButton";

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
                    <br /> <span class="badge badge-ghost badge-sm">Event ID: {event.eventid}</span>
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

const UserTable = (props) => {
  return (
    <div className="flex justify-center">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Favorite Location</th>
            <th>Update Username</th>
            <th>Update Password</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {props.filterData.map((user) => (
            <tr className="hover">
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {user.favoritelist.map((location) => {
                  return (
                    <>
                      {location}
                      <br />
                    </>
                  );
                })}
              </td>
              <td>
                <UpdateUsernameButton className="font-normal" userinfo={user.username} />
              </td>
              <td>
                <UpdatePasswordButton className="font-normal" userinfo={user.username} />
              </td>
              <td>
                <DeleteUserButton className="font-normal" userinfo={user.username} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { LocationTable, UserTable };
