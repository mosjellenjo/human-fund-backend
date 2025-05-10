import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"

export default function JoBjordalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Jo Bjordal</h1>
                  <p className="text-xl text-muted-foreground">Founder & President</p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Jo Bjordal founded The Human Fund in 1997 with a vision to promote people-first innovation, social
                    betterment, and holiday gift avoidance. His pioneering approach to philanthropy has transformed how
                    organizations think about making a difference.
                  </p>
                  <p>
                    Before establishing The Human Fund, Jo worked in various industries, always with a focus on
                    human-centered design and social impact. His background in both business and humanitarian work gives
                    him a unique perspective on solving complex social challenges.
                  </p>
                  <p>
                    Jo is particularly passionate about the annual Festivus celebrations, which have become a hallmark
                    of The Human Fund's alternative approach to traditional philanthropy.
                  </p>
                  <p>
                    When not leading The Human Fund, Jo enjoys marine biology, architecture, and collecting unusual
                    artifacts from around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="mailto:jo@humanfund.no">Contact Jo</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/#team">Back to Team</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Jo Bjordal"
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
