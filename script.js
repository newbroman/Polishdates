let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let showYear = true; // Toggle for showing year in phrase
let showPhonetics = false;

function updateDisplay() {
    let dw = new Date(currentY, currentM, selD).getDay();
    
    // Header & Grid Updates
    document.getElementById('cal-h').innerText = (lang === 'PL' ? mNames.PL_NOM[currentM] : mNames.EN[currentM]).toUpperCase();
    document.getElementById('cal-b').innerText = selD.toString().padStart(2, '0');
    document.getElementById('cal-f').innerText = (lang === 'PL' ? dNames.PL[dw] : dNames.EN[dw]).toUpperCase();

    // The Polish Phrase Logic
    const dayWords = getOrdinalPL(selD);
    const monthWords = mNames.PL[currentM];
    const yearWords = showYear ? getYearWordsPL(currentY, true) : "";
    
    document.getElementById('pol-t').innerText = `${dayWords} ${monthWords} ${yearWords}`.trim();
    
    // Toggle English Display
    const engText = `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}`;
    document.getElementById('eng-t').innerText = (lang === 'EN') ? engText : "";
    document.getElementById('eng-t').style.display = (lang === 'EN') ? "block" : "none";

    // Phonetics Display
    document.getElementById('pho-t').style.display = showPhonetics ? "block" : "none";
    if (showPhonetics) {
        document.getElementById('pho-t').innerText = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]} ${currentY}`;
    }
}

function toggleYear() {
    showYear = !showYear;
    updateDisplay();
}

function getSeason(month, day) {
    // 21st day logic
    if ((month == 11 && day >= 21) || month <= 1 || (month == 2 && day < 21)) return { name: "Zima", emo: "❄️" };
    if ((month == 2 && day >= 21) || month <= 4 || (month == 5 && day < 21)) return { name: "Wiosna", emo: "🌱" };
    if ((month == 5 && day >= 21) || month <= 7 || (month == 8 && day < 21)) return { name: "Lato", emo: "☀️" };
    return { name: "Jesień", emo: "🍂" };
}
