const API_Key = "4a3134ff84b520e99655fd55fab2c3b8"

const cityArray = [''];
const searchEl = document.querySelector("#search-container");
const cityInputEl = document.querySelector("#city-input");
const cityHistoryEl = document.querySelector("#search-history");
const citySearchInputEl = document.querySelector("#searched-city");
const currentWeatherEl = document.querySelector("#current-weather-container");
const forecastHeader = document.querySelector("#forecast-header");
const forecastContainerEl = document.querySelector("#forecast-container");

const formSumbitHandler = function (event) {
    event.preventDefault();
    const city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        getForecasts(city);
        cityArray.unshift({ city });
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a City");
    }
    saveCity();
    pastCity(city);
}

const saveCity = function () {
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
};

const getCityWeather = function (city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                alert('Uh oh!: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

const displayWeather = function (weather, searchCity) {
    currentWeatherEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    const currentDate = document.createElement("div")
    currentDate.setAttribute("class", "current-date")
    currentDate.textContent = moment(weather.dt.value).format("dddd, MMMM Do, YYYY");
    citySearchInputEl.appendChild(currentDate);

    const temperatureEl = document.createElement("span");
    temperatureEl.textContent = Math.round(weather.main.temp) + "°C";
    temperatureEl.classList = "list-group-item current-temp"
    currentWeatherEl.appendChild(temperatureEl);
}    