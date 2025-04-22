let isCelsius = true; // Default to Celsius
const apiKey = 'd83d437d78d7a1351d5aaf247da60395'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Current weather endpoint
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // 5-day forecast endpoint

const submitBtn = document.getElementById('submit-btn');
const locationInput = document.getElementById('location-input');
const weatherDisplay = document.getElementById('weather-display');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');
const forecastDiv = document.getElementById('forecast');
const unitToggleBtn = document.getElementById('unit-toggle-btn');
const searchHistoryDiv = document.getElementById('search-history');
const loadingSpinner = document.getElementById('loading-spinner');
const darkModeToggle = document.getElementById('dark-mode-toggle');

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

submitBtn.addEventListener('click', getWeather);
unitToggleBtn.addEventListener('click', toggleTemperatureUnit);
darkModeToggle.addEventListener('click', toggleDarkMode);
document.getElementById('geolocation-btn').addEventListener('click', getWeatherByGeoLocation);

// Load search history on page load
displaySearchHistory();

function getWeather() {
  const location = locationInput.value.trim();

  if (!location) {
    alert('Please enter a location');
    return;
  }

  showLoadingSpinner();

  // Fetch current weather
  fetch(`${apiUrl}?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(currentData => {
      if (currentData.cod === 200) {
        displayWeather(currentData);
        saveSearchHistory(location);
        displaySearchHistory();

        // Now fetch forecast using same location
        return fetch(`${forecastApiUrl}?q=${location}&appid=${apiKey}&units=metric`);
      } else {
        hideLoadingSpinner();
        showError(currentData.message);
        throw new Error(currentData.message);
      }
    })
    .then(response => response.json())
    .then(forecastData => {
      if (forecastData.cod === "200") {
        displayForecast(forecastData);
      } else {
        showError(forecastData.message);
      }
    })
    .catch(error => {
      hideLoadingSpinner();
      showError('Failed to fetch weather data. Please check your connection.');
      console.error(error);
    });
}

function getWeatherByGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      showLoadingSpinner();

      try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === "200") {
          displayWeather(data);
          displayForecast(data);
        } else {
          showError(data.message);
        }
      } catch (error) {
        showError('Failed to fetch weather data. Please check your connection.');
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  locationName.textContent = `${name}, ${data.sys.country}`;
  temperature.textContent = `${main.temp}°C`;
  description.textContent = weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  weatherDisplay.style.display = 'block';
  errorMessage.style.display = 'none';
}

function displayForecast(data) {
  forecastDiv.innerHTML = "<h3>5-Day Forecast</h3>";
  const filtered = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  filtered.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    forecastDiv.innerHTML += `
      <div class="forecast-item">
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="icon">
        <p>${item.main.temp}°C</p>
        <p>${item.weather[0].description}</p>
      </div>
    `;
  });

  forecastDiv.style.display = 'block';
}

function toggleTemperatureUnit() {
  isCelsius = !isCelsius;
  if (isCelsius) {
    temperature.textContent = `${(parseFloat(temperature.textContent) - 32) * (5 / 9)}°C`;
    unitToggleBtn.textContent = 'Switch to Fahrenheit';
  } else {
    temperature.textContent = `${(parseFloat(temperature.textContent) * 9 / 5) + 32}°F`;
    unitToggleBtn.textContent = 'Switch to Celsius';
  }
}

function showLoadingSpinner() {
  loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
  loadingSpinner.style.display = 'none';
}

function showError(message) {
  weatherDisplay.style.display = 'none';
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
}

function saveSearchHistory(location) {
  if (searchHistory.length >= 5) {
    searchHistory.shift(); // Remove the oldest entry
  }
  searchHistory.push(location);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function displaySearchHistory() {
  searchHistoryDiv.innerHTML = "<h3>Search History</h3>";
  searchHistory.forEach(location => {
    searchHistoryDiv.innerHTML += `<p>${location}</p>`;
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
