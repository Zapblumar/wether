var search = document.querySelector("#city-Btn");
//var APIKey = "6d5ccf5473302b19f719a739ab7ff1c2";
var where = document.querySelector("#current");
var uvID = document.querySelector("#uv-id");
var wind = document.querySelector("#wind");
var humid = document.querySelector("#humid");
var temp = document.querySelector("#temp");
var date = document.querySelector("#date");
var city = document.querySelector("#city");
var humid1 = document.querySelector("#humid-1");
var temp1 = document.querySelector("#temp-1");
var date1 = document.querySelector("#date-1");
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
var searchList = document.querySelector("#searches");
var lat = ' '
var lon = ' '
var currentWeather = [];
var thisWeek = [];
var uvs = [];
var seachHistory = JSON.parse(localStorage.getItem("seachHistory")) || [];
var pics = document.createElement("img");

var getweather = function (e) {
    e.preventDefault();


    var cityName = document.querySelector("#search").value;
    seachHistory.push(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(seachHistory))
    var list = document.createElement("li");
    list.setAttribute("class", "list-group-item list-group-item-action");
    list.setAttribute("onclick", "reload(this)");
    list.setAttribute("value", cityName.value);
    list.innerText = cityName;
    searchList.prepend(list);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            currentWeather = json
            showWeather()
            lat = currentWeather.coord.lat
            lon = currentWeather.coord.lon
            getUV()
        });

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            thisWeek = json
            weekWeather()
        });
    function getUV() {
        fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=6d5ccf5473302b19f719a739ab7ff1c2")
            .then(r => r.json())
            .then(function (json) {
                uvs = json
                showWeather()
            });
    }
}
function showWeather() {
    pics.src = " https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png"
    city.innerText = "City:" + " " + currentWeather.name + ' ' + '(' + moment().format('ll') + ')'
    wind.innerText = "wind:" + " " + currentWeather.wind.speed
    humid.innerText = "humidity:" + " " + currentWeather.main.humidity
    temp.innerText = "temp:" + " " + currentWeather.main.temp
    city.appendChild(pics)
    uvID.innerText = "UVI:" + " " + uvs.value
    if (uvs.value < 4) {
        uvID.classList.remove
        uvID.classList.add("safe")
    }
    else if (uvs.value < 7) {
        uvID.classList.remove
        uvID.classList.add("warning")
    }
}
function weekWeather() {
    date1.innerText = moment().add(1, 'days').format("ll");
    date2.innerText = moment().add(2, 'days').format("ll");
    date3.innerText = moment().add(3, 'days').format("ll");
    date4.innerText = moment().add(4, 'days').format("ll");
    date5.innerText = moment().add(5, 'days').format("ll");
    temp1.innerText = "temp:" + " " + thisWeek.list[5].main.temp
    humid1.innerText = "humidity:" + " " + thisWeek.list[5].main.humidity
    temp2.innerText = "temp:" + " " + thisWeek.list[10].main.temp
    humid2.innerText = "humidity:" + " " + thisWeek.list[10].main.humidity
    temp3.innerText = "temp" + thisWeek.list[15].main.temp
    humid3.innerText = "humidity" + thisWeek.list[15].main.humidity
    temp4.innerText = "temp:" + " " + thisWeek.list[20].main.temp
    humid4.innerText = "humidity:" + " " + thisWeek.list[20].main.humidity
    temp5.innerText = "temp:" + " " + thisWeek.list[25].main.temp
    humid5.innerText = "humidity:" + " " + thisWeek.list[25].main.humidity
}

for (let i = seachHistory.length - 1; i >= 0; i--) {
    var list = document.createElement("li");
    list.setAttribute("class", "list-group-item list-group-item-action");
    list.setAttribute("onclick", "reload(this)");
    list.setAttribute("value", cityName.value);
    list.innerText = seachHistory[i];
    searchList.appendchild(list);
}





search.onclick = getweather;

// proventDefault is messing with the reload function
var reload = function (value) {
    cityName = value.innerText;
    getweather()
}