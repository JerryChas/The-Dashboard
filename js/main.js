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
//   const status = document.querySelector("#status");
//   const mapLink = document.querySelector("#map-link");

//   mapLink.href = '';
//   mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // status.textContent = '';
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    // Min nuvarande position
    console.log(`https://maps.google.com/?q=${latitude},${longitude}`);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    console.log('Locating…');
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
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
