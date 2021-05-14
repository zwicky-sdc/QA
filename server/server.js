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

//loader.io
app.get(`/loaderio-bb356c7b1eaac0ba81bf2241d4c3c1b6/`, (req, res) => {
  res.sendFile('loaderio-verification.txt');
});

//questions
app.get('/question/:productId', question.getQuestions)
app.post('/question/:productId', question.postQuestion);
app.put('/question/:questionId/helpful', question.putHelpful);
app.put('/question/:questionId/report', question.putReport);

//answers
app.get('/answer/:questionId/answers', answer.getAnswers)
app.post('/:questionId/answers', answer.postAnswer);
app.put('/answer/:answerId/helpful', answer.putHelpful);
app.put('/answer/:answerId/report', answer.putReport);

app.get('/test', (req, res) => {
  console.log('host: ', req.headers.host);
  res.status(200);
  res.send('hello world');
  res.end();
});

app.listen(port, () =>
console.log('listening on', `http://localhost:${port}`)
);