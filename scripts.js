document.getElementById("search").addEventListener("click", function () {
    const query = document.getElementById("query").value;
    
    // Преобразуємо введену адресу в формат JSON
    const data = JSON.stringify(query);

    // Створюємо новий XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // Слухаємо зміну стану запиту
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                try {
                    const responseData = JSON.parse(this.responseText);

                    // Заповнюємо поля результату
                    document.getElementById("address").value = responseData.address || "Немає даних";
                    document.getElementById("link").value = responseData.link || "Немає даних";
                    document.getElementById("coordinates").value = responseData.coordinates || "Немає даних";
                } catch (error) {
                    console.error("Помилка при парсингу JSON:", error);
                }
            } else {
                console.error("Помилка запиту:", this.status, this.statusText);
            }
        }

        const targetElement = document.getElementById('result');

        // Прокручуємо до елемента з плавним ефектом
        targetElement.scrollIntoView({
            behavior: 'smooth', // плавне прокручування
            block: 'start'      // прокрутка до початку елемента
        });

        document.getElementById("query").value = ''
    });

    // Відправляємо POST-запит
    xhr.open("POST", "https://mapfinder-production.up.railway.app/addr");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
});

document.getElementById("copy_address").addEventListener("click", function() {
    address = document.getElementById('address');

    navigator.clipboard.writeText(address.value).then(function() {
        alert('Текст скопійовано!');
    })
});

document.getElementById("copy_link").addEventListener("click", function() {
    link = document.getElementById('link');

    navigator.clipboard.writeText(link.value).then(function() {
        alert('Текст скопійовано!');
    })
});

document.getElementById("open_link").addEventListener("click", function() {
    link = document.getElementById('link');

    window.open(link.value, '_blank');
});

document.getElementById("copy_coordinates").addEventListener("click", function() {
    coordinates = document.getElementById('coordinates');

    navigator.clipboard.writeText(coordinates.value).then(function() {
        alert('Текст скопійовано!');
    })
});

document.getElementById("open_coordinates").addEventListener("click", function() {
    coordinates = document.getElementById('coordinates').value;
    coordinates = coordinates.replace(/\s+/g, '');

    url_coordinates = 'https://maps.google.com/?q=' + coordinates
    window.open(url_coordinates, '_blank');
});
