var mysql = require('mysql2');


var connection = mysql.createConnection({
  host: '3.19.221.184',
  user: 'mrcruz',
  password: 'Michael1!',
  database: 'QA',
});

connection.connect();

module.exports = connection;