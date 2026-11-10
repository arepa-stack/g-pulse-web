import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { AppTour } from '../components/sections/AppTour'
import { Highlights } from '../components/sections/Highlights'
import { Routines } from '../components/sections/Routines'
import { Features } from '../components/sections/Features'
import { Plans } from '../components/sections/Plans'
import { FAQ } from '../components/sections/FAQ'
import { CTA } from '../components/sections/CTA'

export function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppTour />
        <Highlights />
        <Features />
        <Routines />
        <Plans />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
