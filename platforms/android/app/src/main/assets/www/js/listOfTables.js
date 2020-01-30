
window.readFile = function(files){
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        // This gets called after using one of the read functions below
        let data = e.target.result;

        let dP = JSON.parse(data);
        console.log(typeof dP);
        console.log(dP);

        addToTable(dP);


    };

    // Option 1: Read as text
    reader.readAsText(file);

    // Option 2: Read as Data URL
   /* reader.readAsDataURL(file)*/
};

let result =0;
document.getElementById('result').innerText = result;

function addToTable(items) {

//$('#tbodyid').html('');
    //document.getElementById('table').getElementsByTagName("tbody")[0];
    let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];


    let allRows = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = 0; i < items.length; i++) {
        let row = document.createElement("tr");
        console.log('items - '+items[i])

        for (let item in items[i]) {
            console.log('item - '+item)
            let val = items[i][item];
            console.log('val - '+val)
            let td = document.createElement("td");
            let input = td.appendChild(document.createElement("input"));
            if (items[i][item] === 'true' || items[i][item] === 'false' ||
                items[i][item] === true || items[i][item] === false) {
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
