export type LanguageType = {
  readonly name: string;
  readonly code: string;
}

export const languages: Readonly<LanguageType[]> = [
  { name: 'O‘zbek', code: 'uz' },
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const staticLang: Record<string, Record<LanguageCode, string>> = {
  title: {
    ru: "Книга Бабура",
    en: "Baburnama",
    uz: "Boburnoma"
  },
  author: {
    ru: "**Автор**: Захириддин Мухаммад Бабур",
    en: "**Author**: Zahīr ud-Dīn Muhammad Babur",
    uz: "**Muallif**: Zahiriddin Muhammad Bobur"
  },
  tableOfContents: {
    ru: "Оглавление",
    en: "Table of Contents",
    uz: "Mundarija"
  },
  illustrations: {
    ru: "**Иллюстрации**: [Midjourney](https://www.midjourney.com)",
    en: "**Illustrations**: [Midjourney](https://www.midjourney.com)",
    uz: "**Rasmlar**: [Midjourney](https://www.midjourney.com)"
  },
  siteAuthor: {
    ru: "**Автор сайта**: [Евгений Амирасланов](https://t.me/modifiertravels)",
    en: "**Site author**: [Eugene Amiraslanov](https://t.me/modifiertravels)",
    uz: "**Sayt muallifi**: [Eugene Amiraslanov](https://t.me/modifiertravels)"
  },
  source: {
    ru: "Текст книги и иллюстрации взяты из телеграм-канала [Boburnama](https://t.me/boburnama)",
    en: "Text and illustrations are taken from the telegram channel [Boburnama](https://t.me/boburnama)",
    uz: "Matn va rasmlar [Boburnama](https://t.me/boburnama) telegram kanalidan olingan"
  },
  sourceCode: {
    ru: "Исходный код сайта доступен на [GitHub](https://github.com/modifier/baburnama)",
    en: "Source code of the site is available on [GitHub](https://github.com/modifier/baburnama)",
    uz: "Internet sahifa kodi [GitHub](https://github.com/modifier/baburnama) joylashtirilgan"
  },
  background: {
    en: "Background &mdash; **[Desert during Nighttime](https://www.pexels.com/photo/desert-during-nighttime-847402)** by **Walid Ahmad**",
    ru: "Фон &mdash; **[Пустыня ночью](https://www.pexels.com/photo/desert-during-nighttime-847402)**, автор **Walid Ahmad**",
    uz: "Fon &mdash; **[Gʻarbiy koʻcha](https://www.pexels.com/photo/desert-during-nighttime-847402)**, muallif **Walid Ahmad**"
  },
  favicon: {
    ru: "Иконка сайта &mdash; **[Тигр](https://www.flaticon.com/ru/free-icon/tiger_2160079?term=tiger&related_id=2160079)**, автор **Smashicons**",
    en: "Favicon &mdash; **[Tiger](https://www.flaticon.com/ru/free-icon/tiger_2160079?term=tiger&related_id=2160079)** by **Smashicons**",
    uz: "Favicon &mdash; **[Tiger](https://www.flaticon.com/ru/free-icon/tiger_2160079?term=tiger&related_id=2160079)**, muallif **Smashicons**"
  },
  globeIcon: {
    ru: "Иконка глобуса &mdash; **[Глобус](https://www.flaticon.com/free-icon/globe_546310)**, автор **Freepik**",
    en: "Globe icon &mdash; **[Globe](https://www.flaticon.com/free-icon/globe_546310)** by **Freepik**",
    uz: "Globus ikonasi &mdash; **[Globus](https://www.flaticon.com/free-icon/globe_546310)**, muallif **Freepik**"
  },
  font: {
    ru: "Шрифт &mdash; **[Pehlevi](https://www.andrewmarcus.ru/projects/fonts/pehlevi)**, автор <b>Андрей Маркелов</b>",
    en: "Font &mdash; **[Pehlevi](https://www.andrewmarcus.ru/projects/fonts/pehlevi)** by <b>Andrey Markelov</b>",
    uz: "Shrift &mdash; **[Pehlevi](https://www.andrewmarcus.ru/projects/fonts/pehlevi)**, muallif <b>Andrey Markelov</b>"
  },
  madeInToshkent: {
    ru: "Сделано в Ташкенте",
    en: "Made in Tashkent",
    uz: "Toshkentda ishlab chiqilgan"
  },
  nextPage: {
    ru: "Перейти к следующей странице",
    en: "Go to the next page",
    uz: "Keyingi sahifaga o'tish"
  },
  previousPage: {
    ru: "Перейти к предыдущей странице",
    en: "Go to the previous page",
    uz: "Oldingi sahifaga o'tish"
  }
}