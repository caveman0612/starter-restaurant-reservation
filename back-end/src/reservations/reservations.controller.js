/**
 * List handler for reservation resources
 */

const reservationService = require("./reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  const data = await reservationService.list(date);
  res.json({
    data,
  });
}

async function read(req, res, next) {
  const { reservation_Id } = req.params;
  const value = await reservationService.read(reservation_Id);
  if (!value) {
    return next({
      status: 404,
      message: `id ${reservation_Id} does not exist`,
    });
  }
  res.json({ data: value });
}

async function create(req, res, next) {
  const data = req.body.data;
  const value = await reservationService.create(data);
  res.status(201).json({ data: value });
}

// Validation

function validateNumOfPeople(req, res, next) {
  const { data } = req.body;
  if (!data.people || typeof data.people !== "number") {
    return next({
      status: 400,
      message: "people is missing or empty or not a number",
    });
  }
  if (data.people < 1) {
    return next({
      status: 400,
      message: "people needs to be a number greater then 0",
    });
  }
  next();
}

function validateProperty(property) {
  return (req, res, next) => {
    const { data } = req.body;
    if (!data) {
      return next({ status: 400, message: "data is missing" });
    } else if (!data[property]) {
      return next({
        status: 400,
        message: `value of ${property} is missing or empty`,
      });
    }
    next();
  };
}

function validateDate(req, res, next) {
  const { data } = req.body;
  if (
    !data["reservation_date"] ||
    new Date(data["reservation_date"]).toString() == "Invalid Date"
  ) {
    return next({
      status: 400,
      message: `value of reservation_date is missing or empty`,
    });
  }
  const today = new Date();
  const reservationDate = new Date(data["reservation_date"]);
  // console.log(reservationDate.getDay());
  if (today > reservationDate.getTime() && reservationDate.getDay() == 1) {
    return next({
      status: 400,
      message:
        "Reservation date/time must occur in the future|The restaurant is closed on Tuesday",
    });
  } else if (today > reservationDate.getTime()) {
    return next({
      status: 400,
      message: "Reservation date/time must occur in the future",
    });
  } else if (reservationDate.getDay() == 1) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday",
    });
  }
  next();
}

function validateTime(req, res, next) {
  const { data } = req.body;
  // console.log(data.reservation_date, data.reservation_time);
  const date = new Date(`${data.reservation_date}, ${data.reservation_time}`);
  const minutes = date.getHours() * 60 + date.getMinutes();
  const startingMinutes = 630;
  const endingMinutes = 1290;
  if (
    !data["reservation_time"] ||
    !data["reservation_time"]
      .split(":")
      .every((string) => string.match(/[0-9]\d+/))
  ) {
    return next({
      status: 400,
      message: `value of reservation_time is missing or empty`,
    });
  }
  if (minutes < startingMinutes || minutes > endingMinutes) {
    return next({
      status: 400,
      message: "Please select a time between 10:30 and 21:30",
    });
  }
  next();
}

// function validate

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateProperty("first_name"),
    validateProperty("last_name"),
    validateProperty("mobile_number"),
    validateNumOfPeople,
    validateTime,
    validateDate,
    asyncErrorBoundary(create),
  ],
  read: asyncErrorBoundary(read),
};
