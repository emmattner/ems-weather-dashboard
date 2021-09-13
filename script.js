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