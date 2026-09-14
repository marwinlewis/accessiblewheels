import { TranslationDictionary } from "../types";

export const en: TranslationDictionary = {
  nav: {
    brandTitle: "Adapted Vehicle India",
    brandSubtitle: "Information for disabled drivers",
    guide: "4-Step Guide",
    workshops: "Find a Workshop",
    taxRules: "Tax Rules",
    selectLanguage: "Language",
    searchLanguagePlaceholder: "Search Indian language...",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    allLanguages: "All 22 Scheduled Indian Languages",
  },
  hero: {
    badge: "Updated September 2026 with the current GST, road tax and licensing rules",
    title: "A plain guide to adapted vehicles and driving licences for disabled people in India",
    description:
      "Step-by-step help for getting your UDID card, buying and registering an adapted vehicle, finding a certified modification workshop, and applying for your driving licence — with links to every official government portal you'll need.",
    startGuide: "Start the 4-step guide",
    findWorkshop: "Find a workshop",
    taxRules: "GST & road tax rules",
    stat1Title: "18% GST",
    stat1Subtitle: "Flat rate on qualifying small cars",
    stat1Desc:
      "Since the September 2025 GST reform, small cars carry a flat 18% GST with no cess for every buyer — this is no longer a disability-only concession.",
    stat2Title: "Road tax",
    stat2Subtitle: "Varies by state",
    stat2Desc:
      "Registering a car as an \"Adapted Vehicle\" can bring a partial or full road tax waiver, but the amount is set by each state — check with your local RTO.",
    stat3Title: "Certified workshops",
    stat3Subtitle: "Hand controls & steering aids",
    stat3Desc:
      "Find workshops that fit hand-operated controls, steering knobs and other adaptations, and confirm which ones hold current ARAI/ICAT certification before booking.",
    stat4Title: "4 steps",
    stat4Subtitle: "UDID to permanent licence",
    stat4Desc:
      "From your medical assessment to the Parivahan theory test and final practical driving test — one clear checklist.",
  },
  steps: [
    {
      order: 1,
      label: "Step 1",
      slug: "step-1",
      title: "Get your UDID card",
      description:
        "Before applying for a licence or buying a car, it helps to have a Unique Disability ID (UDID) card recording your assessed disability.",
      keyPoints: [
        {
          title: "Apply online",
          text: "Visit the official Swavlamban portal (swavlambancard.gov.in) to register and start your UDID application.",
          linkLabel: "Open Swavlamban Portal",
        },
        {
          title: "Medical assessment",
          text: "You will be assigned a government hospital for assessment. A UDID card can be issued at any assessed disability percentage — it is not restricted to 40% or above. That said, a benchmark disability of 40% or more is the threshold used for certain reservations and, for some vehicle categories, GST/road-tax concession eligibility.",
        },
        {
          title: "Ask for a driving/fitness assessment",
          text: "If you plan to drive, ask the medical board to record what vehicle modifications you are likely to need (for example, hand-operated accelerator/brake, or a steering knob) — the RTO will ask for this later on Form 1A.",
        },
      ],
    },
    {
      order: 2,
      label: "Step 2",
      slug: "step-2",
      title: 'Buy and register an "Adapted Vehicle"',
      description:
        "You can buy a regular car and have it modified, or buy one with factory-fitted controls, then register it with the RTO as an Adapted Vehicle.",
      keyPoints: [
        {
          title: "18% GST applies to everyone now",
          text: "Since the September 2025 GST reform, small cars (up to 4,000mm, engine ≤ 1200cc petrol/CNG/LPG or ≤ 1500cc diesel) carry a flat 18% GST with no cess for all buyers. Because of this, the Ministry of Heavy Industries discontinued its separate GST concession certificate for orthopaedic disability on these vehicles in October 2025 — there is no extra GST saving to apply for on this category of car.",
          linkLabel: "Ministry of Heavy Industries updates",
        },
        {
          title: "Choose a certified modification workshop",
          text: "If retrofitting an existing vehicle, ask the workshop directly for proof of its current ARAI or ICAT certification before booking — do not assume a workshop is certified just because it advertises retrofitting services.",
          linkLabel: "Find a workshop",
        },
        {
          title: 'Register as an "Adapted Vehicle" with your RTO',
          text: 'Registering the vehicle as an Adapted Vehicle (the modern term for what older rules called an "Invalid Carriage") can bring a partial or full road tax waiver and, in some states, an insurance discount — but the exact benefit is set by each state, not a fixed national rate. Confirm the figure with your state transport department before budgeting for it.',
        },
      ],
    },
    {
      order: 3,
      label: "Step 3",
      slug: "step-3",
      title: "Apply for a learner's licence",
      description:
        "Find modification workshops across India and start your learner’s licence application online.",
      keyPoints: [
        {
          title: "Apply online via Parivahan",
          text: "Apply for a learner’s licence for an adapted/invalid-carriage vehicle category through the MoRTH Parivahan Sarathi portal.",
          linkLabel: "Parivahan Sarathi Portal",
        },
        {
          title: "Documents you will need",
          text: "Your UDID card, Aadhaar card, proof of address, and a Form 1A medical fitness certificate from an authorised medical practitioner, as required under the Central Motor Vehicles Rules.",
        },
        {
          title: "Computerised theory test",
          text: "Schedule and pass the computerised road-signs and theory test at your RTO. Once you pass, your learner’s licence is generally available to download the same day.",
        },
      ],
    },
    {
      order: 4,
      label: "Step 4",
      slug: "step-4",
      title: "Practical training and permanent licence",
      description:
        "Complete hands-on training with your adapted controls, then take the RTO driving test for your permanent licence.",
      keyPoints: [
        {
          title: "Practise with your adapted controls",
          text: "Practise in your own adapted vehicle, or at a driving school that has a vehicle fitted with the same type of controls, until you are confident.",
        },
        {
          title: "Book your permanent licence test",
          text: "Under the general Central Motor Vehicles Rules, a learner’s licence must be held for a minimum period (commonly 30 days) before the permanent licence test can be booked — this rule applies to all drivers, not only disabled applicants. Book your slot via Parivahan Sarathi and bring your own adapted vehicle to the RTO for the test.",
          linkLabel: "Book test slot",
        },
        {
          title: "RTO inspector review",
          text: "The RTO Motor Vehicle Inspector checks that your vehicle’s modifications match your medical certificate and assesses your driving before issuing a permanent licence endorsed for that adapted vehicle.",
        },
      ],
    },
  ],
  tabs: {
    stepByStepGuide: "Step-by-step guide",
    stepOf: "Step {current} of {total}",
    whatToDo: "What to do",
    previousStep: "Previous step",
    nextStep: "Next step",
    lastStep: "Last step",
    includesWorkshopMap: "Includes workshop map",
    openOfficialPortal: "Open official portal",
  },
  calculator: {
    title: "GST and road tax rules for your car",
    subtitle:
      "These rules changed in late 2025. Here's the current position, and an estimate of the 18% GST on a car price you enter.",
    alertTitle: "GST concession certificates for small cars were discontinued in October 2025.",
    alertDescription:
      "Following the September 2025 GST reform, small cars (up to 4,000mm long, engine ≤1200cc petrol/CNG/LPG or ≤1500cc diesel) now attract a flat 18% GST with no compensation cess — for every buyer, disabled or not. Because the general rate and the old disability concession rate are now the same, the Ministry of Heavy Industries stopped issuing GST concession certificates for orthopaedic disability on these vehicles. There is no longer a GST saving specific to disability for this category of car.",
    estimateTitle: "Estimate GST on a car price",
    exShowroomLabel: "Ex-showroom price (before GST):",
    commonPresets: "Common price presets",
    gstAppliesIf: "18% GST rate applies only if the car is:",
    gstCondition1: "No longer than 4,000mm",
    gstCondition2: "Petrol, LPG or CNG engine of 1,200cc or less, or diesel engine of 1,500cc or less",
    gstConditionNote: "Larger cars and SUVs outside this description are taxed at 40% GST for all buyers.",
    estimatedGstTitle: "Estimated GST (18%)",
    estimatedGstSummary:
      "On an ex-showroom price of {price}, GST at 18% adds {gst}, for an estimated on-road-before-registration price of {total}. This is an estimate only — it excludes road tax, insurance and other charges, and applies the same to every buyer of a qualifying small car.",
    roadTaxTitle: "Road tax exemption: varies by state",
    roadTaxDesc:
      'A car registered with the RTO as an "Adapted Vehicle" can qualify for a partial or full road tax waiver, but the amount is set by each state\'s own motor vehicle taxation rules — it is not a fixed national percentage. Contact your state transport department or RTO for the figure that applies where you live.',
    nextStepLabel: "Next step: register the vehicle",
    readStep2: "Read Step 2",
    officialUpdateLink: "Ministry of Heavy Industries: GST concession updates",
  },
  workshops: {
    searchPlaceholder: "Search by city (e.g. Mumbai, Chennai, Jaipur, Karnal)...",
    searchButton: "Search",
    useMyLocation: "Use my location",
    citiesLabel: "Cities:",
    allCities: "All Cities",
    locationDenied: "Location access denied. Please select a city manually.",
    noWorkshopsFound: "No modification workshops found matching your query.",
    verifiedArai: "Verified ARAI/ICAT",
    reviewsCount: "{count} reviews",
    getDirections: "Get directions",
    callNow: "Call workshop",
  },
  footer: {
    aboutTitle: "About Adapted Vehicle India",
    aboutText:
      "An independent, plain-language guide to buying and registering an adapted vehicle and getting a driving licence in India as a person with disability — with links to the official government portals for every step.",
    notGovNotice:
      "This site is not a government website. Always confirm current rules with the official portals listed below.",
    stepGuideTitle: "Step-by-Step Guide",
    officialPortalsTitle: "Official Portals & Contact",
    step1Link: "Step 1: UDID Card & Medical Assessment",
    step2Link: "Step 2: Buying & Registering the Vehicle",
    step3Link: "Step 3: Workshops & Learner's Licence",
    step4Link: "Step 4: Practical Test & Licence",
    taxRulesLink: "GST & Road Tax Rules",
    udidPortalLink: "Swavlamban UDID Portal",
    parivahanLink: "Parivahan Sarathi (Licence)",
    mhiLink: "Ministry of Heavy Industries",
    maintainerLink: "Maintainer: (Marvin Lewis)",
    disclaimer:
      "Information is based on the Central Motor Vehicles Rules, GST Council notifications and Ministry of Heavy Industries circulars, and is provided for general guidance only — it is not legal advice. Rules change; always verify with the official portals above or your local RTO before relying on any figure here.",
  },
  seo: {
    title: "Adapted Vehicle & Driving Licence Guide for Disabled People in India",
    description:
      "A plain-language, step-by-step guide for disabled people in India: get a UDID card, buy and register an adapted vehicle, find a modification workshop, and apply for a driving licence — with current GST and road tax rules.",
  },
};
