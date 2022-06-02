import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import React from "react";

const ReservationTable = ({ date, reservations }) => {
  const history = useHistory();

  function previousClick() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function todayClick() {
    history.push(`/dashboard?date=${today()}`);
  }

  function nextClick() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <div className="left d-flex flex-column">
      <div className="button-section">
        <button className="" onClick={previousClick}>
          Previous
        </button>
        <button className="" onClick={todayClick}>
          Today
        </button>
        <button className="" onClick={nextClick}>
          Next
        </button>
      </div>
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
                      <button className="btn btn-secondary">Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-secondary">Cancel</button>
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
