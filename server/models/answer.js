const mysql = require("mysql");
const Promise = require('bluebird');

const connection = require('../../db/index.js');

const queryAsync = Promise.promisify(connection.query).bind(connection);

module.exports = {
  getAnswersByQuestionId: (questionId) => {

    const query = `SELECT * FROM answers WHERE question_id = ${questionId}`;

    return queryAsync(query)
      .then(res => {

        console.log(res)
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  },

  inputAnswer: (questionId, { answer, answerer, email }) => {
    const query = `INSERT INTO answers (question_id,answer,answerer,email,datePosted, answer_helpfulness) VALUES (?, ?, ?, ?, ?, ?)`;

    return queryAsync(query, [questionId, answer, answerer, email, new Date(), 0])
      .then((res) => {
        console.log('successful question post: ', res)
        return res;
      })
      .catch((err) => {
        console.error('error posting question', err);
      });
  },

  updateAnswerHelpful: (answerId) => {
    const query = `UPDATE answers SET answer_helpfulness = answer_helpfulness + 1
    WHERE answer_id = ${answerId};`;

    return queryAsync(query)
      .then((res) => {
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  },

  updateAnswerReport: (answerId) => {
    const query = `UPDATE answers SET reported = 1
    WHERE answer_id = ${answerId};`;
    return queryAsync(query)
      .then((res) => {
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  },
}