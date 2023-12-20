//* ----===----===----=== FUNKTIONER ===----===----===---- *//

//* ----=== ÖPPNAR MODAL MED INNEHÅLL
function openWeatherModal() {
  toggleModalPopup();

  // Hämtar modal
  const modalPopup = document.querySelector('.modal-popup');
  const modalPopupContent = document.querySelector('.modal-popup_content');

  // Renderar innehåll i modal
  modalPopupContent.innerHTML = `
      <h2>New Weather</h2>
      
      <button class="current-location_btn modal_btns">My Location</button>
      
      <label for="location_input">Location</label>
      <input id="location_input" type="text" placeholder="Enter location" required>
      
      <h3 class="weather-preview_heading">Weather Preview</h3>
      <div class="weather-preview_div preview_div">
      
      </div>
      
      <button class="c modal_btns">Add</button>
      `;

  //* --> KNAPP: "My Location" -(visar )
  // Lyssna på knappklick för att hämta nuvarande position
  const currentLocation = document.querySelector('.current-location_btn');
  currentLocation.addEventListener('click', () => {
    
    geoFindMe().then((position) => {
      showWeatherPreview(position.latitude, position.longitude)
    })
    
  });

  //* --> KNAPP: "Add" -(lägger till väder i kortet)
  // Lyssna på knappklick för att lägga till ny väderleksrapport
  const addNewLinkBtn = document.querySelector('.add-weather_btn');
  addNewLinkBtn.addEventListener('click', () => {



    
  });
}

//* VISA WEATHER PREVIEW *//
function showWeatherPreview(latitude, longitude) {
  fetchJSON(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6ce2a025e75ef169171b5f6999c164b5&exclude=daily`
  ).then((prop) => {
    console.table(prop);
    console.log(prop.weather[0].icon)

    // Uppdatera location_input med prop.url
    document.getElementById('location_input').value = prop.name;

    //Renderar html i preview-rutan
    const weatherPreviewDiv = document.querySelector('.weather-preview_div')
    weatherPreviewDiv.innerHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${prop.weather[0].icon}@2x.png"
      alt="${prop.weather[0].description}">
    <div class="weather-text-content_div" >
      <h3>${prop.name}</h3>
      <span class="temperature">${Math.round(prop.main.temp)}&deg;C;</span>
      <p>${prop.weather[0].main}</p>
    </div>
  `;
  
    
  });
}

//* ----===----===----=== ===----=== ===----===----===---- *//

//* --> KNAPP: "Add link" -(öppnar modal)
// Lyssna på knappklick för att öppna modal
const addWeatherBtn = document.querySelector('.add-weather');
addWeatherBtn.addEventListener('click', openWeatherModal);
