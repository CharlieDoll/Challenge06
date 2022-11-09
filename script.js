var weatherSearch = document.querySelector("weather");
var searchButton = document.getElementById("search-button");
var inputEl = document.getElementById("input-city");

function getApi() {
  var cityName = inputEl.value;

  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&APPID=76119befad1d3879033ce0396274f555";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lat, lon);
      fiveDaysRequest(lat, lon);
    });
}

function fiveDaysRequest(lat, lon) {
  var fiveDaysUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=76119befad1d3879033ce0396274f555";
  fetch(fiveDaysUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (fiveDaysUrl) {
      console.log("testing second call", fiveDaysUrl);
      const weatherList = fiveDaysUrl.list;
      const weatherDisplaycard = document.querySelectorAll(".card");
      let j = 0;
      for (let i = 0; i < weatherList.length; i += 8) {
        console.log(weatherDisplaycard[j]);
        console.log("index of j", j);

        const mainWeatherElement = document.createElement("h2");
        const weatherDescriptionElement = document.createElement("p");
        const displayWindEl = document.createElement("div");
        const displayTempEl = document.createElement("div");
        const displayHumidityEl = document.createElement("div");
        const displayFiveDaysEl = document.createElement("div");

        mainWeatherElement.textcontent =
          weatherList[i].weather[0].mainWeatherElement;
        weatherDescriptionElement.textContent =
          weatherList[i].weather[0].description;

        displayHumidityEl.innerHTML = weatherList[i].main.humidity;
        displayWindEl.innerHTML = weatherList[i].main.wind;
        displayTempEl.innerHTML = weatherList[i].main.temp;
        displayFiveDaysEl.innerHTML = weatherList[i].main.FiveDays;

        weatherDisplaycard[j].append(
          mainWeatherElement,
          weatherDescriptionElement,
          displayWindEl,
          displayTempEl,
          displayHumidityEl,
          displayFiveDaysEl
        );

        j++;
      }
    });
}

searchButton.addEventListener("click", getApi);
