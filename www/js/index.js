
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

app.initialize();

let text ='';
let price = null;
let quantity = null;
let total = null;
let done = true;
let table = document.getElementById('table');
let sum = null;
let items = [];
let result = 0;

function addItem() {
    text = document.getElementById('text').value;
    price = document.getElementById('price').value;
    quantity = document.getElementById('quantity').value;

    if (quantity === '') {
        quantity = 1;
    }
    if (price === '') {
        price = 0;
    }
    total = 0;
    items.push({done: false,
        text: text,
        quantity: quantity,
        price: price,
        total: total
    });
    console.log(items);
    addToTable(items);
    document.getElementById('result').innerText = result;
    document.getElementById('text').value= '';
    document.getElementById('price').value ='';
    document.getElementById('quantity').value = '';
}
function showSum () {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
            sum += items[i].total;
    }
    return sum;
}

function addToTable(items) {
    let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];

    let allRows = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = items.length-1; i < items.length; i++) {
        let row = document.createElement("tr");

        for (let item in items[i]) {
            let val = items[i][item];
            let td = document.createElement("td");
            let input = td.appendChild(document.createElement("input"));
            if (items[i][item] === true || items[i][item] === false) {
                input.type='checkbox';
            }
            input.value = val;
            input.style.width = '80%';
            input.addEventListener("change", function () {

                items[i][item] = input.value;
                items[i].total = items[i].quantity * items[i].price;
                //arrTable[i+3].value = items[i].total;
                let alltd = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                //console.log(row.rowIndex, i, 'input');
                if (input.checked){
                    row.style.backgroundColor = 'lawngreen';
                    if (row.rowIndex === i+1){
                        //let alltd = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                        alltd[4].innerHTML = items[i].total;
                    }
                    result = showSum();
                    document.getElementById('result').innerText = result;
                } else{
                    items[i].total = 0;
                    result = showSum();
                    document.getElementById('result').innerText = result;
                    row.style.backgroundColor = 'white';
                    let alltd = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                    alltd[4].innerHTML = items[i].total;
                }
            });
            row.appendChild(td);
        }
        tbody.appendChild(row);
    }
}

$('#btn2').on('click', function () {
let tableName = prompt('Enter list name:');
console.log(tableName);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/data',
        data: JSON.stringify({"tableName":tableName, "Item" : items})
    }).done(function (msg) {
        console.log(msg);

    });
});

$('#btn3').on('click', function () {
        $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/tablesName'
    }).done(function (msg) {
        console.log(msg);

    });
});






