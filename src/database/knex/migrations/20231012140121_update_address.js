exports.up = knex => knex.schema.alterTable("address", table => {
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.alterTable("address", table => {
  table.dropColumn("created_at");
  table.dropColumn("updated_at");
});