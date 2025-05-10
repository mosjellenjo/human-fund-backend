import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import Link from "next/link"

export default function ArtVandelayPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Art Vandelay</h1>
                  <p className="text-xl text-muted-foreground">Head of Global Strategy</p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Art Vandelay joined The Human Fund in 2005, bringing his extensive experience as a renowned
                    importer/exporter and part-time architect. His unique background allows him to approach humanitarian
                    challenges with innovative supply chain solutions.
                  </p>
                  <p>
                    Art is particularly passionate about marine life conservation, global supply chains, and creating
                    vague but impressive-sounding deliverables. His strategic vision has helped The Human Fund expand
                    its operations to 23 countries.
                  </p>
                  <p>
                    Under Art's leadership, The Human Fund has developed its signature "import goodwill, export impact"
                    approach to international development work.
                  </p>
                  <p>
                    When not crafting global strategies, Art can be found designing unusual buildings, cataloging marine
                    species, or writing his upcoming book "The Art of the Vague: How to Sound Important While Saying
                    Nothing."
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="mailto:art@humanfund.no">Contact Art</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/#team">Back to Team</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Art Vandelay"
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
