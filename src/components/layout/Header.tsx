import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useScrollHeader } from '../../hooks/useScrollHeader'
import { Button } from '../ui/Button'
import { DOWNLOAD_URL } from '../../config/app'
import styles from './Header.module.css'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia 3D' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#entrenamientos', label: 'Entrenamientos' },
  { href: '#descargar', label: 'Descargar app' },
]

export function Header() {
  const scrolled = useScrollHeader()
  const [open, setOpen] = useState(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.solid : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#inicio" className={styles.logo} aria-label="G-Pulse inicio">
          <span className={styles.logoIcon}>
            <Zap size={18} />
          </span>
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
          <Button href="#descargar">Comenzar</Button>
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
            <Button href={DOWNLOAD_URL}>Comenzar</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
