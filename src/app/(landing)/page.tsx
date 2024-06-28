import { DashboardContainer } from "@/components/dashboard-container"

import { Metadata } from "next"
import Hero from "./_components/hero"
import FeaturesGrid from "./_components/features"
import { Companies } from "./_components/companies"

export const metadata: Metadata = {
  title: "Web Coders Lab - Learn web development for free",
}

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Companies /> */}
      {/* <FeaturesGrid /> */}
    </>
  )
}
