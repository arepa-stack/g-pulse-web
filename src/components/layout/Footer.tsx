import { Instagram, Twitter, Youtube, Github } from 'lucide-react'
import { Logo, NAV_LINKS } from './Header'

const SOCIAL = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Github, label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div>
          <Logo />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Live Strong. Live Future.</p>
        </div>

        <nav className="grid content-start gap-2.5 text-sm" aria-label="Navegación del pie">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Producto</h4>
          {NAV_LINKS.map((n) => (
            <a key={n.href} href={n.href} className="text-zinc-400 transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="grid content-start gap-2.5 text-sm">
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Legal</h4>
          <a href="#" className="text-zinc-400 transition-colors hover:text-white">Política de privacidad</a>
          <a href="#" className="text-zinc-400 transition-colors hover:text-white">Términos y condiciones</a>
        </div>

        <div className="flex gap-2 md:content-start">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-white/20 hover:text-neon"
            >
              <s.icon size={17} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} G-Pulse. Todos los derechos reservados.
      </div>
    </footer>
  )
}
