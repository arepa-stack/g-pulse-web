import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Experience } from '../components/sections/Experience'
import { Features } from '../components/sections/Features'
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
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
