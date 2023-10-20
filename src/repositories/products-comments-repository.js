const knex = require("../database/knex/index");

class ProductsCommentsRepository {
  async create(user_id, product_id, comment, score) {
    await knex("products_comments").insert({ product_id, user_id, comment, score });
  }

  async findAllCommentsOfProduct(product_id) {
    return await knex("products_comments").where({ product_id });
  }

  async calculateAverageScore(product_id) {
    const comments = await this.findAllCommentsOfProduct(product_id);

    let soma = 0;
    comments.map(comment => {
      soma = soma+comment.score;
    });

    const media = (soma/comments.length).toFixed(1);

    await knex("products").update({ score: Number(media) }).where({ id: product_id });
  }

  async update(user_id, product_id, comment, score) {
    const productComment = await knex("products_comments").where({ user_id, product_id });

    const newComment = comment ?? productComment.comment;
    const newScore = score ?? productComment.score;

    await knex("products_comments").update({ comment: newComment, score: newScore }).where({ product_id, user_id });
  }

  async findAllCommentsOfUser(user_id) {
    return await knex("products_comments").where({ user_id });
  }

  async delete(user_id, product_id) {
    await knex("products_comments").delete().where({ user_id, product_id });
  }
}

module.exports = ProductsCommentsRepository;