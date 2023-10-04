

//if (city in weather) {
//  let celsiusTemp =  Math.round(weather[city].temp);
//  let ferenheitTemp = Math.round(celsiusTemp * 1.8) + 32;
function dateDisplay (today){
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "saturday"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let time = [`${today.getHours()}:${today.getMinutes()}`];
return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} 
<br /> ${time}`;
}

let date = document.querySelector(".date");
date.innerHTML = dateDisplay(new Date ());

function changeCelsius(response){ 
  document.querySelector("#city-displayed").innerHTML = response.data.name; //summarises the lines of code in displayCity funct.
  let newTemp = document.querySelector(".temp");
 let displayedTemperature = Math.round(response.data.main.temp);
 newTemp.innerHTML = `${displayedTemperature}&degC`;  //can summarise by saying document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp)

 let conditions = document.querySelector("#conditions");
 conditions.innerHTML = (response.data.weather[0].main);  //can summarise: document.querySelector("#conditions").innerHtML = response.data.weather[0].main

 let humidity = document.querySelector("#humidity");
 let writeHumidity = response.data.main.humidity
 humidity.innerHTML = `${writeHumidity}%`;

 let windspeed = document.querySelector("#winds");
 windspeed.innerHTML = Math.round(response.data.wind.speed);  //summarised: document.querySelector("#winds").innerHTML = Math.round(response.data.wind.speed)

 //JSON doesnt have precipitation option
}

function displayCity(event) {
 event.preventDefault();
  /*let cityInput = document.querySelector("#city-input");
  let cityOutput = document.querySelector("#city-displayed");
  let city = cityOutput.innerHTML; 
 cityOutput.innerHTML = (cityInput.value);*/
 //instead of the above we can just write
let city = document.querySelector("#city-input").value //then summarise the above code in the changeCelsius function
 
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873"
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`
axios.get(url).then(changeCelsius);
}

let selectedCity = document.querySelector("form");
selectedCity.addEventListener("submit", displayCity);



//bonus challenge

function getCoords(position) {
  let lat = (position.coords.latitude);
  let longi = (position.coords.longitude);
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873"
let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${apiKey}&&units=metric`
axios.get(geoUrl).then(function (response) {
    let cityName = response.data.name;
    document.querySelector("#city-displayed").innerHTML = cityName;
    changeCelsius(response);
  });
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}


let cityByCoords = document.querySelector("#current-button");
cityByCoords.addEventListener("click", getCurrentLocation);


/**function changeFerenheit(){
  let newTemp = document.querySelector(".temp");
  newTemp.innerHTML = 82;
}*/



//axios.get(url).then(changeCelsius)

/*let celsiusSelect = document.querySelector("#celcius");
let ferenheitSelect = document.querySelector("#ferenheit");


celsiusSelect.addEventListener("click", changeCelsius);
ferenheitSelect.addEventListener("click",changeFerenheit);*/