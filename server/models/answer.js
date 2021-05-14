const mysql = require("mysql2");
const Promise = require('bluebird');

const connection = require('../../db/index.js');

const queryAsync = Promise.promisify(connection.query).bind(connection);


const getPhotos = async (answerId) => {
  let photos = await queryAsync(`SELECT * FROM answerPhotos WHERE answer_id = ${answerId}`)
  //console.log('PHOTOS: ', photos)
  return photos
};

  module.exports = {
    getAnswersByQuestionId: async (questionId) => {

      var answers = await queryAsync(`SELECT * FROM answers WHERE question_id = ${questionId}`);
      for (var i = 0; i < answers.length; i++) {
        answers[i].photos = await getPhotos(answers[i].answer_id);
      }
      //console.log(answers)
      return answers
    },


    inputAnswer: (questionId, { answer, answerer, email }) => {
      const query = `INSERT INTO answers (question_id,answer,answerer,email,datePosted, answer_helpfulness) VALUES (?, ?, ?, ?, ?, ?)`;

      return queryAsync(query, [questionId, answer, answerer, email, new Date(), 0])
        .then((res) => {
          //console.log('successful question post: ', res)
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