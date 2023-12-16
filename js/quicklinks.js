// Hämtar container till länkarna
const linksContainer = document.querySelector('.links_container');

//* -- Link PREVIEW -- request info *//
const apiKey = '86dbf80dd100d16329310855021aa563';
const apiUrl = 'https://api.linkpreview.net/';
let linkToPreview = '';
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

//* -- SNABBLÄNKAR Array
const quickLinks = [
    { text: 'Google', link: 'https://www.google.com/'},
    { text: 'Github', link: 'https://github.com/' },
    { text: 'ChatGPT', link: 'https://chat.openai.com/' },
    { text: 'MDN', link: 'https://developer.mozilla.org/' }
]

//* ----===----===----=== FUNKTIONER ===----===----===---- *//    



//* ----=== SKAPA NY SNABBLÄNK
function addNewQuickLink() {
    // Hämtar värden från input-fälten
    const linkTitleValue = document.getElementById('link-title_input').value;
    const linkUrlValue = document.getElementById('link-url_input').value;
    
    // Skapar ett nytt objekt med de angivna värdena
    const newLink = { text: linkTitleValue, link: linkUrlValue };
    
    // Lägger till det nya objektet i quickLinks
    quickLinks.push(newLink);
    
    // uppdaterar hela listan med snabblänkar 
    renderQuickLinks()
    
    // Rensar input-fälten
    document.getElementById('link-title_input').value = '';
    document.getElementById('link-url_input').value = '';
}

//* ----=== HANTERAR FAVICON-ERROR
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

//* ----=== RENDERAR SNABBLÄNKAR
function renderQuickLinks() {
    const linksHTML = quickLinks.map((qlink) => {
        
        //* FAVicon *//
        const faviconURL = `${qlink.link}/favicon.ico`;

        //Returnera HTML
        return `
        <div class="link">
        <img class="quick-link_favicon" src="${faviconURL}" onerror="handleFaviconError(this, '${qlink.link}')">
        <a href="${qlink.link}" target="_blank">
        <p>${qlink.text}</p>
        </a>
        <span class="remove-link_btn">&times</span>
        </div>
        `
    })
    // Lägger till länkarna i snabblänkskortet
    linksContainer.innerHTML = linksHTML.join('');

    //* -- KNAPP: "TA BORT länk" 
    // För varje snabblänk...
    linksContainer.querySelectorAll('.link').forEach((qlink, index) => {
    // ... hämtar vi dess 'remove-knapp"
    const removeLinkBtn = qlink.querySelector('.remove-link_btn');
    // När vi klickar på knappen tas den specifika snabblänk bort 
    removeLinkBtn.addEventListener('click', () => {
        // Ta bort objektet från quickLinks-arrayen
        quickLinks.splice(index, 1);
        // Uppdatera renderingen
        renderQuickLinks();
        // console.log(quickLinks)
    })
});

}

//* ----=== ÖPPNAR MODAL MED INNEHÅLL
function openQuickLinkModal() {
    
    toggleModalPopup()
    
    // Hämtar modal
    const modalPopup = document.querySelector('.modal-popup')
    const modalPopupContent = document.querySelector('.modal-popup_content');
    
    // Renderar innehåll i modal
    modalPopupContent.innerHTML = `
    <h2>New Quicklink</h2>
    
    <label for="link-title_input">Title</label>
    <input id="link-title_input" type="text" placeholder="Title for your link" maxlength="10" required>
    
    <label for="link-url_input">URL</label>
    <input id="link-url_input" type="url" placeholder="website url" required>
    <button class="check-url_btn">check URL</button>
    
    <h3 class="link-preview_heading">Link Preview</h3>
    <div class="link-preview_div">
    
    </div>
    
    <button class="add-new-link_btn">Add</button>
    `
    //* --> KNAPP: "check URL" -(visar link preview)
    // Lyssna på knappklick för att checka URL
    const checkUrlBtn = document.querySelector('.check-url_btn');
    checkUrlBtn.addEventListener('click', checkURL);
    
    //* --> KNAPP: "Add" -(lägger till ny länk)
    // Lyssna på knappklick för att lägga till ny snabblänk
    const addNewLinkBtn = document.querySelector('.add-new-link_btn');
    addNewLinkBtn.addEventListener('click', addNewQuickLink);
    
    //* --> KNAPP: "close" -(stänger ner modalen)
    document.querySelector('.modal-close_btn').addEventListener('click', toggleModalPopup)
    
}

//* VISA LINKPREVIEW *//   
function checkURL() {
    linkToPreview = document.getElementById('link-url_input').value
    
    // Uppdatera requestOptions body med det nya värdet
    requestOptions.body = new URLSearchParams({
        q: linkToPreview,
    });
    
    fetchJSON(apiUrl, requestOptions).then((prop)=> {
        console.log(prop)
        
        const linkPreviewDiv = document.querySelector('.link-preview_div')
        linkPreviewDiv.innerHTML = `
        <img src="${prop.image}">
        <div class="link-preview-text">
        <h4>${prop.title}</h4>
        <p>${prop.description}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in</p>
        </div>
        `
        // localStorage.setItem('linkPreview', linkPreviewDiv.innerHTML)
    }) 
}



renderQuickLinks();




//* --> KNAPP: "Add link" -(öppnar modal) 
// Lyssna på knappklick för att öppna modal
const addQuickLinkBtn = document.querySelector('.add-quick-link');
addQuickLinkBtn.addEventListener('click', openQuickLinkModal);





