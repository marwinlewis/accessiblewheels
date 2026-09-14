import { TranslationDictionary } from "../types";
import { en } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import { as as assamese } from "./as";
import { ur } from "./ur";
import { bn } from "./bn";

// Helper to create language dictionary with base overrides
function createLang(base: TranslationDictionary, overrides: Partial<TranslationDictionary>): TranslationDictionary {
  return {
    ...base,
    ...overrides,
    nav: { ...base.nav, ...(overrides.nav || {}) },
    hero: { ...base.hero, ...(overrides.hero || {}) },
    steps: overrides.steps || base.steps,
    tabs: { ...base.tabs, ...(overrides.tabs || {}) },
    calculator: { ...base.calculator, ...(overrides.calculator || {}) },
    workshops: { ...base.workshops, ...(overrides.workshops || {}) },
    footer: { ...base.footer, ...(overrides.footer || {}) },
    seo: { ...base.seo, ...(overrides.seo || {}) },
  };
}

// Maithili (मैथिली)
export const mai: TranslationDictionary = createLang(hi, {
  nav: {
    brandTitle: "अडैप्टेड व्हिकल इंडिया",
    brandSubtitle: "दिव्यांग चालक लोकनिक लेल मार्गदर्शिका",
    guide: "४-चरणक गाइड",
    workshops: "वर्कशॉप खोजू",
    taxRules: "टैक्स नियम",
    selectLanguage: "भाषा चुनू",
    searchLanguagePlaceholder: "भारतीय भाषा खोजू...",
    closeMenu: "मेनू बंद करू",
    openMenu: "मेनू खोलू",
    allLanguages: "भारतक सभ २२ आधिकारिक भाषा",
  },
  hero: {
    ...hi.hero,
    title: "भारतमे दिव्यांग लोकनिक लेल अनुकूलित वाहन आ ड्राइविंग लाइसेंस गाइड",
    description: "यूडीआईडी (UDID) कार्ड बनयबाक, अनुकूलित गाड़ी किनबाक आ निबंधन करयबाक, प्रमाणित वर्कशॉप खोजबाक आ ड्राइविंग लाइसेंस लेबाक लेल चरणबद्ध सहायता।",
    startGuide: "४-चरणक गाइड शुरू करू",
    findWorkshop: "वर्कशॉप खोजू",
  },
  tabs: {
    ...hi.tabs,
    whatToDo: "की करबाक अछि",
    previousStep: "पाछिला चरण",
    nextStep: "अगिला चरण",
    lastStep: "अंतिम चरण",
  },
  seo: {
    title: "दिव्यांग लोकनिक लेल अडैप्टेड व्हिकल आ ड्राइविंग लाइसेंस गाइड",
    description: "यूडीआईडी कार्ड, वाहन संशोधन, जीएसटी नियम आ ड्राइविंग लाइसेंसक संपूर्ण जानकारी।",
  },
});

// Nepali (नेपाली)
export const ne: TranslationDictionary = createLang(hi, {
  nav: {
    brandTitle: "अडाप्टेड भेहिकल इन्डिया",
    brandSubtitle: "अपाङ्गता भएका चालकहरूका लागि पूर्ण मार्गदर्शन",
    guide: "४-चरणको गाइड",
    workshops: "कार्यशाला खोज्नुहोस्",
    taxRules: "कर नियमहरू",
    selectLanguage: "भाषा छान्नुहोस्",
    searchLanguagePlaceholder: "भारतीय भाषा खोज्नुहोस्...",
    closeMenu: "मेनु बन्द गर्नुहोस्",
    openMenu: "मेनु खोल्नुहोस्",
    allLanguages: "भारतका सबै २२ आधिकारिक भाषाहरू",
  },
  hero: {
    ...hi.hero,
    badge: "सेप्टेम्बर २०२६ सम्म अद्यावधिक: हालको जीएसटी, रोड ट्याक्स र लाइसेन्स नियम",
    title: "भारतमा अपाङ्गता भएका व्यक्तिहरूका लागि अडाप्टेड सवारी साधन र ड्राइभिङ लाइसेन्स गाइड",
    description: "UDID कार्ड बनाउन, अनुकूलित गाडी किन्न र दर्ता गर्न, प्रमाणित वर्कशप खोज्न र ड्राइभिङ लाइसेन्स लिन चरण-दर-चरण सहयोग।",
    startGuide: "४-चरणको गाइड सुरु गर्नुहोस्",
    findWorkshop: "वर्कशप खोज्नुहोस्",
    taxRules: "जीएसटी र रोड ट्याक्स नियम",
  },
  tabs: {
    ...hi.tabs,
    stepByStepGuide: "चरणबद्ध मार्गदर्शिका",
    whatToDo: "के गर्ने",
    previousStep: "अघिल्लो चरण",
    nextStep: "पछिल्लो चरण",
    lastStep: "अन्तिम चरण",
  },
  seo: {
    title: "अपाङ्गता भएकाहरूका लागि अडाप्टेड सवारी र ड्राइभिङ लाइसेन्स गाइड",
    description: "UDID कार्ड, गाडी परिवर्तन, जीएसटी नियम र ड्राइभिङ लाइसेन्स सम्बन्धी पूर्ण जानकारी।",
  },
});

// Konkani (कोंकणी)
export const kok: TranslationDictionary = createLang(mr, {
  nav: {
    brandTitle: "अ‍ॅडॉप्टेड व्हेईकल इंडिया",
    brandSubtitle: "दिव्यांग चालकां खातीर मार्गदर्शिका",
    guide: "४-पावलांची मार्गदर्शिका",
    workshops: "वर्कशॉप सोधा",
    taxRules: "कर नेम",
    selectLanguage: "भास वेंचून काढा",
    searchLanguagePlaceholder: "भारतीय भास सोधा...",
    closeMenu: "मेनू बंद करात",
    openMenu: "मेनू उगडा",
    allLanguages: "भारतांतल्यो २२ अधिकृत भासो",
  },
  hero: {
    ...mr.hero,
    title: "भारतांत दिव्यांग लोकां खातीर अ‍ॅडॉप्टेड वाहनां आनी ड्रायव्हिंग लायसन्स मार्गदर्शक",
    description: "UDID कार्ड मेळोवप, सुदारीत वाहन खरेदी आनी नोंदणी, प्रमाणित वर्कशॉप सोधप आनी ड्रायव्हिंग लायसन्स मेळोवपा खातीर पावलां-पावलांनी मजत.",
    startGuide: "४-पावलांची मार्गदर्शिका सुरू करात",
    findWorkshop: "वर्कशॉप सोधा",
  },
  seo: {
    title: "दिव्यांग लोकां खातीर अ‍ॅडॉप्टेड वाहन आनी ड्रायव्हिंग लायसन्स गाइड",
    description: "UDID कार्ड, वाहनांत बदल, जीएसटी नेम आनी लायसन्स मेळोवपाची पुराय म्हायती.",
  },
});

// Dogri (डोगरी)
export const doi: TranslationDictionary = createLang(hi, {
  nav: {
    brandTitle: "अडैप्टेड व्हीकल इंडिया",
    brandSubtitle: "दिव्यांग चालकां लेई मार्गदर्शिका",
    guide: "४-कदम गाइड",
    workshops: "वर्कशॉप लब्भो",
    taxRules: "टैक्स नियम",
    selectLanguage: "बोली चुनो",
    searchLanguagePlaceholder: "भारतीय भाषा लब्भो...",
    closeMenu: "मेनू बंद करो",
    openMenu: "मेनू खोल्लो",
    allLanguages: "भारत दियां सारियां २२ आधिकारिक बोलियां",
  },
  hero: {
    ...hi.hero,
    title: "भारत च दिव्यांग लोकें लेई अडाप्टेड गड्डियां ते ड्राइविंग लाइसेंस गाइड",
    description: "UDID कार्ड बनवाने, अनुकूलित गड्डी खरीदने ते रजिस्टर करवाने, प्रमाणित वर्कशॉप लब्भने ते ड्राइविंग लाइसेंस लेई चरणबद्ध मदद।",
    startGuide: "४-कदम गाइड शुरू करो",
    findWorkshop: "वर्कशॉप लब्भो",
  },
  seo: {
    title: "दिव्यांग लोकें लेई अडाप्टेड गड्डी ते ड्राइविंग लाइसेंस गाइड",
    description: "UDID कार्ड, गड्डी च बदलाव, जीएसटी नियम ते ड्राइविंग लाइसेंस दी पूरी जानकारी।",
  },
});

// Sanskrit (संस्कृतम्)
export const sa: TranslationDictionary = createLang(hi, {
  nav: {
    brandTitle: "अनुकूलितवाहनम् भारतम्",
    brandSubtitle: "दिव्याङ्गचालकानां कृते संपूर्णमार्गदर्शनम्",
    guide: "चतुश्चरणीयमार्गदर्शिका",
    workshops: "कार्यशालाम् अन्विष्यतु",
    taxRules: "कराधाननियमाः",
    selectLanguage: "भाषां चिनोतु",
    searchLanguagePlaceholder: "भारतीयभाषां अन्विष्यतु...",
    closeMenu: "सूचीं पिदधातु",
    openMenu: "सूचीम् उद्घाटयतु",
    allLanguages: "भारतस्य द्वाविंशति संविधानानुकूलभाषाः",
  },
  hero: {
    ...hi.hero,
    title: "भारते दिव्याङ्गानां कृते अनुकूलितवाहनानां चालकप्रमाणपत्रस्य च मार्गदर्शिका",
    description: "UDID पत्रप्राप्त्यर्थं, अनुकूलितवाहनक्रयण-पञ्जीकरणार्थं, प्रमाणितकार्यशालाम् अन्वेष्टुं चालकप्रमाणपत्रप्राप्त्यर्थं च चरणबद्धं साहाय्यम्।",
    startGuide: "मार्गदर्शिकाम् आरभताम्",
    findWorkshop: "कार्यशालाम् अन्विष्यतु",
    taxRules: "करनियमाः",
  },
  tabs: {
    ...hi.tabs,
    whatToDo: "किं करणीयम्",
    previousStep: "पूर्वतनचरणम्",
    nextStep: "अग्रिमचरणम्",
    lastStep: "अन्तिमचरणम्",
  },
  seo: {
    title: "दिव्याङ्गानां कृते अनुकूलितवाहनम् चालकप्रमाणपत्रस्य च मार्गदर्शिका",
    description: "UDID पत्रम्, वाहनसंशोधनम्, जीएसटी नियमाः चालकप्रमाणपत्रप्राप्तिविषये च संपूर्णविवरणम्।",
  },
});

// Bodo (बड़ो)
export const brx: TranslationDictionary = createLang(assamese, {
  nav: {
    brandTitle: "एडাপ्टेड भेहिकल इन्डिया",
    brandSubtitle: "लेङा गादि सालायगिरिफोरनि थाखाय सावरायनाय",
    guide: "४-आगान्नि बिथोन",
    workshops: "वारकसप नायगिर",
    taxRules: "खाजोना नेमफोर",
    selectLanguage: "राव सायख'",
    searchLanguagePlaceholder: "भारतनि राव नायगिर...",
    closeMenu: "मेनु बन्द खालाम",
    openMenu: "मेनु खुलि",
    allLanguages: "भारतनि गासै २२ मोन मानगोनां रावफोर",
  },
  hero: {
    ...assamese.hero,
    title: "भारतआव लेङा सुबुंफोरनि थाखाय गादि आरो सलायनाय लाइसेन्स बिथोन",
    description: "UDID कार्ड लानो, अनुकूलित गादि बायनो आरो रेजिस्टार खालामनो, प्रमाणित वर्कशप नायगिरनो सलायनाय लाइसेन्स लानो थाखाय आगान्-आगान् मदद।",
    startGuide: "४-आगान्नि बिथोन जागाय",
    findWorkshop: "वारकसप नायगिर",
  },
  seo: {
    title: "लेङा सुबुंफोरनि थाखाय एडাপ्टेड गादि आरो सालायनाय लाइसेन्स बिथोन",
    description: "UDID कार्ड, गादि सोलायनाय, जीएसटी नेम आरो सालायनाय लाइसेन्स लानि गासै रादाब।",
  },
});

// Santali (ᱥᱟᱱᱛᱟᱲᱤ / संथाली)
export const sat: TranslationDictionary = createLang(hi, {
  nav: {
    brandTitle: "ᱟᱰᱟᱯᱴᱮᱰ ᱵᱷᱮᱦᱤᱠᱟᱞ ᱤᱱᱰᱤᱭᱟ",
    brandSubtitle: "ᱫᱤᱵᱭᱟᱝ ᱜᱟᱹᱰᱤ ᱪᱟᱞᱟᱣᱤᱭᱟᱹ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱰᱟᱭ",
    guide: "᱔-ᱫᱷᱟᱯ ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ",
    workshops: "ᱣᱟᱨᱠᱥᱚᱯ ᱯᱟᱱᱛᱮ",
    taxRules: "ᱴᱮᱠᱥ ᱨᱟᱭᱨᱤᱛ",
    selectLanguage: "ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ",
    searchLanguagePlaceholder: "ᱵᱷᱟᱨᱚᱛᱤᱭᱟᱹ ᱯᱟᱹᱨᱥᱤ ᱯᱟᱱᱛᱮ...",
    closeMenu: "ᱢᱮᱱᱩ ᱵᱚᱸᱫᱚ",
    openMenu: "ᱢᱮᱱᱩ ᱡᱷᱤᱡ",
    allLanguages: "ᱵᱷᱟᱨᱚᱛ ᱨᱮᱱᱟᱜ ᱒᱒ ᱜᱚᱴᱟᱝ ᱥᱚᱨᱠᱟᱨᱤ ᱯᱟᱹᱨᱥᱤ",
  },
  hero: {
    ...hi.hero,
    title: "ᱵᱷᱟᱨᱚᱛ ᱨᱮ ᱫᱤᱵᱭᱟᱝ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱜᱟᱹᱰᱤ ᱟᱨ ᱪᱟᱞᱟᱣ ᱞᱟᱭᱥᱮᱱᱥ ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ",
    description: "UDID ᱠᱟᱨᱰ ᱧᱟᱢ, ᱜᱟᱹᱰᱤ ᱠᱤᱨᱤᱧ ᱟᱨ ᱨᱮᱡᱤᱥᱴᱟᱨ, ᱣᱟᱨᱠᱥᱚᱯ ᱯᱟᱱᱛᱮ ᱟᱨ ᱞᱟᱭᱥᱮᱱᱥ ᱧᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱜᱚᱲᱚ।",
    startGuide: "᱔-ᱫᱷᱟᱯ ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ ᱮᱛᱚᱦᱚᱵ",
    findWorkshop: "ᱣᱟᱨᱠᱥᱚᱯ ᱯᱟᱱᱛᱮ",
  },
  seo: {
    title: "ᱫᱤᱵᱭᱟᱝ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱜᱟᱹᱰᱤ ᱟᱨ ᱪᱟᱞᱟᱣ ᱞᱟᱭᱥᱮᱱᱥ ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ",
    description: "UDID ᱠᱟᱨᱰ, ᱜᱟᱹᱰᱤ ᱵᱚᱫᱚᱞ, ᱡᱤᱮᱥᱴᱤ ᱟᱨ ᱞᱟᱭᱥᱮᱱᱥ ᱧᱟᱢ ᱨᱮᱱᱟᱜ ᱠᱟᱛᱷᱟ।",
  },
});

// Kashmiri (کٲشُر - RTL)
export const ks: TranslationDictionary = createLang(ur, {
  nav: {
    brandTitle: "اڈاپٹڈ وہیکل انڈیا",
    brandSubtitle: "معذور ڈرائیورن خٲطرٕ رہنمٲئی",
    guide: "4 مرحلہ وار گائیڈ",
    workshops: "ورکشاپ تلاشن",
    taxRules: "ٹیکس کین قواعد",
    selectLanguage: "زبان ژارِو",
    searchLanguagePlaceholder: "ہِندوستٲنؠ زَبان ژھارِو...",
    closeMenu: "مینو بند کٔرِو",
    openMenu: "مینو کھولِو",
    allLanguages: "ہندوستانٕچ تمام 22 شیڈولڈ زبانن",
  },
  hero: {
    ...ur.hero,
    title: "ہندوستانس منٛز معذورن خٲطرٕ موافق گاڑین تہٕ ڈرائیونگ لائسنس گائیڈ",
    description: "UDID کارڈ حٲصل کرنس، موافق گاڑی خریٖدنس تہٕ رجسٹر کرنس، تصدیق شدہ ورکشاپ لَبنس تہٕ ڈرائیونگ لائسنس حٲصل کرنس خٲطرٕ مرحلہ وار مَدَتھ۔",
    startGuide: "4 مرحلہ گائیڈ شۆروٗع کٔرِو",
    findWorkshop: "ورکشاپ ژھارِو",
  },
  seo: {
    title: "معذورن خٲطرٕ اڈاپٹڈ گاڑی تہٕ ڈرائیونگ لائسنس گائیڈ",
    description: "UDID کارڈ، گاڑی بدلاون، جی ایس ٹی قواعد تہٕ لائسنس متعلق تفصیلی معلومات۔",
  },
});

// Sindhi (سنڌي - RTL)
export const sd: TranslationDictionary = createLang(ur, {
  nav: {
    brandTitle: "اڊاپٽڊ وھيڪل انڊيا",
    brandSubtitle: "معذور ڊرائيورن لاءِ مڪمل رھنمائي",
    guide: "4-قدم رھنمائي",
    workshops: "ورڪشاپ ڳوليو",
    taxRules: "ٽيڪس جا قانون",
    selectLanguage: "ٻولي چونڊيو",
    searchLanguagePlaceholder: "ھندوستاني ٻولي ڳوليو...",
    closeMenu: "مينيو بند ڪريو",
    openMenu: "مينيو کوليو",
    allLanguages: "ھندستان جون سڀ 22 سرڪاري ٻوليون",
  },
  hero: {
    ...ur.hero,
    title: "ھندستان ۾ معذور ماڻھن لاءِ اڊاپٽڊ گاڏيون ۽ ڊرائيونگ لائسنس ھدايت نامو",
    description: "UDID ڪارڊ حاصل ڪرڻ، گاڏي خريد ڪرڻ ۽ رجسٽر ڪرڻ، ورڪشاپ ڳولڻ ۽ ڊرائيونگ لائسنس حاصل ڪرڻ لاءِ مدد۔",
    startGuide: "4-قدم گائيڊ شروع ڪريو",
    findWorkshop: "ورڪشاپ ڳوليو",
  },
  seo: {
    title: "معذورن لاءِ اڊاپٽڊ گاڏيون ۽ ڊرائيونگ لائسنس گائيڊ",
    description: "UDID ڪارڊ، گاڏين ۾ تبديلي، جي ايس ٽي ضابطا ۽ ڊرائيونگ لائسنس بابت تفصيل۔",
  },
});

// Manipuri / Meitei (মৈতৈলোন্)
export const mni: TranslationDictionary = createLang(bn, {
  nav: {
    brandTitle: "এডাপ্টেড ভেহিকল ইন্দিয়া",
    brandSubtitle: "অশোইবা লৈবা দ্রাইভরশিংগী লমজিং",
    guide: "তাঙ্কক ৪ গী গাইদ",
    workshops: "ৱার্কশোপ থিবীউ",
    taxRules: "তেক্সকী নিয়মশিং",
    selectLanguage: "লোল খনবীয়ু",
    searchLanguagePlaceholder: "ভারতকী লোল থিবীয়ু...",
    closeMenu: "মেনু থিংজিনবীয়ু",
    openMenu: "মেনু হাংদোকপীয়ু",
    allLanguages: "ভারতকী চৎনবা লোল ২২",
  },
  hero: {
    ...bn.hero,
    title: "ভারততা অশোইবা লৈবা মীওইশিংগীদমক এডাপ্টেড গারী অমসুং দ্রাইভিং লাইসেন্স লমজিং",
    description: "UDID কার্দ ফংবা, গারী লৈবা অমসুং রেজিস্তর তৌবা, ৱার্কশোপ থিবা অমসুং দ্রাইভিং লাইসেন্স ফংনবা তাঙ্কক কয়াদা মতেং পাংবা।",
    startGuide: "তাঙ্কক ৪ গী গাইদ হৌবীয়ু",
    findWorkshop: "ৱার্কশোপ থিবীউ",
  },
  seo: {
    title: "অশোইবা লৈবা মীওইশিংগীদমক গারী অমসুং দ্রাইভিং লাইসেন্স গাইদ",
    description: "UDID কার্দ, গারী ওন্থোকপা, জিএসতি নিয়মশিং অমসুং দ্রাইভিং লাইসেন্স ফংবগী মরমদা।",
  },
});
