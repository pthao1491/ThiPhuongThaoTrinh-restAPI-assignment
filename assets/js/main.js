async function getData(date) {
    try {
        const apiKey = 'tVDNEzJjSmpBEJqYMlglf0pckvk8ps0bbDtOWw6g';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();

        const title = document.querySelector('h1');
        const dateElement = document.querySelector('h2');
        const explanation = document.querySelector('figure ul');
        const hdurl = document.querySelector('figure ul');

        // Clear previous content
        title.innerHTML = '';
        dateElement.innerHTML = '';
        explanation.innerHTML = '';

        // Title
        const dailyTitle = document.createElement('p');
        dailyTitle.innerHTML = `${data.title}`;
        title.appendChild(dailyTitle);

        // Date & copyright
        const dateInfo = document.createElement('p');
        dateInfo.innerHTML = `${data.date}, <span>copyright</span> "${data.copyright}"`;
        dateElement.appendChild(dateInfo);

        // Explanation
        const description = document.createElement('li');
        description.innerHTML = `${data.explanation}`;
        explanation.appendChild(description);

        // Daily image or video
        const mediaElement = document.createElement('li');
        if (data.media_type === 'video') {
            mediaElement.innerHTML = `<iframe width="560" height="315" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            mediaElement.innerHTML = `<a href="${data.hdurl}" target="_blank"><img src=${data.hdurl} alt="${data.title}"></a>`;
        }
        hdurl.appendChild(mediaElement);

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

document.getElementById('fetch-button').addEventListener('click', () => {
    const selectedDate = document.getElementById('date-picker').value;
    if (selectedDate) {
        getData(selectedDate);
    } else {
        alert('Please select a date.');
    }
});

// Auto-fetch today's picture on page load
window.addEventListener('load', () => {
    const today = new Date().toISOString().split('T')[0];
    getData(today);
});
