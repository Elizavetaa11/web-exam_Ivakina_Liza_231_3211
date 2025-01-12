// Объект для перевода категорий
const categoryTranslations = {
    'home & kitchen': 'Дом и кухня',
    'tv, audio & cameras': 'Телевизоры, аудио и камеры',
    'sports & fitness': 'Спорт и фитнес',
    'beauty & health': 'Красота и здоровье'
};

// Функция для отображения категорий фильтров
function displayCategories(categories) {
    const categoryFilters = document.getElementById('category-filters');
    categoryFilters.innerHTML = '';
    categories.forEach(category => {
        const label = document.createElement('label');
        const translatedCategory = categoryTranslations[category] || category;
        label.innerHTML = `
            <input type="checkbox" name="category" value="${category}"> ${translatedCategory}
        `;
        categoryFilters.appendChild(label);
    });
}

// Функция для обновления списка категорий
function updateCategories(products) {
    products.forEach(product => {
        categories.add(product.main_category);
    });
    displayCategories([...categories]);
}