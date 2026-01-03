let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let quizMode = false;
let showPhonetics = false;

// --- DATA: Holidays & Seasons ---
const holidays = {
    "1-1": { PL: "Nowy Rok", EN: "New Year's Day" },
    "5-3": { PL: "Święto Konstytucji", EN: "Constitution Day" },
    "11-1": { PL: "Wszystkich Świętych", EN: "All Saints' Day" },
    "11-11": { PL: "Święto Niepodległości", EN: "Independence Day" },
    "12-25": { PL: "Boże Narodzenie", EN: "Christmas" }
};

const seasons = [
    { namePL: "Zima", emo: "❄️" }, { namePL: "Zima", emo: "❄️" },
    { namePL: "Wiosna", emo: "🌱" }, { namePL: "Wiosna", emo: "🌱" }, { namePL: "Wiosna", emo: "🌱" },
    { namePL: "Lato", emo: "☀️" }, { namePL: "Lato", emo: "☀️" }, { namePL: "Lato", emo: "☀️" },
    { namePL: "Jesień", emo: "🍂" }, { namePL: "Jesień", emo: "🍂" }, { namePL: "Jesień", emo: "🍂" },
    { namePL: "Zima", emo: "❄️" }
];

// --- DATA: Phonetics & Translations ---
const mNames = {
    PL: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    PHO: ["STIH-chnya", "loo-TEH-goh", "MAR-tsah", "KFYET-nya", "MAH-yah", "CHERV-tsah", "LEEP-tsah", "SYERP-nya", "VZHE-shnya", "pazh-DZHER-neek-ah", "lees-toh-PAH-dah", "GROOD-nya"]
};

const dNames = {
    PL: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    PHO: ["nye-DZYEL-ah", "poh-nye-DZYA-wek", "VTOH-rek", "SHROH-dah", "CHVAR-tek", "PYOHN-tek", "soh-BOH-tah"]
};

const numPho = {
    1: "PYERV-shi", 2: "DROO-gi", 3: "TSHE-chee", 4: "CHVAR-ti", 5: "PYOHN-ti", 
    10: "dje-SHOHN-ti", 20: "dvoo-DZYESS-ti", 30: "tshi-DZYESS-ti"
};

// --- CORE FUNCTIONS ---
function init() {
    renderGrid();
    updateDisplay();
}

function renderGrid() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = "";
    document.getElementById('grid-month-yr').innerText = `${mNames.EN[currentM]} ${currentY}`;
    
    let firstDay = new Date(currentY, currentM, 1).getDay();
    let daysInMonth = new Date(currentY, currentM + 1, 0).getDate();
    let shift = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < shift; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        let el = document.createElement('div');
        el.className = 'grid-day';
        el.innerText = d;
        if (d === selD) el.classList.add('active');
        if (holidays[`${currentM+1}-${d}`]) el.classList.add('is-holiday');
        el.onclick = () => { selD = d; renderGrid(); updateDisplay(); };
        grid.appendChild(el);
    }
}

function updateDisplay() {
    let dateObj = new Date(currentY, currentM, selD);
    let dw = dateObj.getDay();
    let mPL = mNames.PL[currentM];
    let mPHO = mNames.PHO[currentM];
    
    // UI Updates
    document.getElementById('cal-h').innerText = mNames.EN[currentM];
    document.getElementById('cal-b').innerText = selD < 10 ? "0" + selD : selD;
    document.getElementById('cal-f').innerText = dNames.PL[dw].toUpperCase();
    
    let season = seasons[currentM];
    document.getElementById('s-emo').innerText = season.emo;
    document.getElementById('s-nam').innerText = season.namePL;

    // Logic for Polish String
    let dayStr = getOrdinalPL(selD);
    let polishFull = `${dayStr} ${mPL} ${currentY}`;
    let phoneticFull = `${getOrdinalPHO(selD)} ${mPHO} ${currentY}`;
    let englishFull = `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}`;

    const hol = holidays[`${currentM+1}-${selD}`];
    document.getElementById('hol-t').innerText = hol ? `🎉 ${hol[lang]}` : "";
    document.getElementById('cal-h').className = hol ? "cal-header is-holiday" : "cal-header";

    if (quizMode) {
        document.getElementById('pol-t').innerText = "???";
        document.getElementById('pho-t').innerText = "";
        document.getElementById('eng-t').innerText = "";
        document.getElementById('rev-b').style.display = "block";
    } else {
        document.getElementById('pol-t').innerText = polishFull;
        document.getElementById('pho-t').innerText = phoneticFull;
        document.getElementById('eng-t').innerText = lang === 'EN' ? englishFull : "";
        document.getElementById('rev-b').style.display = "none";
    }
}

// --- UTILITY ---
function getOrdinalPL(n) {
    const ords = ["pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty", "dziesiąty",
    "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty", "dwudziesty"];
    if (n <= 20) return ords[n-1];
    if (n === 30) return "trzydziesty";
    let tens = Math.floor(n/10) * 10;
    let units = n % 10;
    return units === 0 ? (tens === 20 ? "dwudziesty" : "trzydziesty") : (tens === 20 ? "dwudziesty " : "trzydziesty ") + ords[units-1];
}

function getOrdinalPHO(n) {
    // Simplified phonetic builder
    if (n <= 5) return numPho[n];
    return "..."; // In a real app, you'd map all 31
}

function getOrdinalEN(n) {
    let s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

// --- TOGGLES ---
function togglePhonetics() {
    showPhonetics = !showPhonetics;
    document.getElementById('p-tog').innerText = showPhonetics ? "ABC: ON" : "ABC: OFF";
    document.getElementById('pho-t').style.display = showPhonetics ? "block" : "none";
}

function toggleLang() { lang = (lang === 'PL') ? 'EN' : 'PL'; updateDisplay(); }
function toggleQuiz() { quizMode = !quizMode; document.getElementById('q-tog').innerText = quizMode ? "Quiz: ON" : "Quiz: OFF"; updateDisplay(); }
function reveal() { 
    document.getElementById('pol-t').innerText = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${currentY}`;
    if(showPhonetics) document.getElementById('pho-t').innerText = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]}`;
    document.getElementById('rev-b').style.display = "none";
}

function adjM(dir) { currentM += dir; if(currentM>11){currentM=0;currentY++} if(currentM<0){currentM=11;currentY--} renderGrid(); updateDisplay(); }
function setToday() { let t = new Date(); currentM = t.getMonth(); currentY = t.getFullYear(); selD = t.getDate(); renderGrid(); updateDisplay(); }
function roll() { currentM = Math.floor(Math.random()*12); selD = Math.floor(Math.random()*28)+1; renderGrid(); updateDisplay(); }

function speak(rate = 1) {
    const text = document.getElementById('pol-t').innerText;
    let ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'pl-PL';
    ut.rate = rate;
    window.speechSynthesis.speak(ut);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
}
