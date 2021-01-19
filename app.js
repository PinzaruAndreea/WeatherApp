const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
    const {cityDets, weather} = data;

    details.innerHTML = `
    <h5 class="title">${cityDets.EnglishName}</h5>
    <div class="title">${weather.WeatherText}</div>
    <div class= "title temp">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg" ;

    time.setAttribute("src", timeSrc);

    if(card.classList.contains("card")) {
        card.classList.remove("card");
    }
};

cityForm.addEventListener("submit", e=> {
    e.preventDefault();

    const city= cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));


    localStorage.setItem("city", city);
});


if(localStorage.getItem("city")) {
    forecast.updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
};