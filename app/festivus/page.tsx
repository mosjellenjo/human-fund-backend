import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FestivusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Festivus for the Rest of Us
                </h1>
                <p className="text-muted-foreground">A Human Fund Tradition</p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Festivus Pole"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Human Fund is proud to be the world's leading promoter of Festivus, a holiday celebration for the
                  rest of us. Celebrated on December 23rd, Festivus is an alternative to the commercialism and pressures
                  of the December holiday season.
                </p>
                <h2 className="text-xl font-bold">The Festivus Traditions</h2>
                <p>Festivus celebrations include several important traditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>The Festivus Pole:</strong> An unadorned aluminum pole, chosen for its high
                    strength-to-weight ratio
                  </li>
                  <li>
                    <strong>The Airing of Grievances:</strong> A time to tell others how they have disappointed you over
                    the past year
                  </li>
                  <li>
                    <strong>Feats of Strength:</strong> The head of the household selects one person at the celebration
                    and challenges them to a wrestling match
                  </li>
                  <li>
                    <strong>Festivus Miracles:</strong> Easily explainable events that are nevertheless labeled as
                    "Festivus Miracles"
                  </li>
                </ul>
                <h2 className="text-xl font-bold">The Human Fund's Festivus Initiative</h2>
                <p>
                  Since our founding, The Human Fund has distributed over 10,000 aluminum poles to families worldwide,
                  helping spread the joy of Festivus to those who might otherwise be caught up in the commercial holiday
                  rush.
                </p>
                <p>
                  Our annual Festivus fundraiser helps support our year-round humanitarian efforts while promoting the
                  simple joys of an unadorned aluminum pole and honest communication through the Airing of Grievances.
                </p>
                <div className="flex justify-center pt-4">
                  <Button size="lg" asChild>
                    <Link href="/donate">Support Our Festivus Initiative</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
