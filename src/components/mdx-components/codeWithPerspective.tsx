"use client"
import { useState } from "react"
import { PairedItemsPerspectiveCard } from "@/components/mdx-components/blocks/perspective-card"

import ComponentGroup from "./blocks/component-group"
import GroupCodeView from "./blocks/group-codeView"
import GroupSlider from "./blocks/group-slider"
import GroupToggle from "./blocks/group-toggle"

type CodeWithPerspectiveProps = {
  code: string
  containerStyles?: string
  childrenStyles?: string
}

export function CodeWithPerspective({ code, containerStyles, childrenStyles }: CodeWithPerspectiveProps) {
  return (
    <ComponentGroup
      groupData={[
        {
          name: "numberOfChildren",
          value: 4,
        },
        {
          name: "isPerspective",
          value: true,
        },
        {
          name: "code",
          value: code,
        },
      ]}
    >
      <GroupSlider groupValueName="numberOfChildren" maxValue={5} title="Number of children" />

      <div className="grid md:grid-cols-2 gap-x-6 gap-y-16">
        <GroupCodeView code={code} />
        <PairedItemsPerspectiveCard
          groupValueName="numberOfChildren"
          groupIsPerspectiveName="isPerspective"
          containerStyles={containerStyles}
          childrenStyles={childrenStyles}
        />
      </div>

      <GroupToggle title="3D View" groupValueName="isPerspective" />
    </ComponentGroup>
  )
}
