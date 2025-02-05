document.getElementById("search").addEventListener("click", function () {
    let text = document.getElementById("query").value;
    query = text.replace(/[^a-zA-Z0-9]$/, '');

    const loaderContainer = document.getElementById("loader-container");

    // Показуємо анімацію
    loaderContainer.classList.remove("hide");
    loaderContainer.style.display = "flex";

    const data = JSON.stringify(query);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                try {
                    const responseData = JSON.parse(this.responseText);

                    document.getElementById("address").value = responseData.address || "Немає даних";
                    document.getElementById("link").value = responseData.link || "Немає даних";
                    document.getElementById("coordinates").value = responseData.coordinates || "Немає даних";
                } catch (error) {
                    console.error("Помилка при парсингу JSON:", error);
                }
            } else {
                console.error("Помилка запиту:", this.status, this.statusText);
            }

            // Ховаємо анімацію через 3 секунди
            setTimeout(function () {
                loaderContainer.classList.add("hide");
            }, 3000); // 3 секунди
        }

        const targetElement = document.getElementById('result');
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        document.getElementById("query").value = '';
    });

    // Виправлений JSON-запит
    xhr.open("POST", "https://mapfinder-production.up.railway.app/addr");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
});
