const knex = require("../db/connection");

function list(date = null) {
  if (date) {
    return knex("reservations")
      .where({ reservation_date: date })
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

function read(reservation_Id) {
  return knex("reservations")
    .where({ reservation_id: reservation_Id })
    .then((record) => record[0]);
}

module.exports = { list, create, read };
