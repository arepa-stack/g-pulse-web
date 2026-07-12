import { Zap, Instagram, Twitter, Youtube, Github } from 'lucide-react'
import styles from './Footer.module.css'

const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia 3D' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#entrenamientos', label: 'Entrenamientos' },
]
const SOCIAL = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Github, label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <a href="#inicio" className={styles.logo}>
            <span className={styles.logoIcon}>
              <Zap size={16} />
            </span>
            G-Pulse
          </a>
          <p className={styles.tag}>Live Strong. Live Future.</p>
        </div>

        <nav className={styles.col} aria-label="Navegación del pie">
          <h4 className={styles.colTitle}>Navegación</h4>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={styles.link}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Legal</h4>
          <a href="#" className={styles.link}>Política de privacidad</a>
          <a href="#" className={styles.link}>Términos y condiciones</a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Síguenos</h4>
          <div className={styles.social}>
            {SOCIAL.map((s) => (
              <a key={s.label} href="#" className={styles.socialLink} aria-label={s.label}>
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          © {2026} G-Pulse. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
