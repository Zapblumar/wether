var search = document.querySelector("#city-Btn");
//var APIKey = "6d5ccf5473302b19f719a739ab7ff1c2";
var where = document.querySelector("#current");
var uvID = document.querySelector("#uv-id");
var wind = document.querySelector("#wind");
var humid = document.querySelector("#humid");
var temp = document.querySelector("#temp");
var date = document.querySelector("#date");
var city = document.querySelector("#city");
var humid2 = document.querySelector("#humid-2");
var temp2 = document.querySelector("#temp-2");
var date2 = document.querySelector("#date-2");
var humid3 = document.querySelector("#humid-3");
var temp3 = document.querySelector("#temp-3");
var date3 = document.querySelector("#date-3");
var humid4 = document.querySelector("#humid-4");
var temp4 = document.querySelector("#temp-4");
var date4 = document.querySelector("#date-4");
var humid5 = document.querySelector("#humid-5");
var temp5 = document.querySelector("#temp-5");
var date5 = document.querySelector("#date-5");
var lat = ' '
var lon = ' '
var currentWeather = [];
var thisWeek = [];
var uvs = [];

var getweather = function (e) {
    e.preventDefault();
    var cityName = document.querySelector("#search").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units-imperials&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            currentWeather = json
            showWeather()
            lat = currentWeather.coord.lat
            lon = currentWeather.coord.lon
            getUV()
        });

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units-imperials&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            thisWeek = json
            weekWeather()
        });
    function getUV() {
        fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=6d5ccf5473302b19f719a739ab7ff1c2")
            .then(r => r.json())
            .then(function (json) {
                uvs = json
            });
    }
}
//icon.src = " http://openweathermap.org/img/wn/" + currentWeather.days + "@2x.png"
function showWeather() {
    city.innerText = currentWeather.name + ' ' + '(' + moment().format('ll') + ')'
    wind.innerText = currentWeather.wind.speed
    humid.innerText = currentWeather.main.humidity
    temp.innerText = currentWeather.main.temp
}
function weekWeather() {
    date.innerText = moment().add(1, 'days').format("ll");
    date2.innerText = moment().add(2, 'days').format("ll");
    date3.innerText = moment().add(3, 'days').format("ll");
    date4.innerText = moment().add(4, 'days').format("ll");
    date5.innerText = moment().add(5, 'days').format("ll");
    temp.innerText = thisWeek.list[5].main.temp
    humid.innerText = thisWeek.list[5].main.humidity
}

search.onclick = getweather;

