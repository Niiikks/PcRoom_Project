async function switchLanguage(lang) {
    if (lang === "eng") {
        const response = await fetch("eng.json");
        const translations = await response.json();

        const translatableElements = document.querySelectorAll('[data-i18n]');
        console.log(translatableElements)

        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    } else if (lang === "geo") {
        location.reload();
    }
}
