//will handle the calling the info from the models
//models should handle the logic. this just sends around the req and res.

const questions = require('../models/');

module.exports = {
  getQuestions: (req, res) => {
    const { productId } = req.params;

    questions.getQuestionsByProductId(productId)
      .then((questions) => {
        res.status(200).send(questions);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
