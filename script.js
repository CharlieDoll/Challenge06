var weatherSearch = document.querySelector("weather");
var searchButton = document.getElementById("search-button");

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=76119befad1d3879033ce0396274f555";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener("click", getApi);
