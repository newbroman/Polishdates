function getYearWordsPL(year, isFullPhrase) {
    if (!isFullPhrase) return year.toString();
    if (year === 0) return "roku zerowego";

    const units = ["", "pierwszego", "drugiego", "trzeciego", "czwartego", "piątego", "szóstego", "siódmego", "ósmego", "dziewiątego"];
    const teens = ["dziesiątego", "jedenastego", "dwunastego", "trzynastego", "czternastego", "piętnastego", "szesnastego", "siedemnasty", "osiemnastego", "dziewiętnastego"];
    const tens = ["", "", "dwudziestego", "trzydziestego", "czterdziestego", "pięćdziesiątego", "sześćdziesiątego", "siedemdziesiątego", "osiemdziesiątego", "dziewięćdziesiątego"];
    const hundreds = ["", "stu", "dwustu", "trzystu", "czterystu", "pięćsetnego", "sześćsetnego", "siedemsetnego", "osiemsetnego", "dziewięćsetnego"];
    const thousands = ["", "tysiąc", "dwa tysiące", "trzy tysiące"];

    let result = "";
    if (year >= 1000) result += thousands[Math.floor(year / 1000)] + " ";
    let remainder = year % 1000;

    if (remainder >= 100) {
        result += hundreds[Math.floor(remainder / 100)] + " ";
        remainder %= 100;
    }

    if (remainder >= 20) {
        result += tens[Math.floor(remainder / 10)] + " ";
        if (remainder % 10 !== 0) result += units[remainder % 10];
    } else if (remainder >= 10) {
        result += teens[remainder - 10];
    } else {
        result += units[remainder];
    }

    return result.trim() + " roku";
}
