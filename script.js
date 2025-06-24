document.addEventListener("DOMContentLoaded", () => {
  const locationInput = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");
  const weatherDisplay = document.getElementById("weatherDisplay");
  const errorMessage = document.getElementById("errorMessage");

  const API_KEY = "b0d6af0dbbc5afa9fe3e2ccb82c1939a";
  searchButton.addEventListener("click", () => {
    const city = locationInput.value.trim();
    if (city) {
      getWeatherData(city);
    } else {
      displayError("Please enter a city name.");
    }
  });

  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

  async function getWeatherData(city) {
    clearDisplay();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        displayWeatherData(data);
      } else {
        displayError(data.message || "City not found or invalid request.");
      }
    } catch (error) {
      displayError("Could not fetch weather data. Please try again later.");
      console.error("Error fetching weather:", error);
    }
  }

  function displayWeatherData(data) {
    errorMessage.textContent = "";

    const { name, main, weather, wind } = data;
    const temperature = main.temp;
    const feelsLike = main.feels_like;
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDisplay.innerHTML = `
            <h2>${name}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <p><strong>${capitalizeFirstLetter(description)}</strong></p>
            <p>Temperature: ${temperature}°C</p>
            <p>Feels like: ${feelsLike}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
  }

  function displayError(message) {
    clearDisplay();
    errorMessage.textContent = `Error: ${message}`;
  }

  function clearDisplay() {
    weatherDisplay.innerHTML = "<p>Enter a city to see the weather!</p>";
    errorMessage.textContent = "";
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
