"use client"

import Image from "next/image"
import React from "react"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

type PerspectiveCardProps = {}

export default function PerspectiveCard({}: PerspectiveCardProps) {
  const [isPerspective, setIsPerspective] = React.useState(false)

  return (
    <div className="inter-var w-full group/card h-auto rounded-xl p-6 py-10 flex items-center justify-center">
      <div className="w-full relative max-w-80">
        {/* Background */}
        <div className="w-full absolute top-0 left-0 -z-10 ">
          <div
            className={cn(
              "grid gap-2 border-2 rounded-md py-2 items-center transition duration-200",
              isPerspective && "skew-y-12 translate-x-[10%] scale-x-90",
            )}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border-muted-foreground border-b-2 last:border-b-0 border-dotted h-12 translate-y-1"
              ></div>
            ))}
          </div>
        </div>

        {/* Front */}
        <div className="w-full ">
          <div
            className={cn(
              "grid gap-2 p-2 items-center border-2 border-transparent transition duration-200",
              isPerspective && "skew-y-12 translate-x-[-10%] scale-x-90",
            )}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-500 opacity-60 h-12 rounded-md"></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Switch id="airplane-mode" checked={isPerspective} onCheckedChange={() => setIsPerspective(prev => !prev)} />
          <Label htmlFor="airplane-mode">3D View</Label>
        </div>
      </div>
    </div>
  )
}
