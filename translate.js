async function switchLanguage(lang) {
    document.cookie = `lang=${lang}; samesite=none; secure`
    if (lang === "eng") {
        document.getElementById('GEO').src = "assetes/en-gb.png";
        const response = await fetch("eng.json");
        const translations = await response.json();
    
        const translatableElements = document.querySelectorAll('[data-i18n]');
    
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
                element.placeholder = translations[key];
            }
        });
    } else if (lang === "geo") {
        location.reload();
    }
}

let lang;
let arr = document.cookie.split('; ')
arr.forEach(element => {
    if(element.startsWith('lang=')) {
        lang = element.split('=')[1];
        console.log(lang)
    } 
})

async function translate() {
    if (lang === "eng") {
        document.getElementById('GEO').src = "assetes/en-gb.png";
        const response = await fetch('eng.json');
        const translations = await response.json();
        const translatableElements = document.querySelectorAll('[data-i18n]');
    
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
                element.placeholder = translations[key];
            }
        });
    }
}


translate();