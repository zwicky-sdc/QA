const express = require('express');
const bodyParser = require('body-parser');

const port = 7789;
//do I need a 'router'? or can I handle all that here?


const app = express();
app.use(bodyParser.json());

/*routes
- get and post
  - questions
  - answers
  - helpful and report requests for both Q&A
*/





app.listen(port, () =>
console.log('listening on', `http://localhost:${port}`)
);