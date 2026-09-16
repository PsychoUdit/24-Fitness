// Site-wide configuration dynamically sourced from gymData.json
import gymData from '../data/gymData.json'

export const siteConfig = {
  gymName: gymData.business.name,
  tagline: gymData.business.tagline,
  whatsappNumber: import.meta.env.VITE_GYM_WHATSAPP_PHONE || gymData.business.whatsapp,
  displayPhone: gymData.business.phone,
  instagramHandle: gymData.business.instagramHandle,
  instagramUrl: gymData.business.instagramUrl,
  address: gymData.business.address,
  city: gymData.business.city,
  mapsQuery: gymData.business.mapsQuery,
  hours: gymData.business.hours.summary,
  floorHours: gymData.business.hours.floor,
  staffHours: gymData.business.hours.staff,
  trialOffer: gymData.business.offer,
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
