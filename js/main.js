//******** FETCH JSON ********//
async function fetchJSON(url, option) {
    try {
        const response = await fetch(url, option);
        if(!response.ok) {
            throw new Error(`Förfrågan misslyckades. ${response.status}`);       
        }
        return await response.json()

    } catch (error) {
        console.error('Fel vid hämtningen av JSON från API', error.message);
    }
}

