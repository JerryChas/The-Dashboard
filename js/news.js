// En tom array där vi kommer att lagra objekt för varje nyhetsartikel.
const newsArray = [];

// Hämtar container till nyhetsflödet
const newsContainer = document.querySelector('.news_container');

//* ----===----===----=== FUNKTIONER ===----===----===---- *//

//* ----=== HÄMTAR SENASTE NYHETER
async function fetchLatestNews() {
    try {
        // Hämtar data från RSS-flödet
        const response = await fetch('https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/');
        const data = await response.text();

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
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//* ----=== RENDERAR NYHETSFLÖDE
function renderLatestNews() {
    const newsHTML = newsArray.map((obj) => {

        // Returnera HTML
        return `
        <div class="news card-items">
          <a href="${obj.link}" target="_blank" class="item_target">
            <h3>${obj.title}</h3>
          </a>
        </div>
      `;
    });

    newsContainer.innerHTML = newsHTML.join('');

    //Hanterar besökta länkar 
    handleVisitedLinks()
}

//* ----=== Hanterar CDATA-sektion
// Funktion för att hämta text från en CDATA-sektion
function handleCDATAsection(element) {
    return element ? element.firstChild.nodeValue : '';
}

//* ----=== Hanterar besökta nyhetslänkar
function handleVisitedLinks() {
    const links = document.querySelectorAll('.news a');

    links.forEach(link => {
        // Hämta besöksstatus från localStorage
        const isVisited = localStorage.getItem(link.href);

        // Uppdatera klassen baserat på besöksstatus
        if (isVisited) {
            link.closest('.card-items').classList.add('visited-link');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            // Hämta besöksstatus från localStorage
            const isVisited = localStorage.getItem(this.href);

            if (isVisited) {
                // Om länken är besökt, förhindra att länken öppnar url
                event.preventDefault();

                // Ta bort 'visited-link' klassen och uppdatera localStorage
                this.closest('.card-items').classList.remove('visited-link');
                localStorage.removeItem(this.href);
            } else {
                // Om länken inte är besökt, lägg till 'visited-link' klassen
                this.closest('.card-items').classList.add('visited-link');

                // Markera länken som besökt och uppdatera localStorage
                localStorage.setItem(this.href, true);
            }
        });
    });
}


//* ----===----===----=== ===----=== ===----===----===---- *//

// Anropar funktionen för att hämta och behandla nyhetsdata.
fetchLatestNews()
.then(renderLatestNews);



