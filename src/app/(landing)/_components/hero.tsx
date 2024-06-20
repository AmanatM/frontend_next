import { TypographyH1, TypographyLead, TypographyMuted } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full py-12 bg-grid-black/[0.05] dark:bg-grid-white/[0.06] md:py-24 lg:py-32 xl:py-48">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="container relative z-0 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-x-2">
              <TypographyMuted>In Development</TypographyMuted>
              <Badge variant="secondary">Beta</Badge>
            </div>

            <TypographyH1>Learn Web Development the Fun Way</TypographyH1>

            <TypographyLead className="mx-auto max-w-screen-md">
              Welcome to Web Coders Lab! Dive into interactive tutorials, practice coding, and build your skills. Start
              your journey today!
            </TypographyLead>
            <div className="space-x-4">
              <Button asChild size={"lg"}>
                <Link href={"/dashboard"} className="font-bold">
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant={"outline"} size={"lg"}>
                <Link href="#" className="font-bold">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
