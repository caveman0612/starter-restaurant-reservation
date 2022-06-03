// import { useHistory } from "react-router-dom";
// import { today, previous, next } from "../utils/date-time";
import React from "react";
import { useHistory } from "react-router";
import { updateReservationStatus } from "../utils/api";

const ReservationTable = ({ reservations }) => {
  const history = useHistory();

  function handleCancel(reservation) {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      updateReservationStatus({
        status: "cancelled",
        reservation_id: reservation.reservation_id,
      })
        .then(() => {
          history.go(0);
        })
        .catch(console.log);
    }
  }
  return (
    <div className="left d-flex flex-column">
      <div className="d-flex">
        <table className="overflow-scroll">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>PEOPLE</th>
              <th>STATUS</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="">
            {reservations.map((item, idx) => (
              <tr key={idx}>
                <td>{item.reservation_id}</td>
                <td>{`${item.last_name},${item.first_name}`}</td>
                <td>{item.mobile_number}</td>
                <td>{item.reservation_data}</td>
                <td>{item.reservation_time}</td>
                <td>{item.people}</td>
                <td data-reservation-id-status={item.reservation_id}>
                  {item.status}
                </td>
                {item.status === "booked" ? (
                  <>
                    <td>
                      <a
                        className="btn btn-secondary"
                        href={`/reservations/${item.reservation_id}/seat`}
                      >
                        Seat
                      </a>
                    </td>
                    <td>
                      {/* <button className="btn btn-secondary">Edit</button> */}
                      <a
                        className="btn btn-secondary"
                        href={`/reservations/${item.reservation_id}/edit`}
                      >
                        edit
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        data-reservation-id-cancel={item.reservation_id}
                        className="btn btn-secondary cancel"
                        onClick={() => handleCancel(item)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationTable;
