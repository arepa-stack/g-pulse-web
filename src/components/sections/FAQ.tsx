import { FAQ as ITEMS } from '@/data/landing'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from './Section'

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="Preguntas frecuentes" title="¿Dudas?" lead="Lo que más nos preguntan antes de empezar." />

        <Accordion type="single" collapsible className="rounded-3xl border border-white/10 bg-white/[0.03] px-6">
          {ITEMS.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-white/10">
              <AccordionTrigger className="py-5 text-base text-white hover:no-underline hover:text-neon">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-zinc-400">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
