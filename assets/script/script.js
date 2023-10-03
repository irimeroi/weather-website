var apiKey = '29253d375da320c72f0c2f2de7d28696';
var apiURL = 'https://api.openweathermap.org/data/2.5/weather';
var latLongUrl = 'http://api.openweathermap.org/geo/1.0/direct'
var submitBtn = document.getElementById('submit-button');
var cityInput = document.getElementById('city-input');


// https://openweathermap.org/api/geocoding-api

function getLatAndLong() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&appid=29253d375da320c72f0c2f2de7d28696')
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&&appid=29253d375da320c72f0c2f2de7d28696')
    .then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}

submitBtn.addEventListener('click', getWeather);

// Server-Side APIs Day 2 - 55min
//store the main information on a card on top,
//and the 5 day forecast at the bottom
//temperature, wind, and humidity, and the icons, 
//also the city name and the dates. //use Dayjs
//local storage for prevoius searches, but buttons have to still work if u press them