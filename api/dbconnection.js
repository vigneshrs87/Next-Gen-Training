var mysql = require('mysql');

var con = mysql.createPool({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
});

module.exports=con;