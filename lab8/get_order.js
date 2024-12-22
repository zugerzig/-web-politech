document.addEventListener('DOMContentLoaded', () => {
    fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes")
        .then(response => response.json())
        .then(data => {
            const sortedFood = data.sort((a, b) => {
                return a['name'].localeCompare(b['name'], 'ru');
            });

            const chosenDishesSection = document.querySelectorAll('#chosen_food .dishes_order')[0];

            const nothingSelectedMessage = document.querySelector('.nothing_selected');
            const chosenDishes = document.querySelectorAll('#chosen_food .dishes_order');
            nothingSelectedMessage.style.display = '';


            // Проверяем, есть ли выбранные блюда
            if (chosenDishes.length > 0) {
                nothingSelectedMessage.style.display = 'none';
            }

            // Функция для создания карточки блюда
            function TicketsMake(dish) {
                const ticket = document.createElement('div');
                ticket.classList.add('flex');
                ticket.dataset.kind = dish['kind'];

                const img = document.createElement('img');
                img.src = dish['image'];
                img.alt = dish['name'];

                const price = document.createElement('p');
                price.classList.add('price');
                price.textContent = dish['price'] + '₽';

                const food = document.createElement('p');
                food.classList.add('food');
                food.textContent = dish['name'];

                const weight = document.createElement('p');
                weight.classList.add('count');
                weight.textContent = dish['count'];

                const button = document.createElement('button');
                button.textContent = "Удалить";

                ticket.appendChild(img);
                ticket.appendChild(price);
                ticket.appendChild(food);
                ticket.appendChild(weight);
                ticket.appendChild(button);

                button.addEventListener('click', () => {
                    RemoveDish(dish, ticket);
                });

                return ticket;
            }
            // Функция загрузки блюд из localStorage
            function GetTickets(CurrentElem) {
                const localStorageIds = [
                    window.localStorage.getItem('soup-selected'),
                    window.localStorage.getItem('main-course-selected'),
                    window.localStorage.getItem('salad-selected'),
                    window.localStorage.getItem('drink-selected'),
                    window.localStorage.getItem('dessert-selected'),
                ]
                sortedFood.forEach(function (dish) {
                    if (localStorageIds.includes(String(dish['id']))) {
                        const ticket = TicketsMake(dish);
                        CurrentElem.appendChild(ticket);

                    }
                });
            }

            GetTickets(chosenDishesSection);

            let FoodPrice = 0;
            const FoodTotalPriceElements = document.getElementById('total_price');
            const FoodPriceElements = document.getElementById('food_price');

            // Инициализация элементов выбора
            let ChosenFood = {
                'soup': null,
                'main-course': null,
                'salad': null,
                'drink': null,
                'dessert': null,
            };


            const SoupLabel = document.getElementById('soup-select');
            const ChosenSoup = document.getElementById('soup-selected');
            const MainLabel = document.getElementById('main-course-select');
            const ChosenSalad = document.getElementById('salad-selected');
            const SaladLabel = document.getElementById('salad-select');
            const ChosenMain = document.getElementById('main-course-selected');
            const JuiceLabel = document.getElementById('drink-select');
            const ChosenJuice = document.getElementById('drink-selected');
            const DessertLabel = document.getElementById('dessert-select');
            const ChosenDessert = document.getElementById('dessert-selected');

            const EmptyMessage = document.getElementById('empty_space');

            ChosenSoup.style.display = 'none';
            ChosenMain.style.display = 'none';
            ChosenSalad.style.display = 'none';
            ChosenJuice.style.display = 'none';
            ChosenDessert.style.display = 'none';

            SoupLabel.style.display = 'none';
            MainLabel.style.display = 'none';
            SaladLabel.style.display = 'none';
            JuiceLabel.style.display = 'none';
            DessertLabel.style.display = 'none';
            FoodTotalPriceElements.style.display = 'none';
            FoodPriceElements.style.display = 'none';

            EmptyMessage.style.display = '';

            function GetOrder(dish) {
                let GetUpdate = false;
                if (dish['category'] === 'soup') {
                    UpdateGridElem('soup', dish, ChosenSoup, SoupLabel);
                    window.localStorage.setItem('soup-selected', dish['id']);
                    GetUpdate = true;
                } else if (dish['category'] === 'main-course') {
                    UpdateGridElem('main-course', dish, ChosenMain, MainLabel);
                    window.localStorage.setItem('main-course-selected', dish['id']);
                    GetUpdate = true;
                } else if (dish['category'] === 'salad') {
                    UpdateGridElem('salad', dish, ChosenSalad, SaladLabel);
                    window.localStorage.setItem('salad-selected', dish['id']);
                    GetUpdate = true;
                } else if (dish['category'] === 'drink') {
                    UpdateGridElem('drink', dish, ChosenJuice, JuiceLabel);
                    window.localStorage.setItem('drink-selected', dish['id']);
                    GetUpdate = true;
                } else if (dish['category'] === 'dessert') {
                    UpdateGridElem('dessert', dish, ChosenDessert, DessertLabel);
                    window.localStorage.setItem('dessert-selected', dish['id']);
                    GetUpdate = true;
                }

                if (GetUpdate) {
                    EmptyMessage.style.display = 'none';
                }

                FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;
                FoodPriceElements.style.display = 'block';

                EmptyElements();

            }

            //Удаление блюда из LocalStorage
            function RemoveDish(dish, ticket) {
                if (window.localStorage.getItem('soup-selected') === String(dish['id'])) {
                    console.log(FoodPrice);
                    window.localStorage.removeItem('soup-selected');
                    FoodPrice -= ChosenFood['soup']['price'];
                    console.log(FoodPrice);
                    ChosenFood['soup'] = null;
                    FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;
                } else if (window.localStorage.getItem('main-course-selected') === String(dish['id'])) {
                    window.localStorage.removeItem('main-course-selected');
                    FoodPrice -= ChosenFood['main-course']['price'];
                    ChosenFood['main-course'] = null;
                    FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;

                } else if (window.localStorage.getItem('salad-selected') === String(dish['id'])) {
                    window.localStorage.removeItem('salad-selected');
                    FoodPrice -= ChosenFood['salad']['price'];
                    ChosenFood['salad'] = null;
                    FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;

                } else if (window.localStorage.getItem('drink-selected') === String(dish['id'])) {
                    window.localStorage.removeItem('drink-selected');
                    FoodPrice -= ChosenFood['drink']['price'];
                    ChosenFood['drink'] = null;
                    FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;

                } else if (window.localStorage.getItem('dessert-selected') === String(dish['id'])) {
                    window.localStorage.removeItem('dessert-selected');
                    FoodPrice -= ChosenFood['dessert']['price'];
                    ChosenFood['dessert'] = null;
                    FoodPriceElements.textContent = `Стоимость заказа ${FoodPrice}₽`;
                }

                ticket.parentNode.removeChild(ticket);

                EmptyElements();

                const tickets = document.querySelectorAll('.flex');


                if (tickets.length === 0) {
                    ChosenSoup.style.display = 'none';
                    ChosenMain.style.display = 'none';
                    ChosenSalad.style.display = 'none';
                    ChosenJuice.style.display = 'none';
                    ChosenDessert.style.display = 'none';

                    SoupLabel.style.display = 'none';
                    MainLabel.style.display = 'none';
                    SaladLabel.style.display = 'none';
                    JuiceLabel.style.display = 'none';
                    DessertLabel.style.display = 'none';

                    FoodPriceElements.style.display = 'none';
                    EmptyMessage.style.display = '';
                    nothingSelectedMessage.style.display = '';

                }
            }

            function loadFromLocalStorage() {
                const localStorageIds = [
                    window.localStorage.getItem('soup-selected'),
                    window.localStorage.getItem('main-course-selected'),
                    window.localStorage.getItem('salad-selected'),
                    window.localStorage.getItem('drink-selected'),
                    window.localStorage.getItem('dessert-selected'),
                ]
                nothingSelectedMessage.style.display = '';
                sortedFood.forEach(function (dish) {
                    if (localStorageIds.includes(String(dish['id']))) {
                        GetOrder(dish);
                    }
                });

                if (chosenDishes.length > 0) {
                    nothingSelectedMessage.style.display = 'none';
                }
            }

            loadFromLocalStorage();
            nothingSelectedMessage.style.display = '';

            if (chosenDishes.length > 0) {
                nothingSelectedMessage.style.display = 'none';
            }

            function UpdateGridElem(category, dish, CurrentElem, LabelElem) {
                if (ChosenFood[category] !== null) {
                    FoodPrice -= ChosenFood[category]['price'];
                }

                ChosenFood[category] = dish;
                CurrentElem.textContent = `${dish['name']} ${dish['price']}₽`;
                CurrentElem.style.display = 'block';
                LabelElem.style.display = 'block';

                FoodPrice += dish['price'];
            }

            document.querySelector('form').addEventListener('reset', function () {
                ChosenSoup.style.display = 'none';
                ChosenMain.style.display = 'none';
                ChosenSalad.style.display = 'none';
                ChosenJuice.style.display = 'none';
                ChosenDessert.style.display = 'none';

                SoupLabel.style.display = 'none';
                MainLabel.style.display = 'none';
                SaladLabel.style.display = 'none';
                JuiceLabel.style.display = 'none';
                DessertLabel.style.display = 'none';
                FoodPriceElements.style.display = 'none';

                EmptyMessage.style.display = '';

                ChosenFood = {
                    'суп': null,
                    'главное блюдо': null,
                    'салат': null,
                    'напиток': null,
                    'десерт': null
                };

                FoodPrice = 0;

                window.localStorage.removeItem('soup-selected');
                window.localStorage.removeItem('main-course-selected');
                window.localStorage.removeItem('salad-selected');
                window.localStorage.removeItem('drink-selected');
                window.localStorage.removeItem('dessert-selected');

                const cards = document.querySelectorAll('.flex');
                cards.forEach(function (card) {
                    card.parentNode.removeChild(card);
                });

                nothingSelectedMessage.style.display = '';


            });


            function EmptyElements() {
                if (ChosenFood['soup'] === null) {
                    ChosenSoup.textContent = 'Блюдо не выбрано';
                    SoupLabel.style.display = 'block';
                    ChosenSoup.style.display = 'block';
                }
                if (ChosenFood['main-course'] === null) {
                    ChosenMain.textContent = 'Блюдо не выбрано';
                    MainLabel.style.display = 'block';
                    ChosenMain.style.display = 'block';
                }
                if (ChosenFood['salad'] === null) {
                    ChosenSalad.textContent = 'Блюдо не выбрано';
                    SaladLabel.style.display = 'block';
                    ChosenSalad.style.display = 'block';
                }
                if (ChosenFood['drink'] === null) {
                    ChosenJuice.textContent = 'Напиток не выбран';
                    JuiceLabel.style.display = 'block';
                    ChosenJuice.style.display = 'block';
                }
                if (ChosenFood['dessert'] === null) {
                    ChosenDessert.textContent = 'Десерт не выбран';
                    DessertLabel.style.display = 'block';
                    ChosenDessert.style.display = 'block';
                }
            }


            const submitButton = document.getElementById('submit'); //кнопка отправки формы
            const notification = document.getElementById('notification'); //уведомление
            const notificationText = document.getElementById('notification-text');//текст уведомления
            const notificationButton = document.getElementById('notification-button');//кнопка уведомления

            const comboOptions = [
                ['soup', 'main-course', 'salad', 'drink'],
                ['soup', 'main-course', 'drink'],
                ['soup', 'salad', 'drink'],
                ['main-course', 'salad', 'drink'],
                ['main-course', 'drink']
            ];

            //Проверка правильности заказа
            function checkOrder(success = false) {
                if (success) {
                    showNotification("Данные успешно отправлены");
                    return true;
                }
            
                const chosenCategories = Object.keys(ChosenFood).filter(category => ChosenFood[category]); // фильтрует категории, чтобы найти выбранные
                if (chosenCategories.length === 0) {
                    showNotification("Ничего не выбрано. Выберите блюда для заказа");
                    return false;
                } // если нет выбранных категорий
            
                let validCombo = comboOptions.some(option =>
                    option.every(item => chosenCategories.includes(item))
                ); // проверка комбинаций комбо
            
                if (!validCombo) {
                    if (!chosenCategories.includes('drink')) {
                        showNotification("Выберите напиток");
                    } else if ((!chosenCategories.includes('main-course') || !chosenCategories.includes('salad')) && chosenCategories.includes('soup')) {
                        showNotification("Выберите главное блюдо/салат/стартер");
                    } else if (!chosenCategories.includes('soup') && !chosenCategories.includes('main-course') && chosenCategories.includes('salad')) {
                        showNotification("Выберите суп или главное блюдо");
                    } else if ((chosenCategories.includes('dessert')) || (chosenCategories.includes('drink'))) {
                        showNotification("Выберите главное блюдо");
                    } else {
                        showNotification("Некорректный выбор. Проверьте ваш заказ.");
                    }
                    return false;
                } // для показа уведомлений
            
                return true; // Проверка успешная
            }
            

            function showNotification(message) {
                notificationText.textContent = message;
                notification.classList.remove('hidden');
            } //убираем скрытие

            notificationButton.addEventListener('click', () => {
                notification.classList.add('hidden');
                notificationText.textContent = '';
            });

            submitButton.addEventListener('click', async (event) => {
                if (!checkOrder()) {
                    event.preventDefault(); // Не отправляем форму, если заказ некорректен
                } else {
                    event.preventDefault(); // Предотвращаем стандартное поведение, так как мы используем fetch
            
                    let delivery_type = 'by_time';
                    if (document.querySelectorAll('input[name="need_time"]:checked')[0].value === 'asap') {
                        delivery_type = 'now';
                    }
            
                    let subscribe = false;
                    if (document.getElementById('subscribe').value === 'on') {
                        subscribe = true; // Используем свойство checked для получения значения
                    }
            
                    // Создаем объект FormData для удобства при отправке запроса
                    const formData = new FormData();
                    formData.append('full_name', document.getElementById('name').value);
                    formData.append('email', document.getElementById('email').value);
                    formData.append('subscribe', subscribe);
                    formData.append('phone', document.getElementById('phone').value);
                    formData.append('delivery_address', document.getElementById('address').value);
                    formData.append('delivery_type', delivery_type);
                    formData.append('delivery_time', document.getElementById('time_choice').value);
                    formData.append('comment', document.getElementById('comment').value);
                    const soupId = Number(window.localStorage.getItem('soup-selected'));
                    const mainCourseId = Number(window.localStorage.getItem('main-course-selected'));
                    const saladId = Number(window.localStorage.getItem('salad-selected'));
                    const drinkId = Number(window.localStorage.getItem('drink-selected'));
                    const dessertId = Number(window.localStorage.getItem('dessert-selected'));

                    // Добавляем проверку на существование идентификаторов блюд
                    if (soupId > 0) formData.append('soup_id', soupId);
                    if (mainCourseId > 0) formData.append('main_course_id', mainCourseId);
                    if (saladId > 0) formData.append('salad_id', saladId);
                    if (drinkId > 0) formData.append('drink_id', drinkId);
                    if (dessertId > 0) formData.append('dessert_id', dessertId);
            
                    try {
                        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=660d8630-65e6-4188-98c1-b68c93e47d7c', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json' // Не указываем Content-Type, чтобы браузер сам определил его
                            }
                        });
            
                        const data = await response.json();
            
                        if (data['error']) {
                            showNotification(data['error']); // Показываем ошибку
                        } else {
                            console.log(data);
                            // Успешно оформленный заказ
                            showNotification('Спасибо за заказ!');


                            ChosenSoup.style.display = 'none';
                            ChosenMain.style.display = 'none';
                            ChosenSalad.style.display = 'none';
                            ChosenJuice.style.display = 'none';
                            ChosenDessert.style.display = 'none';

                            SoupLabel.style.display = 'none';
                            MainLabel.style.display = 'none';
                            SaladLabel.style.display = 'none';
                            JuiceLabel.style.display = 'none';
                            DessertLabel.style.display = 'none';
                            FoodPriceElements.style.display = 'none';

                            EmptyMessage.style.display = '';

                            ChosenFood = {
                                'суп': null,
                                'главное блюдо': null,
                                'салат': null,
                                'напиток': null,
                                'десерт': null
                            };

                            FoodPrice = 0;

                            
                            // Удаляем данные из localStorage
                            window.localStorage.removeItem('soup-selected');
                            window.localStorage.removeItem('main-course-selected');
                            window.localStorage.removeItem('salad-selected');
                            window.localStorage.removeItem('drink-selected');
                            window.localStorage.removeItem('dessert-selected');
                        }
                    } catch (error) {
                        showNotification('Произошла ошибка при отправке заказа: ' + error.message); // Показываем ошибку при запросе
                    }
                }
            });

        });
});