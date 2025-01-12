const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/orders';
const apiKey = '23d05351-a6d2-48ec-8e3b-fcd6081fd307';
let cartItems = [];

// Функция для отображения товаров в корзине
function displayCartItems(items) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (items.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста. Перейдите в <a href="../index.html">каталог</a>, чтобы добавить товары.</p>';
        return;
    }

    items.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}">
            <div class="name">${item.name}</div>
            <div class="rating">
                ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
                <span class="rating-value">(${item.rating.toFixed(1)})</span>
            </div>
            <div class="price">
                ${item.discount_price ? `<span>${item.discount_price} руб.</span><span class="old-price">${item.actual_price} руб.</span>` : `<span>${item.actual_price} руб.</span>`}
            </div>
            <button class="remove-button" onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    updateTotalAmount(items);
}

// Функция для валидации данных заказа
function validateOrder() {
    const full_name = document.getElementById('full_name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const delivery_address = document.getElementById('delivery_address').value;
    const delivery_date = document.getElementById('delivery_date').value;
    const delivery_interval = document.getElementById('delivery_interval').value;

    if (!full_name || !phone || !email || !delivery_address || !delivery_date || !delivery_interval) {
        showNotification('Пожалуйста, заполните все обязательные поля.');
        return false;
    }

    return true;
}

// Функция для отображения уведомления
function showNotification(message, callback) {
    const notifications = document.getElementById('notifications');
    notifications.innerHTML = `
        <div class="notification">
            ${message}
            <button class="close-button" onclick="closeNotification()">×</button>
        </div>
    `;
    notifications.style.display = 'block';
    if (callback) {
        setTimeout(callback, 3000); // Закрываем уведомление через 3 секунды
    }
}

// Функция для закрытия уведомления
function closeNotification() {
    const notifications = document.getElementById('notifications');
    notifications.style.display = 'none';
}