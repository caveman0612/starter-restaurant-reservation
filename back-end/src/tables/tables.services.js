const knex = require("../db/connection");

function list() {
  return knex("tables").orderBy("table_name");
}

function read(table_id) {
  return knex("tables")
    .where({ table_id })
    .returning("*")
    .then((record) => record[0]);
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((record) => record[0]);
}

function update(table, reservation) {
  return knex("tables")
    .where({ table_id: table.table_id })
    .update({ free: !table.free, reservation_id: reservation.reservation_id })
    .returning("*")
    .then((record) => record[0]);
}

function destory(table) {
  return knex("tables")
    .where({ table_id: table.table_id })
    .update({ free: !table.free })
    .returning("*")
    .then((record) => record[0]);
}

module.exports = { list, create, read, update, destory };
