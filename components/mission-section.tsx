import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function MissionSection() {
  return (
    <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-dark-green text-light-green-text">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Our Mission</h2>
            <p className="max-w-[900px] text-light-green-text md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The Human Fund exists to help people who need money get money. It's that simple.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Our Values</h3>
              <p className="text-light-green-text max-w-[500px] mx-auto">
                Founded by Joseph B. Dale, The Human Fund operates on principles of transparency, efficiency, and
                occasionally, alternative celebrations to Christmas.
              </p>
            </div>
            <div className="max-w-sm mx-auto space-y-2">
              <p className="text-light-green-text italic">Transparency in all donations.</p>
              <p className="text-light-green-text italic">Efficiency in fund distribution.</p>
              <p className="text-light-green-text italic">Celebration of Festivus for the rest of us.</p>
              <p className="text-light-green-text italic">Commitment to human dignity.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div style={{ height: 240, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <Image
                src="/images/Humanfund_logo_white.png"
                alt="The Human Fund Logo"
                width={500}
                height={500}
                className="aspect-square object-cover object-center"
                style={{ marginTop: '30px' }}
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
