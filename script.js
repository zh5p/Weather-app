const apiKey = "db438b091d813b830a6cc8bcd7a25cdf"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && cityInput.value.trim() !== "") {
    getWeather(cityInput.value.trim());
  }
});

async function getWeather(city) {
  weatherResult.innerHTML = `<div class="welcome-msg"><i class="fa-solid fa-spinner fa-spin fa-3x"></i><p>Fetching data...</p></div>`;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found. Please check the name.");

    const data = await response.json();
    
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
      <div class="city-name">${data.name}, ${data.sys.country}</div>
      <div class="date">${currentDate}</div>
      
      <div class="temp-icon-box">
        <img src="${iconUrl}" alt="Weather Icon">
        <div class="temperature">${Math.round(data.main.temp)}°C</div>
      </div>
      
      <div class="description">${data.weather[0].description}</div>
      
      <div class="details-grid">
        <div><i class="fa-solid fa-temperature-half"></i> Min/Max: ${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°</div>
        <div><i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%</div>
        <div><i class="fa-solid fa-wind"></i> Wind: ${data.wind.speed} m/s</div>
        <div><i class="fa-solid fa-gauge"></i> Pressure: ${data.main.pressure} hPa</div>
      </div>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<div class="welcome-msg" style="color:#ff6b6b;"><i class="fa-solid fa-circle-exclamation fa-2x"></i><p>${error.message}</p></div>`;
  }
}