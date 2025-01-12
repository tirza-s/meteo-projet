function updateCurrentWeather(response) {
    let temperatureValueElement = document.getElementById("current-temperature-value");
    let temperature = Math.round(response.data.temperature.current)
    temperatureValueElement.textContent = temperature;
}

function cityScanning(city) {
    // make api call and update the interface
    let apiKey = "b164e02a4a760t33f3o317f1aa0024b6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateCurrentWeather);
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


displayCurrentCity("Brussels");