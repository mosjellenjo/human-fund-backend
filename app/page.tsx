import Chatbot from '@/components/Chatbot';
import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { ImpactSection } from "@/components/impact-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <Chatbot />
        <ImpactSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
