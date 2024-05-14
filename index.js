//массив транзакции в который будут добавляться транзакции и удаляться 
const transactions = [];
//Переменные которые в дальнейшем будут испольоваться 
const table = document.getElementById("transaction-table");
const tbody = table.querySelector("tbody");
const form = document.getElementById("transaction-form");
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementsByClassName("close")[0];



//Функции используемые приложением

/*Фунциии скрывающая описание если оно состоит из более 4 слов, принимающая пробелы как разделители 
в случае превышения лимита слов возвращает первые 4 + ...*/
function truncateDescription(description) {
    const words = description.split(' ');
    if (words.length <= 4) {
        return description;
    }
    return words.slice(0, 4).join(' ') + '...';
}

//Функция заполняющая таблицу HTML на основе данных полученных из массива
function fillTable() {
    tbody.innerHTML = "";
//использование очистки tbody предотвращает накопление или переполнение данных
    transactions.forEach(transaction => {
        const row = document.createElement("tr");//переменная создающая строки в таблце
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount}</td>
            <td class="description-cell" data-description="${transaction.description}">${truncateDescription(transaction.description)}</td>
            <td><button class="deleteButton" data-id="${transaction.id}">Удалить</button></td>
        `;
        tbody.appendChild(row);//метод добавляющий в конец предыдущего элемента новый элемент в данном случае строку
    });
}


//Функция для удаления строки транзакции вызываемая событием( нажатие кнопки "удалить")
function deleteTransaction(event) {
    const deleteButton = event.target;
    const transactionId = parseInt(deleteButton.dataset.id);
    const rowToDelete = deleteButton.closest("tr");
    rowToDelete.remove();//удаление строки из таблицы

    const index = transactions.findIndex(transaction => transaction.id === transactionId);
    if (index !== -1) {
        transactions.splice(index, 1);//удаление объекта из массива
    }
}


//Функция для добавления строки транзакции вызываемая  событием (нажатие отправить форму )
function addTransaction(event) {
    event.preventDefault();//метод не дающий браузеру перезагрузить страницу в ожиданий получения ответа от сервера

    //переменные получающие данные(их значение) из формы
    const date = form.elements["date"].value;
    const category = form.elements["category"].value;
    const amount = parseFloat(form.elements["amount"].value);
    const description = form.elements["description"].value;

    const id = transactions.length + 1;//id увеличивается с новой транзакцией
    const transaction = {
        id: id,
        date: date,
        category: category,
        amount: amount,
        description: description
    };
    // добавляем объект в массив
    transactions.push(transaction);
    //Создание новой строк на основе 
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.amount}</td>
        <td class="description-cell" data-description="${transaction.description}">${truncateDescription(transaction.description)}</td>
    `;
    if (transaction.amount >= 0) {
        newRow.classList.add("positive-transaction");
    } else {
        newRow.classList.add("negative-transaction");
    }
    //Создание кнопки на странице
    const deleteButtonCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("deleteButton");
    deleteButton.dataset.id = transaction.id;
    deleteButton.addEventListener("click", deleteTransaction);
    deleteButtonCell.appendChild(deleteButton);
    newRow.appendChild(deleteButtonCell);
    calculateTotal()
    tbody.appendChild(newRow);

    form.reset();
}

fillTable();

//Функция которая берет amount каждого объекта массива и скалдывает с total(общей суммой)
function calculateTotal() {
    let total = 0;
    transactions.forEach(transaction => {
        total += transaction.amount;
    });
    const totalElement = document.getElementById("total");
    totalElement.textContent = total.toFixed(2); // Отображаем общую сумму с двумя знаками после запятой
}

//открытие и закрытие формы нажатием на "Добавить транзакцию"
openModalButton.onclick = function() {
    modal.style.display = "block";
}
//обработчик события для кнопки "Закрыть" в модальном окне.
closeModalButton.onclick = function() {
    modal.style.display = "none";
}
//сокрытие модального окна если клик был вне 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//обработчики событий
form.addEventListener("submit", addTransaction);

// Обработчик событий для отображения полного описания при клике на строку таблицы
tbody.addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName === 'TD' && target.classList.contains('description-cell')) {
        const description = target.getAttribute('data-description');
        target.textContent = description;
    }
});

// Добавляем обработчик событий на таблицу использовав делегирование событий и в коцне используем уже объявленную функцию calculateTotal
table.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteButto n")) {
        const transactionId = parseInt(event.target.getAttribute("data-id"));

        const rowToDelete = event.target.closest("tr");
        rowToDelete.remove();

        const index = transactions.findIndex(transaction => transaction.id === transactionId);
        if (index !== -1) {
            transactions.splice(index, 1);
        }
        calculateTotal()
    }
});
// Обработчик событий для скрытия полного описания при клике вне строки таблицы
document.addEventListener("click", function(event) {
    const target = event.target;
    if (!target.closest("tr")) {
        const descriptionCells = document.querySelectorAll(".description-cell");
        descriptionCells.forEach(cell => {
            cell.textContent = truncateDescription(cell.getAttribute('data-description'));
        });
    }
});

