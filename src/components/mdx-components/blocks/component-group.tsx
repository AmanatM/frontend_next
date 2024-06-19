"use client"
// Container.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import CodeHighlighter from "../../universalCodeHighliter"
import { cn } from "@/lib/utils"
import { Slider } from "../../ui/slider"

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
      groupData: [],
      getStateValueByName: (name: string) => {},
      setStateValueByName: (name: string, newValue: any) => {},
      getSetterByName: (name: string) => (newValue: any) => {},
      isInGroup: false,
    }
  }

  return { ...context, isInGroup: true }
}

// Define the context type
type ContainerContextType = {
  groupData?: GroupDataItem[]
  getStateValueByName: (name: string) => any | undefined
  setStateValueByName: (name: string, newValue: any) => void
  getSetterByName: (name: string) => (newValue: any) => void
}

// Define the props for the Container component
interface ContainerProps {
  noBackground?: boolean
  children: ReactNode
  groupData?: GroupDataItem[]
}

// Container component that provides the context
const ComponentGroup: React.FC<ContainerProps> = ({ children, groupData, noBackground }) => {
  const [groupDataState, setGroupDataState] = useState(groupData ?? [])

  const getStateValueByName = (name: string) => {
    const item = groupDataState.find(data => data.name === name)
    return item ? item.value : undefined
  }

  const setStateValueByName = (name: string, newValue: any) => {
    setGroupDataState(prevState => prevState.map(data => (data.name === name ? { ...data, value: newValue } : data)))
  }

  const getSetterByName = (name: string) => {
    return (newValue: any) => {
      setStateValueByName(name, newValue)
    }
  }

  const value = {
    groupData: groupDataState,
    getStateValueByName,
    setStateValueByName,
    getSetterByName,
  }

  return (
    <ContainerContext.Provider value={value}>
      <div className={cn("py-8 px-4 rounded-md my-16", !noBackground && "bg-card")}>
        <div className={cn("flex flex-col gap-y-10")}>{children}</div>
      </div>
    </ContainerContext.Provider>
  )
}

export default ComponentGroup
