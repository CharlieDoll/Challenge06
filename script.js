var weatherSearch = document.querySelector("weather");
var searchButton = document.getElementById("search-button");

function getApi() {
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

searchButton.addEventListener("click", getApi);

var requestUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=76119befad1d3879033ce0396274f555";
$.ajax({
  url: requestUrl,
  method: "GET",
}).then(function (response) {
  console.log("AJAX Response \n-------------");
  console.log(response);
});
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("Fetch Response \n-------------");
    console.log(data);
  });
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log("XMLHttpRequest Response \n-------------");

    console.log(xhr.response);
  }
};

xhr.open("GET", requestUrl);
xhr.send();
