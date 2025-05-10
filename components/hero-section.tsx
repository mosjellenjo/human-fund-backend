import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="People helping people"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
      </div>
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8 py-24">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Established 1997</div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl">
          Money for People
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          The Human Fund is dedicated to making a difference in the lives of people everywhere, especially during the
          Festivus season.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="px-8">
            Donate Now
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Learn More
          </Button>
        </div>
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">$5.3M</span>
            <span className="text-muted-foreground">Funds Raised</span>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">23</span>
            <span className="text-muted-foreground">Countries</span>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">12K+</span>
            <span className="text-muted-foreground">Lives Improved</span>
          </div>
        </div>
      </div>
    </section>
  )
}
