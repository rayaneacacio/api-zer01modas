exports.up = knex => knex.schema.createTable("shopping_cart", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.text("size");
  table.text("color_name");
  table.text("color_hex");
  table.integer("quantity");
});

exports.down = knex => knex.schema.dropTable("shopping_cart");