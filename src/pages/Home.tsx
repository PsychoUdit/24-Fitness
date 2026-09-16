import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'
import About from '../components/About.tsx'
import Classes from '../components/Classes.tsx'
import Pricing from '../components/Pricing.tsx'
import Testimonials from '../components/Testimonials.tsx'
import Location from '../components/Location.tsx'
import LeadForm from '../components/LeadForm.tsx'
import Footer from '../components/Footer.tsx'
import BackToTop from '../components/BackToTop.tsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Classes />
        <Pricing />
        <Testimonials />
        <Location />
        <LeadForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}