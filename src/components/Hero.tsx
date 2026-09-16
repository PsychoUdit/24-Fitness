import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { siteConfig, type Stat } from '../config/siteConfig'

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { value, decimals = 0, suffix } = stat

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            v.toLocaleString('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) + suffix
        }
      },
    })
    return () => controls.stop()
  }, [inView, value, decimals, suffix])

  return <span ref={ref}>0{suffix}</span>
}

function waLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -25])

  return (
    <section ref={sectionRef} id="home" className="hero-section perspective-scene">
      <div className="hero-overlay" />
      <div className="bg-grid-3d" />

      <motion.div
        className="hero-content gpu-accelerated"
        style={{ y, opacity, scale, rotateX, transformStyle: 'preserve-3d' }}
      >
        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, z: -50, rotateX: -30 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="badge-pulse" />
          <span>{siteConfig.hero.badge}</span>
        </motion.span>

        <h1 className="hero-title">
          {siteConfig.hero.headline.map((line, idx) => (
            <span key={idx} className="hero-line">
              <motion.span
                className="hero-line-inner"
                initial={{ y: '110%', rotateX: -60 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {line.highlight ? <span className="highlight">{line.text}</span> : line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
        >
          {siteConfig.hero.desc}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          <a href="#contact" className="btn btn-primary hover-3d-lift">
            {siteConfig.trial.ctaLabel}
          </a>
          <a
            href={waLink('Hi 24 Fitness, I have a question about membership.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline hover-3d-lift"
          >
            <MessageCircle size={16} />
            Message us on WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, scale: 0.9, z: -100 }}
          animate={{ opacity: 1, scale: 1, z: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
        >
          {siteConfig.hero.stats.map((stat) => (
            <div key={stat.label} className="stat hover-3d-lift" style={{ transformStyle: 'preserve-3d' }}>
              <span className="stat-number" style={{ transform: 'translateZ(15px)' }}>
                <CountUp stat={stat} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
