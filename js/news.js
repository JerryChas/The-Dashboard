const newsArray = []; // En tom array där vi kommer att lagra objekt för varje nyhetsartikel.

// Hämtar container till nyhetsflödet
const newsContainer = document.querySelector('.news_container');

//* ----===----===----=== FUNKTIONER ===----===----===---- *//

//* ----=== HÄMTAR SENASTE NYHETER
function fetchLatestNews() {
    // Hämtar data från RSS-flödet
    fetch('https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/')
        .then(response => response.text())
        .then(data => {
            // Skapar en XML-parser för att behandla XML-data
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');

            // Nu har du xmlDoc, och du kan arbeta med det här.
            const items = xmlDoc.querySelectorAll('item');

            // Loopar igenom varje item i RSS-flödet
            items.forEach(item => {
                // Hämtar information från varje item och skapar ett objekt.
                const newsObject = {
                    title: item.querySelector('title').textContent,
                    link: item.querySelector('link').textContent,
                    // Description är omgiven av CDATA-sektion och behöver därför hanteras
                    description: handleCDATAsection(item.querySelector('description')),
                    pubDate: item.querySelector('pubDate').textContent,
                    imageUrl: item.querySelector('enclosure') ? item.querySelector('enclosure').getAttribute('url') : null,
                };

                // Lägger till det skapade objektet i arrayen.
                newsArray.push(newsObject);
            });

            // Nu har du en array med objekt för varje item i RSS-flödet.
            console.log(newsArray);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

//* ----=== RENDERAR NYHETSFLÖDE
function renderLatestNews() {
    
    
    
}

//* ----=== Hanterar CDATA-sektion
// Funktion för att hämta text från en CDATA-sektion
function handleCDATAsection(element) {
    return element ? element.firstChild.nodeValue : '';
}

//* ----===----===----=== ===----=== ===----===----===---- *//

// Anropar funktionen för att hämta och behandla nyhetsdata.
fetchLatestNews(); 
