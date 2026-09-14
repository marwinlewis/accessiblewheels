export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  script: string;
  region?: string;
}

export const DEFAULT_LOCALE = "en";

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", script: "Latin" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", script: "Devanagari", region: "North/Central" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", dir: "ltr", script: "Bengali", region: "East" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", dir: "ltr", script: "Telugu", region: "South" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", dir: "ltr", script: "Devanagari", region: "West" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", dir: "ltr", script: "Tamil", region: "South" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl", script: "Perso-Arabic", region: "Pan-India" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", dir: "ltr", script: "Gujarati", region: "West" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", dir: "ltr", script: "Kannada", region: "South" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", dir: "ltr", script: "Malayalam", region: "South" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", dir: "ltr", script: "Odia", region: "East" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", dir: "ltr", script: "Gurmukhi", region: "North" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", dir: "ltr", script: "Bengali-Assamese", region: "Northeast" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली", dir: "ltr", script: "Devanagari", region: "East" },
  { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", dir: "ltr", script: "Ol Chiki", region: "East" },
  { code: "ks", name: "Kashmiri", nativeName: "کٲشُر", dir: "rtl", script: "Perso-Arabic", region: "North" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", dir: "ltr", script: "Devanagari", region: "Northeast/North" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी", dir: "ltr", script: "Devanagari", region: "Goa/West" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي", dir: "rtl", script: "Perso-Arabic", region: "Pan-India" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी", dir: "ltr", script: "Devanagari", region: "North" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্", dir: "ltr", script: "Bengali-Meitei", region: "Northeast" },
  { code: "brx", name: "Bodo", nativeName: "बड़ो", dir: "ltr", script: "Devanagari", region: "Northeast" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", dir: "ltr", script: "Devanagari", region: "Classical" },
];

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map((lang) => lang.code);

export function isValidLocale(code?: string): boolean {
  if (!code) return false;
  return SUPPORTED_LOCALES.includes(code.toLowerCase());
}

export function getLanguage(code?: string): Language {
  if (!code) return SUPPORTED_LANGUAGES[0];
  const found = SUPPORTED_LANGUAGES.find((lang) => lang.code.toLowerCase() === code.toLowerCase());
  return found || SUPPORTED_LANGUAGES[0];
}

export function getLanguageDirection(code?: string): "ltr" | "rtl" {
  return getLanguage(code).dir;
}
