var cities = [];

var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#search-input');
var resultInputEl = document.querySelector('#searched-city');
var forecastContainerEl = document.querySelector("#fiveday-container");
var weatherCardEl = document.querySelector('#current-weather-container');
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var forecastTitle = document.querySelector("#forecast");


var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
};

var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//Api function is called when search form is pressed
var getCityWeather = function (city) {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            displayWeather(data, city);
        }
        )
};

var displayWeather = function (weather, searchCity) {
    //clears old content
    weatherCardEl.textContent = "";
    resultInputEl.textContent = searchCity;

    //creates date element
    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    resultInputEl.appendChild(currentDate);

    //adds weather img
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    resultInputEl.appendChild(weatherIcon);

    //adds temp
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"

    // adds humidity
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

    // adds wind speed
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

    // appends elements to card
    weatherCardEl.appendChild(temperatureEl);
    weatherCardEl.appendChild(humidityEl);
    weatherCardEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)

}

var getUvIndex = function (lat, lon) {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
                console.log(data)
            });
        });
}

var displayUvIndex = function (index) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if (index.value <= 2) {
        uvIndexValue.classList = "low"
    } else if (index.value > 2 && index.value <= 5) {
        uvIndexValue.classList = "medium"
    } else if (index.value > 5 && index.value <= 7) {
        uvIndexValue.classList = "high"
    } else if (index.value > 7 && index.value <= 10) {
        uvIndexValue.classList = "very-high"
    } else if (index.value > 10) {
        uvIndexValue.classList = "extremely-high"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherCardEl.appendChild(uvIndexEl);
}

var get5Day = function (city) {
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data)
                display5Day(data);
            });
        });
};


var display5Day = function (weather) {
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];


        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        //console.log(dailyForecast)

        //create date element
        var forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"
        forecastEl.appendChild(forecastDate);




        //create an image element
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        //append to forecast card
        forecastEl.appendChild(weatherIcon);

        //create temperature span
        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = "Temp: " + dailyForecast.main.temp + " °F";


        forecastEl.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";

        //append to forecast card
        forecastEl.appendChild(forecastHumEl);

        var forecastWindEl = document.createElement("span");
        forecastWindEl.classList = "card-body text-center";
        forecastWindEl.textContent = "Wind: " + dailyForecast.wind.speed + " MPH";

        // append to forecast card
        forecastEl.appendChild(forecastWindEl);

        //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

var pastSearch = function (pastSearch) {

    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}


var pastSearchHandler = function (event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}


searchFormEl.addEventListener("submit", formSubmitHandler);
pastSearchButtonEl.addEventListener('click', pastSearchHandler);