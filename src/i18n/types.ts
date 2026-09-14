export interface TranslationDictionary {
  nav: {
    brandTitle: string;
    brandSubtitle: string;
    guide: string;
    workshops: string;
    taxRules: string;
    selectLanguage: string;
    searchLanguagePlaceholder: string;
    closeMenu: string;
    openMenu: string;
    allLanguages: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    startGuide: string;
    findWorkshop: string;
    taxRules: string;
    stat1Title: string;
    stat1Subtitle: string;
    stat1Desc: string;
    stat2Title: string;
    stat2Subtitle: string;
    stat2Desc: string;
    stat3Title: string;
    stat3Subtitle: string;
    stat3Desc: string;
    stat4Title: string;
    stat4Subtitle: string;
    stat4Desc: string;
  };
  steps: Array<{
    order: number;
    label: string;
    slug: string;
    title: string;
    description: string;
    keyPoints: Array<{
      title: string;
      text: string;
      linkLabel?: string;
    }>;
  }>;
  tabs: {
    stepByStepGuide: string;
    stepOf: string; // e.g. "Step {current} of {total}"
    whatToDo: string;
    previousStep: string;
    nextStep: string;
    lastStep: string;
    includesWorkshopMap: string;
    openOfficialPortal: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    alertTitle: string;
    alertDescription: string;
    estimateTitle: string;
    exShowroomLabel: string;
    commonPresets: string;
    gstAppliesIf: string;
    gstCondition1: string;
    gstCondition2: string;
    gstConditionNote: string;
    estimatedGstTitle: string;
    estimatedGstSummary: string; // "On an ex-showroom price of {price}..."
    roadTaxTitle: string;
    roadTaxDesc: string;
    nextStepLabel: string;
    readStep2: string;
    officialUpdateLink: string;
  };
  workshops: {
    searchPlaceholder: string;
    searchButton: string;
    useMyLocation: string;
    citiesLabel: string;
    allCities: string;
    locationDenied: string;
    noWorkshopsFound: string;
    verifiedArai: string;
    reviewsCount: string; // e.g. "{count} reviews"
    getDirections: string;
    callNow: string;
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    notGovNotice: string;
    stepGuideTitle: string;
    officialPortalsTitle: string;
    step1Link: string;
    step2Link: string;
    step3Link: string;
    step4Link: string;
    taxRulesLink: string;
    udidPortalLink: string;
    parivahanLink: string;
    mhiLink: string;
    maintainerLink: string;
    disclaimer: string;
  };
  seo: {
    title: string;
    description: string;
  };
}
