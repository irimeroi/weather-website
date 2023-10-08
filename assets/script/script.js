var apiKey = '29253d375da320c72f0c2f2de7d28696';
var apiURL = 'https://api.openweathermap.org/data/2.5/weather';
var latLongUrl = 'http://api.openweathermap.org/geo/1.0/direct';
var submitBtn = document.getElementById('submit-button');
var cityInput = document.getElementById('city-input');

// https://openweathermap.org/api/geocoding-api

function getLatAndLong(event) {
    event.preventDefault();
    // var citySearch = cityInput.value;
    console.log(cityInput.value)
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&appid=29253d375da320c72f0c2f2de7d28696')
    .then(response => {
        return response.json();
    }).then(data => {
        var lat = data[0].lat
        var lon = data[0].lon
        getWeather(lat,lon);
        fiveDay(cityInput.value);
    }).catch(error => {
        console.log(error)
    })
}

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=29253d375da320c72f0c2f2de7d28696&units=imperial`)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        var h2El = document.createElement("h2");
        h2El.classList.add("card-header");
        h2El.textContent = data.name;
        var imgTag = document.createElement('img');
        imgTag.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        h2El.append(imgTag);
        var ulEl = document.createElement("ul");
        ulEl.classList.add("list-group","list-group-flush");
        var liEl1 = document.createElement("li");
        liEl1.classList.add('list-group-item');
        liEl1.textContent ="Temperature: " + data.main.temp + "F";
        ulEl.appendChild(liEl1);
        var liEl2 = document.createElement("li");
        liEl2.classList.add('list-group-item');
        liEl2.textContent ="Winds: " + data.wind.speed + "MPH";
        ulEl.appendChild(liEl2);
        var liEl3 = document.createElement("li")
        liEl3.classList.add('list-group-item')
        liEl3.textContent ="Humidity: " + data.main.humidity + "%";
        ulEl.appendChild(liEl3);
        document.getElementById('weather-card').append(h2El, ulEl)
    }).catch(error => {
        console.log(error)
    })
}

function fiveDay(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=29253d375da320c72f0c2f2de7d28696&units=imperial`)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        var fiveDayCard =""
        for (var i = 0;i<data.list.length;i=i+8){
            fiveDayCard += `<div class="card" id="weather-card">
            <div class="card-header">${data.list[i].dt}<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" /></div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Temperature:${data.list[i].main.temp}</li>
                <li class="list-group-item">Wind: ${data.list[i].wind.speed}</li>
                <li class="list-group-item">Humidity: ${data.list[i].main.humidity}</li>
            </ul>
        </div>`
        }
        document.getElementById('five-day').innerHTML = fiveDayCard;
    }).catch(error => {
        console.log(error)
    })
}

submitBtn.addEventListener('click', getLatAndLong);

// Server-Side APIs Day 2 - 55min

//also the city name and the dates. //use Dayjs
//local storage for prevoius searches, but buttons have to still work if u press them