import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const NAV_LINKS = [
  { href: '#app', label: 'Cómo funciona' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#entrenamientos', label: 'Rutinas' },
  { href: '#planes', label: 'Planes' },
  { href: '#faq', label: 'FAQ' },
]

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5 font-bold tracking-tight" aria-label="G-Pulse inicio">
      <img src="/icon.webp" alt="" className="size-8 rounded-lg ring-1 ring-white/10" />
      <span className="text-[17px]">G-Pulse</span>
    </a>
  )
}

export function Header() {
  const scrolled = useScrollHeader()
  const [open, setOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-white/5 bg-zinc-950/70 backdrop-blur-md'
          : 'border-transparent bg-gradient-to-b from-zinc-950/80 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full px-4 sm:inline-flex">
            <a href="#descargar">
              <Download /> Descargar
            </a>
          </Button>
          <button
            className="grid size-10 place-items-center rounded-full text-zinc-300 hover:bg-white/5 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild size="lg" className="mt-2">
                <a href="#descargar" onClick={() => setOpen(false)}>
                  <Download /> Descargar gratis
                </a>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
