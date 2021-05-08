var { question,answer } = require('./controllers/');

const express = require('express');
const bodyParser = require('body-parser');

const port = 7789;
//do I need a 'router'? or can I handle all that here?


const app = express();
app.use(bodyParser.json());

/*routes
- get and post
  - questions
  - answers(will be included in questions)
  - helpful and report requests for both Q&A
*/

//questions
app.get('/:productId', question.getQuestions)
app.post('/:productId', question.postQuestion);
app.put('/question/:questionId/helpful', question.putHelpful);
app.put('/question/:questionId/report', question.putReport);

//answers
app.get('/:questionId/answers', answer.getAnswers)
app.post('/:questionId/answers', answer.postAnswer);
app.put('/answer/:answerId/helpful', answer.putHelpful);
app.put('/answer/:answerId/report', answer.putReport);


app.listen(port, () =>
console.log('listening on', `http://localhost:${port}`)
);