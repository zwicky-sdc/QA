const { answer } = require('../models/');

module.exports = {
  getAnswers: (req, res) => {
    const { questionId } = req.params;

    answer.getAnswersByQuestionId(questionId)
      .then(answers => {
        res.status(200).send(answers);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  postAnswer: (req, res) => {
    const { questionId } = req.params;
    answer.inputAnswer(questionId, req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  putHelpful: (req, res) => {
    const { answerId } = req.params;
    answer.updateAnswerHelpful(answerId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },

  putReport: (req, res) => {
    const { answerId } = req.params;
    answer.updateAnswerReport(answerId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};