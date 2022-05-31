import React from "react";

const TablesTable = ({ tables }) => {
  const occupied = tables
    .map((table, idx) => {
      return !table.free ? idx : null;
    })
    .filter((item) => typeof item === "number");

  function handleFreeTable(table) {}

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
                <td>{table.free ? "Free" : "Occupied"}</td>
                <td>
                  {occupied.includes(idx) ? (
                    <button onClick={() => handleFreeTable(table)}>
                      Finished
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablesTable;
