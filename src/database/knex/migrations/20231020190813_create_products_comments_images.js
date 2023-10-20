exports.up = knex => knex.schema.createTable("products_comments_images", table => {
  table.increments("id");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.text("image");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products_comments_images");