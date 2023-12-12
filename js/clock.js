
const clockContainer = document.querySelector('.clock_container');


function clock() {
    // Hämtar datum och tid
    const obj = new Date(); 
    
    // Lagrar år, månad, dag
    const year = obj.getFullYear();
    const month = obj.getMonth();
    const day = obj.getDay(); // nummer på veckans dag
    const date = obj.getDate(); // dagens datum
    
    // Lagrar timma, minut, sekund
    let hr = obj.getHours();
    let min = obj.getMinutes();
    let sec = obj.getSeconds();

    // Dagarna i text
    const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Månaderna i text
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonthFull = monthFull[month];
    const currentMonthShort = monthShort[month];
    const currentDayFull = dayFull[day];
    const currentDayShort = dayShort[day];
    
    // Om talet är mindre än 10, startar det med "0"
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    
    // Skapa HTML-element för varje variabel och infoga dem i container
    clockContainer.innerHTML = `
    <div class="day-name day-full">${currentDayFull}</div>
    <div class="day-name day-short">${currentDayShort}</div>
    <div class="time_div">
        <div class="hour">${hr}</div>
        <div class="minute">${min}</div>
        <div class="second">${sec}</div>
    </div>
    <div class="date_div">
        <div class="year">${year}</div>
        <div class="month-name month-full">${currentMonthFull}</div>
        <div class="month-name month-short">${currentMonthShort}</div>
        <div class="date">${date}</div>
    </div>
    `;
}


// Anropar klockan och uppdaterar den varje sekund 
setInterval(() => {
    clock();
}, 1000);

// clock(monthShort, dayFull);


