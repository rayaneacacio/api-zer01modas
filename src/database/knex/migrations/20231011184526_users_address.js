exports.up = knex => knex.schema.createTable("address", table => {
  table.increments("id"),
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE"),
  table.text("destinatário").references("name").inTable("users"),
  table.integer("cep"),
  table.text("rua"),
  table.integer("numero"),
  table.text("complemento"),
  table.text("bairro"),
  table.text("cidade"),
  table.text("estado"),
  table.text("ponto_de_referencia")
});

exports.down = knex => knex.schema.dropTable("address");