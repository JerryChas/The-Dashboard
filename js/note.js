// Hämtar container till note
const noteContainer = document.querySelector('.note_container');

// Skapa en textarea-element
const noteArea = document.createElement('textarea')
noteArea.setAttribute('placeholder', 'Skriv dina tankar här')

// Lägg till textarea i noteContainer
noteContainer.appendChild(noteArea);


//* LOCAL STORAGE *//
// Hämtar anteckningar från localstorage
noteArea.value = JSON.parse(localStorage.getItem('Notes'))
// lagrar anteckningarna i localstorage varje gång det skrivs
noteArea.addEventListener('input', () => {
    localStorage.setItem('Notes', JSON.stringify(noteArea.value))
})