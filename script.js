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
  document.getElementById("cityName").textContent = "Your city";
  document.getElementById("temperature").textContent = `8°C`;
  document.getElementById("feelslike").textContent = `6°C`;
  document.getElementById("humidity").textContent = `90%`;
  document.getElementById("weatherDesc").textContent = `Moderate rain`;
  document.getElementById("weatherIcon").src = "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0010_heavy_rain_showers.png";
}


// ----- Modern way: Fetch API -----
async function getWeather() {
  const city = document.getElementById("cityInput").value || "Mississauga";
  const errorMsg = document.getElementById("errorMsg");
  try {
    displayData={};
    displayWeather(displayData);
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