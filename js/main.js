//******** FETCH JSON ********//
async function fetchJSON(url, option) {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error(`Förfrågan misslyckades. ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fel vid hämtningen av JSON från API', error.message);
  }
}

function toggleModalPopup() {
  // Hämtar modal
  document.querySelector('.modal-popup').classList.toggle('hidden');
  
  //* --> KNAPP: "close" -(stänger ner modalen)
  document
    .querySelector('.modal-close_btn')
    .addEventListener('click', toggleModalPopup);
}

function geoFindMe() {
  return new Promise((resolve, reject) => {
    function success(position) {
      // Hämtar lat och long
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Min nuvarande position
      console.log(`https://maps.google.com/?q=${latitude},${longitude}`);

      // Skicka den aktuella positionen som resultat av löftet
      resolve({ latitude, longitude });
    }

    function error() {
      const errorMessage = 'Unable to retrieve your location';

      // Logga felmeddelandet
      console.error(errorMessage);

      // Avvisa löftet med felmeddelandet
      reject(errorMessage);
    }

    // OM det ej fungerar att söka position
    if (!navigator.geolocation) {
      const errorMessage = 'Geolocation is not supported by your browser';

      // Logga felmeddelandet
      console.error(errorMessage);

      // Avvisa löftet med felmeddelandet
      reject(errorMessage);
    } else {
      // Logga att vi försöker lokalisera positionen
      console.log('Locating…');

      // Begär användarens nuvarande position
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
}

//! får kolla på denna sen
// function windowOnClick(event) {
//     const modalPopup = document.querySelector('.modal-popup');

//     // Kontrollera om det klickade elementet eller dess föräldrar har klassen 'modal-popup'
//     if (!event.target.closest('.modal-popup')) {
//         if (!modalPopup.classList.contains('hidden')) {
//             console.log('Klickat utanför');
//             toggleModalPopup();
//         }
//     }
// }
