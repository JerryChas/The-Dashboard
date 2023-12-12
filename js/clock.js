
const clockContainer = document.querySelector('.clock_container');

// Dagarna i text
const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Månaderna i text
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function clock(monthType, dayType) {
    // Hämtar datum och tid
    const obj = new Date(); 
    
    // Lagrar år, månad, dag
    const year = obj.getFullYear();
    const month = obj.getMonth();
    const day = obj.getDay(); // nummer på veckans dag
    const date = obj.getDate(); // dagens datum
    
    // Lagrar timma, minut, sekund
    const hr = obj.getHours();
    const min = obj.getMinutes();
    const sec = obj.getSeconds();

    const currentMonth = monthType[month];
    const currentDay = dayType[day];
    
    // Skapa HTML-element för varje variabel och infoga dem i container
    clockContainer.innerHTML = `
    <div class="day-name">${currentDay}</div>
    <div class="time_div">
        <div class="formated-time">${hr} : ${min} : ${sec}</div>
    </div>
    <div class="date_div">
        <div class="year">${year}</div>
        <div class="month-name">${currentMonth}</div>
        <div class="date">${date}</div>
    </div>
    `;
}


// Anropar klockan och uppdaterar den varje sekund 
setInterval(() => {
    clock(monthShort, dayFull);
}, 1000);

// clock(monthShort, dayFull);


