
// Array med snabblänkar --Innehåller standardlänkar från start
const quickLinks = [
    { text: 'Google', link: 'https://www.google.com/'},
    { text: 'Github', link: 'https://github.com/' },
    { text: 'ChatGPT', link: 'https://chat.openai.com/' },
    { text: 'MDN', link: 'https://developer.mozilla.org/en-US/' }
]

// Hämtar container till länkarna
const linksContainer = document.querySelector('.links_container');

// Skapar snabblänk
const linksHTML = quickLinks.map((qlink) => {

    //* FAVicon *//
    const faviconURL = `${qlink.link}/favicon.ico`;
    // console.log(faviconURL)
    
    //Returnera HTML
    return `
    <div class="link">
    <img class="quick-link_favicon" src="${faviconURL}" onerror="handleFaviconError(this, '${qlink.link}');">
    <a href="${qlink.link}" target="_blank">
    <p>${qlink.text}</p>
    </a>
    <span class="remove-link_btn">&times</span>
    </div>
    `
})

// Lägger till länkarna i snabblänkskortet
linksContainer.innerHTML = linksHTML.join('');

//* Hantera FAVICON - Error *// --(testa genom att ändra url:n i faviconURL)
function handleFaviconError(imgElement, link) {
    //Detta är en annat sätt att nå favicon
    const backupURL = `https://s2.googleusercontent.com/s2/favicons?domain=${link}`;
    // Om ingen favicon kan hittas används en local fil
    const LocalBackupURL = './img/quicklink-icon_backup.png';

    // Sätter källan för img-elementet baserat på backup-URL:er
    if (imgElement.src !== backupURL) {
        imgElement.src = backupURL;
    } else if (imgElement.src !== LocalBackupURL) {
        imgElement.src = LocalBackupURL;
    }
}


//* -- KNAPP: "TA BORT länk" 
// För varje snabblänk...
linksContainer.querySelectorAll('.link').forEach((qlink) => {
    // ... hämtar vi dess 'remove-knapp"
    const removeLinkBtn = qlink.querySelector('.remove-link_btn');
    // När vi klickar på knappen tas den specifika snabblänk bort 
    removeLinkBtn.addEventListener('click', () => {
        linksContainer.removeChild(qlink)
    })
});

//* -- KNAPP: "LÄGG TILL länk" 

const addQuckLink = document.querySelector('.add-quick-link')

addQuckLink.addEventListener('click', () => {
    
    const modalPopup = document.querySelector('.modal-popup');

    const addLinkForm = `
    
    `
    
})

//* -- Link PREVIEW -- *//
const apiKey = '86dbf80dd100d16329310855021aa563';
const apiUrl = 'https://api.linkpreview.net/';
const linkToPreview = 'http://www.google.com/';
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Linkpreview-Api-Key': apiKey,
    },
    body: new URLSearchParams({
        q: linkToPreview,
    }),
};

// fetchJSON(apiUrl, requestOptions).then((prop)=> {
//     console.log(prop)
// }) 


