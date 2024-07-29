// API KEY 696646672dc39fefaf604c403e03813a

const weatherForm = document.getElementById('cityForm')
const searchCity = document.getElementById('searchCity')
const currentWeather = document.getElementById('currentWeather')

function getWeather(city) {

    currentWeather.innerHTML = ""

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'696646672dc39fefaf604c403e03813a&units=imperial'}`)
    
    .then (function (res){
        console.log(res)
        return res.json()
    }) 
    .then (function (data){
        console.log(data)
        console.table(data.main)
    
    // data.main.temp
    // Creating each dynamic HTML element to store API data
    const cityHeading = document.createElement('h2')
    const cityTemp = document.createElement('p')
    const cityWind = document.createElement('p')
    const cityHumidity = document.createElement('p')
    const weatherImage = document.createElement('img')

    // Populating created elements with API sourced data
    cityHeading.textContent = data.name
    cityTemp.textContent = "Temperature:"+data.main.temp+"°F"
    cityWind.textContent = "Wind Speed:"+data.wind.speed+"Mph"
    cityHumidity.textContent = "Humidity:"+data.main.humidity+"%"
    weatherImage.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) 
    
    // Appending data to created elements
    currentWeather.append(cityHeading)
    currentWeather.append(weatherImage)
    currentWeather.append(cityTemp)
    currentWeather.append(cityWind)
    currentWeather.append(cityHumidity)
    


    })
    console.log(city)
}

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault() 
    getWeather(searchCity.value)
} )


