import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Support Our Mission</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your contribution helps us continue our work in promoting people-first innovation and social
                  betterment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>One-Time Donation</CardTitle>
                  <CardDescription>Support our current initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$50</div>
                  <p className="text-muted-foreground mt-2">Help fund our ongoing projects</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/donate/one-time">Donate Now</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Supporter</CardTitle>
                  <CardDescription>Become a regular contributor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">$25</div>
                  <p className="text-muted-foreground mt-2">Per month to sustain our mission</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/donate/monthly">Subscribe</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Corporate Partner</CardTitle>
                  <CardDescription>Partner with us as an organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">Custom</div>
                  <p className="text-muted-foreground mt-2">Tailored partnership opportunities</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/donate/corporate">Contact Us</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-bold">Volunteer</h3>
                    <p className="text-muted-foreground">
                      Join our team of dedicated volunteers making a difference in communities worldwide.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">Corporate Sponsorship</h3>
                    <p className="text-muted-foreground">
                      Partner with us to align your brand with social impact and sustainability.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">In-Kind Donations</h3>
                    <p className="text-muted-foreground">
                      Donate goods, services, or expertise to support our programs.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/#contact">Contact Us to Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
