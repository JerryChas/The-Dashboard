
// Array med snabblänkar
const quickLinks = [
    { text: 'Google', link: 'https://www.google.com/' },
    { text: 'Github', link: 'https://github.com/' },
    { text: 'ChatGPT', link: 'https://chat.openai.com/' },
    { text: 'MDN', link: 'https://developer.mozilla.org/en-US/' }
]

// Hämtar container till länkarna
const linksContainer = document.querySelector('.links_container');

// Skapar snabblänk
const linksHTML = quickLinks.map((qlink) => {
    return `
        <div class="link">
            <a href="${qlink.link}" target="_blank">
                <p>${qlink.text}</p>
            </a>
            <span class="remove-link_btn">&times</span>
        </div>
       
    `
}).join('')

// Lägger till länkarna i snabblänkskortet
linksContainer.innerHTML = linksHTML;


//* -- KNAPP "TA BORT länk" 
// För varje snabblänk...
linksContainer.querySelectorAll('.link').forEach((qlink) => {
    // ... hämtar vi dess 'remove-knapp"
    const removeLinkBtn = qlink.querySelector('.remove-link_btn');
    // När vi klickar på knappen tas den specifika snabblänk bort 
    removeLinkBtn.addEventListener('click', () => {
        linksContainer.removeChild(qlink)
    })
});