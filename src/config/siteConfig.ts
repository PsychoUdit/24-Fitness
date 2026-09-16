// Site-wide configuration dynamically sourced from gymData.json (single source of truth)
import gymData from '../data/gymData.json'

export interface Plan {
  name: string
  price: string
  period: string
  tagline: string
  popular: boolean
  features: string[]
}

export interface GymClass {
  name: string
  desc: string
  level?: string
  duration?: string
  intensity?: string
  category?: string
}

export interface Testimonial {
  name: string
  achievement: string
  rating: number
  quote: string
  tag: string
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

export interface ScheduleItem {
  time: string
  name: string
  trainer: string
  category: string
}

const hero = gymData.hero
const business = gymData.business
const classes = gymData.classes
const scheduleData = gymData.schedule
const pricing = gymData.pricing
const socialProof = gymData.socialProof

export const siteConfig = {
  gymName: business.name,
  fullName: business.fullName,
  tagline: business.tagline,
  rating: socialProof.ratingValue,

  whatsappNumber: import.meta.env.VITE_GYM_WHATSAPP_PHONE || business.whatsapp,
  displayPhone: business.phone,
  phoneTel: '+' + business.phone.replace(/[^\d]/g, ''),
  address: business.address,
  city: business.city,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${business.name}, ${business.address}`),
  instagramHandle: business.instagramHandle,
  instagramUrl: business.instagramUrl,

  brand: {
    name: business.name,
    fullName: business.fullName,
    tagline: business.tagline,
  },

  contact: {
    whatsappNumber: import.meta.env.VITE_GYM_WHATSAPP_PHONE || business.whatsapp,
    phoneDisplay: business.phone,
    phoneTel: '+' + business.phone.replace(/[^\d]/g, ''),
    address: business.address,
    city: business.city,
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(`${business.name}, ${business.address}`),
    instagramHandle: business.instagramHandle,
    instagramUrl: business.instagramUrl,
  },

  hours: {
    summary: business.hours.summary,
    floor: business.hours.floor,
    staff: business.hours.staff,
    confirmed: true,
    label: business.hours.summary as string | null,
  },

  trial: {
    confirmed: true,
    ctaLabel: hero.primaryCta,
    detail: business.offer,
  },

  hero: {
    badge: hero.badge,
    desc: hero.description,
    headline: [
      { text: `${hero.titlePrefix} `, highlight: false },
      { text: hero.titleHighlight, highlight: true },
    ] as HeadlineLine[],
    primaryCta: hero.primaryCta,
    secondaryCta: hero.secondaryCta,
    microCopy: hero.microCopy,
    trustPoints: hero.trustPoints,
    stats: hero.stats as Stat[],
  },

  about: {
    tag: gymData.about.tag,
    title: gymData.about.title,
    subtitle: gymData.about.subtitle,
    benefits: gymData.about.benefits,
    ctaBox: gymData.about.ctaBox,
  },

  classes: {
    tag: classes.tag,
    title: classes.title,
    subtitle: classes.subtitle,
    categories: classes.categories,
    items: classes.items.map((cls) => ({
      name: cls.title,
      desc: cls.desc,
      level: cls.level,
      duration: cls.duration,
      intensity: cls.intensity,
      category: cls.category,
    })) as GymClass[],
    note: classes.subtitle,
  },

  schedule: {
    tag: scheduleData.tag,
    title: scheduleData.title,
    subtitle: scheduleData.subtitle,
    days: scheduleData.days,
    floorNote: scheduleData.floorNote,
    timetable: scheduleData.timetable as Record<string, ScheduleItem[]>,
  },

  pricing: {
    confirmed: true,
    tag: pricing.tag,
    title: pricing.title,
    subtitle: pricing.subtitle,
    guarantee: pricing.guarantee,
    plans: pricing.plans as Plan[],
  },

  socialProof: {
    tag: socialProof.tag,
    title: socialProof.title,
    ratingValue: socialProof.ratingValue,
    reviewCount: socialProof.reviewCount,
    instagramTitle: socialProof.instagramTitle,
    instagramDesc: socialProof.instagramDesc,
    testimonials: socialProof.testimonials as Testimonial[],
  },

  testimonials: {
    confirmed: true,
    items: socialProof.testimonials as Testimonial[],
  },

  footer: {
    copyrightName: gymData.footer.copyrightName,
    madeIn: gymData.footer.madeIn,
  },
}

export function buildWhatsAppLeadUrl(data: {
  name: string
  phone: string
  goal?: string
  preferredTime?: string
  plan?: string
}) {
  const lines = [
    `*New Free Trial Inquiry — ${siteConfig.gymName}*`,
    `--------------------------------`,
    `👤 *Name:* ${data.name.trim()}`,
    `📱 *Phone:* ${data.phone.trim()}`,
    data.goal ? `🎯 *Fitness Goal:* ${data.goal}` : '',
    data.preferredTime ? `⏰ *Preferred Time:* ${data.preferredTime}` : '',
    data.plan ? `💳 *Interested Plan:* ${data.plan}` : '',
    `--------------------------------`,
    `Sent via ${siteConfig.gymName} Website`,
  ].filter(Boolean)

  const message = lines.join('\n')
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}