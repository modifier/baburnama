export function getDefaultLocale(): string {
    let lang = localStorage.getItem("lang");
    if (lang === 'uz' || lang === 'en' || lang === 'ru') {
        return lang;
    }

    const chosenLanguage = navigator.languages.find((lang) =>
        lang === 'uz' || lang === 'en' || lang === 'ru'
    );

    if (chosenLanguage) {
        return chosenLanguage;
    }

    return 'en';
}
