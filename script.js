let d=1, m=0, y=2026, iQ=false, iR=true, ln='EN';
const mN=["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
const mG=["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
const dW=["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];
const dE=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const dO=["","pierwszy","drugi","trzeci","czwarty","piąty","szósty","siódmy","ósmy","dziewiąty","dziesiąty","jedenasty","dwunasty","trzynasty","czternasty","piętnasty","szesnasty","siedemnasty","osiemnasty","dziewiętnasty","dwudziesty","dwudziesty pierwszy","dwudziesty drugi","dwudziesty trzeci","dwudziesty czwarty","dwudziesty piąty","dwudziesty szósty","dwudziesty siódmy","dwudziesty ósmy","dwudziesty dziewiąty","trzydziesty","trzydziesty pierwszy"];

// Comprehensive Cultural Data
const cultData = {
    months: {
        0: "Styczeń: From 'stykać' (to meet). It marks the meeting of the old and new year.",
        1: "Luty: From 'luty' (fierce/cruel), describing the biting, bitter frost in Old Polish.",
        2: "Marzec: Named after Mars, but the proverb 'W marcu jak w garncu' warns of unpredictable weather.",
        3: "Kwiecień: From 'kwiaty' (flowers), the month of blooming.",
        4: "Maj: Named after the Roman goddess Maia; famous for the 'Majówka' long weekend.",
        5: "Czerwiec: From 'czerw' (larva), historically used to create red dye from insects.",
        6: "Lipiec: Named after 'lipa' (linden tree), which blooms and scents the air this month.",
        7: "Sierpień: From 'sierp' (sickle), the traditional month for harvest and 'Dożynki' festivals.",
        8: "Wrzesień: Named after 'wrzos' (heather), which begins to bloom in late summer.",
        9: "Październik: From 'paździerze' (flax shives), relating to traditional autumn textile work.",
        10: "Listopad: From 'liście' (leaves) and 'padać' (to fall)—the heart of the Golden Polish Autumn.",
        11: "Grudzień: From 'gruda' (frozen clod), describing the hard, frozen earth of early winter."
    },
    holidays: {
        "Nowy Rok": "January 1st. A day of rest after 'Sylwester' (New Year's Eve) celebrations.",
        "Trzech Króli": "Epiphany. Poles often write 'K+M+B' on their doors with blessed chalk.",
        "Święto Pracy": "Labor Day. Often spent outdoors or 'grillowanie' with friends.",
        "Konstytucji 3 Maja": "Constitution Day, honoring the 1791 document, the first in Europe.",
        "Wszystkich Świętych": "All Saints' Day. A beautiful night where cemeteries glow with thousands of candles.",
        "Niepodległości": "Independence Day, marking Poland's 1918 return to the world map.",
        "Boże Narodzenie": "Christmas. 'Wigilia' (Eve) involves 12 dishes and sharing the 'opłatek' wafer."
    }
};

function showCulture() {
    const hol = getH(d, m);
    let html = `<div class="cult-card"><h3>📅 Month: ${mN[m]}</h3><p>${cultData.months[m]}</p></div>`;
    if(hol) {
        html += `<div class="cult-card" style="border-left-color:var(--holiday)"><h3>✨ Holiday: ${hol}</h3><p>${cultData.holidays[hol] || "A significant day in the Polish calendar."}</p></div>`;
    }
    html += `<div class="cult-card"><h3>🎓 Grammar Spotlight</h3><p>Notice that we say <b>'Pierwszego Maja'</b> (Genitive) rather than <b>'Pierwszy Maj'</b> (Nominative).</p></div>`;
    document.getElementById('cultContent').innerHTML = html;
    document.getElementById('cultModal').style.display='block';
}

function closeCulture() { document.getElementById('cultModal').style.display='none'; }

function getS(m) { 
    if(m==11||m<=1) return {n:"Zima", e:"❄️"}; 
    if(m>=2&&m<=4) return {n:"Wiosna", e:"🐇"}; 
    if(m>=5&&m<=7) return {n:"Lato", e:"🌞"}; 
    return {n:"Jesień", e:"🍂"}; 
}

function getH(d, m) { 
    const h={"1-0":"Nowy Rok","6-0":"Trzech Króli","1-4":"Święto Pracy","3-4":"Konstytucji 3 Maja","15-7":"Wniebowzięcie NMP","1-10":"Wszystkich Świętych","11-10":"Niepodległości","25-11":"Boże Narodzenie","26-11":"Boże Narodzenie"}; 
    return h[`${d}-${m}`]||null; 
}

function spellY(yr) {
    const p={19:"tysiąc dziewięćset",20:"dwa tysiące"}, t=["","dziesiątego","dwudziestego","trzydziestego","czterdziestego","pięćdziesiątego","sześćdziesiątego","siedemdziesiątego","osiemdziesiątego","dziewięćdziesiątego"], o=["","pierwszego","drugiego","trzeciego","czwartego","piątego","szóstego","siódmego","ósmego","dziewiątego"], ts=["dziesiątego","jedenastego","dwunastego","trzynastego","czternastego","piętnastego","szesnastego","siedemnastego","osiemnastego","dziewiętnastego"];
    let c=Math.floor(yr/100), l=yr%100, r=p[c]+" "; if(l<10) r+=o[l]; else if(l<20) r+=ts[l-10]; else r+=t[Math.floor(l/10)]+(l%10>0?" "+o[l%10]:""); return r;
}

function update() {
    let dt=new Date(y,m,d), dw=dt.getDay(), hol=getH(d,m), sea=getS(m);
    document.getElementById('cal-h').innerText = mN[m].toUpperCase();
    document.getElementById('cal-h').className = hol ? "cal-header is-holiday" : "cal-header";
    document.getElementById('cal-b').innerText = dW[dw];
    document.getElementById('cal-f').innerText = dO[d];
    document.getElementById('dv').innerText = d.toString().padStart(2,'0');
    document.getElementById('mv').innerText = (m+1).toString().padStart(2,'0');
    document.getElementById('yv').innerText = y;
    document.getElementById('s-emo').innerText = sea.e;
    document.getElementById('s-nam').innerText = sea.n;
    document.getElementById('hol-t').innerText = hol ? `★ ${hol} ★` : "";
    
    let pol = `${dW[dw]}, ${dO[d]} ${mG[m]} ${spellY(y)} roku`;
    let eng = `${dE[dw]}, ${d} ${mN[m]} ${y}`;
    
    const pt = document.getElementById('pol-t'), et = document.getElementById('eng-t'), rb = document.getElementById('rev-b');
    if(iQ && !iR) { 
        pt.innerText = ln=='EN'?"How to say?":"Jak to powiedzieć?";
        et.innerText="";
        rb.style.display="block";
    } else { 
        pt.innerText=pol;
        et.innerText=eng;
        rb.style.display="none";
        if(iR) speak(1);
    }
}

function adjD(v){let x=new Date(y,m+1,0).getDate(); d=(d+v-1+x)%x+1; iR=!iQ; update();}
function adjM(v){m=(m+v+12)%12; let x=new Date(y,m+1,0).getDate(); if(d>x)d=x; iR=!iQ; update();}
function adjY(v){if(y+v>=1900&&y+v<=2099)y+=v; iR=!iQ; update();}
function setToday(){let n=new Date(); d=n.getDate(); m=n.getMonth(); y=n.getFullYear(); iR=!iQ; update();}
function roll(){y=2026; m=Math.floor(Math.random()*12); d=Math.floor(Math.random()*28)+1; iR=!iQ; update();}
function reveal(){iR=true; update();}
function toggleQuiz(){iQ=!iQ; iR=!iQ; document.getElementById('q-tog').innerText=iQ?"Quiz: ON":"Quiz: OFF"; update();}
function toggleDark(){document.body.classList.toggle('dark-mode');}
function toggleLang(){ln=ln=='EN'?'PL':'EN'; update();}

function speak(rate) {
    window.speechSynthesis.cancel();
    const text = document.getElementById('pol-t').innerText;
    if(text.includes("?")) return;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'pl-PL';
    msg.rate = rate;
    window.speechSynthesis.speak(msg);
}

function init() { setToday(); }
