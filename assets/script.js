const weatherForm = document.getElementById("cityForm");
const searchCity = document.getElementById("searchCity");
const currentWeather = document.getElementById("currentWeather");
const fiveDayWeather = document.getElementById("fiveDayWeather");

function getWeather(city) {
  currentWeather.innerHTML = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"696646672dc39fefaf604c403e03813a&units=imperial"}`
  )
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      console.table(data.main);

      // Creating each dynamic HTML element to store API data
      const cityHeading = document.createElement("h2");
      const cityDate = document.createElement("h3")
      const cityTemp = document.createElement("p");
      const cityWind = document.createElement("p");
      const cityHumidity = document.createElement("p");
      const weatherImage = document.createElement("img");

      // Populating created elements with API sourced data
      cityHeading.textContent = data.name;
      cityDate.textContent = new Date(data.dt*1000).toLocaleDateString()
      cityTemp.textContent = "Temperature: " + data.main.temp + "°F";
      cityWind.textContent = "Wind Speed: " + data.wind.speed + " mph";
      cityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      weatherImage.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );

      // Appending data to created elements
      currentWeather.append(cityHeading);
      currentWeather.append(cityDate);
      currentWeather.append(weatherImage);
      currentWeather.append(cityTemp);
      currentWeather.append(cityWind);
      currentWeather.append(cityHumidity);
    });

  // 5 Day Weather Forcast
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${"696646672dc39fefaf604c403e03813a&units=imperial"}`
  )
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      console.table(data.main);
      
      for (let index = 0; index < 5; index++) {
        const weatherDay = data.list[index*8];
        console.log(weatherDay)
        
        const weatherCard = document.createElement("div")
        const weatherDate = document.createElement("h4")
        const weatherIcon = document.createElement("img")
        const weatherTemp = document.createElement("p")
        const weatherWind = document.createElement("p")
        const weatherHumid = document.createElement("p")

        weatherDate.textContent = new Date(weatherDay.dt*1000).toLocaleDateString()
        weatherIcon.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@2x.png`
        );
        weatherTemp.textContent = "Temperature: " + weatherDay.main.temp + "°F";
        weatherWind.textContent = "Wind Speed: " + weatherDay.wind.speed + " mph";
        weatherHumid.textContent = "Humidity: " + weatherDay.main.humidity + "%";
        
        weatherCard.append(weatherDate);
        weatherCard.append(weatherIcon);
        weatherCard.append(weatherTemp);
        weatherCard.append(weatherWind);
        weatherCard.append(weatherHumid);
        fiveDayWeather.append(weatherCard);
      }
    });

  console.log(city);
}

weatherForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getWeather(searchCity.value);
});
