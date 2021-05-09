var mysql = require('mysql');


var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'QA'
});

connection.connect();

module.exports = connection;