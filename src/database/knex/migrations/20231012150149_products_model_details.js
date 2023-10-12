exports.up = knex => knex.schema.createTable("products_model_details", table => {
  table.increments("id");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.text("model_detail");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products_model_details");