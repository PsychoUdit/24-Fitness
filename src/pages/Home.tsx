import { useState } from 'react'
import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'
import About from '../components/About.tsx'
import Classes from '../components/Classes.tsx'
import Schedule from '../components/Schedule.tsx'
import Pricing from '../components/Pricing.tsx'
import SocialProof from '../components/SocialProof.tsx'
import Contact from '../components/Contact.tsx'
import Footer from '../components/Footer.tsx'
import BackToTop from '../components/BackToTop.tsx'
import FloatingWhatsApp from '../components/FloatingWhatsApp.tsx'
import LeadCaptureModal from '../components/LeadCaptureModal.tsx'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalClass, setModalClass] = useState('')

  const openModal = (className?: string) => {
    setModalClass(className || '')
    setModalOpen(true)
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Schedule onOpenModal={openModal} />
        <Pricing />
        <SocialProof onOpenModal={() => openModal()} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialClass={modalClass}
      />
    </>
  )
}
