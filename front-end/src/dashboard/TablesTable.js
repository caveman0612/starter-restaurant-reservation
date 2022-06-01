import React from "react";
import { deleteSeatedTable } from "../utils/api";
import { useHistory } from "react-router-dom";

const TablesTable = ({ tables, setReservationsError }) => {
  const history = useHistory();

  function handleFreeTable(table) {
    const confirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirm) {
      deleteSeatedTable({ table_id: table.table_id })
        .then(() => {
          history.go(0);
        })
        .catch(setReservationsError);
    }
  }

  return (
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
                {table.free ? (
                  <td data-table-id-status={table.table_id}>free</td>
                ) : (
                  <>
                    <td data-table-id-status={table.table_id}>occupied</td>
                    <td>
                      <button
                        onClick={() => handleFreeTable(table)}
                        data-table-id-finish={table.table_id}
                        data-reservation-id-finish={table.reservation_id}
                      >
                        Finished
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablesTable;
