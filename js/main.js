//******** FETCH JSON ********//
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if(!response.ok && response.status !== 404) {
            throw new Error(`Förfrågan misslyckades. ${response.status}`);       
        }
        return await response.json()

    } catch (error) {
        console.error('Fel vid hämtningen av JSON från API', error.message);
    }
}

