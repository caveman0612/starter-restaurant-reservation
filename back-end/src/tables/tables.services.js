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

function update(table) {
  return knex("tables")
    .where({ table_id: table.table_id })
    .update({ free: false })
    .returning("*")
    .then((record) => record[0]);
}

function destory(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ free: true })
    .returning("*")
    .then((record) => record[0]);
}

module.exports = { list, create, read, update, destory };
