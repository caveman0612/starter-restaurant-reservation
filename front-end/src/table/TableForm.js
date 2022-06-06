import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

const TableForm = () => {
  const history = useHistory();
  const _initialTableForm = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState(_initialTableForm);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { capacity } = formData;
    const controller = new AbortController();
    createTable(
      { ...formData, capacity: Number(capacity) },
      controller.signal
    ).then(() => {
      history.push("/dashboard");
    });
    return () => controller.abort();
  }

  function handleCancel(event) {
    history.go(-1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Table</h2>
      <div className="">
        <label htmlFor="table_name">
          Table Name
          <input
            type="text"
            placeholder="Table Name"
            name="table_name"
            pattern=".{2,}"
            onChange={handleChange}
            value={formData.table_name}
            required
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            name="capacity"
            onChange={handleChange}
            value={formData.capacity}
            min="1"
            required
          />
        </label>
        <div className="buttons-section">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default TableForm;
