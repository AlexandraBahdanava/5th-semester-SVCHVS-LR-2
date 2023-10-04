const accessKey = 'f40ZxikJqKrZWzZzMK25hA8atAWiatJ2RxoPMS6MUa4'; // Замените на свой API ключ
const apiUrl = 'https://api.unsplash.com/photos';

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

    fetch(`${apiUrl}?query=${query}`, {
        headers: {
            'Authorization': `Client-ID ${accessKey}`
        }
    })
    .then(response => response.json())
    .then(photos => {
        displayPhotos(photos);
    })
    .catch(error => {
        console.error('Произошла ошибка при запросе к Unsplash API:', error);
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
