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
//addToTable(items);


let result = null;


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
    total = quantity * price;
    items.push({done: false,
        text: text,
        quantity: quantity,
        price: price,
        total: total
    });

    console.log(items);
    result = showSum(items);
    addToTable(items);
    document.getElementById('result').innerText = result;

}

function showSum (arr) {
    let tbody = document.getElementById('table').getElementsByTagName("input");
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {

            sum += arr[i].total;

    }
    return sum;
}

function addToTable(items) {
    let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];

    for (let i = items.length-1; i < items.length; i++) {

        let row = document.createElement("tr");

        for (let item in items[i]) {
            let val = items[i][item];
            let td = document.createElement("td");
            let input = td.appendChild(document.createElement("input"));
            if (items[i][item] === true || items[i][item] === false) {
                input.type='checkbox'
            }
            input.value = val;



            //td.appendChild(document.createTextNode(val));
            row.appendChild(td);
        }


        tbody.appendChild(row);


    }
    let arrTable = document.getElementById('table').getElementsByTagName("input");
    console.log(arrTable)
}



/*   function checkInput(arr) {
       for (let i =0; i<arr.length; i++){
           arr
       }
       console.log(arrTable);
   }*/
/*function addToTable() {


           let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];
           let row = document.createElement("tr");
           let td = document.createElement("td");
           let checkbox = td.appendChild(document.createElement("input"));
    let td2 = document.createElement("td");
           let text = td2.appendChild(document.createTextNode(document.getElementById('text').value));
    let td3 = document.createElement("td");
           let price = td3.appendChild(document.createTextNode(document.getElementById('price').value));
    let td4 = document.createElement("td");
           let quantity = td4.appendChild(document.createTextNode(document.getElementById('quantity').value));
    let td5 = document.createElement("td");

           row.appendChild(text);
           row.appendChild(price);
           row.appendChild(quantity);
           tbody.appendChild(row)


       }*/

/*  showTot(arr): void {
      for (let i = 0; i < arr.length; i++) {
          if (arr[i].done === true) {
              arr[i].total = arr[i].price * arr[i].quantity;
          } else {arr[i].total = 0; }
      }

  }
  onchange(): void {
      this.result = this.showSum(this.items);
      this.showTot(this.items);
  }
  delItem(item): void {
      for (let i = 0; i < this.items.length; i++) {
          if (item.id === this.items[i].id) {
              this.items.splice(i, 1);
          }
      }
      this.result = this.showSum(this.items);
  }*/




