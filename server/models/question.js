const mysql = require("mysql");
const Promise = require('bluebird');
const answer = require('./answer.js')


const connection = require('../../db/index.js');

const queryAsync = Promise.promisify(connection.query).bind(connection);

module.exports = {
  //This will also retrieve all relavent answers and answer pics in the proper format.
  getQuestionsByProductId: async (productId) => {

    var questions = await queryAsync(`SELECT * FROM QA.questions WHERE product_id = ${productId};`)

    for (let i = 0; i < questions.length; i++) {
      questions[i].answers = await answer.getAnswersByQuestionId(questions[i].id)
    }
    //console.log('QUESTIONS: ', questions)
    return questions;
  },

  createQuestion: (productId, { question, asker, email }) => {
    const query = `INSERT INTO questions (product_id,question,asker,email,datePosted, question_helpfulness) VALUES (?, ?, ?, ?, ?, ?)`;

    return queryAsync(query, [productId, question, asker, email, new Date(), 0])
      .then((res) => {
        //console.log('successful question post: ', res)
        return res;
      })
      .catch((err) => {
        console.error('error posting question', err);
      });
  },

  updateQuestionHelpful: (questionId) => {
    const query = `UPDATE questions SET question_helpfulness = question_helpfulness + 1
    WHERE id = ${questionId};`;

    return queryAsync(query)
      .then((res) => {
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  },

  updateQuestionReport: (questionId) => {
    const query = `UPDATE questions SET reported = 1
    WHERE id = ${questionId};`;
    return queryAsync(query)
      .then((res) => {
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  },
}
