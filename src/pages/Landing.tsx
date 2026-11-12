import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { AppTour } from '@/components/sections/AppTour'
import { Bento } from '@/components/sections/Bento'
import { Routines } from '@/components/sections/Routines'
import { Plans } from '@/components/sections/Plans'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <AppTour />
        <Bento />
        <Routines />
        <Plans />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
