import { TypographyH1, TypographyLead } from "@/components/typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-14">
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
