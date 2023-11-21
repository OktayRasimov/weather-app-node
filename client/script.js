const searchElement = document.querySelector("[data-city-search]");

let cityName = document.querySelector("[data-city-name]");
let windSpeed = document.querySelector("[data-wind-speed]");
let tempMain = document.querySelector("[data-temp]");
let humidityPerc = document.querySelector("[data-humidity]");
let deleteQuery = document.querySelector("[data-delete-search]");

const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];

  if (place == null) return;

  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  const data = fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/josn",
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setWeatherData(data);
    });
});
function kelvinToCelsiusConverter(temp) {
  const kelvin = 273.15;
  return (c = temp - kelvin);
}

function setWeatherData(data) {
  console.log(data);
  const place = data.name;
  cityName.textContent = place;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  tempMain.textContent = `${kelvinToCelsiusConverter(data.main.temp).toFixed(
    2
  )} °C`;
  console.log(kelvinToCelsiusConverter(data.main.temp));
  humidityPerc.textContent = `${data.main.humidity} %`;
}

deleteQuery.addEventListener("click", () => {
  searchElement.value = "";
});

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
