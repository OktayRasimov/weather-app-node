const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);

let mainTemp = document.querySelector("[data-main-temp]");

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
  mainTemp.textContent = place;
}

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
