exports.up = knex => knex.schema.alterTable("products", table => {
  table.dropColumn("promotion");
});

exports.down = knex => knex.schema.alterTable("products", table => {
  table.integer("promotion");
});