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

type GroupDataItem = {
  name: string
  value: any
}

// Create the context with a default value
const ContainerContext = createContext<ContainerContextType | undefined>(undefined)

// Custom hook to use the Container context
export const useContainerContext = (): ContainerContextType & {
  isInGroup: boolean
} => {
  const context = useContext(ContainerContext)
  const isInGroup = context === undefined

  if (!context) {
    return {
      code: "codeState",
      groupData: [],
      getStateValueByName: (name: string) => {},
      setStateValueByName: (name: string, newValue: any) => {},
      isInGroup: false,
    }
  }

  return { ...context, isInGroup: true }
}

// Define the props for the Container component
interface ContainerProps {
  children: ReactNode
  code?: string
  groupData?: GroupDataItem[]
}

// Define the context type
type ContainerContextType = {
  code?: string
  groupData?: GroupDataItem[]
  getStateValueByName: (name: string) => GroupDataItem | undefined
  setStateValueByName: (name: string, newValue: any) => void
}

// Container component that provides the context
const ComponentGroup: React.FC<ContainerProps> = ({ children, code, groupData }) => {
  const [codeState, setCodeState] = useState(code || "")
  const [groupDataState, setGroupDataState] = useState(groupData ?? [])

  const withCode = codeState && codeState.length > 0

  const getStateValueByName = (name: string) => {
    const item = groupDataState.find(data => data.name === name)
    return item ? item.value : undefined
  }

  const setStateValueByName = (name: string, newValue: any) => {
    setGroupDataState(prevState => prevState.map(data => (data.name === name ? { ...data, value: newValue } : data)))
  }

  const sliderValue = getStateValueByName("numberOfChildren")
  console.log(sliderValue)

  const value = {
    code: codeState,
    groupData: groupDataState,
    getStateValueByName,
    setStateValueByName,
  }

  return (
    <ContainerContext.Provider value={value}>
      <div className={cn("py-8 px-4 rounded-md", withCode && "bg-card")}>
        {/* Header */}
        <div className="mb-14">
          {/* Slider */}
          <div className={cn("max-w-[350px] mx-auto ")}>
            <Slider
              defaultValue={[sliderValue]}
              onValueChange={value => setStateValueByName("numberOfChildren", value[0])}
              min={1}
              max={10}
            />
          </div>
        </div>

        {/* Main Content  */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-14", !withCode && "!grid-cols-1")}>
          {/* Code Editor  */}
          {code && (
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
        {/* Footer  */}
        <div className="flex justify-center mt-10"></div>
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
