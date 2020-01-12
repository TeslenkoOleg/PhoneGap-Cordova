const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "items",
    password: "201092oleg"
});

connection.connect((err)=>{
    if (!err){
        console.log('DB is connected successful!')
    }
});
function QueryInsert(name, user) {

    const sql = `INSERT INTO ${name} VALUES(?, ?, ?, ?, ?)`;

    connection.query(sql, user, function(err, results) {
        if(err) console.log(err);
        else console.log("Данные добавлены");
    });

}

function QueryCreateTable(name) {
    const sql = `CREATE TABLE ${name} (done VARCHAR (20),text VARCHAR (30), quantity INT, price INT,total INT);`;

    connection.query(sql, name, function(err, results) {
        if(err) console.log(err);
        else console.log("TAble is created");
    });

}
/*function ShowTable() {
    let tablesInItems = [];
    const sql = `SHOW TABLES;`;

    tablesInItems = connection.query(sql, function(err, results) {
        if(err) console.log(err);
        return results;

        //console.log(tablesInItems)
        /!*for(let i=0; i < users.length; i++){
            for (let key in users[i]){
                tablesInItems.push(users[i][key]);

            }
            console.log('1'+tablesInItems);
        }
        console.log('2'+tablesInItems);*!/

    });
console.log(tablesInItems)
}
ShowTable();*/

module.exports.QueryCreateTable = QueryCreateTable;
module.exports.QueryInsert = QueryInsert;
module.exports.connection = connection;
/*module.exports.ShowTable = ShowTable;*/

