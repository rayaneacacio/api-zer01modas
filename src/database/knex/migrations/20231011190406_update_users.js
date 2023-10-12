exports.up = knex => knex.schema.alterTable("users", table => {
  table.integer("isAdmin").defaultTo(0);
});

exports.down = knex => knex.schema.alterTable("users", table => {
  table.dropColumn("isAdmin");
});