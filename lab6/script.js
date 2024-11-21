document.addEventListener('DOMContentLoaded', () => {
    const soupsSection = document.querySelector('.dishes.soups .dish-grid');
    const mainsSection = document.querySelector('.dishes.mains .dish-grid');
    const drinksSection = document.querySelector('.dishes.drinks .dish-grid');
    const saladsSection = document.querySelector('.dishes.salads .dish-grid');
    const dessertsSection = document.querySelector('.dishes.desserts .dish-grid');

    // Функция для отображения блюд по категориям
    function displayDishes() {
        const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.setAttribute('data-dish', dish.keyword);
            dishElement.setAttribute('data-kind', dish.kind);

            dishElement.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p class="price">${dish.price} &#8381;</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button>Добавить</button>
            `;

            // В зависимости от категории блюда, добавляем его в нужную секцию
            if (dish.category === 'soup') {
                soupsSection.appendChild(dishElement);
            } else if (dish.category === 'main') {
                mainsSection.appendChild(dishElement);
            } else if (dish.category === 'drink') {
                drinksSection.appendChild(dishElement);
            } else if (dish.category === 'salad') {
                saladsSection.appendChild(dishElement);
            } else if (dish.category === 'dessert') {
                dessertsSection.appendChild(dishElement);
            }
        });
    }

    displayDishes();

    // Логика добавления блюда в форму заказа
    const orderForm = {
        soup: null,
        main: null,
        drink: null,
        salad: null,
        dessert: null
    };

    const soupElement = document.getElementById('order-soup');
    const mainElement = document.getElementById('order-main');
    const drinkElement = document.getElementById('order-drink');
    const saladElement = document.getElementById('order-salad');
    const dessertElement = document.getElementById('order-dessert');
    const totalPriceElement = document.getElementById('total-price');
    const emptyElement = document.getElementById('empty');
    const orderElement = document.getElementById('or');

    function updateOrder() {
        if (orderForm.soup || orderForm.main || orderForm.drink || orderForm.salad || orderForm.dessert) {
            emptyElement.hidden = true;
            orderElement.hidden = false;
        } else {
            emptyElement.hidden = false;
            orderElement.hidden = true;
        }

        soupElement.innerHTML = `<strong>Суп:</strong><br>${orderForm.soup ? orderForm.soup.name + ' ' + orderForm.soup.price + '₽' : 'Блюдо не выбрано'}`;
        mainElement.innerHTML = `<strong>Главное блюдо:</strong><br>${orderForm.main ? orderForm.main.name + ' ' + orderForm.main.price + '₽' : 'Блюдо не выбрано'}`;
        drinkElement.innerHTML = `<strong>Напиток:</strong><br>${orderForm.drink ? orderForm.drink.name + ' ' + orderForm.drink.price + '₽' : 'Напиток не выбран'}`;
        saladElement.innerHTML = `<strong>Салат:</strong><br>${orderForm.salad ? orderForm.salad.name + ' ' + orderForm.salad.price + '₽' : 'Салат не выбран'}`;
        dessertElement.innerHTML = `<strong>Десерт:</strong><br>${orderForm.dessert ? orderForm.dessert.name + ' ' + orderForm.dessert.price + '₽' : 'Десерт не выбран'}`;

        const totalPrice = (orderForm.soup ? orderForm.soup.price : 0) +
                           (orderForm.main ? orderForm.main.price : 0) +
                           (orderForm.drink ? orderForm.drink.price : 0) +
                           (orderForm.salad ? orderForm.salad.price : 0) +
                           (orderForm.dessert ? orderForm.dessert.price : 0);

        totalPriceElement.textContent = `Стоимость заказа: ${totalPrice} ₽`;
    }

    // Обработчик кликов по карточкам
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.closest('.dish')) {
            const dishElement = event.target.closest('.dish');
            const keyword = dishElement.getAttribute('data-dish');
            const selectedDish = dishes.find(dish => dish.keyword === keyword);

            if (selectedDish.category === 'soup') {
                orderForm.soup = selectedDish;
            } else if (selectedDish.category === 'main') {
                orderForm.main = selectedDish;
            } else if (selectedDish.category === 'drink') {
                orderForm.drink = selectedDish;
            } else if (selectedDish.category === 'salad') {
                orderForm.salad = selectedDish;
            } else if (selectedDish.category === 'dessert') {
                orderForm.dessert = selectedDish;
            }

            updateOrder();
        }
    });

        //обработчик событий для кнопок фильтрации 
        document.querySelectorAll(".filter-button").forEach(filter => {
            filter.addEventListener("click", (event) => {
                const section = event.target.closest("section");
                const previouslyActive = section.querySelector(".filters button.active");
                if (previouslyActive === event.target) {
                    event.target.classList.remove("active");
                    filterDishes(section, "all");
                } else {
                    section.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
                    event.target.classList.add("active");
                    const kind = event.target.getAttribute("data-kind");
                    filterDishes(section, kind);
                }
            });
        });
    
        //фильтрация блюд
        const filterDishes = (section, kind) => {
            const sectionDishes = section.querySelectorAll(".dish");
            sectionDishes.forEach(dishElement => {
                const dishKeyword = dishElement.getAttribute("data-dish");
                const dish = dishes.find(d => d.keyword === dishKeyword);
                if (kind === "all" || dish.kind.includes(kind)) {
                    dishElement.style.display = "block";
                } else {
                    dishElement.style.display = "none";
                }
            });
        };


    // Обработчик кнопки сброса формы
    const resetButton = document.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', () => {
        // Сбрасываем заказ
        orderForm.soup = null;
        orderForm.main = null;
        orderForm.drink = null;
        orderForm.salad = null;
        orderForm.dessert = null;

        // Скрываем блок заказа и показываем только "Ничего не выбрано"
        emptyElement.hidden = false;
        orderElement.hidden = true;

        // Обновляем отображение заказа
        updateOrder();
    });
    const categories = ['soup', 'main', 'juice', 'salad', 'dessert'];
    categories.forEach(category => setupFilters(category));


    const submitButton = document.getElementById('submit'); //кнопка отправки формы
    const notification = document.getElementById('notification'); //уведомление
    const notificationText = document.getElementById('notification-text');//текст уведомления
    const notificationButton = document.getElementById('notification-button');//кнопка уведомления

    const requiredCategories = ['суп', 'главное блюдо', 'салат', 'напиток'];
    const comboOptions = [
        ['суп', 'главное блюдо', 'салат', 'напиток'],
        ['суп', 'главное блюдо', 'напиток'],
        ['суп', 'салат', 'напиток'],
        ['главное блюдо', 'салат', 'напиток'],
        ['главное блюдо', 'напиток']
    ];

    function checkOrder() {
        const chosenCategories = Object.keys(ChosenFood).filter(category => ChosenFood[category]);//фильтрует категории, чтобы найти выбранные
        if (chosenCategories.length === 0) {
            showNotification("Ничего не выбрано. Выберите блюда для заказа");
            return false;
        } //если нет выбранных категорий

        let validCombo = comboOptions.some(option =>
            option.every(item => chosenCategories.includes(item))
        ); //проверка комбинаций комбо

        if (!validCombo) {
            if (!chosenCategories.includes('напиток')) {
                showNotification("Выберите напиток");
            } else if (!chosenCategories.includes('главное блюдо') && chosenCategories.includes('суп')) {
                showNotification("Выберите главное блюдо/салат/стартер");
            } else if (!chosenCategories.includes('суп') && !chosenCategories.includes('главное блюдо') && chosenCategories.includes('салат')) {
                showNotification("Выберите суп или главное блюдо");
            } else if (chosenCategories.includes('десерт')) {
                showNotification("Выберите главное блюдо");
            } else {
                showNotification("Некорректный выбор. Проверьте ваш заказ.");
            }
            return false;
        } //для показа уведомлений

        return true; //Проверка успешная
    }

    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.remove('hidden');
    } //убираем скрытие

    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
    });

    submitButton.addEventListener('click', (event) => {
        if (!checkOrder()) {
            event.preventDefault(); // Не отправляем форму, если заказ некорректен
        }
    });
});
