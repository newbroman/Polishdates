let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let quizMode = false;
let showPhonetics = false;

// --- DATA: Holidays ---
const holidays = {
    "1-1": { PL: "Nowy Rok", EN: "New Year's Day" },
    "1-6": { PL: "Trzech Króli", EN: "Three Kings' Day" },
    "5-1": { PL: "Święto Pracy", EN: "Labour Day" },
    "5-3": { PL: "Święto Konstytucji", EN: "Constitution Day" },
    "8-15": { PL: "Wniebowzięcie NMP", EN: "Assumption Day" },
    "11-1": { PL: "Wszystkich Świętych", EN: "All Saints' Day" },
    "11-11": { PL: "Święto Niepodległości", EN: "Independence Day" },
    "12-25": { PL: "Boże Narodzenie", EN: "Christmas Day" },
    "12-26": { PL: "Drugi Dzień Świąt", EN: "Boxing Day" }
};

// --- DATA: Seasons ---
const seasons = [
    { namePL: "Zima", emo: "❄️" }, { namePL: "Zima", emo: "❄️" },
    { namePL: "Wiosna", emo: "🌱" }, { namePL: "Wiosna", emo: "🌱" }, { namePL: "Wiosna", emo: "🌱" },
    { namePL: "Lato", emo: "☀️" }, { namePL: "Lato", emo: "☀️" }, { namePL: "Lato", emo: "☀️" },
    { namePL: "Jesień", emo: "🍂" }, { namePL: "Jesień", emo: "🍂" }, { namePL: "Jesień", emo: "🍂" },
    { namePL: "Zima", emo: "❄️" }
];

// --- DATA: Names & Phonetics ---
const mNames = {
    PL: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"],
    PL_NOM: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    PHO: ["STIH-chnya", "loo-TEH-goh", "MAR-tsah", "KFYET-nya", "MAH-yah", "CHERV-tsah", "LEEP-tsah", "SYERP-nya", "VZHE-shnya", "pazh-DZHER-neek-ah", "lees-toh-PAH-dah", "GROOD-nya"]
};

const dNames = {
    PL: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    EN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    PHO: ["nye-DZYEL-ah", "poh-nye-DZYA-wek", "VTOH-rek", "SHROH-dah", "CHVAR-tek", "PYOHN-tek", "soh-BOH-tah"]
};

const yPHO = {
    2024: "dva TIH-shyon-tse dva-DZYESS-tya chti-ri",
    2025: "dva TIH-shyon-tse dva-DZYESS-tya pyench",
    2026: "dva TIH-shyon-tse dva-DZYESS-tya shesh-ch",
    2027: "dva TIH-shyon-tse dva-DZYESS-tya SHYED-em",
    2028: "dva TIH-shyon-tse dva-DZYESS-tya OH-shyem",
    2029: "dva TIH-shyon-tse dva-DZYESS-tya JEV-yench",
    2030: "dva TIH-shyon-tse tshi-DZYESS-tya"
};

const cultureData = [
    { title: "Names of Months", text: "Unlike English, Polish month names are derived from nature. For example, 'Styczeń' (January) comes from 'stykać' (to meet/join), as the old year meets the new." },
    { title: "The Genitive Case", text: "When saying dates in Polish, we use the genitive case of the month (e.g., 'stycznia' instead of 'styczeń'). This literally translates to 'the 1st OF January'." },
    { title: "Naming Days (Imieniny)", text: "In Poland, 'Imieniny' is often more important than birthdays. Every day on the calendar is associated with specific names." },
    { title: "Constitution Day", text: "May 3rd commemorates the Constitution of 1791, the first modern constitution in Europe." }
];

// --- CORE LOGIC ---
function init() { renderGrid(); updateDisplay(); }

function renderGrid() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = "";
    const monthTitle = lang === 'PL' ? mNames.PL_NOM[currentM] : mNames.EN[currentM];
    document.getElementById('grid-month-yr').innerText = `${monthTitle} ${currentY}`;
    
    let firstDay = new Date(currentY, currentM, 1).getDay();
    let daysInMonth = new Date(currentY, currentM + 1, 0).getDate();
    let shift = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < shift; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        let el = document.createElement('div');
        el.className = 'grid-day';
        el.innerText = d;
        if (holidays[`${currentM + 1}-${d}`]) el.classList.add('is-holiday');
        if (d === selD) el.classList.add('active');
        el.onclick = () => { selD = d; renderGrid(); updateDisplay(); };
        grid.appendChild(el);
    }
}

function updateDisplay() {
    let dateObj = new Date(currentY, currentM, selD);
    let dw = dateObj.getDay();
    
    document.getElementById('cal-h').innerText = lang === 'PL' ? mNames.PL_NOM[currentM].toUpperCase() : mNames.EN[currentM].toUpperCase();
    document.getElementById('cal-b').innerText = selD < 10 ? "0" + selD : selD;
    document.getElementById('cal-f').innerText = lang === 'PL' ? dNames.PL[dw].toUpperCase() : dNames.EN[dw].toUpperCase();
    
    let season = seasons[currentM];
    document.getElementById('s-emo').innerText = season.emo;
    document.getElementById('s-nam').innerText = season.namePL;

    const hol = holidays[`${currentM + 1}-${selD}`];
    document.getElementById('hol-t').innerText = hol ? `🎉 ${hol[lang]}` : "";
    document.getElementById('cal-h').className = hol ? "cal-header is-holiday" : "cal-header";

    let polishFull = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${currentY}`;
    let phoneticFull = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]} ${yPHO[currentY] || currentY}`;
    let englishFull = `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}`;

    if (quizMode) {
        document.getElementById('pol-t').innerText = "???";
        document.getElementById('pho-t').style.display = "none";
        document.getElementById('eng-t').innerText = "";
        document.getElementById('rev-b').style.display = "block";
    } else {
        document.getElementById('pol-t').innerText = polishFull;
        document.getElementById('eng-t').innerText = lang === 'EN' ? englishFull : "";
        document.getElementById('rev-b').style.display = "none";
        document.getElementById('pho-t').style.display = showPhonetics ? "block" : "none";
        if (showPhonetics) document.getElementById('pho-t').innerText = phoneticFull;
    }
}

// --- UTILITIES ---
function getOrdinalPL(n) {
    const ords = ["pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty", "dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty", "dwudziesty"];
    if (n <= 20) return ords[n-1];
    if (n === 30) return "trzydziesty";
    let tens = Math.floor(n/10) * 10;
    let units = n % 10;
    let prefix = tens === 20 ? "dwudziesty " : "trzydziesty ";
    return units === 0 ? prefix.trim() : prefix + ords[units-1];
}

function getOrdinalPHO(n) {
    const p = ["PYERV-shi", "DROO-gi", "TSHE-chee", "CHVAR-ti", "PYOHN-ti", "SHOO-sti", "SHYED-mi", "OOSH-mi", "JEV-yonti", "dje-SHOHN-ti", "ye-den-ASS-ti", "dvoo-nass-ti", "tshi-nass-ti", "chter-nass-ti", "pyent-nass-ti", "shes-nass-ti", "syed-em-nass-ti", "osh-em-nass-ti", "jev-yent-nass-ti", "dvoo-DZYESS-ti"];
    if (n <= 20) return p[n-1];
    if (n === 30) return "tshi-DZYESS-ti";
    let prefix = Math.floor(n/10) === 2 ? "dvoo-DZYESS-ti " : "tshi-DZYESS-ti ";
    return prefix + (n % 10 > 0 ? p[(n % 10) - 1] : "");
}

function getOrdinalEN(n) { let s = ["th","st","nd","rd"], v = n % 100; return n + (s[(v-20)%10] || s[v] || s[0]); }

// --- ACTIONS ---
function toggleLang() { lang = (lang === 'PL') ? 'EN' : 'PL'; renderGrid(); updateDisplay(); }
function togglePhonetics() { showPhonetics = !showPhonetics; document.getElementById('p-tog').innerText = showPhonetics ? "ABC: ON" : "ABC: OFF"; updateDisplay(); }
function toggleQuiz() { quizMode = !quizMode; document.getElementById('q-tog').innerText = quizMode ? "Quiz: ON" : "Quiz: OFF"; updateDisplay(); }
function toggleDark() { document.body.classList.toggle('dark-mode'); }
function adjM(dir) { currentM += dir; if(currentM>11){currentM=0;currentY++} if(currentM<0){currentM=11;currentY--} renderGrid(); updateDisplay(); }
function setToday() { let t = new Date(); currentM = t.getMonth(); currentY = t.getFullYear(); selD = t.getDate(); renderGrid(); updateDisplay(); }
function roll() { currentM = Math.floor(Math.random()*12); selD = Math.floor(Math.random()*28)+1; renderGrid(); updateDisplay(); }
function reveal() { quizMode = false; updateDisplay(); quizMode = true; document.getElementById('rev-b').style.display = "none"; }
function showCulture() {
    const modal = document.getElementById('cultModal');
    const content = document.getElementById('cultContent');
    content.innerHTML = "";
    cultureData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'cult-card';
        card.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
        content.appendChild(card);
    });
    modal.style.display = "block";
}
function closeCulture() { document.getElementById('cultModal').style.display = "none"; }
function speak(rate = 1) {
    const text = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${currentY}`;
    let ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'pl-PL'; ut.rate = rate; window.speechSynthesis.speak(ut);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}
