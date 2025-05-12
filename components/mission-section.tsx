import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function MissionSection() {
  return (
    <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The Human Fund exists to help people who need money get money. It's that simple.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Our Values</h3>
              <p className="text-muted-foreground">
                Founded by Joseph B. Dale, The Human Fund operates on principles of transparency, efficiency, and
                occasionally, alternative celebrations to Christmas.
              </p>
            </div>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Transparency in all donations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Efficiency in fund distribution</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Celebration of Festivus for the rest of us</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Commitment to human dignity</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="The Human Fund Logo"
              width={500}
              height={500}
              className="aspect-square object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
