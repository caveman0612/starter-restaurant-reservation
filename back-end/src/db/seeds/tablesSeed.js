exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tables")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tables").insert([
        { table_name: "Bar #1", capacity: 1, free: true },
        { table_name: "Bar #2", capacity: 1, free: false },
        { table_name: "#1", capacity: 6, free: true },
        { table_name: "#2", capacity: 6, free: true },
      ]);
    });
};
