const express =require ('express');

const fs = require ('fs');
const app =express();



app.listen(3000, function () {
    console.log('http://localhost:3000 - server is running...')
});

app.get('/', function (req, res) {

    let site = fs.readFileSync('www/index.html', 'utf-8');
    res.write(site);


});
app.post('/data', function (req, res) {
    let data = '';

    req.on('data', function (chunk) {
        data += chunk.toString();
        console.log('data - ' + data);
    });
        res.send(data)

});
app.use(express.static('www'));
