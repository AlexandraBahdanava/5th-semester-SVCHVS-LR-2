// Функция для получения случайных изображений при загрузке приложения
function loadRandomImages() {
    const apiKey = 'f40ZxikJqKrZWzZzMK25hA8atAWiatJ2RxoPMS6MUa4';
    const apiUrl = `https://api.unsplash.com/photos/random?count=20&client_id=${apiKey}`;

    // Выполнение запроса к API с использованием fetch
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Вызываем функцию для отображения результатов
            displayPhotos(data);
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}

// Вызываем функцию при загрузке приложения
window.addEventListener('load', loadRandomImages);

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const photoGallery = document.getElementById('photoGallery');

searchButton.addEventListener('click', performSearch);
clearButton.addEventListener('click', clearSearchInput);

// Добавляем обработчик события keydown для поля ввода
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.trim();
    if (query === '') {
        return;
    }

    const apiKey = 'f40ZxikJqKrZWzZzMK25hA8atAWiatJ2RxoPMS6MUa4';

    // URL для запроса к Unsplash API
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${apiKey}`;

    // Выполнение запроса к API с использованием fetch
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Обработка данных и отображение изображений
            const main = document.querySelector('main');
            main.innerHTML = '';

            data.results.forEach((photo) => {
                const photoElement = document.createElement('div');
                photoElement.classList.add('photo');

                const imgElement = document.createElement('img');
                imgElement.src = photo.urls.regular;
                imgElement.alt = photo.alt_description;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = photo.description || 'Без описания';

                // Другие поля можно добавить аналогичным образом

                photoElement.appendChild(imgElement);
                photoElement.appendChild(descriptionElement);
                main.appendChild(photoElement);
            });
            displayPhotos(data.results);
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
        });
}


function clearSearchInput() {
    searchInput.value = '';
    searchInput.placeholder = 'Введите запрос...';
    photoGallery.innerHTML = ''; // Очищаем фотогалерею
}

function displayPhotos(photos) {
    photoGallery.innerHTML = ''; // Очищаем предыдущие фотографии
    photos.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.classList.add('photo-card'); // Добавляем класс для стилизации

        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.description || 'Без описания';

        const description = document.createElement('p');
        description.textContent = photo.description || 'Без описания';

        const author = document.createElement('p');
        author.textContent = `Автор: ${photo.user.name || 'Неизвестный'}`; // Поле "Автор"

        photoCard.appendChild(img);
        photoCard.appendChild(description);
        photoCard.appendChild(author);

        photoGallery.appendChild(photoCard);
    });
}


// Установка фокуса на поле ввода при открытии приложения
searchInput.focus();
