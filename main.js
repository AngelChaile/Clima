const api = {
    key: 'b73397dc4a26f4ac65388432b716a5d0',
    url: 'http://api.openweathermap.org/data/2.5/weather'
}

const card = document.getElementById('card');

const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImages(data) {
    const temp = toCelcius(data.main.temp);
    let src = 'img/temperatura.png';
    if (temp > 26) {
        src = 'img/temperatura-alta.png';
    } else if(temp < 20){
        src = 'img/temperatura-baja.png';
    }
    tempImg.src = src;
}

async function search(query) {
    try {
       const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
       const data = await response.json();
       card.style.display = 'block';
       city.innerHTML = `${data.name}, ${data.sys.country}`;
       date.innerHTML = (new Date()).toLocaleDateString();
       temp.innerHTML = `${toCelcius(data.main.temp)}°`;
       weather.innerHTML = data.weather[0].description;
       range.innerHTML = `${toCelcius(data.main.temp_min)}° / ${toCelcius(data.main.temp_max)}°`;
       updateImages(data);
    } catch (err) {
        console.log(err);
        alert('hubo un error');
    }
}

function toCelcius(kelvin){
    return Math.round(kelvin - 273.15);
}

function onSubmit(event){
    event.preventDefault();
    search(searchbox.value);
}

const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
form.addEventListener('submit', onSubmit, true);