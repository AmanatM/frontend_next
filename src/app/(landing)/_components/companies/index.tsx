import { Section } from "@/components/layout"
import styles from "./companies.module.css"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Companies() {
  return (
    <Section container="full">
      {/* <h2 className="text-center tracking-tight text-dark-text-tertiary opacity-50">
        Join 4,000+ companies already growing
      </h2> */}
      <div className={cn("no-scrollbar flex max-w-full justify-center overflow-auto", styles.scrollbar)}>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[30vw] bg-transparent bg-gradient-to-r from-background xl:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[30vw] bg-transparent bg-gradient-to-l from-background xl:hidden" />
        <div className={cn("flex shrink-0 items-center gap-4 px-6 lg:gap-6 lg:px-12", styles.scrollbar)}>
          {companies.map(company => (
            <figure key={company.image?.url ?? company.title} className="flex h-16 items-center px-2 py-3 lg:p-4">
              <Image alt={company.title} className="w-24 lg:w-32" height={20} src={company.image!.url} width={32} />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}

type Company = {
  title: string
  image: {
    url: string
  }
}

export const companies: Company[] = [
  {
    title: "Proline",
    image: {
      url: "/images/companies/proline.svg",
    },
  },
  {
    title: "Cloud",
    image: {
      url: "/images/companies/cloud.svg",
    },
  },
  {
    title: "Google Partner",
    image: {
      url: "/images/companies/google-partner.svg",
    },
  },
  {
    title: "Greenish",
    image: {
      url: "/images/companies/greenish.svg",
    },
  },
  {
    title: "Volume",
    image: {
      url: "/images/companies/volume.svg",
    },
  },
  {
    title: "PinPoint",
    image: {
      url: "/images/companies/pinpoint.svg",
    },
  },
]
