export interface Plan {
  name: string
  price: string
  features: string[]
}

export interface GymClass {
  name: string
  desc: string
}

export interface Testimonial {
  quote: string
  name: string
}

export interface HeadlineLine {
  text: string
  highlight: boolean
}

export interface Stat {
  value: number
  decimals?: number
  suffix: string
  label: string
}

export const site = {
  brand: {
    name: '24 Fitness',
    fullName: '24 Fitness Gym & Health Center',
    tagline: 'PIPLIYAHANA · INDORE',
  },

  contact: {
    // WhatsApp number in international format WITHOUT "+" (for wa.me links).
    // India country code: 91. Override at build time with VITE_WHATSAPP_NUMBER if needed.
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '916265119262',
    phoneDisplay: '+91 62651 19262',
    phoneTel: '+916265119262',
    email: null, // TODO: confirm a contact email with the owner, or remove this block
    address: 'Sampat Vihar, near Zodiac Mall, Scheme No. 140, Pipliyahana, Indore – 452016',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('24 Fitness Gym, Sampat Vihar, Scheme No. 140, Pipliyahana, Indore'),
    instagramUrl: 'https://instagram.com/24fitnessgymofficial',
    facebookUrl: null, // Facebook page is dormant (49 likes, no reviews) — omitted until the owner wants it alive
  },

  rating: '4.4', // Aggregated ~4.4/5 across Google / Justdial / directory reviews

  hero: {
    badge: 'Rated ~4.4/5 on Google & Justdial',
    desc: 'Independent gym in Pipliyahana, Indore. No app, no login — start with a free trial class, booked straight from WhatsApp.',
    headline: [
      { text: 'Transform Your', highlight: false },
      { text: 'Body. Transform', highlight: false },
      { text: 'Your Life.', highlight: true },
    ],
    stats: [
      { value: 4.4, decimals: 1, suffix: '/5', label: 'Google & Justdial rating' },
      { value: 243, suffix: '', label: 'Instagram followers' },
      { value: 218, suffix: '', label: 'Posts & updates on Instagram' },
      { value: 1, suffix: '', label: 'Gym location — Pipliyahana' },
    ],
    statsNote:
      'TODO: swap these for stronger owner-confirmed numbers (years open, machines, monthly members) — keep every figure checkable.',
  },

  // 1. TRIAL OFFER — TODO: confirm with owner
  trial: {
    confirmed: false,
    ctaLabel: 'Book a free trial class',
    detail: 'Ask about the free trial on WhatsApp',
    ownerNotes:
      'TODO: confirm with the owner — is a free trial class real? How many sessions? What info does he need back (name + preferred time)?',
  },

  // 2. HOURS — TODO: confirm 24/7 vs 6am–10pm with the owner
  hours: {
    confirmed: false,
    label: null as string | null, // when confirmed, e.g. "Open 24/7" or "6am – 10pm daily"
    ownerNotes: 'TODO: aggregator says 6am-10pm, the name implies 24/7. Ask the owner, do not guess.',
  },

  // 3. PRICING — TODO: confirm real numbers. Never publish the conflicting ones.
  pricing: {
    confirmed: false,
    plans: [] as Plan[], // when confirmed, fill e.g. [{ name: 'Monthly', price: '₹6,500 / 12 months', features: ['24/7 access', ...] }]
    ownerNotes: 'TODO: aggregator says ₹500-750/mo, invoice says ₹6,500/12mo. Ask the owner, do not guess.',
  },

  // 4. LEAD HANDLING — TODO: confirm who replies to WhatsApp leads
  leads: {
    confirmed: false,
    handler: null as string | null, // "owner" | "manager" | "no one yet"
    replyNote: 'The gym replies on WhatsApp',
    ownerNotes: 'TODO: confirm — does the owner, a manager, or nobody actually reply to WhatsApp DMs today?',
  },

  classes: {
    confirmed: false, // Believable core offering shown below; swap for the real list when confirmed
    items: [
      { name: 'Strength Training', desc: 'Free weights, machines and a full strength zone.' },
      { name: 'Cardio & Conditioning', desc: 'Treadmills, bikes and HIIT-style interval work.' },
      { name: 'Group Training', desc: 'Small-group sessions led by a trainer.' },
    ],
    note: 'Ask on WhatsApp for the full class schedule',
    ownerNotes: 'TODO: confirm the real class list + schedule with the owner.',
  },

  testimonials: {
    confirmed: false,
    items: [] as Testimonial[], // add real member quotes as they're collected, e.g. [{ quote: '...', name: '...' }]
    emptyNote: 'Member reviews coming soon',
    ownerNotes: 'TODO: collect 2-3 real member quotes for the testimonial slots.',
  },

  footer: {
    copyrightName: '24 Fitness Gym & Health Center',
    madeIn: 'Indore',
  },
}