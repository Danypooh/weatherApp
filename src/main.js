import './style.css';

window.onload = getCityWeather();

const input = document.getElementById('search');
input.addEventListener('keyup', ({key}) => {
  if (key === 'Enter') {
    getCityWeather(input.value);
    input.value = '';
  }
});

const condition = document.getElementById('condition');
const location = document.getElementById('location');
const degrees = document.getElementById('degrees');
const feels = document.getElementById('feels');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');

async function getCityWeather(city='puebla') {
  try {
    const key = '9569bc956919481cada175155231108';
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    const response = await fetch(url, { mode: 'cors' });
    const cityData = await response.json();
    const newData = processData(cityData);
    displayData(newData);
  } catch (error) {
    console.log(error);
  }
}

function processData(cityData) {
  const myData = {
    condition: cityData.current.condition.text.toUpperCase(),
    location: cityData.location.name.toUpperCase(),
    country: cityData.location.country.toUpperCase(),
    temperature: cityData.current.temp_c,
    feelsLike: cityData.current.feelslike_c,
    wind: cityData.current.wind_kph,
    humidity: cityData.current.humidity,
  };
  return myData;
}

function displayData(newData) {
  condition.textContent = newData.condition;
  location.textContent = `${newData.location}, ${newData.country}`;
  degrees.textContent = newData.temperature;
  feels.textContent = `FEELS LIKE: ${newData.feelsLike}`;
  wind.textContent = `WIND: ${newData.wind}`;
  humidity.textContent = `HUMIDITY: ${newData.humidity}`;
}
