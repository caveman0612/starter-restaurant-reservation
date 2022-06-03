import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateEditReservation } from "../utils/api";

const ReservationEdit = () => {
  const _initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const { reservation_id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState(_initialFormState);
  const [isError, setIsError] = useState([]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    const controller = new AbortController();

    readReservation({ reservation_id }, controller.signal)
      .then((data) => {
        const value = {
          ...data,
          reservation_date: data.reservation_date.split("T")[0],
        };
        setFormData(value);
      })
      .catch(setIsError);
    return () => controller.abort();
  }, [reservation_id, history]);

  function handleSubmit(event) {
    event.preventDefault();
    const { people } = formData;
    const value = { ...formData, people: Number(people), status: "booked" };

    const controller = new AbortController();
    updateEditReservation(value, controller.signal)
      .then((data) => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch((error) => {
        console.log(error);
        const splitError = error.message.split("|");
        setIsError(splitError);
      });
  }

  function handleCancel() {
    history.push("dashboard");
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
      <h2>Edit Reservation</h2>
      {isError.length ? errorMessage : null}
      <div className="top-form row">
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
      </div>

      <button className="form-cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="form-submit">
        Submit
      </button>
      {/* <input type="submit" value="submit" /> */}
    </form>
  );
};

export default ReservationEdit;
