const app = document.querySelector('.weather-app');
const temp = document.querySelector('#temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const humadityOutput = document.querySelector('.humadity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const cityName = document.getElementById('name');
const humidityOutput = document.getElementById('humidity');
const cloudOutput = document.getElementById('cloud');
const iconWeather = document.getElementById('icon-weather');
let cityInput = "Ижевск";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        console.log(e.target.textContent);
        cityInput = e.target.textContent;
        fetchWeatherData();
        app.style.opasity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Введите название города');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const date = new Date(`${year}-${month}-${day}`);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('ru-RU', options);
};


function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=ce06abfb1516447da1b172157231912&q=${cityInput}`, {
        method: "post",
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);

                temp.innerHTML = data.current.temp_c + "&#176;"
                conditionOutput.innerHTML = data.current.condition.text;

                const date = data.location.localtime;
                const y = parseInt(date.substr(0, 4));
                const m = parseInt(date.substr(5, 2));
                const d = parseInt(date.substr(8, 2));
                const time = date.split(' ')[1];
                //const time = date.substr(11);

                dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)}`
                cityName.textContent = data.location.name;
                timeOutput.innerHTML = time;

                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                //console.log(data.current.humidity)
                windOutput.innerHTML = data.current.wind_kph + "км/ч";

                let timeOfDay = "day";

                const code = data.current.condition.code;

                if (!data.current.is_day) {
                    timeOfDay = "night";
                }

                const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/".length).split('/')[2];
                iconWeather.src = `./icons/${timeOfDay}/` + iconId;


                if (code == 1000) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

                    btn.style.background = "#e5ba92";
                    if (timeOfDay == "night") {
                        btn.style.background = "#181e27";
                    }
                }
                else if (
                    code == 1003 ||
                    code == 1006 ||
                    code == 1009 ||
                    code == 1030 ||
                    code == 1069 ||
                    code == 1087 ||
                    code == 1135 ||
                    code == 1273 ||
                    code == 1276 ||
                    code == 1279 ||
                    code == 1282

                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                    btn.style.background = "#fa6d1b";
                    if (timeOfDay == "night") {
                        btn.style.background = "#181e27";
                    }

                } else if (
                    code == 1063 ||
                    code == 1069 ||
                    code == 1072 ||
                    code == 1150 ||
                    code == 1153 ||
                    code == 1180 ||
                    code == 1183 ||
                    code == 1186 ||
                    code == 1189 ||
                    code == 1192 ||
                    code == 1195 ||
                    code == 1204 ||
                    code == 1207 ||
                    code == 1240 ||
                    code == 1243 ||
                    code == 1246 ||
                    code == 1249 ||
                    code == 1252
                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                    btn.style.background = "#647d75";
                    if (timeOfDay == "night") {
                        btn.style.background = "#325c80";
                    }

                } else {
                    app.style.backgroundImage =
                        `url(./images/${timeOfDay}/snowy.jpg)`;
                    btn.style.background = "4d72aa";
                    if (timeOfDay == "night") {
                        btn.style.background = "#1b1b1b";
                    }
                }
                app.style.opacity = "1";
            }
        })

        .catch((e) => {
            console.log(e);
            //alert('Город не найден, попробуйте снова');
            //app.style.opacity = "1";
        });

}

fetchWeatherData();
//app.style.opacity = "1";
