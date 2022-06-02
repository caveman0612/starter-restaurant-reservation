const knex = require("../db/connection");

function list(date = null) {
  if (date) {
    return knex("reservations")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
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

module.exports = { list, create, read, update };
