
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
let quickLinks = [
    { text: 'Google', link: 'https://www.google.com/' },
    { text: 'Github', link: 'https://github.com/' },
    { text: 'ChatGPT', link: 'https://chat.openai.com/' },
    { text: 'MDN', link: 'https://developer.mozilla.org/' },
];

// Hämtar snabblänkar från LS eller renderar ut standardinställningar
quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || renderQuickLinks();


//* ----===----===----=== FUNKTIONER ===----===----===---- *//

//* ----=== SKAPA NY SNABBLÄNK
function addNewQuickLink() {
  // Hämtar värden från input-fälten
  let linkTitleValue = document.getElementById('link-title_input').value;
  const linkUrlValue = document.getElementById('link-url_input').value;

  // Kontrollera om linkUrlValue är en giltig URL
  try {
    new URL(linkUrlValue);

    // Kontrollera om linkTitleValue är tomt
    if (!linkTitleValue.trim()) {
      // Om det är tomt, tilldela ett standardvärde, till exempel 'noTitle'
      linkTitleValue = 'noTitle';
    }

    // Skapar ett nytt objekt med de angivna värdena
    const newLink = { text: linkTitleValue, link: linkUrlValue };

    // Lägger till det nya objektet i quickLinks
    quickLinks.push(newLink);

    // uppdaterar hela listan med snabblänkar
    renderQuickLinks();

    // Rensar input-fälten
    document.getElementById('link-title_input').value = '';
    document.getElementById('link-url_input').value = 'https://';
    document.querySelector('.link-preview_div').innerHTML = '';
  } catch (err) {
    console.log('Invalid URL');
    // om URLn är felaktig visas det i Preview-rutan
    document.querySelector('.link-preview_div').innerHTML = `
    <div class="link-preview-text_invalid">
    <h4>INVALID URL</h4>
    </div>
    `;
  }
}

//* ----=== HANTERAR FAVICON-ERROR
function handleFaviconError(imgElement, link) {
  
  //Detta är en annat sätt att nå favicon
  const backupURL = `https://s2.googleusercontent.com/s2/favicons?domain=${link}`;

  // Sätter källan för img-elementet baserat på backup-URL:er
  imgElement.src = backupURL;
  
}

//* ----=== RENDERAR SNABBLÄNKAR
function renderQuickLinks() {
    
    // Renderar snabblänkarna 
    const linksHTML = quickLinks.map((qlink) => {
        //* FAVicon *//
        //skapar favicon utifrån länk
        const faviconURL = `${qlink.link}/favicon.ico`;
        
        //Returnera HTML
        return `
        <div class="link">
        <img class="quick-link_favicon" src="${faviconURL}" onerror="handleFaviconError(this, '${qlink.link}')"alt="QL">
        <a href="${qlink.link}" target="_blank">
        <p>${qlink.text}</p>
        </a>
        <span class="remove-link_btn">&times</span>
        </div>
        `;
    });
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
        });
    });

    //Sparar länkarna i localstorage
    localStorage.setItem('quickLinks', JSON.stringify(quickLinks))
}

//* ----=== ÖPPNAR MODAL MED INNEHÅLL
function openQuickLinkModal() {
  toggleModalPopup();

  // Hämtar modal
  const modalPopup = document.querySelector('.modal-popup');
  const modalPopupContent = document.querySelector('.modal-popup_content');

  // Renderar innehåll i modal
  modalPopupContent.innerHTML = `
    <h2>New Quicklink</h2>
    
    <label for="link-title_input">Title</label>
    <input id="link-title_input" type="text" placeholder="Title for your link" maxlength="10" required>
    
    <label for="link-url_input">URL</label>
    <input id="link-url_input" type="url" value="https://" placeholder="website url" required>
    <button class="check-url_btn">check URL</button>
    
    <h3 class="link-preview_heading">Link Preview</h3>
    <div class="link-preview_div">
    
    </div>
    
    <button class="add-new-link_btn">Add</button>
    `;
  //* --> KNAPP: "check URL" -(visar link preview)
  // Lyssna på knappklick för att checka URL
  const checkUrlBtn = document.querySelector('.check-url_btn');
  checkUrlBtn.addEventListener('click', checkURL);

  //* --> KNAPP: "Add" -(lägger till ny länk)
  // Lyssna på knappklick för att lägga till ny snabblänk
  const addNewLinkBtn = document.querySelector('.add-new-link_btn');
  addNewLinkBtn.addEventListener('click', addNewQuickLink);

  //* --> KNAPP: "close" -(stänger ner modalen)
  document
    .querySelector('.modal-close_btn')
    .addEventListener('click', toggleModalPopup);
}

//* VISA LINKPREVIEW *//
function checkURL() {
  linkToPreview = document.getElementById('link-url_input').value;
  const inputTitle = document.getElementById('link-title_input').value;

  // Uppdatera requestOptions body med det nya värdet
  requestOptions.body = new URLSearchParams({
    q: linkToPreview,
  });

  fetchJSON(apiUrl, requestOptions)
    .then((prop) => {
      console.table(prop);

      // Uppdatera link-url_input med prop.url
      document.getElementById('link-url_input').value = prop.url;

      // Om inputTitle är tomt, uppdatera det med prop.title
      if (inputTitle === '') {
        document.getElementById('link-title_input').value = prop.title;
      }

      const linkPreviewDiv = document.querySelector('.link-preview_div');
      linkPreviewDiv.innerHTML = `
            <img src="${prop.image}">
            <div class="link-preview-text">
            <h4>${prop.title}</h4>
            <p>${prop.description}</p>
            </div>
            `;
      
    })
    .catch(() => {
      console.error('Ingen Preview kunde visas');
    });
}
//* ----===----===----=== ===----=== ===----===----===---- *//

renderQuickLinks();

//* --> KNAPP: "Add link" -(öppnar modal)
// Lyssna på knappklick för att öppna modal
const addQuickLinkBtn = document.querySelector('.add-quick-link');
addQuickLinkBtn.addEventListener('click', openQuickLinkModal);
