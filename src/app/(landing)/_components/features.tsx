import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

import { BookOpen, CheckSquare, Code, Unlock, Zap } from "lucide-react"
import { TypographyH2 } from "@/components/typography"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Window from "@/components/blocks/window"
import IconCircle from "@/components/blocks/icon-circle"
import { Card } from "@/components/ui/card"
import { EvervaultCard } from "@/components/ui/evervault-card"

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
            className={item.className}
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
    icon: <Code className="h-4 w-4" />,
  },
  {
    title: "Free Access",
    description: "Enjoy a wide range of tutorials and resources for free.",
    className: "md:col-span-1",
    header: <SkeletonTwo />,
    icon: <Unlock className="h-4 w-4" />,
  },

  {
    title: "Quizzes & Challenges",
    description: "Test your knowledge with quizzes and coding challenges",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <CheckSquare className="h-4 w-4" />,
  },
  {
    title: "Interactive Tutorials",
    description: "Hands-on tutorials for HTML, CSS, JavaScript, and more.",
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <BookOpen className="h-4 w-4" />,
  },
]

function SkeletonOne() {
  return (
    <div className="mx-auto flex justify-center">
      <Window
        header={{
          grayscaleBtn: true,
          title: "Code Editor",
          icon: Code,
        }}
        className="relative top-3"
      >
        <div className="flex size-full gap-x-1 p-2">
          <div className="h-full w-[100%] overflow-hidden rounded-sm bg-border md:w-1/3" />
          <div className="h-full w-[100%] overflow-hidden rounded-sm bg-border md:w-1/3" />
          <div className="h-full w-[100%] overflow-hidden rounded-sm bg-border md:w-1/3" />
        </div>
      </Window>

      <div className="mx-4 flex self-center">
        <IconCircle color="blue" />
      </div>
      <Window
        header={{
          grayscaleBtn: true,
          title: "Preview",
        }}
        className="relative -top-3"
      >
        <div className="size-full overflow-hidden rounded border bg-popover p-1">
          <span className="text-shadow-outline p-2 text-xl tracking-normal">Hello world!</span>
          <div className="grid size-full grid-cols-3 grid-rows-2 gap-1 p-2">
            <div className="col-span-2 border bg-popover"></div>
            <div className="bg-border" />
            <div className="bg-border" />
            <div className="bg-border" />
            <div className="bg-border" />
            <div className="bg-border" />
          </div>
        </div>
      </Window>
    </div>
  )
}
function SkeletonTwo() {
  return (
    <div className="flex min-h-[150px] w-full justify-center">
      <EvervaultCard text="free" className="" />
    </div>
  )
}
function SkeletonThree() {
  return (
    <div className="max-h-full">
      <Window />
    </div>
  )
}
function SkeletonFour() {
  return (
    <div className="max-h-full">
      <Window />
    </div>
  )
}
