
// Hämtar texten som ska kunna ändras 
const editableTitle = document.getElementById('editable-title');

// Hämtar den sparade texten ur localstorage
editableTitle.innerText = localStorage.getItem('Title')

// Sparar texten i localstorage när fokus tas bort från elementet
editableTitle.addEventListener('blur', (e) => {
    localStorage.setItem('Title', e.target.innerText)
})