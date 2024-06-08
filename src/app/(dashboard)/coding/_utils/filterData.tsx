import { LucideIcon } from "lucide-react"

type frameworksFilterValuesType = {
  value: string
  label: string
  icon?: LucideIcon
}

export const frameworksFilterValues: frameworksFilterValuesType[] = [
  {
    value: "react",
    label: "React",
  },
  {
    value: "vanilla",
    label: "Vanilla JS",
  },
]

export const questionTypeFilterValues: frameworksFilterValuesType[] = [
  {
    value: "user_interface",
    label: "UI",
  },
  {
    value: "javascript",
    label: "Coding",
  },
]
