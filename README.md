# LI_03
	                ОТЧЕТ
	Данная индивидуальная работа представляет собой веб-приложение для учета личных финансов.
	Его функционал заключается в следующем: 
	    1.Добавление транзакции(прибыль/убытки):
	        С помощью заполнения формы во всплывающем модальном окне транзакция добавляется в таблицу и массив транзакций с которым
	        в дальнейшем можно работать и взаимодействовать
	    2.Удаление транзакции:
	        Удаление транзакции производится через обработчик событий, который расположен в родительском элементе таблице нажатием на кнопку 
	        "Удалить" в столбце "Действия", что использует делегирование событий.
	    3.Отображение общей суммы транзакции: 
	        В имеющемся массиве мы обращаемся к свойству amount складывая его к переменной тотал , которая отображается на странице
	        Данная операция производится при добавлений строк/транзакции в таблицу.
	    4.Визульная часть:
	    Позволяет каждой строке в зависимости от суммы 
	    будь то положительная или отрицательная выделяет ее в первом случае зеленым во втором случае красным.
	    Скрытое краткое описание которое развертывается при клике на строку.
	    Использование стилей ксс










	1.Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
	2.Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
	3.Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
	4.Как можно добавить новый элемент в DOM дерево с помощью JavaScript?


	1.Доступ к элементу на веб-странице с помощью JavaScript можно получить разными способами: обратившись по тегу, классу, id, селектору.
	document.getElementBy(Id,Class,Tag)/querySelector
	2.Делегирование событий это прием програмирования, который позволяет одному
	обработчику событий обращаться к общему родительскому элементу в иерархии DOM дерева тем самым отслеживая все дочерние элементы
	вместо того чтобы привязываться к каждому элементу отдельно. Так в индивидуальной работе использовано делегирование событий
	в динамической таблице , в  которой события всех строк отслеживаются в родительском элементе в "таблице"
	3.Изменить содержимое элемента DOM с помощью JavaScript после его выборки можно используя
	свойства .textContent или .innerHTML (чаще используемый)
	4.Новый элемент в DOM дерево с помощью JavaScript можно добавить с помощью методов createElement(cоздание нового элемента) и
	element.appendChild( добавление нового элемента в конец другого элемента)
