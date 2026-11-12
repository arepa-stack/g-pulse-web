import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { DOWNLOAD_URL } from '@/config/app'
import { cn } from '@/lib/utils'

const live = DOWNLOAD_URL.startsWith('http')

export function CTA() {
  return (
    <section id="descargar" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-8 sm:p-14 md:flex-row md:items-center"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-neon/15 blur-[100px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative max-w-lg">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon">Comienza hoy</p>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tighter text-white sm:text-6xl">
              Convierte cada sesión en <span className="text-neon">progreso.</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-400">Gratis en Android. Crea tu cuenta y entrena hoy mismo.</p>

            <a
              href={live ? DOWNLOAD_URL : undefined}
              aria-disabled={!live}
              target="_blank"
              rel="noopener"
              className={cn(
                'mt-8 inline-flex items-center gap-3 rounded-2xl bg-neon px-6 py-3.5 text-white transition hover:shadow-[0_0_36px_rgba(165,61,255,0.4)] active:scale-[0.97]',
                !live && 'pointer-events-none opacity-80',
              )}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path fill="currentColor" d="M4 2.5v19a1 1 0 0 0 1.5.86l16-9.5a1 1 0 0 0 0-1.72l-16-9.5A1 1 0 0 0 4 2.5z" />
              </svg>
              <span className="text-left leading-tight">
                <small className="block text-xs font-medium opacity-70">{live ? 'Disponible en' : 'Muy pronto en'}</small>
                <span className="text-lg font-bold">Google Play</span>
              </span>
            </a>
          </div>

          {live && (
            <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-md">
              <QRCodeSVG value={DOWNLOAD_URL} size={136} bgColor="transparent" fgColor="#fafafa" />
              <p className="font-mono text-xs text-zinc-500">Escanea con tu teléfono</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
