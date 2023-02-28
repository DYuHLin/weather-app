const weatherLocation = document.getElementById("location");
const toggleTemp = document.getElementById("tempTrigger");
//This is the API info, where we get the weather information

let isChecked = false;

const apiKey = "fcf8fbcfdc9406912f7278337b6189e2";

//Async function to retrieve the data
const weatherInfo = async (location_weather) => {
    const fetchInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location_weather}&appid=${apiKey}`, {mode: "cors"});
    const responseInfo = await fetchInfo.json();
    console.log(responseInfo);

    showInUi(responseInfo);
};

weatherInfo("London");

//shows the results in the UI
const showInUi = (info) => {
    const weatherCard = document.getElementById("card");
    const main = document.getElementById("main");
    weatherCard.innerHTML = "";

    const tempInC = kelvinToCel(info.main.temp);
    const feelsLike = kelvinToCel(info.main.feels_like);
    const humidity = info.main.humidity;
    const windSpeed = info.wind.speed;
    const minTemp = kelvinToCel(info.main.temp_min);
    const maxTemp = kelvinToCel(info.main.temp_max);
    const city = info.name;
    const desc = info.weather[0].main;

    //toggle switches the temp
    toggleTemp.addEventListener('change', () => {
        //for F
        if(toggleTemp.checked){
            weatherCard.innerHTML = "";
            isChecked = true;
            let tempInF = CeltoFer(tempInC);
            let feelsF = CeltoFer(feelsLike);
            let minF = CeltoFer(minTemp);
            let maxF = CeltoFer(maxTemp);
            let weatherAllF = `<div class="city_name">${city}</div>
                        <div class="temp">
                        <div class="num">
                        ${tempInF}°F
                        </div>
                        <img src="https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png" alt="${desc}">
                        </div>
                        <div class="feel">${desc}</div>
                        <div class="extra">
                            <div class="feels_like">Feels like: ${feelsF}°F</div>
                            <div class="humidity">Humidity levels: ${humidity}%</div>
                            <div class="wind">Wind: ${windSpeed}km</div>
                            <div class = "min-max"> 
                                <div class="min">Min: ${minF}°F</div>
                                <div class="max">Max: ${maxF}°F</div>
                            </div>
                        </div>`;

            weatherCard.innerHTML = weatherAllF;
            //For C
        } else{
            weatherCard.innerHTML = "";
            isChecked = false;
            let weatherAll = `<div class="city_name">${city}</div>
                        <div class="temp">
                        <div class="num">
                        ${tempInC}°C
                        </div>
                        <img src="https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png" alt="${desc}">
                        </div>
                        <div class="feel">${desc}</div>
                        <div class="extra">
                            <div class="feels_like">Feels like: ${feelsLike}°C</div>
                            <div class="humidity">Humidity levels: ${humidity}%</div>
                            <div class="wind">Wind: ${windSpeed}km</div>
                            <div class = "min-max"> 
                                <div class="min">Min: ${minTemp}°C</div>
                                <div class="max">Max: ${maxTemp}°C</div>
                            </div>
                        </div>`;

                        weatherCard.innerHTML = weatherAll;
        };
    });
    
    let weatherAll = `<div class="city_name">${city}</div>
                        <div class="temp">
                        <div class="num">
                        ${tempInC}°C
                        </div>
                        <img src="https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png" alt="${desc}">
                        </div>
                        <div class="feel">${desc}</div>
                        <div class="extra">
                            <div class="feels_like">Feels like: ${feelsLike}°C</div>
                            <div class="humidity">Humidity levels: ${humidity}%</div>
                            <div class="wind">Wind: ${windSpeed}km</div>
                            <div class = "min-max"> 
                                <div class="min">Min: ${minTemp}°C</div>
                                <div class="max">Max: ${maxTemp}°C</div>
                            </div>
                        </div>`;

    if(info.weather[0].description === "broken clouds" || info.weather[0].description === "few clouds" || info.weather[0].description === "scattered clouds" || info.weather[0].description === "overcast clouds"){
        main.style.background = "linear-gradient(to right, rgba(57, 76, 99, 0.8), rgba(60, 114, 136, 0.8))";
    } else if(info.weather[0].description === "clear sky"){
        main.style.background = "linear-gradient(to right, rgba(19, 118, 240, 0.8), rgba(46, 191, 248, 0.8))";
        if(info.weather[0].description === "clear sky" && tempInC >= 25){
            main.style.background = "linear-gradient(to right, rgba(161, 77, 21, 0.8), rgba(235, 146, 14, 0.8))";
        };
    } else if(info.weather[0].description === "shower rain" || info.weather[0].description === "rain" || info.weather[0].description === "thunderstorm") {
        main.style.background = "linear-gradient(to right, rgba(19, 70, 133, 0.8), rgba(13, 115, 155, 0.8))";
    } else if(info.weather[0].description === "mist"){
        main.style.background = "linear-gradient(to right, rgba(68, 77, 88, 0.8), rgba(129, 149, 156, 0.8))";
    } else if(info.weather[0].description === "snow"){
        main.style.background = "linear-gradient(to right, rgba(99, 101, 104, 0.8), rgba(190, 193, 194, 0.8))";
    }; 

    weatherCard.innerHTML = weatherAll;

};

//gets the weather info with search 
weatherLocation.addEventListener("submit", (e) => {
    e.preventDefault();

    const weatherText = document.getElementById("weather-text");
    let weatherLocationInfo = weatherText.value;
    weatherInfo(weatherLocationInfo);
    weatherText.value = "";
});

//converts kelvin to celsius
const kelvinToCel = (num) => {
    return (num - 273.15).toFixed(2);
};

//converts celsius to Farenheit
const CeltoFer = (num) => {
    return ((num *1.8) + 32).toFixed(2);
};