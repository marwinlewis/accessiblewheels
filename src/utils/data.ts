import { getPayloadClient } from './payload'

export async function getSiteGlobals() {
  try {
    const payload = await getPayloadClient()
    const globals = await payload.findGlobal({ slug: 'site-globals' })
    return globals
  } catch (err) {
    console.warn('Error fetching site-globals from Payload:', err)
    return {
      title: 'Step-by-Step Guide: Adapted Vehicles & Driving Licences for Disabled People in India',
      gtmId: 'G-4JRLEMT93M',
      webmasterTag: 'e1pF3HWCsSrAHsjdrwQH0-Is2Dj23MsTNl2VHMoPs0U',
      copyright: '© 2026 AdaptedVehicle.in — All rights reserved.',
      seo: {
        title: 'Adapted Vehicle & Driving Licence Guide for Disabled People in India',
        description: 'A plain-language, step-by-step guide for disabled people in India: get a UDID card, buy and register an adapted vehicle, find a modification workshop, and apply for a driving licence — with current GST and road tax rules.',
      },
      footer: {
        aboutTitle: 'About Adapted Vehicle India',
        aboutText: 'An independent, plain-language guide to buying and registering an adapted vehicle and getting a driving licence in India as a person with disability — with links to the official government portals for every step.',
        quickLinks: [
          { label: 'Home', url: '/' },
          { label: 'Step 1: UDID Card', url: '/step-1' },
          { label: 'Step 2: Car Concessions', url: '/step-2' },
          { label: 'Step 3: ARAI Garages & LL', url: '/step-3' },
          { label: 'Step 4: Permanent License', url: '/step-4' },
        ],
        contactLinks: [
          { label: 'Swavlamban Portal', url: 'https://www.swavlambancard.gov.in/' },
          { label: 'Parivahan Sarathi', url: 'https://sarathi.parivahan.gov.in/' },
          { label: 'DHI Portal', url: 'https://heavyindustries.gov.in/' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/marwinlewis/' },
        ],
      },
    }
  }
}

export async function getGuidePages() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'pages',
      sort: 'order',
      limit: 10,
    })
    return res.docs
  } catch (err) {
    console.warn('Error fetching pages from Payload:', err)
    return []
  }
}

export async function getShopsList() {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'shops',
      limit: 50,
      depth: 2,
    })
    return res.docs
  } catch (err) {
    console.warn('Error fetching shops from Payload:', err)
    return []
  }
}

export async function getGuidePage(slug: string) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return res.docs[0] || null
  } catch (err) {
    console.warn(`Error fetching page ${slug} from Payload:`, err)
    return null
  }
}
