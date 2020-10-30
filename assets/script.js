var search = document.querySelector("#city-Btn");
var APIKey = "6d5ccf5473302b19f719a739ab7ff1c2";
var cityName = document.querySelector(".search")


var getweather = function () {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey)
        .then(r => r.json);

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey)
        .then(r => r.json);
}

search.onclick = getweather;

