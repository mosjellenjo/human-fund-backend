"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"

const impactData = [
  { year: "2018", volunteers: 240, projects: 12 },
  { year: "2019", volunteers: 450, projects: 18 },
  { year: "2020", volunteers: 650, projects: 24 },
  { year: "2021", volunteers: 1200, projects: 36 },
  { year: "2022", volunteers: 2100, projects: 48 },
  { year: "2023", volunteers: 3800, projects: 62 },
]

export function ImpactSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading skeleton
  }

  return (
    <section id="impact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Impact</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how your support has made a difference in the lives of people everywhere.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl py-12">
          <Tabs defaultValue="volunteers" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="volunteers" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Annual Volunteers</CardTitle>
                  <CardDescription>Total volunteers engaged per year</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto w-full">
                  <div className="min-w-[350px] sm:min-w-0 w-full">
                    <ChartContainer
                      config={{
                        volunteers: {
                          label: "Volunteers",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[250px] sm:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData} margin={{ left: 0, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" padding={{ right: 30 }} />
                          <YAxis width={48} tickFormatter={(value) => (value / 10).toString()} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="volunteers" fill="var(--color-volunteers)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Completed</CardTitle>
                  <CardDescription>Number of projects completed per year</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto w-full">
                  <div className="min-w-[350px] sm:min-w-0 w-full">
                    <ChartContainer
                      config={{
                        projects: {
                          label: "Projects",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[250px] sm:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData} margin={{ left: 0, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" padding={{ right: 30 }} />
                          <YAxis width={48} tickFormatter={(value) => (value / 2).toString()} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="projects" fill="var(--color-projects)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Education Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Schools supported across 15 countries</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthcare Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Medical facilities funded and supported</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Festivus Celebrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">397</div>
              <p className="text-xs text-muted-foreground">Aluminum poles distributed worldwide</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
