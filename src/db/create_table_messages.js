const { options } = require("./options/sqliteDB");
const knex = require("knex")(options);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("text");
    table.string("date");
    table.string("mail");
  })
  .then(() => {
    console.log("Table messages created");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy;
  });
