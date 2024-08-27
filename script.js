const apiKey = "4d835ed8f747006441f822924299dc66";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city){

    const response = await fetch(apiURL + `&q=${city}` + `&appid=${apiKey}`);
    let data = await response.json();
    
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".feelsLike").innerHTML = `${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".wind").innerHTML = `${Math.round((18/5)*data.wind.speed)}km/h`;
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".visibility").innerHTML = `${Math.round(data.visibility/1000)}km`;

    let iconCode = data.weather[0].icon;
    const image = document.querySelector("img.weather-icon");
            
    switch(iconCode) {
        case "01d":
            image.setAttribute('src', 'images/clear.png');
            break;
        case "02d":
        case "03d":
        case "04d":        
            image.setAttribute('src', 'images/clouds.png');
            break;
        case "09d":
            image.setAttribute('src', 'images/drizzle.png');
            break;
        case "10d":
        case "11d": 
            image.setAttribute('src', 'images/rain.png');
            break;
        case "13d":
            image.setAttribute('src', 'images/snow.png');
            break;
        case "14d":
            image.setAttribute('src', 'images/mist.png');
            break;                   
        default:
            image.setAttribute('src', 'images/clear.png');
            break;
    }

    searchBox.value = '';

}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', function(e){
    if (e.keyCode === 13) { // Check if Enter key is pressed
        e.preventDefault();
            checkWeather(searchBox.value);
        }
});
  