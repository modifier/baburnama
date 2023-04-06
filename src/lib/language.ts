import {languages} from "../content/static-lang";

/**
 * Get the language from the URL fragment, or from local storage if not present.
 * Used once to define the contents of the language store.
 */
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
