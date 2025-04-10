apiKey="f4f9ca3b87734b4b182b257e2ca0654f"
apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q="
// https://home.openweathermap.org/api_keys

const searchBox=document.querySelector(".search input")
const searchBtn=document.querySelector(".search button")

async function CheckWeather(city) {
     
    city = city.trim(); // Remove extra spaces

    // ✅ IF INPUT IS EMPTY: Show error briefly & stop
    if (city === "") {
        const errorDiv = document.querySelector(".error");
        const weatherDiv = document.querySelector(".weather");

        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";

        setTimeout(() => {
            errorDiv.style.display = "none";
        }, 2000);

        return; // ❌ Stop here, no API call
    }
    
    
    const response =  await fetch(apiUrl+city+`&appid=${apiKey}`)
    if(response.status==404){
        document.querySelector('.error').style.display ="block"
        document.querySelector('.weather').style.display ="none"
        setTimeout(() => {
            document.querySelector('.error').style.display = "none";
            searchBox.value = "";
            }, 3000);


    }
   
    var data = await response.json();
    console.log(data)
    console.log(data.name)
    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp)+"°C"
    document.querySelector('.humidity').innerHTML = data.main.humidity+"%"
    document.querySelector('.wind').innerHTML = data.wind.speed+"km/h"
    document.querySelector('.weat').innerHTML= data.weather[0].main;
 
    
    if(data.weather[0].main=="Clouds"){
        document.querySelector('.weather-icon').src="images/clouds.png";
    

    }else if (data.weather[0].main=="Clear"){
        document.querySelector('.weather-icon').src="images/clear.png";
        

    }else if (data.weather[0].main=="Rain"){
        document.querySelector('.weather-icon').src="images/Rain.png";
       

    }else if (data.weather[0].main=="Drizzle"){
        document.querySelector('.weather-icon').src="images/drizzle.png";
    }else if (data.weather[0].main=="Mist"){
        document.querySelector('.weather-icon').src="images/mist.png";
    }
    
    document.querySelector('.weather').style.display ="block"
       document.querySelector('.error').style.display ="none"
}
searchBtn.addEventListener("click",()=>{
    CheckWeather(searchBox.value);
})
