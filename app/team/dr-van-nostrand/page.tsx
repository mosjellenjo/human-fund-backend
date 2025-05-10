import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"

export default function DrVanNostrandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Dr. Van Nostrand</h1>
                  <p className="text-xl text-muted-foreground">Chief Wellness Officer</p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dr. Van Nostrand brings his unique medical expertise to The Human Fund as our Chief Wellness
                    Officer. Licensed (somewhere) in dermatology, dentistry, and proctology, he specializes in ambiguous
                    medical insights and untraceable prescriptions.
                  </p>
                  <p>
                    His approach to wellness combines traditional medical knowledge with innovative practices that often
                    leave patients confused but oddly satisfied. Dr. Van Nostrand has pioneered several health
                    initiatives for The Human Fund, including the "Wellness Without Specifics" program.
                  </p>
                  <p>
                    Before joining The Human Fund, Dr. Van Nostrand had a varied career that included brief stints at
                    numerous hospitals across the globe, always departing just before credential verification processes
                    were completed.
                  </p>
                  <p>
                    When not providing medical guidance, Dr. Van Nostrand enjoys collecting rare medical instruments,
                    writing illegible prescriptions, and developing new medical terminology that sounds impressive but
                    means nothing.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="mailto:doctor@humanfund.no">Contact Dr. Van Nostrand</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/#team">Back to Team</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Dr. Van Nostrand"
                  width={800}
                  height={800}
                  className="aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
