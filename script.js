let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let quizMode = false;
let showPhonetics = false;

// --- DATA ---
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
    { title: "Names of Months", text: "Polish month names are derived from nature. 'Styczeń' comes from 'stykać' (to join), as the old year meets the new." },
    { title: "The Genitive Case", text: "Dates use the genitive month (e.g., 'stycznia'). It translates to 'the 1st OF January'." },
    { title: "Naming Days", text: "In Poland, 'Imieniny' (Name Days) are often more important than birthdays." },
    { title: "Constitution Day", text: "May 3rd commemorates the first modern constitution in Europe (1791)." }
];

// --- CORE LOGIC ---
function init() {
    updateYearlyHolidays(currentY);
    renderGrid();
    updateDisplay();
}

function updateYearlyHolidays(year) {
    const east = getEaster(year);
    holidays[`${east.month + 1}-${east.day}`] = { PL: "Wielkanoc", EN: "Easter Sunday" };
    const emDate = new Date(year, east.month, east.day + 1);
    holidays[`${emDate.getMonth() + 1}-${emDate.getDate()}`] = { PL: "Poniedziałek Wielkanocny", EN: "Easter Monday" };
}

function getEaster(year) {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100,
          d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
          g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
          i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
          m = Math.floor((a + 11 * h + 22 * l) / 451);
    return { month: Math.floor((h + l - 7 * m + 114) / 31) - 1, day: ((h + l - 7 * m + 114) % 31) + 1 };
}

function getSeason(month, day) {
    if ((month == 11 && day >= 21) || month <= 1 || (month == 2 && day < 21)) return { name: "Zima", emo: "❄️" };
    if ((month == 2 && day >= 21) || month <= 4 || (month == 5 && day < 21)) return { name: "Wiosna", emo: "🌱" };
    if ((month == 5 && day >= 21) || month <= 7 || (month == 8 && day < 21)) return { name: "Lato", emo: "☀️" };
    return { name: "Jesień", emo: "🍂" };
}

function renderGrid() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = "";
    document.getElementById('grid-month-yr').innerText = `${lang === 'PL' ? mNames.PL_NOM[currentM] : mNames.EN[currentM]} ${currentY}`;
    
    let firstDay = new Date(currentY, currentM, 1).getDay();
    let shift = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < shift; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= new Date(currentY, currentM + 1, 0).getDate(); d++) {
        let el = document.createElement('div');
        el.className = `grid-day ${holidays[`${currentM+1}-${d}`] ? 'is-holiday' : ''} ${d === selD ? 'active' : ''}`;
        el.innerText = d;
        el.onclick = () => { selD = d; renderGrid(); updateDisplay(); };
        grid.appendChild(el);
    }
}

function updateDisplay() {
    let dw = new Date(currentY, currentM, selD).getDay();
    document.getElementById('cal-h').innerText = (lang === 'PL' ? mNames.PL_NOM[currentM] : mNames.EN[currentM]).toUpperCase();
    document.getElementById('cal-b').innerText = selD.toString().padStart(2, '0');
    document.getElementById('cal-f').innerText = (lang === 'PL' ? dNames.PL[dw] : dNames.EN[dw]).toUpperCase();
    
    // Dynamic Season Logic
    let season = getSeason(currentM, selD);
    document.getElementById('s-emo').innerText = season.emo;
    document.getElementById('s-nam').innerText = season.name;

    const hol = holidays[`${currentM + 1}-${selD}`];
    document.getElementById('hol-t').innerText = hol ? `🎉 ${hol[lang]}` : "";
    document.getElementById('cal-h').classList.toggle('is-holiday', !!hol);

    if (quizMode) {
        document.getElementById('pol-t').innerText = "???";
        document.getElementById('pho-t').style.display = "none";
        document.getElementById('eng-t').innerText = "";
        document.getElementById('rev-b').style.display = "block";
    } else {
        document.getElementById('pol-t').innerText = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${currentY}`;
        document.getElementById('eng-t').innerText = lang === 'EN' ? `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}` : "";
        document.getElementById('rev-b').style.display = "none";
        document.getElementById('pho-t').style.display = showPhonetics ? "block" : "none";
        if (showPhonetics) document.getElementById('pho-t').innerText = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]} ${yPHO[currentY] || currentY}`;
    }
}

// --- HELPERS & ACTIONS ---
function getOrdinalPL(n) {
    const ords = ["pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty", "dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty", "dwudziesty"];
    if (n <= 20) return ords[n-1];
    if (n === 30) return "trzydziesty";
    let tens = Math.floor(n/10) * 10;
    return (tens === 20 ? "dwudziesty " : "trzydziesty ") + (n % 10 > 0 ? ords[(n % 10)-1] : "");
}

function getOrdinalPHO(n) {
    const p = ["PYERV-shi", "DROO-gi", "TSHE-chee", "CHVAR-ti", "PYOHN-ti", "SHOO-sti", "SHYED-mi", "OOSH-mi", "JEV-yonti", "dje-SHOHN-ti", "ye-den-ASS-ti", "dvoo-nass-ti", "tshi-nass-ti", "chter-nass-ti", "pyent-nass-ti", "shes-nass-ti", "syed-em-nass-ti", "osh-em-nass-ti", "jev-yent-nass-ti", "dvoo-DZYESS-ti"];
    if (n <= 20) return p[n-1];
    if (n === 30) return "tshi-DZYESS-ti";
    return (Math.floor(n/10) === 2 ? "dvoo-DZYESS-ti " : "tshi-DZYESS-ti ") + (n % 10 > 0 ? p[(n % 10) - 1] : "");
}

function getOrdinalEN(n) { let s = ["th","st","nd","rd"], v = n % 100; return n + (s[(v-20)%10] || s[v] || s[0]); }

function toggleLang() { lang = (lang === 'PL') ? 'EN' : 'PL'; renderGrid(); updateDisplay(); }
function togglePhonetics() { showPhonetics = !showPhonetics; document.getElementById('p-tog').innerText = showPhonetics ? "ABC: ON" : "ABC: OFF"; updateDisplay(); }
function toggleQuiz() { quizMode = !quizMode; document.getElementById('q-tog').innerText = quizMode ? "Quiz: ON" : "Quiz: OFF"; updateDisplay(); }
function toggleDark() { document.body.classList.toggle('dark-mode'); }
function adjM(dir) { currentM += dir; if(currentM>11){currentM=0;currentY++; updateYearlyHolidays(currentY);} if(currentM<0){currentM=11;currentY--; updateYearlyHolidays(currentY);} renderGrid(); updateDisplay(); }
function setToday() { let t = new Date(); currentM = t.getMonth(); currentY = t.getFullYear(); selD = t.getDate(); updateYearlyHolidays(currentY); renderGrid(); updateDisplay(); }
function roll() { currentM = Math.floor(Math.random()*12); selD = Math.floor(Math.random()*28)+1; renderGrid(); updateDisplay(); }
function reveal() { quizMode = false; updateDisplay(); quizMode = true; document.getElementById('rev-b').style.display = "none"; }

function showCulture() {
    const content = document.getElementById('cultContent');
    const item = cultureData[selD % cultureData.length];
    content.innerHTML = `<div class="cult-card"><h3>${item.title}</h3><p>${item.text}</p></div>`;
    document.getElementById('cultModal').style.display = "block";
}
function closeCulture() { document.getElementById('cultModal').style.display = "none"; }
function speak(rate = 1) {
    let ut = new SpeechSynthesisUtterance(document.getElementById('pol-t').innerText);
    ut.lang = 'pl-PL'; ut.rate = rate; window.speechSynthesis.speak(ut);
}
