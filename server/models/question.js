//will handle query requests and logic of data manipulation.
//bluebird promisify?
const mysql = require("mysql");
const Promise = require('bluebird');

const connection = require('../../db/index.js');

const queryAsync = Promise.promisify(connection.query).bind(connection);

module.exports = {
  getQuestionsByProductId: (productId) => {
    return queryAsync(`SELECT * FROM questions WHERE product_id = ${productId}`)
  }

}
