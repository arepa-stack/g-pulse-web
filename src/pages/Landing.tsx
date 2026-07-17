import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Experience } from '../components/sections/Experience'
import { Features } from '../components/sections/Features'
import { Routines } from '../components/sections/Routines'
import { Stats } from '../components/sections/Stats'
import { CTA } from '../components/sections/CTA'

export function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Features />
        <Routines />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
