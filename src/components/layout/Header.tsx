import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { Button } from '../ui/Button'
import styles from './Header.module.css'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#app', label: 'La app' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#planes', label: 'Planes' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const scrolled = useScrollHeader()
  const [open, setOpen] = useState(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.solid : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label="G-Pulse inicio">
          <img src="/icon.webp" alt="" className={styles.logoIcon} />
          G-Pulse
        </a>

        <nav className={styles.nav} aria-label="Navegación principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.cta}>
          <Button href="#descargar">Descargar</Button>
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            aria-label="Navegación móvil"
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={styles.link}>
                {l.label}
              </a>
            ))}
            <Button href="#descargar" onClick={() => setOpen(false)}>Descargar</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
