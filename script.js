// Global State
let d = 1, m = 0, y = 2026, iQ = false, iR = true, ln = 'EN';

const mN = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const mE = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mG = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
const dW = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
const dE = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dO = ["", "pierwszy", "drugi", "trzeci", "czwarty", "piąty", "szósty", "siódmy", "ósmy", "dziewiąty", "dziesiąty", "jedenasty", "dwunasty", "trzynasty", "czternasty", "piętnasty", "szesnasty", "siedemnasty", "osiemnasty", "dziewiętnasty", "dwudziesty", "dwudziesty pierwszy", "dwudziesty drugi", "dwudziesty trzeci", "dwudziesty czwarty", "dwudziesty piąty", "dwudziesty szósty", "dwudziesty siódmy", "dwudziesty ósmy", "dwudziesty dziewiąty", "trzydziesty", "trzydziesty pierwszy"];

const trans = {
    'EN': { 'title': 'Learn to Say Polish Dates', 'actual': 'TODAY', 'random': 'RANDOM', 'reveal': 'REVEAL', 'repeat': '🔊 REPEAT', 'slow': '🐢 SLOW', 'quiz': 'Quiz: ', 'cult': '🏛️ Culture', 'close': 'CLOSE', 'qText': 'How to say?' },
    'PL': { 'title': 'Nauka Polskich Dat', 'actual': 'DZISIAJ', 'random': 'LOSUJ', 'reveal': 'POKAŻ', 'repeat': '🔊 POWTÓRZ', 'slow': '🐢 WOLNIEJ', 'quiz': 'Quiz: ', 'cult': '🏛️ Kultura', 'close': 'ZAMKNIJ', 'qText': 'Jak to powiedzieć?' }
};

const cultData = {
    months: {
        0: "Styczeń: From 'stykać' (to meet). It marks the meeting of the old and new year.",
        1: "Luty: From 'luty' (fierce/cruel), describing the biting, bitter frost in Old Polish.",
        2: "Marzec: Named after Mars; 'W marcu jak w garncu' refers to unpredictable weather.",
        3: "Kwiecień: From 'kwiaty' (flowers), the month of blooming.",
        4: "Maj: Named after the Roman goddess Maia; famous for 'Majówka' picnics.",
        5: "Czerwiec: From 'czerw' (larva), historically used for red dye production.",
        6: "Lipiec: Named after 'lipa' (linden tree), which scents the air this month.",
        7: "Sierpień: From 'sierp' (sickle), the traditional month for harvest.",
        8: "Wrzesień: Named after 'wrzos' (heather), blooming in late summer.",
        9: "Październik: From 'paździerze' (flax shives), from traditional textile work.",
        10: "Listopad: From 'liście' (leaves) and 'padać' (to fall).",
        11: "Grudzień: From 'gruda' (frozen clod), describing the frozen earth."
    },
    holidays: {
        "Nowy Rok": "New Year's Day. A quiet day of recovery after 'Sylwester' parties.",
        "Trzech Króli": "Epiphany. Poles write 'K+M+B' on doors with blessed chalk.",
        "Wielkanoc": "Easter Sunday. Families share blessed eggs and 'żurek' soup.",
        "Poniedziałek Wielkanocny": "Easter Monday. Known as 'Śmigus-Dyngus' (Wet Monday) water fights.",
        "Święto Pracy": "Labor Day. Start of the 'Majówka' long weekend.",
        "Konstytucji 3 Maja": "Constitution Day. Honors Europe's first modern constitution (1791).",
        "Zesłanie Ducha Świętego": "Pentecost. Often called 'Zielone Świątki'.",
        "Boże Ciało": "Corpus Christi. Outdoor processions through flower-strewn streets.",
        "Wniebowzięcie NMP": "Assumption Day and Armed Forces Day.",
        "Wszystkich Świętych": "All Saints' Day. Cemeteries glow with thousands of candles.",
        "Niepodległości": "Independence Day. Marks the return of Polish sovereignty in 1918.",
        "Boże Narodzenie": "Christmas. 'Wigilia' (Eve) is the main meatless 12-dish feast."
    }
};

function getEaster(year) {
    let a = year % 19, b = Math.floor(year / 100), c = year % 100,
        d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
        g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451),
        mo = Math.floor((h + l - 7 * m + 114) / 31),
        da = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, mo - 1, da);
}

function getH(day, month, year) {
    const fixed = { "1-0": "Nowy Rok", "6-0": "Trzech Króli", "1-4": "Święto Pracy", "3-4": "Konstytucji 3 Maja", "15-7": "Wniebowzięcie NMP", "1-10": "Wszystkich Świętych", "11-10": "Niepodległości", "25-11": "Boże Narodzenie", "26-11": "Boże Narodzenie" };
    let key = `${day}-${month}`;
    if (fixed[key]) return fixed[key];
    let easter = getEaster(year), check = new Date(year, month, day);
    let diff = Math.round((check - easter) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Wielkanoc";
    if (diff === 1) return "Poniedziałek Wielkanocny";
    if (diff === 49) return "Zesłanie Ducha Świętego";
    if (diff === 60) return "Boże Ciało";
    return null;
}

function spellY(yr) {
    const p={19:"tysiąc dziewięćset",20:"dwa tysiące"}, t=["","dziesiątego","dwudziestego","trzydziestego","czterdziestego","pięćdziesiątego","sześćdziesiątego","siedemdziesiątego","osiemdziesiątego","dziewięćdziesiątego"], o=["","pierwszego","drugiego","trzeciego","czwartego","piątego","szóstego","siódmego","ósmego","dziewiątego"], ts=["dziesiątego","jedenastego","dwunastego","trzynastego","czternastego","piętnastego","szesnastego","siedemnastego","osiemnastego","dziewiętnastego"];
    let c=Math.floor(yr/100), l=yr%100, r=p[c]+" "; if(l<10) r+=o[l]; else if(l<20) r+=ts[l-10]; else r+=t[Math.floor(l/10)]+(l%10>0?" "+o[l%10]:""); return r;
}

function renderGrid() {
    const grid = document.getElementById('calendar-grid');
    const display = document.getElementById('grid-month-yr');
    grid.innerHTML = "";
    display.innerText = `${mN[m]} ${y}`;
    let firstDay = new Date(y, m, 1).getDay();
    let shift = (firstDay === 0) ? 6 : firstDay - 1; 
    let daysInMonth = new Date(y, m + 1, 0).getDate();
    for (let i = 0; i < shift; i++) {
        let empty = document.createElement('div');
        empty.className = "grid-day";
        grid.appendChild(empty);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        let dayEl = document.createElement('div');
        dayEl.className = "grid-day";
        dayEl.innerText = day;
        if (getH(day, m, y)) dayEl.classList.add('is-holiday');
        if (day === d) dayEl.classList.add('active');
        let now = new Date();
        if (day === now.getDate() && m === now.getMonth() && y === now.getFullYear()) dayEl.classList.add('today');
        dayEl.onclick = () => { d = day; iR = !iQ; update(); };
        grid.appendChild(dayEl);
    }
}

function update(isAutoSpeak = true) {
    let dt = new Date(y, m, d), dw = dt.getDay(), hol = getH(d, m, y), sea = { n: "Zima", e: "❄️" };
    if (m >= 2 && m <= 4) sea = { n: "Wiosna", e: "🐇" }; 
    else if (m >= 5 && m <= 7) sea = { n: "Lato", e: "🌞" }; 
    else if (m >= 8 && m <= 10) sea = { n: "Jesień", e: "🍂" };
    const t = trans[ln];
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('btn-actual').innerText = t.actual;
    document.getElementById('btn-random').innerText = t.random;
    document.getElementById('btn-repeat').innerText = t.repeat;
    document.getElementById('btn-slow').innerText = t.slow;
    document.getElementById('q-tog').innerText = t.quiz + (iQ ? "ON" : "OFF");
    document.getElementById('btn-cult-text').innerText = t.cult;
    document.getElementById('btn-close').innerText = t.close;
    document.getElementById('s-emo').innerText = sea.e;
    document.getElementById('s-nam').innerText = sea.n;
    document.getElementById('cal-h').innerText = mN[m];
    document.getElementById('cal-h').className = hol ? "cal-header is-holiday" : "cal-header";
    document.getElementById('cal-b').innerText = d;
    document.getElementById('cal-f').innerText = dW[dw];
    document.getElementById('hol-t').innerText = hol ? `★ ${hol} ★` : "";
    let pol = `${dW[dw]}, ${dO[d]} ${mG[m]} ${spellY(y)} roku`;
    let eng = `${dE[dw]}, ${d} ${mE[m]} ${y}`;
    const pt = document.getElementById('pol-t'), et = document.getElementById('eng-t'), rb = document.getElementById('rev-b');
    if (iQ && !iR) { pt.innerText = t.qText; et.innerText = ""; rb.style.display = "block"; } 
    else { pt.innerText = pol; et.innerText = eng; rb.style.display = "none"; if (iR && isAutoSpeak) speak(1); }
    renderGrid();
}

function adjM(v) { m += v; if (m > 11) { m = 0; y++; } else if (m < 0) { m = 11; y--; } let max = new Date(y, m + 1, 0).getDate(); if (d > max) d = max; update(); }
function setToday() { let n = new Date(); d = n.getDate(); m = n.getMonth(); y = n.getFullYear(); iR = !iQ; update(); }
function roll() { y = 2026; m = Math.floor(Math.random() * 12); d = Math.floor(Math.random() * 28) + 1; iR = !iQ; update(); }
function reveal() { iR = true; update(true); }
function toggleQuiz() { iQ = !iQ; iR = !iQ; update(false); }
function toggleDark() { document.body.classList.toggle('dark-mode'); }
function toggleLang() { ln = ln === 'EN' ? 'PL' : 'EN'; update(false); }

function showCulture() {
    const hol = getH(d, m, y);
    let html = `<div class="cult-card"><h3>📅 Month: ${mN[m]}</h3><p>${cultData.months[m]}</p></div>`;
    if (hol) { html += `<div class="cult-card" style="border-left-color:var(--holiday)"><h3>✨ Holiday: ${hol}</h3><p>${cultData.holidays[hol] || "A significant day in Poland."}</p></div>`; }
    html += `<div class="cult-card"><h3>🎓 Grammar Tip</h3><p>Dates use the <b>Genitive case</b>. It's like saying 'the 1st <b>of</b> May'.</p></div>`;
    document.getElementById('cultContent').innerHTML = html;
    document.getElementById('cultModal').style.display = 'block';
}

function closeCulture() { document.getElementById('cultModal').style.display = 'none'; }
function speak(rate) { window.speechSynthesis.cancel(); let text = `${dW[new Date(y, m, d).getDay()]}, ${dO[d]} ${mG[m]} ${spellY(y)} roku`; const msg = new SpeechSynthesisUtterance(text); msg.lang = 'pl-PL'; msg.rate = rate; window.speechSynthesis.speak(msg); }
function init() { setToday(); }
