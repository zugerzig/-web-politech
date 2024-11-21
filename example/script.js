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
        if (orderForm.soup || orderForm.main || orderForm.drink) {
            emptyElement.hidden = true;
            orderElement.hidden = false;
        } else {
            emptyElement.hidden = false;
            orderElement.hidden = true;
        }

        soupElement.innerHTML = `<strong>Суп:</strong><br>${orderForm.soup ? orderForm.soup.name + ' ' + orderForm.soup.price + '₽' : 'Блюдо не выбрано'}`;
        mainElement.innerHTML = `<strong>Главное блюдо:</strong><br>${orderForm.main ? orderForm.main.name + ' ' + orderForm.main.price + '₽' : 'Блюдо не выбрано'}`;
        drinkElement.innerHTML = `<strong>Напиток:</strong><br>${orderForm.drink ? orderForm.drink.name + ' ' + orderForm.drink.price + '₽' : 'Напиток не выбран'}`;

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

    // Логика фильтрации
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const dishes = document.querySelectorAll('.dish');

            dishes.forEach(dish => {
                if (kind === 'all' || dish.getAttribute('data-kind') === kind) {
                    dish.style.display = '';
                } else {
                    dish.style.display = 'none';
                }
            });

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

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
});
