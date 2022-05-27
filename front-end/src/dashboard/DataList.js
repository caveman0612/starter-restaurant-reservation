import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import "./dataList.css";

const DataList = ({ reservations, date, tables }) => {
  // console.log(date);
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

  const occupied = tables
    .map((table, idx) => {
      if (!table.free) return idx;
    })
    .filter((item) => typeof item === "number");

  return (
    <div className="wrapper">
      <div className="left">
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
        <div className="table-section">
          <table>
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
            <tbody>
              {reservations.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.reservation_id}</td>
                  <td>{`${item.last_name},${item.first_name}`}</td>
                  <td>{item.mobile_number}</td>
                  <td>{item.reservation_data}</td>
                  <td>{item.reservation_time}</td>
                  <td>{item.people}</td>
                  <td>booked</td>
                  <td>
                    <button>Seat</button>
                  </td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="right">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>TABLE NAME</th>
              <th>CAPACITY</th>
              <th>Free?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table, idx) => {
              return (
                <tr key={idx}>
                  <td>{table.table_id}</td>
                  <td>{table.table_name}</td>
                  <td>{table.capacity}</td>
                  <td>{table.free ? "Free" : "Occupied"}</td>
                  <td>
                    {occupied.includes(idx) ? <button>Finished</button> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
