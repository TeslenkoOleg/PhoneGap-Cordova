let result =0;
document.getElementById('result').innerText = result;
function listOfTables() {

    $.ajax({
        type: 'POST',
        url: 'http://176.114.15.188:3000/tablesName'
    }).done(function (msg) {
        console.log(msg);
        for (let i = 0; i < msg.length; i++) {
            let name =msg[i];
            document.getElementById('list').innerHTML += `<a href="#" onclick="SendGet('${name}')">${i}.${name}</a>` + '<br>'
        }

    });
}

function SendGet(name) {
    let tableName = name;

    document.getElementById('list').innerHTML = '';
    document.getElementById('tableName').innerHTML = 'Название таблицы - '+tableName;
    $.ajax({
        type: 'POST',
        url: 'http://176.114.15.188:3000/params',
        data: JSON.stringify({'name':name})
    }).done(function (data) {
        console.log('function');
        $('#tbodyid').html('');
        let d ='';
         d = JSON.parse(data);
        console.log('data'+data);
        console.log('datatyoe'+ typeof data);
        console.log('dType'+ typeof d);
        let ar =[];
        for (let i =0; i<d.length; i++){
            ar.push(d[i]);
            console.log(ar);
            addToTable(ar)


        }

    })

}

function addToTable(items) {

//$('#tbodyid').html('');
    //document.getElementById('table').getElementsByTagName("tbody")[0];
    let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];


    let allRows = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = items.length-1; i < items.length; i++) {
        let row = document.createElement("tr");

        for (let item in items[i]) {
            let val = items[i][item];
            let td = document.createElement("td");
            let input = td.appendChild(document.createElement("input"));
            if (items[i][item] === 'true' || items[i][item] === 'false') {
                input.type='checkbox';
            }
            input.value = val;
            input.style.width = '80%';
            result = showSum(items);
            document.getElementById('result').innerText = result;
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
                    result = showSum(items);
                    document.getElementById('result').innerText = result;
                } else{
                    items[i].total = 0;
                    result = showSum(items);
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

function showSum (items) {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
        sum += items[i].total;
    }
    return sum;
}
