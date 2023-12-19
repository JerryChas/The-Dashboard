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
      
      <button class="current-location_btn modal_btns">Your Location</button>
      
      <label for="location_input">Location</label>
      <input id="location_input" type="text" placeholder="Enter location" required>
      
      <h3 class="weather-preview_heading">Weather Preview</h3>
      <div class="preview_div">
      
      </div>
      
      <button class="add-weather_btn modal_btns">Add</button>
      `;
  //* --> KNAPP: "check URL" -(visar link preview)
  // Lyssna på knappklick för att checka URL
//   const checkUrlBtn = document.querySelector('.check-url_btn');
//   checkUrlBtn.addEventListener('click', checkURL);

  //* --> KNAPP: "Add" -(lägger till ny länk)
//   // Lyssna på knappklick för att lägga till ny snabblänk
//   const addNewLinkBtn = document.querySelector('.add-new-link_btn');
//   addNewLinkBtn.addEventListener('click', addNewQuickLink);

  
}



//* ----===----===----=== ===----=== ===----===----===---- *//



//* --> KNAPP: "Add link" -(öppnar modal)
// Lyssna på knappklick för att öppna modal
const addWeatherBtn = document.querySelector('.add-weather');
addWeatherBtn.addEventListener('click', openWeatherModal);
