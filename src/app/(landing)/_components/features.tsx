import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

import { BookOpen, CheckSquare, Code, Unlock } from "lucide-react"
import { TypographyH2 } from "@/components/typography"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function FeaturesGrid() {
  return (
    <div>
      <TypographyH2 className="mb-8 text-center">See What You Can Do</TypographyH2>
      <BentoGrid className="mx-auto max-w-screen-lg md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

const items = [
  {
    title: "Interactive Code Editor",
    description: "Practice coding in real-time with instant feedback.",
    header: <SkeletonOne />,
    className: "md:col-span-2",
    icon: <Code className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Interactive Tutorials",
    description: "Hands-on tutorials for HTML, CSS, JavaScript, and more.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <BookOpen className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Quizzes & Challenges",
    description: "Test your knowledge with quizzes and coding challenges",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <CheckSquare className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Free Access",
    description: "Enjoy a wide range of tutorials and resources for free.",
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Unlock className="h-4 w-4 text-neutral-500" />,
  },
]

function SkeletonOne() {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 p-4">
      <div className="mb-2 h-4 w-3/4 rounded-full bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/2 rounded-full bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-2/3 rounded-full bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/4 rounded-full bg-gray-100 dark:bg-neutral-900" />
    </div>
  )
}
function SkeletonTwo() {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 p-4">
      <div className="mb-2 h-6 w-full rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/2 rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/4 rounded bg-gray-100 dark:bg-neutral-900" />
    </div>
  )
}
function SkeletonThree() {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 p-4">
      <div className="mb-2 h-4 w-full rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/2 rounded bg-gray-100 dark:bg-neutral-900" />
    </div>
  )
}
function SkeletonFour() {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col items-center justify-center space-y-2 p-4">
      <div className="mb-2 h-4 w-1/3 rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/4 rounded bg-gray-100 dark:bg-neutral-900" />
      <div className="mb-2 h-4 w-1/2 rounded bg-gray-100 dark:bg-neutral-900" />
    </div>
  )
}
