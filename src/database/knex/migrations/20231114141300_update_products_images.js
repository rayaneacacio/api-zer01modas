exports.up = knex => knex.schema.alterTable("products_images", table => {
  table.text("color_hex");
});

exports.down = knex => knex.schema.alterTable("products_images", table => {
  table.dropColumn("color_hex");
});