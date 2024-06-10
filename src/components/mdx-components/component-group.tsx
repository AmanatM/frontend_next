"use client"
// Container.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import CodeHighlighter from "../universalCodeHighliter"
import { cn } from "@/lib/utils"
import { Slider } from "../ui/slider"

type SliderProps = {
  title: string
  initialValue: number
  maxValue: number
  minValue: number
  addPercentageSign?: boolean
}

type ToggleProps = {
  title: string
  initialValue: number
  isPercentage?: boolean
}

type GroupDataItem = {
  type: "slider" | "toggle" | "custom"
  name: string
} & SliderProps &
  ToggleProps

// Create the context with a default value
const ContainerContext = createContext<ContainerContextType | undefined>(undefined)

// Custom hook to use the Container context
export const useContainerContext = (): ContainerContextType & {
  isInGroup: boolean
} => {
  const context = useContext(ContainerContext)
  const isInGroup = context === undefined

  return {
    ...context,
    isInGroup,
  }
}

// Define the props for the Container component
interface ContainerProps {
  children: ReactNode
  withCode?: boolean
  code?: string
  groupData?: GroupDataItem[]
}

// Define the context type
type ContainerContextType = {
  code?: string
  sliderState?: number[]
  setSliderState?: (value: number[]) => void
  customData?: GroupDataItem[]
}

// Container component that provides the context
const ComponentGroup: React.FC<ContainerProps> = ({ children, withCode = false, code, groupData }) => {
  const [codeValue, setCodeValue] = useState(code || "")

  const sliderData = groupData?.find(data => data.type === "slider") || undefined
  const toggleData = groupData?.find(data => data.type === "toggle") || undefined
  const customData = groupData?.filter(data => data.type === "custom") || undefined

  const [sliderState, setSliderState] = useState(sliderData ? [sliderData.initialValue] : [4])
  const [toggleState, setToggleState] = useState()
  const [customDataState, setCustomDataState] = useState(customData || null)

  const value = {
    codeValue,
    setCodeValue,
    sliderState,
    setSliderState,
    customData: customDataState,
  }

  return (
    <ContainerContext.Provider value={value}>
      <div className={cn("py-8 px-4 rounded-md", withCode && "bg-card")}>
        {/* Header */}
        <div className="mb-14">
          {/* Slider */}
          <div className={cn("max-w-[350px] mx-auto ")}>
            {sliderData && (
              <GroupSlider
                initialValue={sliderData.initialValue}
                value={sliderState}
                addPercentageSign={sliderData.addPercentageSign}
                setValue={setSliderState}
                title={sliderData.title}
                minValue={sliderData.minValue}
                maxValue={sliderData.maxValue}
              />
            )}
          </div>
        </div>

        {/* Main Content  */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-14", !withCode && "!grid-cols-1")}>
          {/* Code Editor  */}
          {withCode && code && (
            <div className="size-full flex flex-col justify-start">
              <CodeHighlighter
                code={code}
                language={"css"}
                customStyle={{
                  background: "#1e1e1e",
                }}
              />
            </div>
          )}

          {/* Child compoennt  */}

          <div className={cn(withCode ? "px-0 md:px-6" : "py-10")}>{children}</div>
        </div>
      </div>
    </ContainerContext.Provider>
  )
}

type GroupSliderProps = SliderProps & {
  setValue: (value: number[]) => void
  value: number[]
}

function GroupSlider({
  value = [4],
  title,
  maxValue = 10,
  minValue = 1,
  setValue,
  addPercentageSign,
}: GroupSliderProps) {
  return (
    <div>
      <div className="flex mb-6">
        <span>{title} </span>
        <span className="ml-auto">
          {value} {addPercentageSign && "%"}
        </span>
      </div>
      <Slider defaultValue={value} onValueChange={value => setValue(value)} min={minValue} max={maxValue} />
    </div>
  )
}

export default ComponentGroup
