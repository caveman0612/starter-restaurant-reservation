import React from "react";

const ReservationTemplate = ({ handleChange, formData }) => {
  return (
    <>
      <div className="top-form row me-1">
        <label htmlFor="first_name" className="label d-flex flex-column">
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
    </>
  );
};

export default ReservationTemplate;
