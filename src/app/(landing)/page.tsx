import { DashboardContainer } from "@/components/dashboard-container"

import { Metadata } from "next"
import Hero from "./_components/hero"

export const metadata: Metadata = {
  title: "Web Coders Lab - Learn web development for free",
}

export default function Home() {
  return (
    <DashboardContainer className="space-y-8">
      <Hero />
    </DashboardContainer>
  )
}
