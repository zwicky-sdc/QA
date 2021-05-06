const mysql = require("mysql");
const Promise = require('bluebird');

const connection = require('../../db/index.js');

const queryAsync = Promise.promisify(connection.query).bind(connection);

module.exports = {
  getQuestionsByProductId: (productId) => {
    return queryAsync(`SELECT question FROM questions WHERE product_id = ${productId}`)
  },

  createQuestion: (productId, { question, asker, email }) => {
    const query = `INSERT INTO questions (product_id,question,asker,email,datePosted, question_helpfulness) VALUES (?, ?, ?, ?, ?, ?)`;

      return queryAsync(query, [productId, question, asker, email, new Date(), 0])
        .then((res) => {
          console.log('successful question post: ', res)
          return res;
        })
        .catch((err) => {
          console.error('error posting question', err);
        });
  },

}
