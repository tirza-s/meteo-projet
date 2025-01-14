function updateCurrentWeather(response) {
    let temperatureValueElement = document.getElementById("current-temperature-value");
    let temperature = Math.round(response.data.temperature.current)
    temperatureValueElement.textContent = temperature;

    let descriptionElemement = document.getElementById("description");
    let description = response.data.condition.description;
    descriptionElemement.textContent = description;

    let humidityElement = document.getElementById("humidity-details");
    let currentHumidity = Math.round(response.data.temperature.humidity);
    humidityElement.innerHTML = ` <i class="fa-solid fa-droplet"></i> Humidity : <strong>${currentHumidity}%</strong > | `;

    let windElement = document.getElementById("wind-speed");
    let currentWind = Math.round(response.data.wind.speed);
    windElement.innerHTML = `<i class="fa-solid fa-wind"></i> Wind : <strong>${currentWind} </strong>`

    let timeElement = document.getElementById("time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);

    //injection the icon url 
    let iconElement = document.getElementById("weather-app-icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"id = "current-temperature-icon">`

    getForecastData(response.data.city);
}

// search for the city function
function cityScanning(city) {
    // make api call and update the interface
    let apiKey = "b164e02a4a760t33f3o317f1aa0024b6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateCurrentWeather);
}

function formatDate(date) {

    let minutes = date.getMinutes();
    let hour = date.getHours();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    let day = days[date.getDay()];

    //If minutes is less than 10, it will add a leading 0 to make it look like a two-digit number (e.g.,7 becomes 07).
    if (minutes < 10) {
        minutes = `0${minutes} `;
    }

    return `Last updated : ${day} , ${hour}:${minutes} |`;
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

// Search for forecast data
function getForecastData(city) {
    let apiKeyForecast = "b164e02a4a760t33f3o317f1aa0024b6";
    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeyForecast}&units=metric`;

    axios.get(apiUrlForecast).then(displayWeatherForecast);
}

function formattedDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayWeatherForecast(response) {
    console.log(response.data);

    let forecastHTML = "<ul>";

    response.data.daily.forEach(function (day, index) {

        if (index < 7) {

            let maxTemperature = Math.round(day.temperature.maximum);

            forecastHTML += `
        <li class="forecast-item container">
            <span class="day">${formattedDay(day.time)}</span>
            <span > <img class="weather-icon" src="${day.condition.icon_url}" alt="{day.condition.description}"></span>
            <span class="temperature">
                <span class="temp-value">${maxTemperature}</span>
                <span class="temp-unit">°C</span>
            </span>
        </li>`;
        }
    });

    forecastHTML += "</ul>";
    let forecastElement = document.getElementById("weather-forecast");

    // Clear previous forecast and set the new one
    forecastElement.innerHTML = `<h4> 7-days forecast</h4>` + forecastHTML;
}


let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", displayCurrentCity);

// Display the default current weather data
cityScanning("Brussels");
