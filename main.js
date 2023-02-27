const weatherLocation = document.getElementById("location");
//This is the API info, where we get the weather information
const apiKey = "fcf8fbcfdc9406912f7278337b6189e2";

//Async function to retrieve the data
const weatherInfo = async (location_weather) => {
    const fetchInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location_weather}&appid=${apiKey}`, {mode: "cors"});
    const responseInfo = await fetchInfo.json();
    console.log(responseInfo);
};

weatherInfo("London");

weatherLocation.addEventListener("submit", (e) => {
    e.preventDefault();

    const weatherText = document.getElementById("weather-text");
    let weatherLocationInfo = weatherText.value;
    weatherInfo(weatherLocationInfo);
    weatherText.value = "";
});