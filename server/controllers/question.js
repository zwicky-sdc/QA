//will handle the calling the info from the models
//models should handle the logic. this just sends around the req and res.

const { question } = require('../models/');

module.exports = {
  getQuestions: (req, res) => {
    const { productId } = req.params;

    question.getQuestionsByProductId(productId)
      .then(questions => {
        res.status(200).send(questions);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  postQuestion: (req, res) => {
    const { productId } = req.params;
    //console.log('req.body: ',req.body)
    question.createQuestion(productId, req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.loerrorg(err);
        res.sendStatus(500);
      });
  },

  putHelpful: (req, res) => {
    const { questionId } = req.params;
    question.updateQuestionHelpful(questionId)
      .then(() => {

        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  putReport: (req, res) => {
    const { questionId } = req.params;
    question.updateQuestionReport(questionId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
