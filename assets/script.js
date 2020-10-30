var search = document.querySelector("#city-Btn");
var APIKey = "6d5ccf5473302b19f719a739ab7ff1c2";
var getweather = function (weather) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey)
        .then(r => r.json);


}

search.onclick = getweather;