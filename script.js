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

    const windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " meters/sec";
    windSpeedEl.classList = "list-group-item"
    currentWeatherEl.appendChild(windSpeedEl);

    const humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
    currentWeatherEl.appendChild(humidityEl);
    const lat = weather.coord.lat;
    const lon = weather.coord.lon;
    getUvIndex(lat, lon)
}

const getUvIndex = function (lat, lon) {
    const apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${API_Key}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
                console.log(data)
            });
        });
}

const displayUvIndex = function (index) {
    const uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"
    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <= 2) {
        uvIndexValue.classList = "favorable"
    }
    else if (index.value > 2 && index.value <= 8) {
        uvIndexValue.classList = "moderate "
    }
    else if (index.value > 8) {
        uvIndexValue.classList = "severe"
    };
    uvIndexEl.appendChild(uvIndexValue);
    currentWeatherEl.appendChild(uvIndexEl);
}

const getForecasts = function (city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_Key}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayForecasts(data);
            });
        });
};

const displayForecasts = function (weather) {
    forecastContainerEl.textContent = ""
    forecastHeader.textContent = "5-Day Forecast:";

    const forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        const dailyForecast = forecast[i];
        const forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-white text-black m-2";

        const forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("dddd Do MMM");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);


    }
}    