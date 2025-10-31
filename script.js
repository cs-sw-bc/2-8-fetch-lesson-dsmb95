// ----- Static data (used before API call) -----
const weatherData = {
  location: { name: "Mississauga", country: "Canada" },
  current: {
    temperature: 8,
    feelslike: 4,
    humidity: 91,
    weather_descriptions: ["Moderate or heavy rain shower"],
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0010_heavy_rain_showers.png"
    ]
  }
};

// ----- Function to update DOM -----
function displayWeather(data) {
  document.getElementById("cityName").textContent = data.location.name;
  document.getElementById("temperature").textContent = data.current.temperature;
  document.getElementById("feelslike").textContent = data.current.feelslike;
  document.getElementById("humidity").textContent = `${data.current.humidity}%`;
  document.getElementById("weatherDesc").textContent = data.current.weather_descriptions;
  document.getElementById("weatherIcon").src = data.current.weather_icons[0];
}


// ----- Modern way: Fetch API -----
function getWeather() {
  const city = document.getElementById("cityInput").value || "Vancouver";
  const errorMsg = document.getElementById("errorMsg");
  try {
    fetch(`https://api.weatherstack.com/current?access_key=e1dcffa01f3b13bf3bd96c52dd21a6eb&query=${city}`)//send a request
      .then(response => response.json()) //we receive a message from API and unwrap the envelope and give us a JS object using .json()
      .then(data => displayWeather(data)) //the package from the API that is stored in 'response' will be thrown to 'data' where we perform an action on it
      .catch(error => console.log(error)); // We used chaining.
  } catch (error) {
    console.error(error);
    errorMsg.classList.remove("hidden");
  }
}

// ----- (Old way) XMLHttpRequest Example -----
function getWeatherXMLHTTP(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.weatherapi.com/...&q=${city}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayWeather(data);
    } else {
      console.error("Error fetching weather data");
    }
  };
  xhr.send();
}
// NOTE: We won’t call this. It’s just to show the old AJAX technique.