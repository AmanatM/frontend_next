"use client"
// Container.tsx
import React, { createContext, useContext, useState, ReactNode } from "react"
import CodeHighlighter from "../universalCodeHighliter"
import { cn } from "@/lib/utils"
import { Slider } from "../ui/slider"

// Define the context type
type ContainerContextType = {
  codeValue: string
  setCodeValue: React.Dispatch<React.SetStateAction<string>>
  sliderValue: number[]
  setSliderValue?: React.Dispatch<React.SetStateAction<number[]>>
}

// Create the context with a default value
const ContainerContext = createContext<ContainerContextType | undefined>(undefined)

// Custom hook to use the Container context
export const useContainerContext = (): ContainerContextType => {
  const context = useContext(ContainerContext)
  if (!context) {
    throw new Error("useContainerContext must be used within a ContainerProvider")
  }
  return context
}

type SliderProps = {
  title: string
  initialValue: number
  maxValue: number
  minValue: number
  addPercentageSign?: boolean
}

// Define the props for the Container component
interface ContainerProps {
  children: ReactNode
  withCode?: boolean
  code?: string
  sliderData?: SliderProps
}

// Container component that provides the context
const ComponentGroup: React.FC<ContainerProps> = ({ children, withCode = false, code, sliderData }) => {
  const [codeValue, setCodeValue] = useState(code || "")
  const [sliderValue, setSliderValue] = useState([sliderData?.initialValue || 4])

  const value = {
    codeValue,
    setCodeValue,
    sliderValue,
    setSliderValue,
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
                value={sliderValue}
                addPercentageSign={sliderData.addPercentageSign}
                setValue={setSliderValue}
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
