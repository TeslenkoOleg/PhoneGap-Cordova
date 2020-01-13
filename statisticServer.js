const express =require ('express');
const mySQL = require('./mySQL');
const fs = require ('fs');
const app =express();



app.listen(3000, function () {
    console.log('http://localhost:3000 - server is running...')
});

app.get('/', function (req, res) {

    let site = fs.readFileSync('www/index.html', 'utf-8');
    res.write(site);


});

app.post('/tablesName', function (req, res) {
    let tablesInItems =[];
    const sql = `SHOW TABLES;`;
mySQL.connection.query(sql, function(err, results) {
    console.log(results);
    if(err) console.log(err);

    for(let i=0; i < results.length; i++){
        for (let key in results[i]){
            tablesInItems.push(results[i][key]);
        }
    }
    res.send(tablesInItems);
    console.log(tablesInItems);

});
});

app.post('/data', function (req, res) {
    let data = '';
let tname = '';

    req.on('data', function (chunk) {
        data += chunk;

        console.log('data - ' + data);
        let body = JSON.parse(data);
        tname = body.tableName;
        mySQL.QueryCreateTable(tname);

        console.log('tname - '+tname);
        delete body.tableName;

        /*let body = data.slice(1,-1);
        arr = body.split(',');
        console.log('body - ' + body);
        console.log('arr - ' + arr);
        console.log('arrtype2 -'+typeof arr);*/


        /*for (let i = 0; i<arr.length; i++){
            console.log(i+arr[i])
        }*/
        for (let key in body){

            let bodyKey = body[key];
            console.log('bodykey - '+bodyKey);
            for (let i=0; i<bodyKey.length; i++){
                //console.log(bodyKey[i]);
                let arr =[];
                for (let jet in bodyKey[i]){

                    arr.push(bodyKey[i][jet])
                }
                //console.log(arr);

                mySQL.QueryInsert(tname, arr)
            }
        }


    });

        res.send(data)

});
app.use(express.static('www'));

app.post('/params', function (req, res) {
    let data = '';

    req.on('data', function (chunk) {
        data += chunk;

        console.log('data - ' + data);
        let body = JSON.parse(data);
        /*console.log('data222 - ' + body);
        console.log('data Ty- ' + typeof body);
        console.log('data - ' + body.name);*/
        let tableName = body.name;
        console.log('name - ' + tableName);
        const sql = `SELECT * FROM ${tableName};`;
        mySQL.connection.query(sql, function (err, results) {
            /*let arr=[];*/
            console.log('res - ' + results);

            if (err) console.log(err);
            res.send(JSON.stringify(results))


        });

    });
});
