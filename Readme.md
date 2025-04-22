Weather Application
Description
This is a web-based weather application that allows users to check current weather conditions for any location. The application uses the OpenWeatherMap API to fetch weather data and display it in an interactive and user-friendly interface.

Features:
Current Weather: Displays the current weather conditions including temperature (Celsius/Fahrenheit), weather description (e.g., Sunny, Cloudy), and an icon.

5-Day Forecast: Provides a 5-day weather forecast showing temperature, weather description, and an icon.

Temperature Unit Toggle: Switch between Celsius and Fahrenheit for temperature display.

Geo-Location: Get the weather for your current location automatically.

Background Image: The background changes dynamically based on the weather conditions (e.g., sunny, cloudy, rainy).

Search History: Keeps track of the last 5 searched locations and displays them.

Dark Mode: Toggle between dark and light modes for a more comfortable viewing experience.

Technologies Used
HTML: For the structure of the application.

CSS: For styling and responsive design.

JavaScript: For handling the user interactions and making API requests to fetch weather data.

OpenWeatherMap API: Used to fetch weather data for the given location.

LocalStorage: To store search history locally.

How to Use
Enter a Location: Type the name of a city or location in the input field and click "Get Weather" to retrieve the weather information.

Get Weather for My Location: Click the "Get Weather for My Location" button to get the weather for your current location using Geo-Location.

Toggle Temperature Unit: Use the "Switch to Fahrenheit" button to toggle between Celsius and Fahrenheit.

5-Day Forecast: The 5-day forecast will appear below the current weather when available.

Dark Mode: Toggle between dark and light mode using the "Switch to Dark Mode" button.

View Search History: The last 5 locations you searched for will be displayed in the "Search History" section.

API Used
This application uses the OpenWeatherMap API to fetch weather data.

OpenWeatherMap API Details:
API URL: https://api.openweathermap.org/data/2.5/weather

API Key: You need to sign up at OpenWeatherMap to get a free API key.

Documentation: OpenWeatherMap API Documentation

How to Get API Key:
Sign up at OpenWeatherMap.

Go to the API Keys section in your account settings.

Copy your API key and replace YOUR_OPENWEATHERMAP_API_KEY in the script.js file.
