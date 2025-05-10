import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TeamSection() {
  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Team</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Meet the dedicated individuals behind The Human Fund.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image src="/images/Joseph 1.png" alt="Joseph B. Dale" fill className="object-cover object-[center_30%]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Joseph B. Dale</CardTitle>
              <CardDescription>Founder & President</CardDescription>
              <p className="mt-4 text-muted-foreground">
                Founded The Human Fund to promote people-first innovation, social betterment, and holiday gift
                avoidance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Button variant="outline" size="sm">
                Bio
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image src="/images/Art V 2.png" alt="Art Vandelay" fill className="object-cover object-[center_40%]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Art Vandelay</CardTitle>
              <CardDescription>Head of Global Strategy</CardDescription>
              <p className="mt-4 text-muted-foreground">
                Renowned importer/exporter and part-time architect. Passionate about marine life, supply chains, and
                vague deliverables.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Button variant="outline" size="sm">
                Bio
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image
                  src="/images/Van Nostren 1.png"
                  alt="Dr. Van Nostrand"
                  fill
                  className="object-cover object-[center_30%]"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Dr. Van Nostrand</CardTitle>
              <CardDescription>Chief Wellness Officer</CardDescription>
              <p className="mt-4 text-muted-foreground">
                Licensed (somewhere) in dermatology, dentistry, and proctology. Specializes in ambiguous medical
                insights and untraceable prescriptions.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Button variant="outline" size="sm">
                Bio
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
