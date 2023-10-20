const knex = require("../database/knex/index");

class ProductsCommentsController {
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id, comment, score } = request.body;

    await knex("products_comments").insert({ product_id, user_id, comment, score });

    const comments = await knex("products_comments").where({ product_id });

    let soma = 0;
    comments.map(comment => {
      soma = soma+comment.score;
    });

    const media = (soma/comments.length).toFixed(1);

    await knex("products").update({ score: Number(media) }).where({ id: product_id });

    return response.json();
  }

  async indexByProducts(request, response) {
    //retorna todos os comentarios de um produto;
    const { product_id } = request.query;

    const comments = await knex("products_comments").where({ product_id });

    return response.json(comments);
  }

  async indexByUser(request, response) {
    //retorna todos os comentarios de um usuario;
    const user_id  = request.user.id;

    const comments = await knex("products_comments").where({ user_id });

    return response.json(comments);
  }

  async update(request, response) {
    const user_id = request.user.id;
    const { product_id, comment, score } = request.body;

    const productComment = await knex("products_comments").where({ user_id, product_id });

    const newComment = comment ?? productComment.comment;
    const newScore = score ?? productComment.score;

    await knex("products_comments").update({ comment: newComment, score: newScore }).where({ product_id, user_id });

    const comments = await knex("products_comments").where({ product_id });

    let soma = 0;
    comments.map(comment => {
      soma = soma+comment.score;
    });

    const media = (soma/comments.length).toFixed(1);

    await knex("products").update({ score: Number(media) }).where({ id: product_id });

    return response.json();
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    await knex("products_comments").delete().where({ user_id, product_id });

    return response.json();
  }
}

module.exports = ProductsCommentsController;