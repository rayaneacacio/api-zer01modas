exports.up = knex => knex.schema.createTable("cupons", table => {
  table.increments("id");
  table.text("cupom");
  table.integer("discount");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("cupons");