import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TeamSection() {
  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-dark-green text-light-green-text">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Our Team</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Meet the dedicated individuals behind The Human Fund.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <Card className="overflow-hidden bg-gray-800 text-light-green-text border-gray-700">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative overflow-hidden">
                <Image src="/images/Joseph 3.png" alt="Joseph B. Dale" fill className="object-cover object-[center_30%]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Joseph B. Dale</CardTitle>
              <CardDescription className="text-gray-400">Founder & President</CardDescription>
              <p className="mt-4 text-gray-400">
                Founded The Human Fund to promote people-first innovation, social betterment, and holiday gift
                avoidance.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-gray-700">
              <Button variant="ghost" size="sm" className="text-light-green-text hover:text-white">
                Contact
              </Button>
              <Button variant="outline" size="sm" className="bg-button-yellow text-black border-button-yellow hover:bg-white hover:text-black">
                Bio
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden bg-gray-800 text-light-green-text border-gray-700">
            <CardHeader className="p-0">
              <div className="h-60 w-full relative">
                <Image src="/images/Art V 2.png" alt="Art Vandelay" fill className="object-cover object-[center_40%]" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle>Art Vandelay</CardTitle>
              <CardDescription className="text-gray-400">Head of Global Strategy</CardDescription>
              <p className="mt-4 text-gray-400">
                Renowned importer/exporter and part-time architect. Passionate about marine life, supply chains, and
                vague deliverables.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-gray-700">
              <Button variant="ghost" size="sm" className="text-light-green-text hover:text-white">
                Contact
              </Button>
              <Button variant="outline" size="sm" className="bg-button-yellow text-black border-button-yellow hover:bg-white hover:text-black">
                Bio
              </Button>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden bg-gray-800 text-light-green-text border-gray-700">
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
              <CardDescription className="text-gray-400">Chief Wellness Officer</CardDescription>
              <p className="mt-4 text-gray-400">
                Licensed (somewhere) in dermatology, dentistry, and proctology. Specializes in ambiguous medical
                insights and untraceable prescriptions.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6 border-gray-700">
              <Button variant="ghost" size="sm" className="text-light-green-text hover:text-white">
                Contact
              </Button>
              <Button variant="outline" size="sm" className="bg-button-yellow text-black border-button-yellow hover:bg-white hover:text-black">
                Bio
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
