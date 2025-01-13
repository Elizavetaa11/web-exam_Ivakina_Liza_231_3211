const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api';
const apiKey = '23d05351-a6d2-48ec-8e3b-fcd6081fd307';
let orders = [];
let products = [];

// Функция для загрузки продуктов с API 
async function fetchProducts() {
    let allProducts = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        try {
            const response = await fetch(`${apiUrl}/goods?page=${page}&api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const currentPageProducts = data.goods || [];
            if (currentPageProducts.length === 0) {
                hasMorePages = false;
            } else {
                allProducts = allProducts.concat(currentPageProducts);
                page++;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            hasMorePages = false;
        }
    }

    console.log('Fetched products:', allProducts); // Логирование полученных данных
    return allProducts;
}

// Функция для загрузки заказов с API
async function fetchOrders() {
    try {
        const response = await fetch(`${apiUrl}/orders?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched orders:', data); // Логирование полученных данных
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// Функция для получения названия продукта по его ID
function getProductName(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
    }
    return product ? product.name : 'Нет данных';
}

// Функция для получения цены продукта по его ID
function getProductPrice(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
    }
    return product ? (product.discount_price ? product.discount_price : product.actual_price) : 0;
}




// Функция для отображения заказов в таблице
function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    orders.forEach((order, index) => {
        const goodIds = order.good_ids || [];
        const formattedDateTime = formatDateTime(order.created_at);
        const deliveryDate = formatDate(order.delivery_date);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formattedDateTime}</td>
            <td>${goodIds.map(goodId => getProductName(goodId)).join(', ')}</td>
            <td>${calculateTotalAmount(goodIds)} руб.</td>
            <td>
                <div class="delivery-date">${deliveryDate}</div>
                <div class="delivery-interval">${order.delivery_interval}</div>
            </td>
            <td class="order-actions">
                <button onclick="viewOrder(${order.id})" title="Просмотр"><i class="fas fa-eye"></i></button>
                <button onclick="editOrder(${order.id})" title="Редактировать"><i class="fas fa-edit"></i></button>
                <button onclick="deleteOrder(${order.id})" title="Удалить"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        ordersList.appendChild(row);
    });
}