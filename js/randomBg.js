// hämtar knappen för att byta till slumpvis bakgrund
const randomBgBtn = document.querySelector('.random-bg_btn');

// Om url till senare blid finns används den, annars hämtar den en annan
const imageUrl =
  localStorage.getItem('Background') || 'https://source.unsplash.com/random'; //fallback url

document.querySelector('body').style.backgroundImage = `url("${imageUrl}")`;

//* ----===----===----=== FUNKTIONER ===----===----===---- *//

//* ----=== HÄMTAR RANDOM BILD
function getRandomImage() {
  const options = {
    method: 'GET',
    headers: {
      cookie:
        'un_sesh=WkFVaU9tS1VsTzI2UmpIMDNpQTFFWG4reTJHa2FETGtoMXZqRCtwK0swZHZjUFhNTC9WY3QrNVNMbUdodks3emxXRU5oeElIN08ySXJFajVOMURVc2NSMG9VTEpBclJZZ0FwUlhRWVNaMHdvemE5UllLVXJqckVNYnRUWjdYU21Tcmc0ZDlLS3FKbUdhZDVoUXN0SnNmTk85aUkwc3ljK2lLNEZNclVxSTNOTmpGcFNSUEttRktQRFhlRHkvNlpZYXJzQlQ4VHlDY1AvZW81dkU1RDl2OHA3Ty9KMEZkTVo1QnBBNTlxZXJ0T3M0bTJZKyszNHduVmdIK1FWQ3FDQWZ6MDV5dHhZSm12Ujl5RytaWnlOMmMxQlIxSVhodXQ1OUgxZWJlL0NUbjg9LS02YkExR2pVT3Z6VWRQbGU1dndtWEVBPT0%253D--87988b2386104a527a0df3e886459bc614cad7af; require_cookie_consent=false; xp-pricing=partial',
      'User-Agent': 'insomnia/8.5.1',
    },
  };

  return fetchJSON(
    'https://api.unsplash.com/photos/random/?client_id=smo-x0FndIWCfU-_9ldO0QS5e_7KJUJ_YR_6Yp8YIXE&count=1',
    options
  );
}

//* ----===----===----=== ===----=== ===----===----===---- *//

// lyssnar till klick på knapp
randomBgBtn.addEventListener('click', () => {
  // Hämtar slumpvis bild från unsplash
  getRandomImage().then((prop) => {
    const imageUrl = prop[0].urls.regular;

    // Lägger till den bilden som bakgrundsbild
    document.querySelector('body').style.backgroundImage = `url("${imageUrl}")`;

    // Sparar den bilden i localstorage
    localStorage.setItem('Background', imageUrl);
  });
});
