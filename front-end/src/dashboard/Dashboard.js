import React, { useState, useEffect } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DataList from "./DataList";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const query = useQuery();
  let date = query.get("date");
  date = date ? date : today();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables({ date }, abortController.signal)
      .then(setTables)
      .catch(setReservationsError);

    return () => abortController.abort();
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <DataList
        reservations={reservations}
        tables={tables}
        date={date}
        setReservationsError={setReservationsError}
      />
    </main>
  );
}

export default Dashboard;
