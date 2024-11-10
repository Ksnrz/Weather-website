const apiKey = "004cdacc55afe3fe0a1a09ff70fac516";

async function checkWeather() {
  const searchInput = document.querySelector(".input");
  const cityInput = searchInput.value.trim(); //get value from search input
  // change api url to city input
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${cityInput}`;
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error-handle").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".detail").style.display = "none";
  } else {
    document.querySelector(".error-handle").style.display = "none";
    let data = await response.json();
    console.clear();
    console.log(data);

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + "km/h";

    let weather = data.weather[0].main;
    let description = data.weather[0].description;
    checkWeatherAndChangeIcon(weather, description);
    document.querySelector(".weather").style.display = "initial";
    document.querySelector(".detail").style.display = "flex";
  }
}

const searchInput = document.querySelector(".input");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather();
  }
});

const checkWeatherAndChangeIcon = (weather, description) => {
  let weatherImg = document.querySelector(".weather-icon");
  if (weather === "Rain") {
    weatherImg.src = "/weather icon png/heavy-rain.png";
  } else if (weather === "Clouds") {
    weatherImg.src = "/weather icon png/cloudy.png";
    if (description === "overcast clouds") {
      weatherImg.src = "/weather icon png/clouds.png";
    }
  }
};
