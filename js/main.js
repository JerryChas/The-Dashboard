//******** FETCH JSON ********//
async function fetchJSON(url, option) {
    try {
        const response = await fetch(url, option);
        if(!response.ok) {
            throw new Error(`Förfrågan misslyckades. ${response.status}`);       
        }
        return await response.json()

    } catch (error) {
        console.error('Fel vid hämtningen av JSON från API', error.message);
    }
}

function toggleModalPopup() {
    // Hämtar modal
    document.querySelector('.modal-popup').classList.toggle('hidden');
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
