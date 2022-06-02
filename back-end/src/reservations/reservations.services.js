const knex = require("../db/connection");

function list({ date, mobile_number }) {
  if (date) {
    return knex("reservations")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  } else if (mobile_number) {
    return knex("reservations")
      .where("mobile_number", "ilike", `%${mobile_number}%`)
      .orderBy("reservation_time");
  }
  return knex("reservations").orderBy("reservation_time");
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((record) => record[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .then((record) => record[0]);
}

function update(status, reservation_id) {
  // console.log(status, reservation_id);
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((record) => record[0]);
}

function edit(
  {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  },
  reservation_id
) {
  // console.log(data);
  return knex("reservations")
    .where({ reservation_id })
    .update({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    })
    .returning("*")
    .then((record) => record[0]);
}

module.exports = { list, create, read, update, edit };
