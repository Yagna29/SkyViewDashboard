const search_input = document.querySelector('.search-input');
const searchBtn = document.getElementById('search-btn');
const weatherBody = document.querySelector('.weather-body');
const description = document.querySelector('.desc');
const humidity = document.getElementById('humid');
const temp = document.querySelector('.temp');
const feels_like = document.getElementById('feels_like');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const image = document.querySelector('.image');
const location_not_found = document.querySelector('.location-not-found');
const location_image = document.querySelector('.not-found-img');
const sunrise = document.querySelector('.sunrise-time');
const sunset = document.querySelector('.sunset-time');

function getFormattedDate(date_obj) {
    let formattedDate = date_obj.toDateString();
    return formattedDate;

}

function getFormattedTime(date_obj) {
    let formattedTime =  date_obj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return formattedTime;

}

async function weatherData(city) {

    const api = "cfd028f9cbe570467354f9584ad644d6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    let weather_data = await fetch(`${url}`);
    console.log("weather data", weather_data);
    let data = await weather_data.json();
    console.log("data", data)

    if(data.cod === '400' || data.cod === '404'){
        weatherBody.style.display = "none";
        location_not_found.style.display = "flex";
        location_image.src = "404.png";
        console.log("location not found");
        return ;
    }else{
        location_not_found.style.display = "none";
        weatherBody.style.display = "flex";
        let weatherIcon = data.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; 
        image.src = iconUrl;
        temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
        description.innerHTML = `${data.weather[0].description}`;
        let date_obj = new Date(data.dt * 1000);
        let formattedDate = getFormattedDate(date_obj);
        console.log("formatted date", formattedDate);
        date.innerHTML = `${formattedDate}`;
        let formattedTime = getFormattedTime(date_obj);
        console.log("time ", formattedTime);
        time.innerHTML = `${formattedTime}`;
        feels_like.innerHTML = `${Math.round(data.main.feels_like - 273.15)}°C`;
        humidity.innerHTML = `${data.main.humidity}%`;
        let sunrise_obj = new Date(data.sys.sunrise * 1000);
        let sunrise_time = getFormattedTime(sunrise_obj);
        console.log("sunrise", sunrise_time);
        sunrise.innerHTML = `${sunrise_time}`;
        let sunset_obj = new Date(data.sys.sunset * 1000);
        let sunset_time = getFormattedTime(sunset_obj);
        console.log("sunset", sunset_time);
        sunset.innerHTML = `${sunset_time}`;
    }

}

searchBtn.addEventListener('click', () => {
    weatherData(search_input.value);
});
