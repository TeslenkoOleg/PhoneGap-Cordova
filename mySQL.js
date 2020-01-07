const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "users",
    password: "123456"
});

connection.query("SELECT * FROM users",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные
        console.log(fields); // мета-данные полей
    });
connection.end();
