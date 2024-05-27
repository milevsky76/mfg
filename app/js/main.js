//Проверяем есть ли filterState в localStorage
if (localStorage.getItem("filterState") == null) {
    //Если нет то создаём его, и задаём значение
    localStorage.setItem("filterState", "");
}
//Находим блок filter
let filter = document.getElementById("filter");
//Находим блоки filter__input в блоке filter
let inputsFilter = filter.getElementsByClassName("filter__input");
//Проверяем какому из filter__input равняется значение хранящиеся в localStorage, и отмечаем его
for (let i = 0; i < inputsFilter.length; i++) {
    //Помещаем элемент в константу element
    const element = inputsFilter[i];
    if (element.value == localStorage.getItem("filterState")) {
        element.checked = true;
    }
}
//Задаём событие onchange элементам filter__input, если событие сработало обновляем значение в localStorage, и вызываем функцию показа и скрытия
for (let i = 0; i < inputsFilter.length; i++) {
    const element = inputsFilter[i];
    if ("onpropertychange" in element) {
        // старый IE
        element.onpropertychange = function () {
            // проверим имя изменённого свойства
            if (event.propertyName == "checked") {
                localStorage.setItem("filterState", element.value);
                hiding(localStorage.getItem("filterState"));
            }
        };
    } else {
        // остальные браузеры
        element.onchange = function () {
            localStorage.setItem("filterState", element.value);
            hiding(localStorage.getItem("filterState"));
        };
    }
}
//Скрываем или показываем элементы от значения filterState в localStorage
function hiding(value) {
    let allLi = document.getElementsByClassName("mfg__item");

    if (value == "") {
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].style.display = "block";
        }
    } else if (value == "true") {
        choiceBN(allLi, "none", "block");
    } else if (value == "false") {
        choiceBN(allLi, "block", "none");
    }

}
//Скрываем или показываем элементы от названия класса
function choiceBN(array, a, b) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].classList.contains("mfg__item_state_watching")) {
            array[i].style.display = a;
        }
        if (array[i].classList.contains("mfg__item_state_watched")) {
            array[i].style.display = b;
        }
    }
}
//Указываем локальный путь до изображений
let pictureLocal = "./img/";
//Находи наш список в котором будут элементы
let list = document.getElementById("mfg");
//Вызываем функцию вывода элементов массива mfgbd (начальный вывод)
outputMFG();
//Вызываем функцию скрытия или показывания элементы от значения filterState в localStorage (начальная настройка скрытия)
hiding(localStorage.getItem("filterState"));
//Вывод элементов массива mfgbd
function outputMFG() {
    list.innerHTML = "";
    //Просматриваем каждый элемент в массиве и создаём его
    mfgbd.forEach(element => {
        createLi(element);
    });
}
//Создание li
function createLi(element) {
    //Создаём элемент li
    let li = document.createElement("li");
    //Создаём переменную liClass в которой будут храниться будущие классы элемента li
    let liClass = "mfg__item ";
    //Добавляем модификатор зависящий от state; true - просмотрен, false - не просмотрен 
    if (element.duration.state) {
        liClass += "mfg__item_state_watched";
    } else {
        liClass += "mfg__item_state_watching";
    }
    //Добавляем содержимое liClass в атрибут class элемента li
    li.className = liClass;
    //Вызываем функцию создания a
    createA(element, li);
    //Вставляем созданный элемент li в конец list
    list.append(li);
}
//Создание a
function createA(element, li) {
    //Создаём элемент a
    let a = document.createElement("a");
    //Добавляем содержимое в атрибут href элемента a
    a.href = element.link.video;
    //Добавляем содержимое в атрибут class элемента a
    a.className = "mfg__link";
    //Вызываем функцию создания img
    createImg(element, a);
    //Вызываем функцию создания span
    createSpan(element, a);
    //Вставляем созданный элемент a в конец li
    li.append(a);
}
//Создание img
function createImg(element, a) {
    //Создаём элемент img
    let img = document.createElement("img");
    //Добавляем содержимое в атрибут src элемента img, если local файла нет подключаем cdn
    if (element.link.picture.local == "") {
        img.src = element.link.picture.cdn;
    } else {
        img.src = pictureLocal + element.link.picture.local;
    }
    //Добавляем содержимое в атрибут alt элемента img
    img.alt = element.name;
    //Добавляем содержимое в атрибут title элемента img
    img.title = element.name;
    //Добавляем содержимое в атрибут class элемента img
    img.className = "mfg__img";
    //Вставляем созданный элемент img в конец a
    a.append(img);
}
//Создание span
function createSpan(element, a) {
    //Создаём элемент span
    let span = document.createElement("span");
    //Создаём переменную spanContent в которой будут храниться информация о сезонах и сериях
    let spanContent = "";
    //Проверяем есть ли сезон, то добавляем его
    if (element.duration.season > 0) {
        spanContent = element.duration.season + " сезон";
    }
    //Проверяем есть ли серия, то добавляем её
    if (element.duration.episode > 0) {
        spanContent += " " + element.duration.episode + " серия"
    }
    //Добавляем содержимое spanContent в свойство textContent элемента span
    span.textContent = spanContent;
    //Добавляем содержимое в атрибут class элемента span
    span.className = "mfg__duration";
    //Вставляем созданный элемент span в конец a
    a.append(span);
}