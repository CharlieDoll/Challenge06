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
    .then(function (fivedays) {
      console.log(fivedays);
    });
}

searchButton.addEventListener("click", getApi);
