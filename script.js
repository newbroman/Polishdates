let currentM = new Date().getMonth();
let currentY = new Date().getFullYear();
let selD = new Date().getDate();
let lang = 'PL';
let quizMode = false;
let showPhonetics = false;

// --- DATA ---
const mNames = {
    PL: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"],
    PL_NOM: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    PHO: ["STIH-chnya", "loo-TEH-goh", "MAR-tsah", "KFYET-nya", "MAH-yah", "CHERV-tsah", "LEEP-tsah", "SYERP-nya", "VZHE-shnya", "pazh-DZHER-neek-ah", "lees-toh-PAH-dah", "GROOD-nya"]
};

const yPHO = {
    2024: "dva TIH-shyon-tse dva-DZYESS-tya chti-ri",
    2025: "dva TIH-shyon-tse dva-DZYESS-tya pyen-ch",
    2026: "dva TIH-shyon-tse dva-DZYESS-tya shesh-ch",
    2027: "dva TIH-shyon-tse dva-DZYESS-tya SHYED-em",
    2028: "dva TIH-shyon-tse dva-DZYESS-tya OH-shyem",
    2029: "dva TIH-shyon-tse dva-DZYESS-tya JEV-yench",
    2030: "dva TIH-shyon-tse tshi-DZYESS-tya"
};

const dNames = {
    PL: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    EN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    PHO: ["nye-DZYEL-ah", "poh-nye-DZYA-wek", "VTOH-rek", "SHROH-dah", "CHVAR-tek", "PYOHN-tek", "soh-BOH-tah"]
};

// --- CORE ---
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
    
    let polishFull = `${getOrdinalPL(selD)} ${mNames.PL[currentM]} ${currentY}`;
    let phoneticFull = `${getOrdinalPHO(selD)} ${mNames.PHO[currentM]} ${yPHO[currentY] || currentY}`;
    let englishFull = `${getOrdinalEN(selD)} of ${mNames.EN[currentM]}, ${currentY}`;

    if (quizMode) {
        document.getElementById('pol-t').innerText = "???";
        document.getElementById('eng-t').innerText = "";
        document.getElementById('pho-t').style.display = "none";
        document.getElementById('rev-b').style.display = "block";
    } else {
        document.getElementById('pol-t').innerText = polishFull;
        document.getElementById('eng-t').innerText = lang === 'EN' ? englishFull : "";
        document.getElementById('rev-b').style.display = "none";
        if (showPhonetics) {
            document.getElementById('pho-t').innerText = phoneticFull;
            document.getElementById('pho-t').style.display = "block";
        } else {
            document.getElementById('pho-t').style.display = "none";
        }
    }
}

// --- UTILITIES ---
function getOrdinalPL(n) {
    const ords = ["pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty", "dziesiąty",
    "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty", "dwudziesty"];
    if (n <= 20) return ords[n-1];
    if (n === 30) return "trzydziesty";
    let tens = Math.floor(n/10) * 10;
    let units = n % 10;
    return (tens === 20 ? "dwudziesty " : "trzydziesty ") + (units > 0 ? ords[units-1] : "");
}

function getOrdinalPHO(n) {
    const p = ["PYERV-shi", "DROO-gi", "TSHE-chee", "CHVAR-ti", "PYOHN-ti", "SHOO-sti", "SHYED-mi", "OOSH-mi", "JEV-yonti", "dje-SHOHN-ti"];
    return n <= 10 ? p[n-1] : "...";
}

function getOrdinalEN(n) {
    let s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

// --- ACTIONS ---
function togglePhonetics() {
    showPhonetics = !showPhonetics;
    document.getElementById('p-tog').innerText = showPhonetics ? "ABC: ON" : "ABC: OFF";
    updateDisplay();
}

function toggleLang() { lang = (lang === 'PL') ? 'EN' : 'PL'; renderGrid(); updateDisplay(); }
function toggleQuiz() { quizMode = !quizMode; document.getElementById('q-tog').innerText = quizMode ? "Quiz: ON" : "Quiz: OFF"; updateDisplay(); }
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

function toggleDark() { document.body.classList.toggle('dark-mode'); }
