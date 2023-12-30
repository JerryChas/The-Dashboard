const weatherContainer = document.querySelector('.weather_container');
let weatherArray = [];

// Hämtar väderrapporter från LS eller renderar ut standardinställningar
weatherArray = JSON.parse(localStorage.getItem('weather')) || [];





//* ----===----===----===----===----=== FUNKTIONER ===----===----===----===----===---- *//

//* ----=== Funktioner för att FORMATERA: (dagar,datum och tid)
// Funktion för att formatera tid (HH:MM)
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Funktion för att formatera datum (YYYY-MM-DD)
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Funktion för att hämta veckodagen (morgondagen som "Tomorrow" och övriga med riktiga namn)
function getDayName(date) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayOfWeek = date.getDay();
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  }
}
//* ----===----===---- *//

//* ----=== ÖPPNAR MODAL SOM VISAR FULL VÄDERPROGNOS
function openFullWeatherModal(index) {
  toggleModalPopup()

  const location = weatherArray[index].location
  fetchJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5`)
  .then((fullForecast) => {
    console.log(fullForecast);

    // Hämtar modal
    const modalPopupContent = document.querySelector('.modal-popup_content');

    // Renderar innehåll i modal
modalPopupContent.innerHTML = `
<h2>${weatherArray[index].name}</h2>
<div class="full-forecast-info_div">
  <div>
    <h3>Hours</h3>
    <ul>
      ${fullForecast.list.slice(0, 8).map(hourlyData => `
        <li>
        <img src="https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png" alt="${hourlyData.weather[0].description}">
        ${formatTime(hourlyData.dt * 1000)}: ${hourlyData.main.temp.toFixed(1)}°C
        </li>
      `).join('')}
    </ul>
  </div>
  <div>
    <h3>Days</h3>
    <ul>
      ${fullForecast.list.filter(item => item.dt_txt.includes('12:00')).map(dailyData => `
        <li>
          <img src="https://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png" alt="${dailyData.weather[0].description}">
          ${getDayName(new Date(dailyData.dt * 1000))}: ${dailyData.main.temp.toFixed(1)}°C
        </li>
      `).join('')}
    </ul>
  </div>
</div>
`;

    
  })
  .catch((error) => {
    console.error('Error fetching full weather forecast:', error);
    // Renderar innehåll i modal
    modalPopupContent.innerHTML = `
        <h2>${weatherArray[index].name}</h2>
        
        <h3>Can not found forecast</h3>
        
        <h4>Try again later</h3>
        
    `;
  });

  
}


//* ----=== ÖPPNAR MODAL FÖR ATT SÖKA VÄDERPROGNOS
function openNewWeatherModal() {
  toggleModalPopup();

  // Hämtar modal
  const modalPopupContent = document.querySelector('.modal-popup_content');

  // Renderar innehåll i modal
  modalPopupContent.innerHTML = `
      <h2>New Weather</h2>
      
      <button class="current-location_btn modal_btns">My Location</button>
      
      <label for="location_input">Location</label>
      <input id="location_input" type="text" placeholder="Enter location" required>
      <button class="search-location_btn modal_btns">Search</button>
      
      <h3 class="weather-preview_heading">Weather Preview</h3>
      <div class="weather-preview_div preview_div">
      
      </div>
      
      <button class="add-weather_btn modal_btns">Add</button>
      `;

  //* --> KNAPP: "My Location" -(visar )
  // Lyssna på knappklick för att hämta nuvarande position
  const currentLocation = document.querySelector('.current-location_btn');
  currentLocation.addEventListener('click', () => {
    document.querySelector('.weather-preview_div').innerHTML = `
      <div class="preview-text_invalid">
      <h4>Locating...</h4>
      </div>
      `;

    geoFindMe().then((position) => {
      showWeatherPreview(position.latitude, position.longitude);
    });
  });

  //* --> KNAPP: "Add" -(lägger till väder i kortet)
  // Lyssna på knappklick för att lägga till ny väderleksrapport
  const addNewWeatherBtn = document.querySelector('.add-weather_btn');
  addNewWeatherBtn.addEventListener('click', addNewWeather);

  //* --> KNAPP: "Search location" -(söker på inmatad location)
  const SearchLocationBtn = document.querySelector('.search-location_btn');
  // Lyssna på knappklick för att köra handleLocationInput
  SearchLocationBtn.addEventListener('click', () => {
    handleLocationInput();
  });
}

//* ----=== SKAPA NY VÄDERRAPPORT
function addNewWeather() {
  // Hämtar värdet från input-fältet (används som visningstitel i kortet)
  let locationInput = document.getElementById('location_input').value;
  // (Använder titeln från preview)
  let locationName = document.querySelector(
    '.weather-preview_div h3'
  ).innerText;
  try {
    // Söker efter plats baserat på namnet från API:et
    fetchJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5&exclude=daily`
    ).then((prop) => {
      // Skapar ett nytt objekt med de angivna värdena
      const newWeather = {
        name: locationInput,
        location: locationName,
        icon: `https://openweathermap.org/img/wn/${prop.weather[0].icon}@2x.png`,
        main: prop.weather[0].main,
        description: prop.weather[0].description,
        temp: Math.round(prop.main.temp),
      };

      // Lägger till det nya objektet i weatherArray
      weatherArray.push(newWeather);

      // Uppdaterar hela listan med väderrapporter
      renderWeatherList();

      // Rensar input-fälten
      document.getElementById('location_input').value = '';
      document.querySelector('.weather-preview_div').innerHTML = '';
    });
  } catch (err) {
    console.log('Invalid LOCATION');
    // om location är felaktig visas det i Preview-rutan
    document.querySelector('.weather-preview_div').innerHTML = `
    <div class="preview-text_invalid">
    <h4>INVALID LOCATION</h4>
    </div>
    `;
  }
}

//* ----=== RENDERAR SNABBLÄNKAR
async function renderWeatherList() {
  // Renderar snabblänkarna
  const weatherHTML = await Promise.all(
    weatherArray.map(async (w) => {
      try {
        const prop = await fetchJSON(
          `https://api.openweathermap.org/data/2.5/weather?q=${w.location}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5&exclude=daily`
        );

        // Uppdatera objektets egenskaper med de senaste värdena från API:et
        w.icon = `https://openweathermap.org/img/wn/${prop.weather[0].icon}@2x.png`;
        w.description = prop.weather[0].description;
        w.temp = Math.round(prop.main.temp);
        w.main = prop.weather[0].main;

        //Returnera HTML
        return `
          <div class="weather card-items">
            <div class="item_target">
              <img class="weather_icon" src="${w.icon}" alt="${w.description}">
              <div>
                <h3>${w.name}</h3>
                <div class="weather-info_div">
                  <span class="temperature">${w.temp}&degC</span>
                  <p>${w.main}</p>
                </div>
              </div>
            </div>
            <button class="remove_btn">&times</button>
          </div>
        `;
      } catch (error) {
        console.error("Error fetching weather data", error);

        // Om det uppstår ett fel, returnera en fallback HTML
        return `
          <div class="weather">
            <h3>${w.name}</h3>
            <p>*not found*</p>
            <button class="remove_btn">&times</button>
          </div>
        `;
      }
    })
  );

  // Lägger till väderrapporter i väderkortet
  weatherContainer.innerHTML = weatherHTML.join('');

  // * -- KNAPP: "TA BORT länk"
  // För varje väderrapport...
  weatherContainer.querySelectorAll('.weather').forEach((w, index) => {
    // ... hämtar vi dess 'remove-knapp"
    const removeBtn = w.querySelector('.remove_btn');
    // När vi klickar på knappen tas den specifika väderrapporten bort
    removeBtn.addEventListener('click', (e) => {
      // Stoppar event propagation för att förhindra att modalen öppnas
    e.stopPropagation();
      // Ta bort objektet från weather-arrayen
      weatherArray.splice(index, 1);
      // Uppdatera renderingen efter borttagning
      renderWeatherList();
    });
  });

  //* --> KNAPP: "Weather" -(öppnar modal och visar full väderprognos)
  weatherContainer.querySelectorAll('.weather').forEach((weather, index) => {
    weather.addEventListener('click', () => {
        
        openFullWeatherModal(index)
    });
});


  // Sparar uppdaterade väderrapporter i local storage
  localStorage.setItem('weather', JSON.stringify(weatherArray));
}


function handleLocationInput() {
  // Hämtar inmatat värde ur location_input
  let locationInputValue = document.getElementById('location_input').value;

  // Söker efter plats baserat på namnet från API:et
  fetchJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=${locationInputValue}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5&exclude=daily`
  ).then((prop) => {
    try {
      // Anropa showWeatherPreview med latitude och longitude från prop
      showWeatherPreview(prop.coord.lat, prop.coord.lon);
    } catch (error) {
      console.log('Invalid LOCATION');
      document.querySelector('.weather-preview_div').innerHTML = `
        <div class="preview-text_invalid">
        <h4>INVALID LOCATION</h4>
        </div>
        `;
    }
  });
}

//* VISA WEATHER PREVIEW *//
function showWeatherPreview(latitude, longitude) {
  fetchJSON(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5&exclude=daily`
  ).then((prop) => {
    console.log(prop);
    console.log(prop.weather[0].icon);

    // Uppdatera location_input med prop.url
    document.getElementById('location_input').value = prop.name;

    //Renderar html i preview-rutan
    const weatherPreviewDiv = document.querySelector('.weather-preview_div');
    weatherPreviewDiv.innerHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${
      prop.weather[0].icon
    }@2x.png"
      alt="${prop.weather[0].description}">
    <div class="weather-text-content_div" >
      <h3>${prop.name}</h3>
      <span class="temperature">${Math.round(prop.main.temp)}&deg;C;</span>
      <p>${prop.weather[0].main}</p>
    </div>
  `;
  });
}

//* ----===----===----===----===----=== ===----=== ===----===----===----===----===---- *//

renderWeatherList();

//* --> KNAPP: "Add Weather" -(öppnar modal)
// Lyssna på knappklick för att öppna modal
const addWeatherBtn = document.querySelector('.add-weather');
addWeatherBtn.addEventListener('click', openNewWeatherModal);


