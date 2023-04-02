export type PageContent = {
  text: string;
  imgSize?: 'normal' | 'narrow' | 'supernarrow';
  type?: 'regular' | 'image' | 'titular' | 'credits' | 'empty';
  hideLanguagePicker?: boolean;
}

export const content = [
  {
    type: 'empty',
    hideLanguagePicker: true,
  },
  {
    type: 'titular',
    hideLanguagePicker: true,
  },
  {
    type: 'titular-image',
  },
  {
    type: 'credits',
  },
  {
    type: 'empty',
  },
  {
    text: {
      ru: "Во вторник пятого числа месяца рамазана года восемьсот девяносто девятого я стал государем области Ферганы, на двенадцатом году жизни.",
      en: "In the month of Ramẓān of the year 899 (June 1494) in the twelfth year of my age, I became ruler in the country of Farghāna.",
      uz: "Tangri taoloning inoyati va koinot sarvari boʻlgan hazrat Rasuli akramning shafoati, pokkoʻngil chahoryorlarning himmati bilan seshanba kuni, ramazon oyining beshinchisida, sakkiz yuz toʻqson toʻqqizinchi yili Fargona viloyatini oʻn ikki yoshda podshohi boʻldim."
    },
    img: 1,
  },
  {
    text: {
      ru: "Фергана – область в пятом климате, находится на границе возделанных земель; на востоке от нее – Кашгар, на западе – Самарканд, на юге – горы Бадахшанской границы; на севере, хотя раньше и были города, подобные Алмалыку, Алмату и Янги, название которого пишут в книгах Таразкент, но они разрушены моголами, и там совсем не осталось населенных мест.",
      en: "Farghāna is situated in the fifth climate and at the limit of settled habitation. On the east it has Kāshghar; on the west, Samarkand; on the south, the mountains of the Badakhshān border; on the north, though in former times there must have been towns such as Ālmālīgh, Ālmātū and Yāngī which in books they write Tarāz, at the present time all is desolate, no settled population whatever remaining, because of the Mughūls and the Aūzbegs.",
      uz: "Farg‘ona viloyati beshinchi iqlimdadir. Sharqi Koshg‘ar, g‘arbi Samarqand, janubi Badahshonning chegarasi — toglar, shimolida ilgarilar Olmoliq, Olmotu va Yangi singari shaharlar bo‘lgan ekan, uni kitoblarda O‘gror deb yezadilar, mo‘g‘ul va o‘zbaklar yurishlari tufayli hozirgi paytda buzilib ketgan, aslo obodonlik asari qolmagan."
    },
    img: 2,
  },
  {
    text: {
      ru: "Фергана – небольшая область; хлеба и плодов там много. Вокруг Ферганы находятся горы; с западной: окраины, где Самарканд и Ходженд, гор нет; ни с какой стороны, кроме этой, враг не может пройти зимой.",
      en: "Ferghana is a small region; there is plenty of bread and fruit. There are mountains around Ferghana; from the west: the outskirts, where Samarkand and Khujand, there are no mountains; on no side but this one can the enemy pass through in winter.",
      uz: "Farg‘ona kichik viloyatdir, g‘alla va mevasi farovon. Tevarak-atrofi tog‘lar bilan o‘ralgan, Gʻarbiy tarafida, ya’ni Samar­qand va Xo‘jand tomonida tog‘ yo‘q. Ushbu yoqdan boshqa hech bir tomondan qishda dushman kela olmas."
    },
    img: 3,
  },
  {
    text: {
      ru: "Река Сейхун, известная под названием «воды Ходженда», приходит в Фергану с северо-восточной стороны; пройдя через эту область, она течет на запад, проходит севернее Ходженда и южнее Финакета, который теперь известен под названием Шахрухии, потом снова уклоняется на север и течет в сторону Туркестана; эта, река не сливается ни с какой другой. Значительно ниже Туркестана она вся впитывается в песок.",
      en: "The Seyhun River, known as the \"waters of Khujand\", comes to Ferghana from the northeast side; passing through this region, it flows to the west, passes north of Khujand and south of Finaket, which is now known as Shakhrukhii, then again deviates to the north and flows towards Turkestan; this river does not merge with any other. Much below Turkestan, it is completely absorbed into the sand.",
      uz: "Sayhun daryosi Xo‘jand suvi nomida mashhur, u sharqu shimol tarafdan kelib, viloyatning ichi bilan o‘tib, g‘arb sari oqadi; Xo‘jandning shimoli va Fanokatning (hozir Shohruxiya sifatida mashhur) janubiy tarafidan o‘tib, yana shimolga burilib, Turkiston sari boradi. Turkistondan ancha quyirovda bu daryo butunlay qumga sing‘ib ketadi, bironta darbga qo‘shilmaydi."
    },
    img: 4,
  },
  {
    text: {
      ru: "В Фергане семь городов; пять из них – на южном берегу реки Сейхун, два–на северном берегу.\n\nОдин из городов на южном берегу – Андижан. Это – столица области Ферганы. Хлеба там много и плоды изобильны, дыни и виноград хороши; во время созревания дынь не в обычае продавать их возле садов; груш лучше андижанских не бывает.",
      en: "Farghāna has seven separate townships, five on the south and two on the north of the Saiḥūn.\n" +
        "Of those on the south, one is Andijān. It has a central position and is the capital of the Farghāna country. It produces much grain, fruits in abundance, excellent grapes and melons. In the melon season, it is not customary to sell them out at the beds. Better than the Andijān nāshpātī, there is none.",
      uz: "Yetti qasabasi (shaharchasi) bor: beshi Sayhun (Sirdaryo) suvining janub tara­ fida, ikkitasi shimol tomonida. Janu­biy tarafidagi shaharlardan biri — Andijon, o‘rtada joylashgan, Fargona viloyatining poytaxtidir. Gʻallasi mo‘l, mevasi ko‘p, qovun va uzumi yaxshi bo‘ladi. Qovun pishigida poliz boshida qovun sotmoq rayem emas. Andijonning noshvotisidan yaxshiroq noshvoti(nok) bo‘lmas."
    },
    img: 5,
  },
  {
    imgSize: 'narrow',
    text: {
      ru: "В Мавераннахре, после Самарканда и Кеша, нет укрепления, больше Андижана. В городе трое ворот; арк Андижана находится на южной стороне. Вода входит в город по девяти каналам; удивительно, что она не выходит ниоткуда. Вокруг крепости, с внешней стороны рва – большая дорога, мощеная щебнем; крепость сплошь окружают, пригороды; их отделяет от крепости этот ров. По краю рва тоже тянется большая дорога.",
      en: "After Samarkand and Kesh, the fort of Andijān is the largest in Mawārā’u’n-nahr (Transoxiana). It has three gates. Its citadel (ark) is on its south side. Into it water goes by nine channels; out of it, it is strange that none comes at even a single place. Round the outer edge of the ditch runs a gravelled highway; the width of this highway divides the fort from the suburbs surrounding it.",
      uz: "Movarounnahrda Samarkand va Kesh (Shahrisabz) qo‘rg‘onidan keyin bundan kattaroq qo‘rgon yo‘q. Uch darvozasi bor. Arki (podshoh saroyi) janub tarafida joylashgan. Shaharga to‘qqiz tarnov suv kiradi. Ajabki, biror yerdan tashqariga chiqmaydi. Qal’aning tevarak-atrofi — xandaq. Uning tashqarisi — tosh to‘kilgan katta ko‘chadir. Qal’aning atrof-aylanasi tamoman mahallalar bilan qurshalgan. Bu mahallalar bilan qal’a oraligi xandaq yoqasidagi katta ko‘chadir."
    },
    img: 6,
  },
  {
    text: {
      ru: "Дичи там много; фазаны беспредельно жирны: рассказывали будто четыре человека, начав есть фазанью ногу, не смогли ее доесть.",
      en: "Andijān has good hunting and fowling; its pheasants grow so surprisingly fat that rumour has it four people could not finish one they were eating with its stew.",
      uz: "Ov qushlari ham ko‘p bo‘ladi. Qirgovuli behad semiz bo‘ladi. Shunday rivoyat qiladilarki, bir qirgovul go‘shtini to‘rt kishi yeb tugatolmagan."
    },
    img: 7,
  },
  {
    text: {
      ru: "Жители Андижана – тюрки. В городе и на базаре нет человека, который бы не знал по-тюркски. Говор народа сходен с письменным языком; сочинения Мир Алишера Навои, хотя он родился и вырос в Герате, написаны на этом языке.\n\nС реди жителей Андижана много совершенных людей: известный в музыке Ходжа-Юсуф – андижанец. В воздухе Андижана есть гнилостность; осенью многие болеют лихорадкой.",
      en: "Andijānīs are all Turks, not a man in town or bāzār but knows Turkī. The speech of the people is correct for the pen; hence the writings of Mīr ‘Alī-shīr Nawā’ī,  though he was bred and grew up in Hīrī (Harāt), are one with their dialect. Good looks are common amongst them. The famous musician, Khwāja Yūsuf, was an Andijānī. The climate is malarious; in autumn people generally get fever.",
      uz: "Eli turkdir (o‘zbekdir). Shahar aholisi va bozorga keluvchilardan turkiyni bilmaydigan kishi yo‘q. Elining tili adabiy tilga muvofiq. Shuning uchun ham Mir Alisher Navoiyning asarlari, garchand Hirotda shuhrat qozon- gan bo‘lsa-da, bu til bilan yozilgan. Elining orasida san’atkorlari ko‘p. Musiqada mashhur Xoja Yusuf andijonlikdir. Havosining rutubati bor. Kuz paytlari xalq ko‘p bezgakka chalinadi."
    },
    img: 8,
  },
  {
    text: {
      ru: "Еще один город – Ош. Он стоит к юго-востоку от Андижана в четырех йигачах пути. Воздух там прекрасный; проточной воды много; весна бывает очень хороша. О достоинствах Оша дошло до нас много преданий.\n\nК юго-востоку от крепости стоит красивая гора, называемая Бара-Кух. На вершине этой горы Султан-Махмуд-хан построил худжру. Ниже ее, на выступе горы, я тоже построил, в девятьсот втором году, худжру с айваном. Хотя его худжра стояла выше моей, моя была расположена много лучше: весь город и предместья расстилались под ногами.",
      en: "Again, there is Aūsh (Ūsh), to the south-east, inclining to east, of Andijān and distant from it four yīghāch by road. It has a fine climate, an abundance of running waters and a most beautiful spring season. Many traditions have their rise in its excellencies.\n\nTo the south-east of the walled town (qūrghān) lies a symmetrical mountain, known as the Barā Koh; on the top of this, Sl. Maḥmūd Khān built a retreat (ḥajra) and lower down, on its shoulder, I, in 902ah. (1496ad.) built another, having a porch. Though his lies the higher, mine is the better placed, the whole of the town and the suburbs being at its foot.",
      uz: "Yana biri O‘sh shaharchasidir. Andi­joning sharqqa moyilroq sharqi janu­biy tarafida. Andijondan to‘rt yigochlik yo‘ldir. Havosi yaxshi, oqar suvi mo‘l. Bahori juda yaxshi bo‘ladi.\n\nO‘shning fazilati haqida ko‘p rivoyatlar bor. Qo‘rgonining sharqi janubida bir ko‘rkam tog‘ qad rostlagan, Baroko‘h deb nomlanadi. Bu togning cho‘qqisida Sulton Mahmudxon bir hujra solgan. U hujradan quyiroqda, ushbu togning tumshug‘ida to‘qqiz yuz ikkinchi yili (1497) men bir ayvonli hujra soldirdim. Garchi u hujra yuksakroqda bo‘lsa-da, bu hujra ham ko‘p yaxshi joyda qad ko‘targan: butun shahar va mahallalar shundaygina ko‘rinib turadi."
    },
    imgSize: 'supernarrow',
  img: 9,
  },
  {
    text: {
      ru: "Река Андижана, пройдя через предместья Оша, течет в Андижан. На обоих берегах этой реки раскинулись сады; все сады возвышаются над рекой. Фиалки в них очень красивы. В Оше есть текучая вода; весна там бывает очень хороша; расцветает множество тюльпанов и роз.",
      en: "The Andijān torrent goes to Andijān after having traversed the suburbs of Aūsh. Orchards (bāghāt) lie along both its banks; all the Aūsh gardens (bāghlār) overlook it; their violets are very fine; they have running waters and in spring are most beautiful with the blossoming of many tulips and roses.",
      uz: "Andijon soyi O‘sh mahallalari ichidan o‘tib, Andijonga kirib boradi. Bu soyning ikkala tomoni ham bog‘lar bilan obod. Bog‘lar shundaygina soyga tutashib ketgan. Binafshasi behad nafis buladi. Oqar suvlari bor, bahori juda yaxshi buladi. Ko‘p lola va chechaklar ochiladi."
    },
    img: 10,
  },
  {
    text: {
      ru: "На склоне горы Бара-Кух, между садами и городом, есть мечеть, называемая мечетью Джауза. С горы течет большой ручей. Несколько ниже внешнего двора мечети–площадь, поросшая трилистником, полная тени и приятности; каждый путешественник и прохожий отдыхает там. У ошских озорников есть забава: на всякого, кто там заснет, они пускают воду из этого ручья.",
      en: "On the skirt of the Barā-koh is a mosque called the Jauza Masjid (Twin Mosque). Between this mosque and the town, a great main canal flows from the direction of the hill. Below the outer court of the mosque lies a shady and delightful clover-meadow where every passing traveller takes a rest. It is the joke of the ragamuffins of Aūsh to let out water from the canal on anyone happening to fall asleep in the meadow.",
      uz: "Baroko‘h tog‘ining etagida — shahar bilan tog‘ orasida bir masjid qad ko‘targan, masjidi Javzo nomli. Tog‘ tarafidan bir katta ariq oqadi. Ushbu masjidning tashqari sahni nishabroq, sebargalik, sersoya, safolik maydondir. Har musofir va o‘tkinchi o‘sha yerda istirohat qiladi. O‘sh beboshlarining qaltis hazillari buki: kimki u yerda uxlasa, shu katta ariqdan unga suv sochadilar."
    },
    img: 11,
  }
]