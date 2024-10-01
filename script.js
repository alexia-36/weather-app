const form = document.querySelector(".form");
const input = document.querySelector(".input");
const card = document.querySelector(".card");


//cheia de la api
const apiKey = "25445fb358ff87bdbb20ae0afe8292fb";




form.addEventListener("submit", async (event) =>{
  event.preventDefault();


  let inputValue = input.value;


  if(!inputValue){
    displayError("Please enter a city");  
    return;
  }else{
    try{
      const weatherData = await getWeatherData(inputValue);
      displayWeatherInfo(weatherData);


      input.value = "";


    }catch(error){
      console.log(error);
      displayError(error);
    }
   
  }


});




async function getWeatherData(city){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 
  const response = await fetch(apiUrl);


  if(!response.ok){
    throw new Error("Could not fetch weather data");
  }
  const data = await response.json();
  return data;
}



function displayWeatherInfo(data){
  const {name: city,
         main: {temp, humidity},
         weather:[{description, id}]} = data;


  card.textContent ="";
  card.style.display = "block";


  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const emoji = document.createElement("p");
 


  cityDisplay.textContent = city;
  tempDisplay.textContent = (temp - 273.15).toFixed(1) +  "  " + "celsius";
  humidityDisplay.textContent = "humidity: " + humidity + "%";
  descriptionDisplay.textContent = description;
  emoji.textContent = getEmoji(id);
  emoji.classList.add("emoji");


  card.append(cityDisplay,tempDisplay,humidityDisplay,descriptionDisplay,emoji)
}



function getEmoji(weatherId){
  switch(true){
    case(weatherId >= 200 && weatherId < 300):
         return "⛈";
    case(weatherId >=300 && weatherId <400):
         return "🌧";
    case(weatherId >=500 && weatherId <600):
         return "🌧";
    case(weatherId >=600 && weatherId <700):
         return "❄";
    case(weatherId >=700 && weatherId <800):
         return "🌫";
    case(weatherId === 800):
         return "🌞";
    case(weatherId >=801 && weatherId <810):
         return "☁";
    default:
         return "⁉";
   
   
    }
  }



function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;


  card.textContent = "";
  card.style.display = "block";
  card.appendChild(errorDisplay);
}

