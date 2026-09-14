export interface ShopData {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phoneNumbers: Array<{ phone: string }>;
  googleMapUrl: string;
  images: Array<string>;
  verified: boolean;
}

export interface GuidePageData {
  order: number;
  label: string;
  slug: string;
  title: string;
  description: string;
  showMap: boolean;
  seo: {
    title: string;
    description: string;
  };
  keyPoints: Array<{
    title: string;
    text: string;
    linkUrl: string;
    linkLabel: string;
  }>;
}

export interface SiteGlobalsData {
  title: string;
  gtmId: string;
  webmasterTag: string;
  copyright: string;
  seo: {
    title: string;
    description: string;
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    quickLinks: Array<{ label: string; url: string }>;
    contactLinks: Array<{ label: string; url: string }>;
  };
}

export const siteGlobals: SiteGlobalsData = {
  title: 'Step-by-Step Guide: Adapted Vehicles & Driving Licences for Disabled People in India',
  gtmId: 'G-4JRLEMT93M',
  webmasterTag: 'e1pF3HWCsSrAHsjdrwQH0-Is2Dj23MsTNl2VHMoPs0U',
  copyright: '© 2026 AdaptedVehicle.in. All rights reserved.',
  seo: {
    title: 'Adapted Vehicle & Driving Licence Guide for Disabled People in India',
    description:
      'A plain-language, step-by-step guide for disabled people in India: get a UDID card, buy and register an adapted vehicle, find a modification workshop, and apply for a driving licence — with current GST and road tax rules.',
  },
  footer: {
    aboutTitle: 'About Adapted Vehicle India',
    aboutText:
      'An independent, plain-language guide to buying and registering an adapted vehicle and getting a driving licence in India as a person with disability — with links to the official government portals for every step.',
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'Step 1: UDID Card', url: '/step-1' },
      { label: 'Step 2: Car Concessions', url: '/step-2' },
      { label: 'Step 3: ARAI Garages & LL', url: '/step-3' },
      { label: 'Step 4: Permanent License', url: '/step-4' },
      { label: 'Tax Rules & GST Calculator', url: '/#calculator' },
    ],
    contactLinks: [
      { label: 'Swavlamban UDID Portal', url: 'https://www.swavlambancard.gov.in/' },
      { label: 'Parivahan Sarathi', url: 'https://sarathi.parivahan.gov.in/' },
      { label: 'Ministry of Heavy Industries', url: 'https://heavyindustries.gov.in/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/marwinlewis/' },
    ],
  },
};

export const guidePages: GuidePageData[] = [
  {
    order: 1,
    label: 'Step 1',
    slug: 'step-1',
    title: 'Get your UDID card',
    description:
      'Before applying for a licence or buying a car, it helps to have a Unique Disability ID (UDID) card recording your assessed disability.',
    showMap: false,
    seo: {
      title: 'Get Your UDID Card | Step 1 Adapted Vehicle Guide',
      description:
        'How to apply online for a Unique Disability ID (UDID) card on the Swavlamban portal and get a driving ability assessment.',
    },
    keyPoints: [
      {
        title: 'Apply online',
        text: 'Visit the official Swavlamban portal (swavlambancard.gov.in) to register and start your UDID application.',
        linkUrl: 'https://www.swavlambancard.gov.in/',
        linkLabel: 'Open Swavlamban Portal',
      },
      {
        title: 'Medical assessment',
        text: 'You will be assigned a government hospital for assessment. A UDID card can be issued at any assessed disability percentage — it is not restricted to 40% or above. That said, a benchmark disability of 40% or more is the threshold used for certain reservations and, for some vehicle categories, GST/road-tax concession eligibility.',
        linkUrl: '',
        linkLabel: '',
      },
      {
        title: 'Ask for a driving/fitness assessment',
        text: 'If you plan to drive, ask the medical board to record what vehicle modifications you are likely to need (for example, hand-operated accelerator/brake, or a steering knob) — the RTO will ask for this later on Form 1A.',
        linkUrl: '',
        linkLabel: '',
      },
    ],
  },
  {
    order: 2,
    label: 'Step 2',
    slug: 'step-2',
    title: 'Buy and register an "Adapted Vehicle"',
    description:
      'You can buy a regular car and have it modified, or buy one with factory-fitted controls, then register it with the RTO as an Adapted Vehicle.',
    showMap: false,
    seo: {
      title: 'Buying & Registering an Adapted Vehicle | Current GST & Road Tax Rules',
      description:
        'What GST rate applies to small cars, how road tax exemption works by state, and how to register a car as an Adapted Vehicle.',
    },
    keyPoints: [
      {
        title: '18% GST applies to everyone now',
        text: 'Since the September 2025 GST reform, small cars (up to 4,000mm, engine ≤ 1200cc petrol/CNG/LPG or ≤ 1500cc diesel) carry a flat 18% GST with no cess for all buyers. Because of this, the Ministry of Heavy Industries discontinued its separate GST concession certificate for orthopaedic disability on these vehicles in October 2025 — there is no extra GST saving to apply for on this category of car.',
        linkUrl: 'https://heavyindustries.gov.in/',
        linkLabel: 'Ministry of Heavy Industries updates',
      },
      {
        title: 'Choose a certified modification workshop',
        text: 'If retrofitting an existing vehicle, ask the workshop directly for proof of its current ARAI or ICAT certification before booking — do not assume a workshop is certified just because it advertises retrofitting services.',
        linkUrl: '/step-3',
        linkLabel: 'Find a workshop',
      },
      {
        title: 'Register as an "Adapted Vehicle" with your RTO',
        text: 'Registering the vehicle as an Adapted Vehicle (the modern term for what older rules called an "Invalid Carriage") can bring a partial or full road tax waiver and, in some states, an insurance discount — but the exact benefit is set by each state, not a fixed national rate. Confirm the figure with your state transport department before budgeting for it.',
        linkUrl: '',
        linkLabel: '',
      },
    ],
  },
  {
    order: 3,
    label: 'Step 3',
    slug: 'step-3',
    title: "Apply for a learner's licence",
    description:
      'Find modification workshops across India and start your learner’s licence application online.',
    showMap: true,
    seo: {
      title: "Apply for a Learner's Licence & Find Modification Workshops",
      description:
        "Apply for a learner's licence for an adapted vehicle via Parivahan Sarathi, and find car modification workshops across India on our map.",
    },
    keyPoints: [
      {
        title: 'Apply online via Parivahan',
        text: 'Apply for a learner’s licence for an adapted/invalid-carriage vehicle category through the MoRTH Parivahan Sarathi portal.',
        linkUrl: 'https://sarathi.parivahan.gov.in/',
        linkLabel: 'Parivahan Sarathi Portal',
      },
      {
        title: 'Documents you will need',
        text: 'Your UDID card, Aadhaar card, proof of address, and a Form 1A medical fitness certificate from an authorised medical practitioner, as required under the Central Motor Vehicles Rules.',
        linkUrl: '',
        linkLabel: '',
      },
      {
        title: 'Computerised theory test',
        text: 'Schedule and pass the computerised road-signs and theory test at your RTO. Once you pass, your learner’s licence is generally available to download the same day.',
        linkUrl: '',
        linkLabel: '',
      },
    ],
  },
  {
    order: 4,
    label: 'Step 4',
    slug: 'step-4',
    title: 'Practical training and permanent licence',
    description:
      'Complete hands-on training with your adapted controls, then take the RTO driving test for your permanent licence.',
    showMap: false,
    seo: {
      title: 'Practical Driving Test & Permanent Licence for an Adapted Vehicle',
      description:
        'Complete hands-on training in your adapted car, pass the RTO driving test, and get your permanent licence.',
    },
    keyPoints: [
      {
        title: 'Practise with your adapted controls',
        text: 'Practise in your own adapted vehicle, or at a driving school that has a vehicle fitted with the same type of controls, until you are confident.',
        linkUrl: '',
        linkLabel: '',
      },
      {
        title: 'Book your permanent licence test',
        text: 'Under the general Central Motor Vehicles Rules, a learner’s licence must be held for a minimum period (commonly 30 days) before the permanent licence test can be booked — this rule applies to all drivers, not only disabled applicants. Book your slot via Parivahan Sarathi and bring your own adapted vehicle to the RTO for the test.',
        linkUrl: 'https://sarathi.parivahan.gov.in/',
        linkLabel: 'Book test slot',
      },
      {
        title: 'RTO inspector review',
        text: 'The RTO Motor Vehicle Inspector checks that your vehicle’s modifications match your medical certificate and assesses your driving before issuing a permanent licence endorsed for that adapted vehicle.',
        linkUrl: '',
        linkLabel: '',
      },
    ],
  },
];

export const shops: ShopData[] = [
  {
    id: 'ferro-equip',
    name: 'Ferro Equip',
    rating: 4.6,
    reviews: 99,
    city: 'Mumbai',
    address:
      'Plot-CTS-1615, 1st left after St. Anthony Church, (Blue & White Gate, Off, Marve Rd, Malad (W, Mumbai, Maharashtra 400095, India',
    lat: 19.19,
    lng: 72.8,
    phoneNumbers: [{ phone: '9820120556' }],
    googleMapUrl: 'https://maps.app.goo.gl/j7TnXUnKvetqYQev7',
    images: ['/media/car_ferro_a2a4e82d9d.jpg'],
    verified: false,
  },
  {
    id: 'galaxy-system-workshop',
    name: 'Galaxy System Workshop',
    rating: 4.8,
    reviews: 42,
    city: 'Bangalore',
    address:
      'No 34/2, 1st Main Rd, near RV College of Engineering, Mysore Road, RV Vidyaniketan, Post, Bengaluru, Karnataka 560059',
    lat: 12.924840889280905,
    lng: 77.49887754394982,
    phoneNumbers: [{ phone: '9845012345' }],
    googleMapUrl: 'https://maps.app.goo.gl/uXpTqZq3Z8iE6nF89',
    images: ['/media/galary_system_workshop_bangalore_f947efcf16.jpg'],
    verified: false,
  },
  {
    id: 'mk-motors',
    name: 'M.K. Motors',
    rating: 4.7,
    reviews: 138,
    city: 'Jaipur',
    address:
      'Plot No. 12, Sikar Rd, Opp. Roadways Bus Stand, Subhash Nagar, Jaipur, Rajasthan 302016',
    lat: 26.93856239102834,
    lng: 75.79512349012345,
    phoneNumbers: [{ phone: '9829055443' }],
    googleMapUrl: 'https://maps.app.goo.gl/6m1E8oPq9Z8iE6nF8',
    images: [
      '/media/m_k_motors_jaipur_rajasthan_1_7fb2dd3fd5.jpg',
      '/media/m_k_motors_jaipur_rajasthan_2_c86cd8e200.jpg',
      '/media/m_k_motors_jaipur_rajasthan_90a158718b.jpg',
    ],
    verified: false,
  },
  {
    id: 'mobility-solutions',
    name: 'Mobility Solutions',
    rating: 4.9,
    reviews: 86,
    city: 'Karnal',
    address: 'Road, Kunjpura Rd, Daniyalpur, Karnal, Haryana 132023',
    lat: 29.72205262628715,
    lng: 77.02630053067902,
    phoneNumbers: [{ phone: '9812045678' }],
    googleMapUrl: 'https://maps.app.goo.gl/4FtU6z6C7wdwJHDn7',
    images: ['/media/mobility_solutions_karnal_895d9f202c.jpg'],
    verified: false,
  },
  {
    id: 'shree-vari-engineering',
    name: 'Shree Vari Engineering Works',
    rating: 4.8,
    reviews: 175,
    city: 'Chennai',
    address:
      'No 43 roy nagar, 80 feet road, chandraprabu colony ponniuamman meadu chennai 110 Madhavaram, Srinivasa Nagar, Ponniammanmedu, Chennai, Tamil Nadu 600110',
    lat: 13.129347402404756,
    lng: 80.23529438288283,
    phoneNumbers: [{ phone: '9094197197' }],
    googleMapUrl: 'https://maps.app.goo.gl/5tb1JzeyaVckRqS77',
    images: [
      '/media/shree_vari_engineering_works_chennai_05eff0b137.jpg',
      '/media/shree_vari_engineering_works_chennai_2_8f4114e4d9.jpg',
    ],
    verified: false,
  },
  {
    id: 'saika-mobility-hub',
    name: 'Saika Mobility Hub',
    rating: 4.9,
    reviews: 599,
    city: 'Ahmedabad',
    address:
      '25, Goyal Plaza, Premchand Nagar Rd, opp. Goyal Park, Vastrapur, Ahmedabad, Gujarat 380015',
    lat: 23.041306519479132,
    lng: 72.53086440772194,
    phoneNumbers: [{ phone: '9426051000' }],
    googleMapUrl: 'https://maps.app.goo.gl/4nzcebECPLd91yTV7',
    images: [
      '/media/saika_mobility_hub_1_36e78e2c3a.jpg',
      '/media/saika_mobility_hub_d1363ec9a5.jpg',
    ],
    verified: false,
  },
  {
    id: 'anand-motors',
    name: 'Anand motors',
    rating: 5.0,
    reviews: 15,
    city: 'Jaipur',
    address:
      '8, krishna colony, naya kheda, Ambabari, Jaipur, Rajasthan 302039',
    lat: 26.953105757166604,
    lng: 75.78065416455763,
    phoneNumbers: [
      { phone: '9414070083' },
      { phone: '9782150101' },
      { phone: '1412336495' },
    ],
    googleMapUrl: 'https://maps.app.goo.gl/GD2nTW9pSLBB7fxi9',
    images: ['/media/anand_motors_jaipur_ce1183a448.jpg'],
    verified: false,
  },
];
