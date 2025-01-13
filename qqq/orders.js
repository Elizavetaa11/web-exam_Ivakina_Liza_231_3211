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