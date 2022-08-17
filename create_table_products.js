const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id");
    table.string("title");
    table.string("price");
    table.string("thumbnail");
  })
  .then(() => console.log("Table productos created."))
  .catch((err) => console.log(err))
  .finally(() => knex.destroy());
