let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let showPhonetics = false;

// ... Keep your holidays, mNames, and dNames objects here ...

// NEW: Year to Words Converter
function getYearWordsPL(year) {
    const years = {
        2024: "dwa tysiące dwudziestego czwartego",
        2025: "dwa tysiące dwudziestego piątego",
        2026: "dwa tysiące dwudziestego szóstego",
        2027: "dwa tysiące dwudziestego siódmego",
        2028: "dwa tysiące dwudziestego ósmego",
        2029: "dwa tysiące dwudziestego dziewiątego",
        2030: "dwa tysiące trzydziestego"
    };
    return years[year] || year.toString();
}

function updateDisplay() {
    let dw = new Date(currentY, currentM, selD).getDay();
    
    // Header & Grid Month
    const monthName = lang === 'PL' ? mNames.PL_NOM[currentM] : mNames.EN[currentM];
    document.getElementById('cal-h').innerText = monthName.toUpperCase();
    document.getElementById('cal-b').innerText = selD.toString().padStart(2, '0');
    document.getElementById('cal-f').innerText = (lang === 'PL' ? dNames.PL[dw] : dNames.EN[dw]).toUpperCase();

    // The Date Strings
    const polishFull = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${getYearWordsPL(currentY)} roku`;
    const englishFull = `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}`;

    // Update Text Areas
    document.getElementById('pol-t').innerText = polishFull;
    
    // FIX: English translation only shows if lang is 'EN'
    const engDisplay = document.getElementById('eng-t');
    engDisplay.innerText = englishFull;
    engDisplay.style.display = (lang === 'EN') ? "block" : "none";

    // Phonetics
    if (showPhonetics) {
        document.getElementById('pho-t').innerText = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]} ${yPHO[currentY] || currentY}`;
        document.getElementById('pho-t').style.display = "block";
    } else {
        document.getElementById('pho-t').style.display = "none";
    }
}

function toggleLang() {
    lang = (lang === 'PL') ? 'EN' : 'PL';
    renderGrid(); // Refresh grid to show English month name
    updateDisplay(); // Refresh display to show English date string
}

function showCulture() {
    const modal = document.getElementById('cultModal');
    const content = document.getElementById('cultContent');
    // Cycle notes based on the day
    const item = cultureData[selD % cultureData.length];
    
    content.innerHTML = `
        <div class="cult-card">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `;
    modal.style.display = "block";
}

// ... Keep renderGrid, getOrdinalPL, getOrdinalPHO, getOrdinalEN ...
// Ensure init() is called on load
function init() {
    updateYearlyHolidays(currentY);
    renderGrid();
    updateDisplay();
}
