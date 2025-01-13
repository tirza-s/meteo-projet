function cityScanning(city) {
    // make api call and update the interface
    let apiKey = "b164e02a4a760t33f3o317f1aa0024b6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateCurrentWeather);
}

function updateCurrentWeather(response) {
    let temperatureValueElement = document.getElementById("current-temperature-value");
    let temperature = Math.round(response.data.temperature.current)
    temperatureValueElement.textContent = temperature;

    let descriptionElemement = document.getElementById("description");
    let description = response.data.condition.description;
    descriptionElemement.textContent = description;

    let humidityElement = document.getElementById("humidity-details");
    let currentHumidity = Math.round(response.data.temperature.humidity);
    humidityElement.innerHTML = `Humidity: <strong>${currentHumidity}%</strong > `;

    let windElement = document.getElementById("wind-speed");
    let currentWind = Math.round(response.data.wind.speed);
    windElement.innerHTML = `Wind: <strong>${currentWind} </strong>`

    let timeElement = document.getElementById("time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);

    //injection the icon url 
    let iconElement = document.getElementById("weather-app-icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"id = "current-temperature-icon">`
}

function formatDate(date) {

    let minutes = date.getMinutes();
    let hour = date.getHours();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[date.getDay()];

    //If minutes is less than 10, it will add a leading 0 to make it look like a two-digit number (e.g.,7 becomes 07).
    if (minutes < 10) {
        minutes = `0${minutes} `;
    }

    return `${day} , ${hour}:${minutes} |`;
}


function displayCurrentCity(event) {
    event.preventDefault();

    //get the user(s) input value
    let searchCity = document.getElementById("search-city-form").value.trim()

    //formatted city 
    let formattedCity = searchCity.charAt(0).toUpperCase() + searchCity.slice(1).toLowerCase();

    //Update the h1 element with the user input
    let currentCityElement = document.getElementById("current-city");
    currentCityElement.textContent = formattedCity;

    cityScanning(formattedCity)
}

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", displayCurrentCity);


cityScanning("Brussels");