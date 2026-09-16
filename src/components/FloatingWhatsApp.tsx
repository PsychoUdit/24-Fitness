import { MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

interface FloatingWhatsAppProps {
  onOpenModal?: () => void
}

export default function FloatingWhatsApp({ onOpenModal }: FloatingWhatsAppProps) {
  const directWaUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hi 24-Fitness! I would like to know more about gym membership and free trial passes.'
  )}`

  return (
    <div className="floating-whatsapp-container">
      <div className="floating-whatsapp-bubble">
        <span className="online-dot"></span>
        <span className="bubble-text">Need help? Chat with us</span>
      </div>
      <a
        href={directWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with 24-Fitness on WhatsApp"
        onClick={() => {
          if (onOpenModal && window.innerWidth < 480) {
            // modal optional hook if needed
          }
        }}
      >
        <MessageCircle size={28} />
      </a>
    </div>
  )
}
