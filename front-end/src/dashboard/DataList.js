import React from "react";
import "./dataList.css";
import ReservationTable from "./ReservationTable";
import TablesTable from "./TablesTable";

const DataList = ({ reservations, date, tables, setReservationsError }) => {
  return (
    <div className="wrapper">
      <ReservationTable date={date} reservations={reservations} />
      <TablesTable
        tables={tables}
        setReservationsError={setReservationsError}
      />
    </div>
  );
};

export default DataList;
