
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', function () {
            $('#btn_Add').on('click', function () {
                addItem()
            });

            window.readFile = function(files){
                var file = files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    // This gets called after using one of the read functions below
                    let data = e.target.result;
                    console.log(typeof data);
                    /*alert(e.target.result)*/
                };

                // Option 1: Read as text
                reader.readAsText(file);

                // Option 2: Read as Data URL
                reader.readAsDataURL(file)
            };
            let availableTags = [
                'Пироженное',
                'торт',
                'Картофель',
                'Морковь',
                'Лук',
                'Чеснок',
                'Петрушка',
                'Укроп',
                'Яблоки',
                'бананы',
                'Лимон',
                'Масло сливочное',
                'Кефир',
                'Молоко' ,
                'Сметана',
                'Творог',
                'Сыр',

                'Горчица',
                'варенье',
                'Томатная паста',
                'Рыбная консерва',
                'Консервированный горошек',
                'Консервированная кукуруза',
                'Детское питание ',
                'Сгущенка',
                'Мед',

                'Яйца',
                'Масло растительное',
                ' Соевый соус',
                'Уксус обычный',

                'Курица' ,
                'Куриное филе',
                'Свинина',
                'Сало',
                'Стручковая фасоль',
                'Маргарин',
                'Сливочное масло',
                'Ягоды (смородина, клубника, клюква и т.д.)',
                'грибы',
                'Шпинат',
                'Слоеное тесто',
                'Рыба' ,
                'Крабовые палочки',

                'Мука пшеничная',
                'Мука ржаная',
                'Дрожжи сухие',
                'Сода',
                'Разрыхлитель теста',
                'Сахар обычный',
                'Сахар коричневый',
                'Сахарная пудра',
                'Желатин',
                'шоколад',
                'Крахмал',
                'Масло оливковое',

                'Гречка',
                'Перловка',
                'Рис',
                'Овсяные хлопья',
                'Манка',
                'Кукурузная крупа',
                'Макароны спагетти',
                'Макароны спиральки',
                'Горох',
                'Фасоль',
                'Панировочные сухари',
                'Сухие грибы',

                'Ваниль',
                'Корица',
                'Карри',
                'Черный перец',
                'Красный перец',
                'Соль',
                'Паприка',
                'Куркума',
                'Лавровый лист',
                'Чай',
                'кофе',

                'Чай черный',
                'Чай зеленый',
                'Чай мятный',
                'Какао порошок',

                'Мешки для мусора',

                'Пакеты пищевые',
                'Пищевая пленка',
                'Фольга',
                'Бумага для выпечки',
                'Губки для мытья посуды'
            ];
            let text = '';
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
                items.push({
                    done: 'false',
                    text: text,
                    quantity: quantity,
                    price: price,
                    total: total
                });
                console.log(items);
                addToTable(items);
                if (!availableTags.includes(text)){
                    availableTags.push(text);
                }

                document.getElementById('result').innerText = result;
                document.getElementById('text').value = '';
                document.getElementById('price').value = '';
                document.getElementById('quantity').value = '';
            }

            function showSum() {
                let sum = 0;
                for (let i = 0; i < items.length; i++) {
                    sum += items[i].total;
                }
                return sum;
            }

            function addToTable(items) {
                let tbody = document.getElementById('table').getElementsByTagName("tbody")[0];

                let allRows = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                for (let i = items.length - 1; i < items.length; i++) {
                    let row = document.createElement("tr");

                    for (let item in items[i]) {
                        let val = items[i][item];
                        let td = document.createElement("td");
                        let input = td.appendChild(document.createElement("input"));
                        if (items[i][item] === true || items[i][item] === 'false') {
                            input.type = 'checkbox';
                        }
                        input.value = val;
                        input.style.width = '85%';
                        input.addEventListener("change", function () {

                            items[i][item] = input.value;
                            items[i].total = items[i].quantity * items[i].price;
                            //arrTable[i+3].value = items[i].total;
                            let alltd = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                            //console.log(row.rowIndex, i, 'input');
                            if (input.checked) {
                                row.style.backgroundColor = 'lawngreen';
                                if (row.rowIndex === i + 1) {
                                    //let alltd = document.getElementById('table').getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td");
                                    alltd[4].innerHTML = items[i].total;
                                }
                                result = showSum();
                                document.getElementById('result').innerText = result;
                            } else {
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
                if (tableName !== null) {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

                        console.log('file system open: ' + fs.name);
                        fs.root.getFile(tableName + ".txt", {create: true, exclusive: false}, function (fileEntry) {
                            console.log("fileEntry is file?" + fileEntry.isFile.toString());
                            console.log(fileEntry.name);
                            console.log(fileEntry.fullPath);
                            fileEntry.createWriter(function (fileWriter) {


                                fileWriter.onwriteend = function () {
                                    alert('Список успешно сохранен');
                                    console.log("Successful file write...");

                                };

                                fileWriter.onerror = function (e) {
                                    console.log("Failed file write: " + e.toString());
                                };

                                // If data object is not passed in,
                                // create a new Blob instead.

                                console.log(JSON.stringify(items));
                                let a =JSON.stringify(items);
                                fileWriter.write(a);
                            });

                            /*function readFile(fileEntry) {

                                fileEntry.file(function (file) {
                                    var reader = new FileReader();

                                    reader.onloadend = function () {
                                        console.log("Successful file read: " + this.result);
                                        displayFileData(fileEntry.fullPath + ": " + this.result);
                                    };

                                    reader.readAsText(file);

                                });
                            }*/

                        });
                    })
                } else alert('Список не не будет сохранен! Вы не ввели названия списка!')
console.log(tableName)


            });

            $( function() {
                $( "#text" ).autocomplete({
                    source: availableTags
                });
            } );
        }, false)
    }
};
app.initialize();
