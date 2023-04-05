import {languages} from "../content/static-lang";

export function getDefaultLanguage(): string {
    let lang = localStorage.getItem("lang");
    const languageCodes = languages.map((lang) => lang.code);
    if (languageCodes.includes(lang)) {
        return lang;
    }

    const chosenLanguage = navigator.languages.find((lang) =>
      languageCodes.includes(lang)
    );

    if (chosenLanguage) {
        return chosenLanguage;
    }

    return 'en';
}
