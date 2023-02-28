var weatherSearch = document.querySelector("weather");
var searchButton = document.getElementById("search-button");
var inputEl = document.getElementById("input-city");
var fiveDayForcastEl = document.getElementById("fiveDayForcast");
var weatherCont = document.getElementById("weatherCont");
var allSearch = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getApi() {
  var cityName = inputEl.value;
  allSearch.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(allSearch));
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
      const date = new Date().toLocaleDateString();
      weatherCont.innerHTML = `
      ${data.name} 
      ${date}
     Humidity: ${data.main.humidity} 
     Temp: ${data.main.temp}
     Wind: ${data.wind.speed}
      `;
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
      // fiveDayForcastEl.innerHTML = "";
      const weatherList = fiveDaysUrl.list;
      const weatherDisplaycard = document.querySelectorAll(".card");
      let j = 0;
      for (let i = 0; i < weatherList.length; i += 8) {
        console.log(weatherDisplaycard[j]);
        console.log("index of j", j);
        const displayDateEl = document.createElement("header");
        const mainWeatherElement = document.createElement("h2");
        const weatherDescriptionElement = document.createElement("p");
        const displayCityEl = document.createElement("div");
        const displayWindEl = document.createElement("div");
        const displayTempEl = document.createElement("div");
        const displayHumidityEl = document.createElement("div");
        // const displayFiveDaysEl = document.createElement("div");

        mainWeatherElement.textcontent =
          weatherList[i].weather[0].mainWeatherElement;
        weatherDescriptionElement.textContent =
          weatherList[i].weather[0].description;

        displayDateEl.innerHTML = weatherList[i].dt_txt;
        displayCityEl.innerHTML = fiveDaysUrl.city.name;
        displayHumidityEl.innerHTML =
          "Humidity: " + weatherList[i].main.humidity;
        displayWindEl.innerHTML = "Wind Speed: " + weatherList[i].wind.speed;
        displayTempEl.innerHTML = "Temperature: " + weatherList[i].main.temp;
        // displayFiveDaysEl.innerHTML = weatherList[i].main.FiveDays;

        weatherDisplaycard[j].append(
          displayDateEl,
          mainWeatherElement,
          weatherDescriptionElement,
          displayCityEl,
          displayWindEl,
          displayTempEl,
          displayHumidityEl
          // displayFiveDaysEl
        );

        j++;
      }
    });
}

searchButton.addEventListener("click", getApi);
