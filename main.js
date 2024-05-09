const api = {
  key: "b73397dc4a26f4ac65388432b716a5d0",
  url: "https://api.openweathermap.org/data/2.5/weather",
};

let card = document.getElementById("card");

const city = document.getElementById("city");
const date = document.getElementById("date");
const tempImg = document.getElementById("temp-img");
const temp = document.getElementById("temp");
const weather = document.getElementById("weather");
const range = document.getElementById("range");

function updateImages(data) {
  console.log(data);
  const temp = toCelcius(data.main.temp);
  let src = "img/temperatura.png";
  if (temp > 26) {
    src = "img/temperatura-alta.png";
    card.style.background = "img/sun.png";
  } else if (data.weather[0].description == "muy nuboso") {
    src = "img/tormenta.png";
  } else if (temp < 20) {
    src = "img/temperatura-baja.png";
  }
  tempImg.src = src;
}

async function search(query) {
  try {
    const response = await fetch(
      `${api.url}?q=${query}&appid=${api.key}&lang=es`
    );
    const data = await response.json();
    card.style.display = "block";
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    date.innerHTML = new Date().toLocaleDateString();
    temp.innerHTML = `${toCelcius(data.main.temp)}°`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelcius(data.main.temp_min)}° / ${toCelcius(
      data.main.temp_max
    )}°`;
    updateImages(data);
  } catch (err) {
    console.log(err);
    alert("Hubo un error, a ingresado mal el nombre");
  }
}

function toCelcius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
  event.preventDefault();
  search(searchbox.value);
}

const botonDark = document.getElementById("modeDark");
const form = document.getElementById("search-form");
const searchbox = document.getElementById("searchbox");
form.addEventListener("submit", onSubmit, true);

document
  .getElementById("toggle-colors")
  .addEventListener("click", toggleColors);

function toggleColors() {
  const searchbox = document.getElementById("searchbox");
  const title = document.querySelector("h1");
  const isInverted = searchbox.classList.contains("inverted"); // Verifica si ya está invertido

  if (isInverted) {
    // Regresar a los colores originales
    searchbox.classList.remove("inverted");
    searchbox.style.backgroundColor = "#2C2C2C"; // fondo oscuro
    searchbox.style.color = "#7DF9FF"; // Texto azul electrico
    searchbox.style.border = "2px solid #F3F6F5"; // Borde original

    title.style.color = "#1E90FF"; //texto claro
  } else {
    // Invertir colores
    searchbox.classList.add("inverted");
    searchbox.style.backgroundColor = "#F3F6F5"; // Fondo claro
    searchbox.style.color = "#2C2C2C"; // Texto oscuro
    searchbox.style.border = "2px solid #2C2C2C"; // Borde para el modo invertido

    title.style.color = "#F3F6F5";
  }
}
