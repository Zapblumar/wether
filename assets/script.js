var search = document.querySelector("#city-Btn");
//var APIKey = "6d5ccf5473302b19f719a739ab7ff1c2";
var where = document.querySelector("#current");


var getweather = function (e) {
    e.preventDefault();
    var cityName = document.querySelector("#search").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            console.log(json)
        });

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            console.log(json)
        });
    console.log(cityName)
}

search.onclick = getweather;

