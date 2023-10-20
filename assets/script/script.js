var apiKey = '29253d375da320c72f0c2f2de7d28696';
var apiURL = 'https://api.openweathermap.org/data/2.5/weather';
var latLongUrl = 'https://api.openweathermap.org/geo/1.0/direct';
var submitBtn = document.getElementById('submit-button');
var cityInput = document.getElementById('city-input');
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var historyEl = document.getElementById('history-buttons');

function getLatAndLong(event) {
    event.preventDefault();
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}'&appid=${apiKey}`)
        .then(response => {
            return response.json();
        }).then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
            fiveDay(cityInput.value);
        }).catch(error => {
            console.log(error)
        })
}

//gets the actual weather of a city
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=imperial`)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log(data)
            //search history process
            if (!searchHistory.includes(data.name)) {
                searchHistory.push(data.name);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                //search history buttons
                var historyBtn = document.createElement('button');
                historyBtn.classList.add('list-group-item', 'list-group-item-action');
                historyBtn.textContent = data.name;
                historyBtn.setAttribute('data-search-term', searchHistory);
                historyEl.appendChild(historyBtn);
            }

            //main card
            var dayCard = document.getElementById('weather-card');
            dayCard.innerHTML = "";
            var h2El = document.createElement("h2");
            h2El.classList.add("card-header");
            h2El.textContent = data.name;
            var todayDate = dayjs().format(' (MM/DD/YYYY)');
            h2El.append(todayDate);
            var imgTag = document.createElement('img');
            imgTag.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            h2El.append(imgTag);
            var ulEl = document.createElement("ul");
            ulEl.classList.add("list-group", "list-group-flush");
            var liEl1 = document.createElement("li");
            liEl1.classList.add('list-group-item');
            liEl1.textContent = "Temperature: " + data.main.temp + "F";
            ulEl.appendChild(liEl1);
            var liEl2 = document.createElement("li");
            liEl2.classList.add('list-group-item');
            liEl2.textContent = "Winds: " + data.wind.speed + "MPH";
            ulEl.appendChild(liEl2);
            var liEl3 = document.createElement("li")
            liEl3.classList.add('list-group-item')
            liEl3.textContent = "Humidity: " + data.main.humidity + "%";
            ulEl.appendChild(liEl3);
            dayCard.append(h2El, ulEl);
        }).catch(error => {
            console.log(error)
        })
}

function fiveDay(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log(data)
            //five day cards
            var fiveDayCard = "";
            for (var i = 0; i < data.list.length; i = i + 8) {
                fiveDayCard += `<div class="card col" id="weather-card">
            <div id="cards" class="card-header">${new Date(data.list[i + 1].dt * 1000).toLocaleDateString()}<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/></div>
            <ul  class="list-group list-group-flush">
                <li class="list-group-items">Temperature:${data.list[i].main.temp}F</li>
                <li class="list-group-items">Wind: ${data.list[i].wind.speed}MPH</li>
                <li class="list-group-items">Humidity: ${data.list[i].main.humidity}%</li>
            </ul>
        </div>`
            }
            document.getElementById('five-day').innerHTML = fiveDayCard;
        }).catch(error => {
            console.log(error)
        })
}

//event listener for main button
submitBtn.addEventListener('click', getLatAndLong);

//event listener for history buttons
historyEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(event.target)
    if (event.target.matches('button')) {
        console.log(event.target.textContent)
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${event.target.textContent}'&appid=${apiKey}`)
            .then(response => {
                return response.json();
            }).then(data => {
                var lat = data[0].lat;
                var lon = data[0].lon;
                getWeather(lat, lon);
                fiveDay(cityInput.value);
            }).catch(error => {
                console.log(error)
            })
    }
});