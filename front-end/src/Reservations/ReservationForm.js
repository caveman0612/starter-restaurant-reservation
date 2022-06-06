import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationTemplate from "./ReservationTemplate";

const ReservationForm = () => {
  const _initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState(_initialFormState);
  const [isError, setIsError] = useState([]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { people } = formData;
    const value = { ...formData, people: Number(people), status: "booked" };

    const controller = new AbortController();
    createReservation(value, controller.signal)
      .then((data) => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch((error) => {
        const splitError = error.message.split("|");
        setIsError(splitError);
      });

    return () => controller.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  const errorMessage = (
    <div className="alert alert-danger">
      Please fix the following Errors:
      <ul>
        {isError.map((error, idx) => {
          return <li key={idx}>{error}</li>;
        })}
      </ul>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Reservation</h2>
      {isError.length ? errorMessage : null}
      <ReservationTemplate formData={formData} handleChange={handleChange} />
      {/* <div className="top-form row">
        <label htmlFor="first_name" className="label">
          First Name
          <input
            type="text"
            placeholder=""
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
        </label>
        <label htmlFor="last_name" className="label">
          Last Name
          <input
            type="text"
            placeholder=""
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </label>
        <label htmlFor="mobile_number" className="label">
          Mobile Number
          <input
            type="tel"
            name="mobile_number"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </label>
      </div>
      <div className="bottem-form row">
        <label htmlFor="reservation_date" className="label">
          Date
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </label>
        <label htmlFor="reservation_time" className="label">
          Time
          <input
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </label>
        <label htmlFor="people" className="label">
          # of People
          <input
            type="number"
            name="people"
            onChange={handleChange}
            value={formData.people}
            min="1"
            required
          />
        </label>
      </div> */}

      <button className="form-cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="form-submit">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
