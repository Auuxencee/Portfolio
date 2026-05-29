'use client'
import dynamic from 'next/dynamic'
import Nav from '@/components/ui/Nav'
import SectionProgress from '@/components/ui/SectionProgress'
import HeroSection from '@/components/sections/HeroSection'
import MacBookSection from '@/components/sections/MacBookSection'
import AboutSection from '@/components/sections/AboutSection'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import JourneySection from '@/components/sections/JourneySection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ContactSection from '@/components/sections/ContactSection'
import { useLenis } from '@/hooks/useLenis'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useRevealObserver } from '@/hooks/useRevealObserver'

const AtmosphericCanvas = dynamic(
  () => import('@/components/backgrounds/AtmosphericCanvas'),
  { ssr: false }
)

const SECTION_IDS = [
  'hero', 'about', 'expertise', 'projects', 'experience', 'journey', 'certifications', 'skills', 'contact',
]

export default function PageShell() {
  useLenis()
  useRevealObserver()
  const activeSection = useScrollSpy(SECTION_IDS)

  return (
    <>
      <div
        id="bg-root"
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <AtmosphericCanvas />
      </div>

      <Nav activeSection={activeSection} />

      <main className="relative z-10">
        <HeroSection />
        <MacBookSection />
        <AboutSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <JourneySection />
        <CertificationsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <SectionProgress activeSection={activeSection} />
    </>
  )
}
