import React from "react";
import "./dataList.css";
import ReservationTable from "./ReservationTable";
import TablesTable from "./TablesTable";

const DataList = ({ reservations, date, tables }) => {
  return (
    <div className="wrapper">
      <ReservationTable date={date} reservations={reservations} />
      <TablesTable tables={tables} />
    </div>
  );
};

export default DataList;
