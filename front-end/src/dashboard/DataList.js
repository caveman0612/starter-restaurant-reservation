import React from "react";
import ReservationTable from "./ReservationTable";
import TablesTable from "./TablesTable";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

const DataList = ({ reservations, date, tables, setReservationsError }) => {
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
    <div className="wrapper d-flex">
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
        <ReservationTable date={date} reservations={reservations} />
      </div>

      <TablesTable
        tables={tables}
        setReservationsError={setReservationsError}
      />
    </div>
  );
};

export default DataList;
