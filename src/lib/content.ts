export type PageContent = {
  text: string;
  narrow?: boolean;
  type?: 'regular' | 'image' | 'titular' | 'credits' | 'empty';
}

export const content = [
  {
    type: 'empty',
  },
  {
    type: 'titular',
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
    text: "Во вторник пятого числа месяца рамазана года восемьсот девяносто девятого я стал государем области Ферганы, на двенадцатом году жизни.",
    img: 1,
  },
  {
    text: "Фергана – область в пятом климате, находится на границе возделанных земель; на востоке от нее – Кашгар, на западе – Самарканд, на юге – горы Бадахшанской границы; на севере, хотя раньше и были города, подобные Алмалыку, Алмату и Янги, название которого пишут в книгах Таразкент, но они разрушены моголами, и там совсем не осталось населенных мест.",
    img: 2,
  },
  {
    text: "Фергана – небольшая область; хлеба и плодов там много. Вокруг Ферганы находятся горы; с западной: окраины, где Самарканд и Ходженд, гор нет; ни с какой стороны, кроме этой, враг не может пройти зимой.",
    img: 3,
  },
  {
    text: "Река Сейхун, известная под названием «воды Ходженда», приходит в Фергану с северо-восточной стороны; пройдя через эту область, она течет на запад, проходит севернее Ходженда и южнее Финакета, который теперь известен под названием Шахрухии, потом снова уклоняется на север и течет в сторону Туркестана; эта, река не сливается ни с какой другой. Значительно ниже Туркестана она вся впитывается в песок.",
    img: 4,
  },
  {
    text: "В Фергане семь городов; пять из них – на южном берегу реки Сейхун, два–на северном берегу.\n\nОдин из городов на южном берегу – Андижан. Это – столица области Ферганы. Хлеба там много и плоды изобильны, дыни и виноград хороши; во время созревания дынь не в обычае продавать их возле садов; груш лучше андижанских не бывает.",
    img: 5,
  },
  {
    narrow: true,
    text: "В Мавераннахре, после Самарканда и Кеша, нет укрепления, больше Андижана. В городе трое ворот; арк Андижана находится на южной стороне. Вода входит в город по девяти каналам; удивительно, что она не выходит ниоткуда. Вокруг крепости, с внешней стороны рва – большая дорога, мощеная щебнем; крепость сплошь окружают, пригороды; их отделяет от крепости этот ров. По краю рва тоже тянется большая дорога.",
    img: 6,
  },
  {
    text: "Дичи там много; фазаны беспредельно жирны: рассказывали будто четыре человека, начав есть фазанью ногу, не смогли ее доесть.",
    img: 7,
  },
  {
    text: "Жители Андижана – тюрки. В городе и на базаре нет человека, который бы не знал по-тюркски. Говор народа сходен с письменным языком; сочинения Мир Алишера Навои, хотя он родился и вырос в Герате, написаны на этом языке.\n\nС реди жителей Андижана много совершенных людей: известный в музыке Ходжа-Юсуф – андижанец. В воздухе Андижана есть гнилостность; осенью многие болеют лихорадкой.",
    img: 8,
  },
  {
    text: "Еще один город – Ош. Он стоит к юго-востоку от Андижана в четырех йигачах пути. Воздух там прекрасный; проточной воды много; весна бывает очень хороша. О достоинствах Оша дошло до нас много преданий.\n\nК юго-востоку от крепости стоит красивая гора, называемая Бара-Кух. На вершине этой горы Султан-Махмуд-хан построил худжру. Ниже ее, на выступе горы, я тоже построил, в девятьсот втором году, худжру с айваном. Хотя его худжра стояла выше моей, моя была расположена много лучше: весь город и предместья расстилались под ногами.",
    narrow: true,
  img: 9,
  },
  {
    text: "Река Андижана, пройдя через предместья Оша, течет в Андижан. На обоих берегах этой реки раскинулись сады; все сады возвышаются над рекой. Фиалки в них очень красивы. В Оше есть текучая вода; весна там бывает очень хороша; расцветает множество тюльпанов и роз.",
    img: 10,
  },
  {
    text: "На склоне горы Бара-Кух, между садами и городом, есть мечеть, называемая мечетью Джауза. С горы течет большой ручей. Несколько ниже внешнего двора мечети–площадь, поросшая трилистником, полная тени и приятности; каждый путешественник и прохожий отдыхает там. У ошских озорников есть забава: на всякого, кто там заснет, они пускают воду из этого ручья.",
    img: 11,
  }
]